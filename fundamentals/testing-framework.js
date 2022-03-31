const { sum, subtract } = require("./math");

test("testing sum function", () => {
  const result = sum(10, 5);
  const expected = 15;

  expect(result).toBe(expected);
});

test("testing subtract function", () => {
  const result = subtract(10, 5);
  const expected = 5;

  expect(result).toBe(expected);
});

function test(title, callback) {
  try {
    callback();
    console.log(`✓ ${title}`);
  } catch (error) {
    console.error(`✗ ${title}`);
    console.error(error.message);
  }
}

function expect(actual) {
  return {
    toBe: (expected) => {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
  };
}
