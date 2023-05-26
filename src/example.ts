import EntityComponentSystem from "./index"


// setup
const ECS = new EntityComponentSystem()
const canvas = document.getElementById("game-canvas") as HTMLCanvasElement

const positionComponent = {
  name : "position",
  state: {
    x: 0,
    y: 0
  }
}

const boxComponent = {
  name : "box",
  state: {
    width : 20,
    height: 20
  }
}

const playerBox = {
  name: "playerBox",
  state: {
    width: 10,
    height: 10
  }
}

const jitterComponent = {
  name: "jitter"
}

let xDirecton = 0
let yDirection = 0

const controlComponent = {
  name: "control",
  state: {
    moveSpeed: 2
  },
  onAttach() {
    const keys = {}

    setInterval(() => {
      if (keys["ArrowLeft"]) xDirecton = -1
      if (keys["ArrowRight"]) xDirecton = 1
      if (keys["ArrowUp"]) yDirection = -1
      if (keys["ArrowDown"]) yDirection = 1
    }, 20)

    document.addEventListener("keydown", (event) => {
      keys[event.key] = true
    })

    document.addEventListener("keyup", (event) => {
      delete keys[event.key]

      if (!keys["ArrowLeft"]) xDirecton = 0
      if (!keys["ArrowRight"]) xDirecton = 0
      if (!keys["ArrowUp"]) yDirection = 0
      if (!keys["ArrowDown"]) yDirection = 0
    })
  }
}

const growComponent = {
  name : "growEffect",
  state: {
    growSpeed  : 0.1,
    maxGrowSize: 50,
  }
}

const growProcesssor = {
  name: "growProcessor",
  target: "growEffect",
  update(component, entities) {
    entities.forEach((entity) => {
      entity.state.width += entity.state.growSpeed * (Math.random() * 5)
      entity.state.height += entity.state.growSpeed * (Math.random() * 5)

      if (entity.state.width > entity.state.maxGrowSize) {
        ECS.removeEntity(entity)
      }
    })
  }
}

const controlProcessor = {
  name  : "controlProcessor",
  target: "control",
  update(component, entities) {
    entities.forEach(entity => {
      entity.state.x += xDirecton * entity.state.moveSpeed
      entity.state.y += yDirection * entity.state.moveSpeed
    })
  }
}

const jitterProcessor = {
  name  : "jitterProcessor",
  target: "jitter",
  update(component, entities) {
    entities.forEach((entity) => {
      const currentX = entity.state.x
      const currentY = entity.state.y

      const newX = (Math.random() * 10) - 5 + currentX
      const newY = (Math.random() * 10) - 5 + currentY

      entity.state.x = newX
      entity.state.y = newY
    })
  }
}

const boxRenderingProcessor = {
  name  : "boxRenderingProcessor",
  target: "box",
  update(component, entities) {
    entities.forEach(entity => {
      ctx.translate(entity.state.x, entity.state.y)
      ctx.fillStyle = "orange"
      ctx.fillRect(0, 0, entity.state.width, entity.state.height)
      ctx.translate(-entity.state.x, -entity.state.y)
    })
  }
}

const playerBoxRenderingProcessor = {
  name: "playerBoxRenderingProcessor",
  target: "playerBox",
  update(component, entities) {
    entities.forEach(entity => {
      ctx.beginPath()
      ctx.fillStyle = "white"
      ctx.fillRect(entity.state.x, entity.state.y, entity.state.width, entity.state.height)
      ctx.closePath()
    })
  }
}

ECS.addComponent(positionComponent)
ECS.addComponent(boxComponent)
ECS.addComponent(jitterComponent)
ECS.addComponent(controlComponent)
ECS.addComponent(playerBox)
ECS.addComponent(growComponent)
ECS.addProcessor(growProcesssor)
ECS.addProcessor(playerBoxRenderingProcessor)
ECS.addProcessor(jitterProcessor)
ECS.addProcessor(boxRenderingProcessor)
ECS.addProcessor(controlProcessor)


const create100Boxes = () => {
  console.log(ECS)
  for (let i = 0; i < 100; i++) {
    const box = ECS.createEntity("Box", ["position", "box", "growEffect"])

    box.state.x = Math.random() * canvas.width
    box.state.y = Math.random() * canvas.height

    ECS.addEntity(box)
  }
}

const createPlayerBox = () => {
  const playerBox = ECS.createEntity("Player", ["position", "playerBox", "control"])

  playerBox.state.x = canvas.width / 2
  playerBox.state.y = canvas.height / 2

  ECS.addEntity(playerBox)
}

canvas.width = 500
canvas.height = 500
canvas.style.backgroundColor = "black"

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

const gameloop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ECS.update()

  requestAnimationFrame(gameloop)
}

// createPlayerBox()
create100Boxes()
// gameloop()