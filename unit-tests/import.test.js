test("file imports succesfully", () => {
  const EntityComponentSystem = require("../src/index.js")
  expect(EntityComponentSystem).not.toBeFalsy()
})
