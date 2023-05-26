type Component = {
  name : string
  state: object
  onAttach?: Function
  onDetach?: Function
}

type ComponentArgument = {
  name  : string
  state?: object
}

type Processor = {
  name  : string
  target: string
  update(component: Component, entities: Entity[]): void
}

type Entity = {
  name      : string
  components: string[]
  state     : {
    [key: string]: any
  }
  update?: Function
}

class EntityComponentSystem {
  components: Component[]
  processors: Processor[]
  entities  : Entity[]

  constructor() {
    this.components = []
    this.processors = []
    this.entities   = []
  }

  getProcessorNames(): string[] {
    return this.processors.map(processor => processor.name)
  }

  getProcessors(): Processor[] {
    return this.processors
  }

  getComponents(): Component[] {
    return this.components
  }

  getEntities(): Entity[] {
    return this.entities
  }

  getProcessor(name: string): Processor {
    const hasProcessor = this.hasProcessor(name)

    if (!hasProcessor) {
      throw new Error(`getProcessor(): processor "${name}" not found.`)
    }

    return this.processors.find((processor) => processor.name === name) as Processor
  }

  getComponent(name: string): Component {
    const hasComponent = this.hasComponent(name)

    if (!hasComponent) {
      throw new Error(`getComponent(): component "${name}" not found.`)
    }

    return this.components.find((component) => component.name === name) as Component
  }

  getEntity(name: string): Component {
    const hasEntity = this.hasEntity(name)

    if (!hasEntity) {
      throw new Error(`getEntity(): entity "${name}" not found.`)
    }

    return this.entities.find((entity) => entity.name === name) as Entity
  }

  hasProcessor(name: string): boolean {
    let found = false
    
    for (let processor of this.processors) {
      if (processor.name === name) {
        found = true
      }
    }

    return found
  }

  hasComponent(name: string): boolean {
    let found = false

    for (let component of this.components) {
      if (component.name === name) {
        found = true
      }
    }

    return found
  }

  hasEntity(name: string): boolean {
    let found = false

    for (let entity of this.entities) {
      if (entity.name === name) {
        found = true
      }
    }

    return found
  }

  createEntity(name: string, components: string[]): Entity {
    let entity = {
      name,
      components,
      state: {}
    }

    components.forEach(component => {
      const foundComponent = this.components.find((ECSComponent) => component === ECSComponent.name)

      if (!foundComponent) {
        throw new Error(`createEntity(): component ${component} not found. You probably forgot to register the component in the system.`)
      }

      entity.state = Object.assign(entity.state, foundComponent.state)
    })

    return entity
  }

  entityHasComponent(entity: Entity, component: string): boolean {
    return entity.components.includes(component)
  }

  removeComponentFromEntity(entity: Entity, targetComponent: string): void {
    const indexOfComponent = entity.components.indexOf(targetComponent)

    if (indexOfComponent === -1) {
      throw new Error(`removeComponentFromEntity(): component ${targetComponent} not found in entity ${entity.name}`)
    }

    entity.components = entity.components.filter(component => component !== targetComponent)
    const component   = this.getComponent(targetComponent)
    const keys        = Object.keys(component.state)

    keys.forEach(key => {
      delete entity[key]
    })
  }

  addComponentToEntity(entity: Entity, component: ComponentArgument): void {

    if (this.entityHasComponent(entity, component.name)) return

    const hasComponent = this.hasComponent(component.name)

    if (!hasComponent) {
      throw new Error(`addComponentToEntity(): You can't add component ${component.name} to entity ${entity.name}, because the component is not registered.`)
    }

    entity = Object.assign(entity, component.state ? component.state : {})
    entity.components.push(component.name)
  }

  addEntity(entity: Entity): void {
    this.entities.push(entity)
  }

  addComponent(component: ComponentArgument): void {
    const passedComponent = component as Component
    passedComponent.state = component.state ? passedComponent.state : {}

    if (passedComponent.onAttach) {
      passedComponent.onAttach()
    }

    this.components.push(passedComponent)
  }

  addProcessor(processor: Processor): void {
    this.processors.push(processor)
  }

  removeEntity(entity: Entity): void {
    const indexOf = this.entities.indexOf(entity)

    if (indexOf === -1) {
      throw new Error(`removeEntity(): entity "${entity.name}" not found.`)
    }

    this.entities.splice(indexOf, 1)
  }

  getEntitiesFromComponent(componentName: string): Entity[] {
    return this.entities.filter(entity => {
      return entity.components.includes(componentName)
    })
  }

  private runProcessors(): void {
    this.processors.forEach(processor => {
      const entities  = this.getEntitiesFromComponent(processor.target)
      const component = this.getComponent(processor.target)

      processor.update(component, entities)
    })
  }

  private runCustomLogicOnEntities(): void {
    this.entities.forEach(entity => {
      if (entity.update) {
        entity.update()
      }
    })
  }

  update() {
    this.runProcessors()
    this.runCustomLogicOnEntities()
  }
}

export default EntityComponentSystem