import { db } from "../../../data/data";
import { shoppingData } from "../../../data/data-shopping";

describe("Collection Random Access", () => {
  it("can be used to pick random items", () => {
    // write a closure which accepts a collection in the 1st step
    // and, with no parameters, returns random item in the 2nd step
    // like this: randomItemFrom([1,2,3])()

    const randomItemFrom = (data: object[]): Function => {
      return () => {
        const randomIndex = Math.floor(Math.random() * data.length);
        return data[randomIndex];
      };
    };

    const randomShoppingItem = randomItemFrom(shoppingData);
    for (let i = 0; i < 50; i++) {
      expect(shoppingData.includes(randomShoppingItem())).toBe(true);
    }

    const employees = db.getEmployees();

    const randomEmployee = randomItemFrom(employees);
    for (let i = 0; i < 50; i++) {
      expect(employees.includes(randomEmployee())).toBe(true);
    }
  });

  it("can be used to pick random items, each only once", () => {
    // write a similar function as above (with the same signature)
    // but this time the closure shall iterate over elements in a random manner
    // returning each element only once
    // (i.e. above was infinitely returning items, here it returns an item only once)

    // DESIGN: decide, how you would like the consumer to be notified that the collection
    // has been depleted (is empty and won't return any item from now on)

    // define `randomItemOnceFrom` function here
    function randomItemOnceFrom(data: object[]) {
      let items = [...data];
      return () => {
        if (items.length === 0) {
          console.log("Collection is depleted and cannot return elements.");
          return undefined;
        }
        const randomIndex = Math.floor(Math.random() * items.length);
        const item = items[randomIndex];
        items.splice(randomIndex, 1);
        return item;
      };
    }

    const randomShoppingItem = randomItemOnceFrom(shoppingData);
    let count: number,
      item = randomShoppingItem();
    for (count = 0; item !== undefined; count++, item = randomShoppingItem()) {
      expect(shoppingData.includes(item)).toBe(true);
    }
    expect(count).toBe(shoppingData.length);
  });

  it("can be used to pick random items, each only once, as a generator", () => {
    // same as above, but write it as an ES6 generator

    // define `randomItemFromGenerator` _generator_ here
    function* randomItemFromGenerator(data: object[]) {
      const shuffledArray = data.slice();
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ];
      }
      for (const item of shuffledArray) {
        yield item;
      }
    }

    const randomShoppingItemIterator = randomItemFromGenerator(shoppingData);
    let count = 0;
    for (let item of randomShoppingItemIterator) {
      count++;
      expect(shoppingData.includes(item)).toBe(true);
    }
    expect(count).toBe(shoppingData.length);
  });
});
