describe("Functional programming", function () {
  var list3 = [3, 6, 12, 24, 36, 39, 51, 63];
  var list5 = [5, 15, 30, 40, 45, 55, 105];

  it("simple operations on primitives collection", () => {
    // use .map function on arrays to make tests pass
    // define multiplyBy3 and multiplyBy5 functions
    // and use them along with .map

    // code should look like: collection.map(fn)

    var multiplyBy3 = (value: number) => value * 3;
    var multiplyBy5 = (value: number) => value * 5;
    var list3times3 = list3.map(multiplyBy3);
    var list5times5 = list5.map(multiplyBy5);

    expect(typeof multiplyBy3).toEqual("function");
    expect(multiplyBy3.length).toEqual(1);
    expect(multiplyBy3(3)).toEqual(9);
    expect(typeof multiplyBy5).toEqual("function");
    expect(multiplyBy5.length).toEqual(1);
    expect(multiplyBy5(5)).toEqual(25);
    expect(list3times3).toEqual([9, 18, 36, 72, 108, 117, 153, 189]);
    expect(list5times5).toEqual([25, 75, 150, 200, 225, 275, 525]);

    // reuse functions from previous exercise

    // reuse multiplyBy3 and multiplyBy5 functions from above within .map
    // additionally, define isEven function that returns boolean whether a number is even
    // use it to filter only even numbers (remainder of dividing by 2 is 0) from result arrays

    // code should look like: collection.map(fn).filter(fn)

    var isEven = (number: number) => {
      if (number % 2 === 0) {
        return true;
      } else {
        return false;
      }
    };

    var list3times3filteredEven = list3.map(multiplyBy3).filter(isEven);
    var list5times5filteredEven = list5.map(multiplyBy5).filter(isEven);

    expect(typeof isEven).toEqual("function");
    expect(isEven.length).toEqual(1);
    expect(isEven(2016)).toEqual(true);
    expect(isEven(2017)).toEqual(false);
    expect(list3times3filteredEven).toEqual([18, 36, 72, 108]);
    expect(list5times5filteredEven).toEqual([150, 200]);

    // again, reuse functions from previous exercise
    // reuse multiplyBy3, multiplyBy5 and isEven functions from above
    // additionally, define sum function that will reduce a list into a single value
    // use the sum function to sum the lists of multiplied-and-then-filtered elements

    // code should look like: collection.map(fn).filter(fn).reduce(fn)

    var sum = (accumulator: number, currentValue: number) =>
      accumulator + currentValue;
    var list3times3filteredEvenSum = list3
      .map(multiplyBy3)
      .filter(isEven)
      .reduce(sum);
    var list5times5filteredEvenSum = list5
      .map(multiplyBy5)
      .filter(isEven)
      .reduce(sum);

    expect(typeof sum).toEqual("function");
    expect(sum.length).toEqual(2);
    expect(sum(2016, 2017)).toEqual(4033);
    expect(list3times3filteredEvenSum).toEqual(234);
    expect(list5times5filteredEvenSum).toEqual(350);
  });

  it("reverses lists", function () {
    // reverse both arrays
    // but be careful - don't alter original arrays!

    var list3reversed = [...list3].reverse();
    var list5reversed = [...list5].reverse();

    expect(list3reversed).toEqual([63, 51, 39, 36, 24, 12, 6, 3]);
    expect(list3).toEqual([3, 6, 12, 24, 36, 39, 51, 63]);
    expect(list5reversed).toEqual([105, 55, 45, 40, 30, 15, 5]);
    expect(list5).toEqual([5, 15, 30, 40, 45, 55, 105]);
  });

  it("sequentially processes calculations", () => {
    let numbers = [2, 3, 8, 1, 33, 76, 13, 32, 13];
    // given above list of numbers, perform following calculations
    // - take all numbers to the power of 3
    // - summarize all the new elements which are odd (not even)
    let result = numbers
      .map((value) => value ** 3)
      .filter((value) => {
        if (value % 2 === 0) {
          return false;
        } else {
          return true;
        }
      })
      .reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue
      );

    expect(result).toEqual(40359);
  });

  it("picks a single element (where .find does not apply)", () => {
    let numbers = [
      { val: 2 },
      { val: 3 },
      { val: 8 },
      { val: 1 },
      { val: 33 },
      { val: 76 },
      { val: 13 },
      { val: 32 },
      { val: 13 },
    ];
    // use .reduce to find maximal and minimal item from above array

    let maxValue = numbers.reduce((accumulator, currentValue) => {
      if (currentValue.val > accumulator.val) {
        return currentValue;
      } else {
        return accumulator;
      }
    });
    let minValue = numbers.reduce((accumulator, currentValue) => {
      if (currentValue.val < accumulator.val) {
        return currentValue;
      } else {
        return accumulator;
      }
    });

    expect(maxValue).toEqual({ val: 76 });
    expect(minValue).toEqual({ val: 1 });
  });

  describe("algorithms", () => {
    // beforeEach(() => {
    //   jasmine.addMatchers(customMatchers);
    // });

    it("gimmePairs function", () => {
      // write function `gimmePairs` which accepts dynamic number of parameters
      // and returns an array of all possible pairs

      let gimmePairs = (...args) => {
        const result = [];
        for (let i = 1; i <= args.length; i++) {
          for (let j = 0; j <= args.length; j++) {
            if (args[j] !== undefined && args[j + i] !== undefined) {
              result.push([args[j], args[j + i]]);
            }
          }
        }
        return result;
      };

      expect(gimmePairs(1)).toEqual([]);
      expect(gimmePairs(1, 2)).toEqual([[1, 2]]);
      expect(gimmePairs(1, 2, 3)).toEqual([
        [1, 2],
        [2, 3],
        [1, 3],
      ]);
      expect(gimmePairs(1, 2, 3, 4)).toEqual([
        [1, 2],
        [2, 3],
        [3, 4],
        [1, 3],
        [2, 4],
        [1, 4],
      ]);
    });
  });
});
