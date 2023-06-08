import { EntityComponentSystem, Component, Processor, Entity } from './api_v2'

const ecs = new EntityComponentSystem()

const positionComponent: Component = {
  name : "position",
  state: {
    x: 0,
    y: 0
  }
}

const massComponent: Component = {
  name : "mass",
  state: {
    mass     : 0.2,
    velocityX: 1,
    velocityY: 0
  }
}

const shapeComponent: Component = {
  name : "shape",
  state: {
    size : 10,
    color: "red"
  }
}

const collisionComponent: Component = {
  name : "collision",
  state: {
    collisionX: false,
    collisionY: false
  }
}

const gravityProcessor: Processor = {
  name    : "gravity_processor",
  required: ["position", "mass"],
  update(entity: Entity, components: Component[], processor: Processor) {
    const position = components[0]
    const mass     = components[1]

    mass.state.velocityY += mass.state.mass

    position.state.y += mass.state.velocityY
    position.state.x += mass.state.velocityX
  }
}

const shapeDrawProcessor: Processor = {
  name    : "shape_draw_processor",
  required: ["position", "shape"],
  update(entity: Entity, components: Component[], processor: Processor) {
    const position = components[0]
    const shape    = components[1]

    context.translate(position.state.x, position.state.y)
    context.fillStyle = shape.state.color
    context.fillRect(0, 0, shape.state.size, shape.state.size)
    context.translate(-position.state.x, -position.state.y)
  }
}

const edgeCollisionProcessor: Processor = {
  name: "edge_collision_processor",
  required: ["position", "collision", "shape"],
  update(entity: Entity, components: Component[], processor: Processor) {
    const position  = components[0]
    const collision = components[1]
    const shape     = components[2]

    const x    = position.state.x
    const y    = position.state.y
    const size = shape.state.size

    if (x <= 0 || x + size >= canvas.width) {
      collision.state.collisionX = true
    } else {
      collision.state.collisionX = false
    }

    if (y <= 0 || y + size >= canvas.height) {
      collision.state.collisionY = true
    } else {
      collision.state.collisionY = false
    }
  }
}

const bounceProcessor: Processor = {
  name    : "bounce_processor",
  required: ["position", "collision", "mass"],
  update(entity: Entity, components: Component[], processor: Processor) {
    const position  = components[0]
    const collision = components[1]
    const mass      = components[2]

    if (collision.state.collisionY) {
      mass.state.velocityY = -mass.state.velocityY
    }

    if (collision.state.collisionX) {
      mass.state.velocityX = -mass.state.velocityX
    }
  }
}

ecs.addComponent(positionComponent)
ecs.addComponent(massComponent)
ecs.addComponent(shapeComponent)
ecs.addComponent(collisionComponent)

ecs.addProcessor(gravityProcessor)
ecs.addProcessor(shapeDrawProcessor)
ecs.addProcessor(edgeCollisionProcessor)
ecs.addProcessor(bounceProcessor)

const canvas  = document.querySelector("canvas")
const context = canvas.getContext("2d")

const gameloop = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)

  ecs.update()
  requestAnimationFrame(gameloop)
}

const addDefaultBox = () => {
  const box = ecs.createEntity("box", [
    "position",
    "mass",
    "shape",
    "collision"
  ], [
    "shape_draw_processor",
    "edge_collision_processor",
    "gravity_processor",
    "bounce_processor"
  ])

  ecs.addEntity(box)
}

const addRandomBox = (amount: number): void => {
  for (let i = 0; i < amount; i++) {
    const box = ecs.createEntity("box", [
      "position",
      "mass",
      "shape",
      "collision"
    ], [
      "shape_draw_processor",
      "edge_collision_processor",
      "gravity_processor",
      "bounce_processor"
    ])

    const [position, shape, mass] = ecs.getEntityComponents(box, ["position", "shape", "mass"])

    const colors = ["green", "blue", "orange", "red", "white"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    const randomMass = Math.random() * 0.5 + 0.1
    const randomSize = Math.random() * 30
    const randomX = Math.random() * canvas.width
    const randomY = Math.random() * canvas.height

    position.state.x = randomX
    position.state.y = randomY
    shape.state.color = randomColor
    mass.state.size = randomSize
    mass.state.mass = randomMass

    ecs.addEntity(box)
  }
}

const resetState = () => {
  const entities = ecs.getEntities()

  for (let entity of entities) {
    ecs.removeEntity(entity)
  }

  // addDefaultBox()
}

const randomBoxButton   = document.getElementById("random-box-button")
const randomBoxButton50 = document.getElementById("random-box-button-50")
const resetButton       = document.getElementById("reset-button")

randomBoxButton.addEventListener("click", () => {
  addRandomBox(1)
})

randomBoxButton50.addEventListener("click", () => {
  addRandomBox(50)
})

resetButton.addEventListener("click", () => {
  resetState()
})

addDefaultBox()
gameloop()