import {EntityComponentSystem} from "./index"

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
let isSpacebar = false

const controlComponent = {
  name: "control",
  state: {
    moveSpeed: 2,
    runSpeed: 5,
    controlsID: null
  },
  onAttach() {
    const keys = {}

    const id = setInterval(() => {
      if (keys["ArrowLeft"]) xDirecton = -1
      if (keys["ArrowRight"]) xDirecton = 1
      if (keys["ArrowUp"]) yDirection = -1
      if (keys["ArrowDown"]) yDirection = 1
      if (keys[" "]) isSpacebar = true
    }, 20)

    this.controlsID = id

    document.addEventListener("keydown", (event) => {
      event.preventDefault()
      keys[event.key] = true
    })

    document.addEventListener("keyup", (event) => {
      event.preventDefault()
      delete keys[event.key]

      if (!keys["ArrowLeft"]) xDirecton = 0
      if (!keys["ArrowRight"]) xDirecton = 0
      if (!keys["ArrowUp"]) yDirection = 0
      if (!keys["ArrowDown"]) yDirection = 0
      if (!keys[" "]) isSpacebar = false
    })
  },
  onRemove() {
    
  }
}

const growComponent = {
  name : "growEffect",
  state: {
    growSpeed  : 0.1,
    maxGrowSize: 50,
  }
}

const collisionComponent = {
  name: "onCollisionDeleteComponent",
}

