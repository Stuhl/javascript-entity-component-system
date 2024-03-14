import { EntityComponentSystem, Component, Processor, Entity } from "./index"

const ecs = new EntityComponentSystem()

const positionComponent: Component = {
  name          : "position name",
  componentType : "position",
  state: {
    x: 0,
    y: 0
  }
}

const physicsComponent: Component = {
  name          : "physics name",
  componentType : "physics",
  state: {
    accelerationX : 0.1,
    accelerationY : 0.2,
    velocityX     : 0,
    velocityY     : 0
  }
}

const shapeComponent: Component = {
  name          : "shape name",
  componentType : "shape",
  state: {
    size : 10,
    color: "red"
  }
}

const collisionComponent: Component = {
  name          : "collision name",
  componentType : "collision",
  state: {
    collisionX: false,
    collisionY: false
  }
}

const physicsProcessor: Processor = {
  name    : "physics_processor",
  required: ["position", "physics"],
  update(entity: Entity, components: Component[], processor: Processor) {
    const [position, physics] = components


    physics.state.velocityY += physics.state.accelerationY;

    position.state.y += physics.state.velocityY
    position.state.x += physics.state.velocityX
  }
}

const shapeDrawProcessor: Processor = {
  name    : "shape_draw_processor",
  required: ["position", "shape"],
  update(entity: Entity, components: Component[], processor: Processor) {
    const [position, shape] = components

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
    const [position, collision, shape] = components

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
  required: ["position", "collision", "physics"],
  update(entity: Entity, components: Component[], processor: Processor) {
    const [position, collision, physics] = components

    if (collision.state.collisionY) {
      physics.state.velocityY = -physics.state.velocityY
    }

    if (collision.state.collisionX) {
      physics.state.velocityX = -physics.state.velocityX
    }
  }
}

const jitterProcessor: Processor = {
  name: "jitter_processor",
  required: ["position"],
  update(entity: Entity, components: Component[], processor: Processor) {
    const [position] = components

    position.state.x += Math.random() * (5 - -5) - 5
    position.state.y += Math.random() * (5 - -5) - 5
  }
}

ecs.addComponent(positionComponent)
ecs.addComponent(physicsComponent)
ecs.addComponent(shapeComponent)
ecs.addComponent(collisionComponent)

ecs.addProcessor(physicsProcessor)
ecs.addProcessor(shapeDrawProcessor)
ecs.addProcessor(edgeCollisionProcessor)
ecs.addProcessor(bounceProcessor)
ecs.addProcessor(jitterProcessor)

const canvas  = document.querySelector("canvas")
const context = canvas.getContext("2d")

const gameloop = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)

  ecs.update()
  requestAnimationFrame(gameloop)
}

let hasGravity = true
let hasCollision = true
let hasJitter = false

const addDefaultBox = () => {
  const processors = ["shape_draw_processor", "bounce_processor"]

  if (hasGravity) {
    processors.push("physics_processor")
  }

  if (hasCollision) {
    processors.push("edge_collision_processor")
  }

  if (hasJitter) {
    processors.push("jitter_processor")
  }

  const box = ecs.createEntity("box", [
    "position",
    "physics",
    "shape",
    "collision"
  ], processors)

  ecs.addEntity(box)
}

const addRandomBox = (amount: number): void => {
  const processors = ["shape_draw_processor", "bounce_processor"]

  if (hasGravity) {
    processors.push("physics_processor")
  }

  if (hasCollision) {
    processors.push("edge_collision_processor")
  }

  if (hasJitter) {
    processors.push("jitter_processor")
  }

  for (let i = 0; i < amount; i++) {
    const box = ecs.createEntity("box", [
      "position",
      "physics",
      "shape",
      "collision"
    ], processors)

    const [position, shape, mass] = ecs.getEntityComponents(box, ["position", "shape", "mass"])

    const colors = ["green", "blue", "orange", "red", "white"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    const randomMass = Math.random() * 0.5 + 0.1
    const randomSize = Math.random() * 15
    const randomX = Math.random() * canvas.width
    const randomY = Math.random() * canvas.height
    const randomVelocityX = Math.random() * (1 - -1) + -1

    position.state.x = randomX
    position.state.y = randomY
    shape.state.color = randomColor
    shape.state.size = randomSize
    mass.state.mass = randomMass
    mass.state.velocityX = randomVelocityX

    ecs.addEntity(box)
  }
}

// CHECKBOXES
const gravityCheckbox = document.getElementById("gravity-checkbox") as HTMLInputElement
const collisionCheckbox = document.getElementById("collision-checkbox") as HTMLInputElement
const jitterCheckbox = document.getElementById("jitter-checkbox") as HTMLInputElement

gravityCheckbox.addEventListener("change", () => {
  const checked = gravityCheckbox.checked
  const entities = ecs.getEntitiesByName("box")

  if (!checked) {
    hasGravity = false
    for (let entity of entities) {
      ecs.removeProcessorFromEntity(entity, "gravity_processor")
    }
  }

  if (checked) {
    hasGravity = true
    for (let entity of entities) {
      ecs.addProcessorToEntity(entity, "gravity_processor")
    }
  }
})

collisionCheckbox.addEventListener("change", () => {
  const checked = collisionCheckbox.checked
  const entities = ecs.getEntitiesByName("box")

  if (!checked) {
    hasCollision = false
    for (let entity of entities) {
      ecs.removeProcessorFromEntity(entity, "edge_collision_processor")
    }
  }

  if (checked) {
    hasCollision = true
    for (let entity of entities) {
      ecs.addProcessorToEntity(entity, "edge_collision_processor")
    }
  }
})

jitterCheckbox.addEventListener("change", () => {
  const checked = jitterCheckbox.checked
  const entities = ecs.getEntitiesByName("box")

  if (!checked) {
    hasJitter = false
    for (let entity of entities) {
      ecs.removeProcessorFromEntity(entity, "jitter_processor")
    }
  }

  if (checked) {
    hasJitter = true
    for (let entity of entities) {
      ecs.addProcessorToEntity(entity, "jitter_processor")
    }
  }
})

// BUTTONS
const randomBoxButton   = document.getElementById("random-box-button")
const randomBoxButton50 = document.getElementById("random-box-button-50")
const resetButton       = document.getElementById("reset-button")

randomBoxButton.addEventListener("click", () => {
  addRandomBox(1)
})

randomBoxButton50.addEventListener("click", () => {
  addRandomBox(50)
})

const resetState = () => {
  ecs.removeAllEntities()
  addDefaultBox()
}

resetButton.addEventListener("click", () => {
  resetState()
})

addDefaultBox()
gameloop()