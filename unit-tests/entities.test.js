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
ECS.addProcessor(movementProcessor)
ECS.addProcessor(dummyProcessor)
ECS.addProcessor(gravityProcessor)

describe("createEntity()", () => {
  const player = ECS.createEntity("player", ["gravity"])

  test("Should return a Object", () => {
    expect(typeof player).toBe("object")
  })

  test("Should contain property 'name' and 'components'", () => {
    expect(player).toHaveProperty("name")
    expect(player).toHaveProperty("components")
  })

  test("Property 'name' should equal 'player' if first argument is 'player'", () => {
    expect(player).toMatchObject({name: "player"})
  })

  test("Property 'components' should be array", () => {
    expect(Array.isArray(player.components)).toBe(true)
  })

  test("Property 'components' should contain the component 'gravity' (as string) if the argument was ['gravity']", () => {
    expect(player.components).toContain('gravity')
  })
})

describe("addEntity()", () => {
  const player = ECS.createEntity("player", ["gravity"])

  test("Should push player entity into this.entities", () => {
    ECS.addEntity(player)
    // expect(ECS.entities).toHaveLength(1)
    expect(ECS.entities).toContain(player)
  })
})

describe("hasEntitiy()", () => {
  test("Should return true if 'player' is input", () => {
    expect(ECS.hasEntity("player")).toBeTruthy()
  })

  test("Should return false if 'player1' is input", () => {
    expect(ECS.hasEntity("player1")).toBeFalsy()
  })
})

describe("getEntitiesFromComponent()", () => {
  const player = ECS.createEntity("player", ["gravity"])
  const enemy = ECS.createEntity("enemy", ["gravity"])
  ECS.addEntity(enemy)
  ECS.addEntity(player)

  const result = ECS.getEntitiesFromComponent('gravity')

  test("Should return an array of entities", () => {
    expect(Array.isArray(result)).toBe(true)
  })

  test("Should have a length of 2 entities", () => {
    expect(result).toHaveLength(2)
  })

  test("Should return player and enemy entities if input is 'gravity'", () => {
    expect(result).toEqual(expect.arrayContaining([enemy, player]))
  })
})