const collisionProcessor = {
  name: "onCollisionDeleteProcessor",
  target: "onCollisionDeleteComponent",
  update(component, entities) {
    entities.forEach((entity) => {
      const allEntities = ECS.getEntities()

      for (let targetEntity of allEntities) {
        const isPlayer = targetEntity.name === "Player"

        if (!isPlayer) {
          continue
        }


        const targetPosition = ECS.entityHasComponent(targetEntity, "position")
        const targetRenderer = ECS.entityHasComponent(targetEntity, "box") || ECS.entityHasComponent(targetEntity, "playerBox")
        const hasPosition = ECS.entityHasComponent(entity, "position")
        const hasRenderer = ECS.entityHasComponent(entity, "box") || ECS.entityHasComponent(entity, "playerBox")
        const hasCollision = ECS.entityHasComponent(entity, "onCollisionDeleteComponent")
        const isSelf = targetEntity === entity

        if (!hasPosition || !hasRenderer || isSelf || !targetPosition || !targetRenderer || !hasCollision) {
          continue
        }

        const x = entity.state.x
        const y = entity.state.y
        const width = entity.state.width
        const height = entity.state.height

        const targetX = targetEntity.state.x
        const targetY = targetEntity.state.y
        const targetWidth = targetEntity.state.width
        const targetHeight = targetEntity.state.height

        const xCollision = (x + width) >= targetX && x <= (targetX + targetWidth)
        const yCollision = (y + height) >= targetY && y <= (targetY + targetHeight)

        if (xCollision && yCollision) {
          ECS.removeComponentFromEntity(entity, "onCollisionDeleteComponent")
          ECS.addComponentToEntity(entity, "growEffect")
          ECS.addComponentToEntity(entity, "jitter")
          ECS.addComponentToEntity(entity, "flashColor")
        }
      }
    })
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
        score += 10
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

      if (isSpacebar && xDirecton) {
        entity.state.x += xDirecton * entity.state.runSpeed
      }

      if (isSpacebar && yDirection) {
        entity.state.y += yDirection * entity.state.runSpeed
      }
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
      const hasFlashColor = ECS.entityHasComponent(entity, "flashColor")

      ctx.translate(entity.state.x, entity.state.y)
      ctx.fillStyle = hasFlashColor ? entity.state.flashColorCurrent : "orange"
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

const flashColorComponent = {
  name: "flashColor",
  state: {
    flashColorTimer: 0,
    flashColorSpeed: 200,
    flashColor1: "white",
    flashColor2: "red",
    flashColorCurrent: "red"
  }
}

const flashColorProcessor = {
  name: "flashColorProcessor",
  target: "flashColor",
  update(component, entities) {
    entities.forEach((entity) => {
      entity.state.flashColorTimer += 20

      if (entity.state.flashColorTimer >= entity.state.flashColorSpeed) {
        entity.state.flashColorTimer = 0
        entity.state.flashColorCurrent = entity.state.flashColorCurrent === entity.state.flashColor1 ? entity.state.flashColor2 : entity.state.flashColor1
      }
    })
  }
}

ECS.addComponent(positionComponent)
ECS.addComponent(boxComponent)
ECS.addComponent(jitterComponent)
ECS.addComponent(controlComponent)
ECS.addComponent(playerBox)
ECS.addComponent(growComponent)
ECS.addComponent(collisionComponent)
ECS.addComponent(flashColorComponent)

ECS.addProcessor(flashColorProcessor)
ECS.addProcessor(collisionProcessor)
ECS.addProcessor(growProcesssor)
ECS.addProcessor(jitterProcessor)
ECS.addProcessor(boxRenderingProcessor)
ECS.addProcessor(controlProcessor)
ECS.addProcessor(playerBoxRenderingProcessor)


const create100Boxes = () => {
  for (let i = 0; i < 100; i++) {
    const box = ECS.createEntity("enemy", ["position", "box", "onCollisionDeleteComponent"])

    box.state.x = Math.random() * canvas.width
    box.state.y = Math.random() * canvas.height

    ECS.addEntity(box)
  }
}

const create1EnemyBox = () => {
  const enemyBox = ECS.createEntity("enemy", ["position", "box", "onCollisionDeleteComponent"])

  enemyBox.state.x = 100
  enemyBox.state.y = 100

  ECS.addEntity(enemyBox)
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

let score = 0

const gameloop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ECS.update()
  ctx.font = "30px Comis-Sans"
  ctx.fillText("Score:", 30, 30)
  ctx.fillText(String(score), 110, 32)

  requestAnimationFrame(gameloop)
}

create100Boxes()
// create1EnemyBox()
createPlayerBox()
gameloop()


const playerRendererCheckbox = document.getElementById("player-renderer") as HTMLInputElement
const playerRendererContainer = document.getElementById("player-renderer-container")
const playerRendererSize = document.getElementById("player-renderer-size") as HTMLInputElement

const playerControlsCheckbox = document.getElementById("player-controls") as HTMLInputElement
const playerControlsContainer = document.getElementById("player-controls-container")
const playerControlsSpeed = document.getElementById("player-controls-speed") as HTMLInputElement
const playerControlsRunSpeed = document.getElementById("player-controls-run-speed") as HTMLInputElement

playerRendererCheckbox.addEventListener("change", () => {
  const checkbox = playerRendererCheckbox
  const isChecked = checkbox.checked
  const player = ECS.getEntity("Player")

  if (isChecked) {
    playerRendererContainer.style.display = "block"
    ECS.addComponentToEntity(player, "playerBox")
  }

  if (!isChecked) {
    playerRendererContainer.style.display = "none"
    ECS.removeComponentFromEntity(player, "playerBox")
  }
})

playerRendererSize.addEventListener("change", () => {
  const player = ECS.getEntity("Player")
  player.state.height = Number(playerRendererSize.value)
  player.state.width = Number(playerRendererSize.value)
})

playerControlsCheckbox.addEventListener("change", () => {
  const checkbox = playerControlsCheckbox
  const isChecked = checkbox.checked
  const player = ECS.getEntity("Player")

  if (isChecked) {
    playerControlsContainer.style.display = "block"
    ECS.addComponentToEntity(player, "controls")
  }

  if (!isChecked) {
    playerControlsContainer.style.display = "none"
    ECS.removeComponentFromEntity(player, "controls")
  }
})

playerControlsSpeed.addEventListener("change", () => {
  const player = ECS.getEntity("Player")
  player.state.moveSpeed = Number(playerControlsSpeed.value)

  console.log(player)
})

playerControlsRunSpeed.addEventListener("change", () => {
  const player = ECS.getEntity("Player")
  player.state.runSpeed = Number(playerControlsRunSpeed.value)
})

const getPlayerCodeSnippet = () => {
  const player = ECS.getEntity("Player")
}