const EntityComponentSystem = require("../src/index.js")
const ECS = new EntityComponentSystem()

// processors
const gravityProcessor = {
  name: "gravityProcessor",
  component: "gravity",
  update() {

  }
}

const movementProcessor = {
  name: "movementProcessor",
  component: "position",
  update() {

  }
}

const dummyProcessor = {
  name: "dummyProcessor",
  component: "dummy",
  update() {

  }
}

// components
const gravity = {
  name: "gravity"
}


describe("addComponent()", () => {
  test("Should push 'gravity' component into this.components", () => {
    ECS.addComponent(gravity)
    expect(ECS.components).toContain(gravity)
    expect(ECS.components).toHaveLength(1)
  })
})

describe("hasComponent()", () => {
  test("Should return true if 'gravity' is input", () => {
    expect(ECS.hasComponent('gravity')).toBeTruthy()
  })

  test("Should return false if 'gravity1' is input", () => {
    expect(ECS.hasComponent('gravity1')).toBeFalsy()
  })
})
