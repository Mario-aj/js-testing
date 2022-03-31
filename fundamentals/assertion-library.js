const { sum, subtract } = require("./math");

let result = sum(10, 5);
let expected = 15;

expect(result).toBe(expected);

result = subtract(10, 5);
expected = 5;

expect(result).toBe(expected);

function expect(actual) {
  return {
    toBe: (expected) => {
      if (actual !== expected) {
        throw new Error(`${result} is not equal to ${expected}`);
      } else {
        console.log("passed");
      }
    },
  };
}
