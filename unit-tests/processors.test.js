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

ECS.addComponent(gravity)
ECS.addProcessor(gravityProcessor)
ECS.addProcessor(movementProcessor)

// tests
describe("getProcessorNames()", () => {
  const processorNames = ECS.getProcessorNames()
  
  test("Should return type array", () => {
    expect(Array.isArray(processorNames)).toBe(true)
  })

  test("Should contain 2 values", () => {
    expect(processorNames).toHaveLength(2)
  })

  test("Should contain processor 'gravityProcessor' and 'movementProcessor'", () => {
    expect(processorNames).toContain("gravityProcessor")
    expect(processorNames).toContain("movementProcessor")
  })
})

describe("hasProcessor()", () => {
  test("Should return true if 'gravityProcessor' is input", () => {
    expect(ECS.hasProcessor("gravityProcessor")).toBeTruthy()
  })

  test("Should return false if 'gravityProcessor1' is input", () => {
    expect(ECS.hasProcessor("gravityProcessor1")).toBeFalsy()
  })
})

describe("addProcessor()", () => {
  test("Should push 'dummyProcessor' into this.processors", () => {
    ECS.addProcessor(dummyProcessor)
    expect(ECS.processors).toContain(dummyProcessor)
    expect(ECS.processors).toHaveLength(3)
  })
})

// describe("runProcessors()", () => {
  // describe("getComponent()", () => {
  //   test("Should return 'gravity' component if 'gravityProcessor.component' is input", () => {
  //     expect(ECS.getComponent(gravityProcessor.component)).toEqual({name: "gravity"})
  //   })
  // })
  //
  // describe("getEntitiesFromComponent()", () => {
  //   test("Should return all entities that have the component 'gravity' ")
  // })
// })
