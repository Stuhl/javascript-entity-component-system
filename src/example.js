// Components (just data and state)
const gravityComponent = {
  name: "gravity",
  state: {
    gravity: true
  }
}

const positionComponent = {
  name: "position",
  state: {
    x: 0,
    y: 0
  }
}

const dragComponent = {
  name: "drag",
  state: {
    drag: true
  }
}

const accelerationComponent = {
  name: "acceleration",
  state: {
    acceleration: 5
  }
}

// Processors (handling logic)
const gravityProcessor = {
  name: "gravityProcessor",
  component: "gravity",
  update(component, entities) {
    entities.forEach(entity => {
      entity.y += 9.81
    })
  }
}

const dragProcessor = {
  name: "dragProcessor",
  component: "drag",
  update(component, entities) {
    entities.forEach(entity => {
      entity.x -= 2
    })
  }
}

const accelerationProcessor = {
  name: "accelerationProcessor",
  component: "acceleration",
  update(component, entities) {
    entities.forEach(entity => {
      entity.x += component.state.acceleration
    })
  }
}

const ecs = new EntityComponentSystem()

ecs.addProcessor(gravityProcessor)
ecs.addProcessor(dragProcessor)
ecs.addProcessor(accelerationProcessor)


ecs.addComponent(accelerationComponent)
ecs.addComponent(gravityComponent)
ecs.addComponent(positionComponent)
ecs.addComponent(dragComponent)
// ecs.displayProcessors()

const player = ecs.createEntity("player", ["position", "gravity"])
const enemy = ecs.createEntity("enemy", ["position", "gravity"])
const car = ecs.createEntity("mustang", ["position", "gravity", "drag", "acceleration"])

ecs.addEntity(player)
ecs.addEntity(enemy)
ecs.addEntity(car)
ecs.update()

console.log(ecs)
