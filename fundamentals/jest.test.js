const { sumAsync, subtractAsync } = require("./math");

test("testing sumAsync function", async () => {
  const result = await sumAsync(10, 5);
  const expected = 15;

  expect(result).toBe(expected);
});

test("testing subtractAsync function", async () => {
  const result = await subtractAsync(10, 5);
  const expected = 5;

  expect(result).toBe(expected);
});
