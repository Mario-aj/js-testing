const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;

let result = sum(10, 5);
let expected = 15;

if (result !== expected) {
  throw new Error(`Expected ${expected}, but got ${result}`);
} else {
  console.log("Success!");
}

result = subtract(10, 5);
expected = 5;

if (result !== expected) {
  throw new Error(`Expected ${expected}, but got ${result}`);
} else {
  console.log("Success!");
}
