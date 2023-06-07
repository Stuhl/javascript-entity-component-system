export type Component = {
  name : string
  state: object
  onAttach?: Function
}

export type ComponentArgument = {
  name  : string
  state?: object
}

export type Processor = {
  name  : string
  target: string
  update(component: Component, entities: Entity[]): void
}

export type Entity = {
  name      : string
  components: string[]
  state     : {
    [key: string]: any
  }
  update?: Function
}

/**
 * The Entity Component System class.
 */
export class EntityComponentSystem {
  /**
   * All registered components
   * @defaultValue []
   */
  components: Component[]

  /**
   * All registered processors
   * @defaultValue []
   */
  processors: Processor[]

  /**
   * All registered entities
   * @defaultValue []
   */
  entities  : Entity[]
  
  constructor() {
    this.components = []
    this.processors = []
    this.entities   = []
  }

  /**
  * Gets registered processor names.
  * @returns All registered processor names in an array.
  */
  getProcessorNames(): string[] {
    return this.processors.map(processor => processor.name)
  }

  /**
   * Gets all registered processors.
   * @returns All registered processors in an array.
   */
  getProcessors(): Processor[] {
    return this.processors
  }

  /**
   * Gets all components processors.
   * @returns All registered components in an array.
   */
  getComponents(): Component[] {
    return this.components
  }

  /**
   * Gets all registered entities.
   * @returns All registered entities in an array.
   */
  getEntities(): Entity[] {
    return this.entities
  }

  /**
   * Gets a registered processor by name.
   * @param name - Name of the processor
   * @returns A processor or throws an error.
   */
  getProcessor(name: string): Processor {
    const hasProcessor = this.hasProcessor(name)

    if (!hasProcessor) {
      throw new Error(`getProcessor(): processor "${name}" not found.`)
    }

    return this.processors.find((processor) => processor.name === name) as Processor
  }

  /**
   * Gets a registered component by name.
   * @param name - Name of the component
   * @returns A component or throws an error.
   */
  getComponent(name: string): Component {
    const hasComponent = this.hasComponent(name)

    if (!hasComponent) {
      throw new Error(`getComponent(): component "${name}" not found.`)
    }

    return this.components.find((component) => component.name === name) as Component
  }

  /**
   * Gets a registered entity by name.
   * @param name -Name of the entity
   * @returns A entity or throws an error. 
   */
  getEntity(name: string): Entity {
    const hasEntity = this.hasEntity(name)

    if (!hasEntity) {
      throw new Error(`getEntity(): entity "${name}" not found.`)
    }

    return this.entities.find((entity) => entity.name === name) as Entity
  }

  /**
   * Gets all registered entities that match the given name.
   * @param name -Name of the entity
   * @returns An array of entities or an empty array.
   */
  getEntitiesByName(name: string): Entity[] {
    return this.entities.filter((entity) => entity.name === name)
  }

  /**
   * Checks if processor is registered by name.
   * @param name - Name of the processor
   * @returns true if found or false if not.
   */
  hasProcessor(name: string): boolean {
    let found = false
    
    for (let processor of this.processors) {
      if (processor.name === name) {
        found = true
      }
    }

    return found
  }

  /**
   * Checks if component is registered.
   * @param name - Name of the component
   * @returns true if found or false if not.
   */
  hasComponent(name: string): boolean {
    let found = false

    for (let component of this.components) {
      if (component.name === name) {
        found = true
      }
    }

    return found
  }

  /**
   * Checks if entity is registered.
   * @param name - Name of the entity
   * @returns true if found or false if not.
   */
  hasEntity(name: string): boolean {
    let found = false

    for (let entity of this.entities) {
      if (entity.name === name) {
        found = true
      }
    }

    return found
  }

  /**
   * Composes a entity with given components.
   * @param name - Name of the entity
   * @param components - An array of component names
   * @returns The composed entity or throws an error.
   */
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

      if (foundComponent.onAttach) {
        foundComponent.onAttach()
      }

      entity.state = Object.assign(entity.state, foundComponent.state)
    })

    return entity
  }

  /**
   * Checks if an entity has target component.
   * @param entity - entity object
   * @param component - Name of component
   * @returns true if entity has the component or false if not
   */
  entityHasComponent(entity: Entity, component: string): boolean {
    return entity.components.includes(component)
  }

  /**
   * Removes component from an entity.
   * @param entity - entity object
   * @param component - Name of component
   * @returns Void if operation successful or throw an error.
   */
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

  /**
   * Adds a component to an entity.
   * @param entity - entity object
   * @param component - Name of component
   * @returns Void if operation is successful or throws an error.
   */
  addComponentToEntity(entity: Entity, component: string): void {
    if (this.entityHasComponent(entity, component)) {
      throw new Error(`addComponentToEntity(): Can't add component ${component} - this entity already has this component.`)
    }

    const isComponentRegistered = this.hasComponent(component)

    if (!isComponentRegistered) {
      throw new Error(`addComponentToEntity(): You can't add component ${component} to entity ${entity}, because the component is not registered.`)
    }

    const targetComponent = this.getComponent(component)

    entity.state = Object.assign(entity.state, targetComponent.state ? targetComponent.state : {})
    entity.components.push(targetComponent.name)
  }

  /**
   * Adds a entity to the system.
   * @param entity - entity object
   * @returns Void if successful
   */
  addEntity(entity: Entity): void {
    this.entities.push(entity)
  }

  /**
   * Adds a component to the system.
   * @param component - component object
   * @returns Void if successful
   */
  addComponent(component: ComponentArgument): void {
    const passedComponent = component as Component
    passedComponent.state = component.state ? passedComponent.state : {}

    if (passedComponent.onAttach) {
      passedComponent.onAttach()
    }

    this.components.push(passedComponent)
  }

  /**
   * Adds a processor to the system.
   * @param processor - processor object
   * @returns Void if successful
   */
  addProcessor(processor: Processor): void {
    this.processors.push(processor)
  }

  /**
   * Removes an entity from the system.
   * @param entity - entity object
   * @returns Void if successful or throws an error.
   */
  removeEntity(entity: Entity): void {
    const indexOf = this.entities.indexOf(entity)

    if (indexOf === -1) {
      throw new Error(`removeEntity(): entity "${entity.name}" not found.`)
    }

    this.entities.splice(indexOf, 1)
  }

  /**
   * Gets all entities that have the target component registered.
   * @param componentName - Name of the component
   * @returns All entities in an array.
   */
  private getEntitiesFromComponent(componentName: string): Entity[] {
    return this.entities.filter(entity => {
      return entity.components.includes(componentName)
    })
  }

  /**
   * Runs all processors for it's corresponding components e.g. run the prcoessors update function.
   * @returns Void if successful
   */
  private runProcessors(): void {
    this.processors.forEach(processor => {
      const entities  = this.getEntitiesFromComponent(processor.target)
      const component = this.getComponent(processor.target)

      processor.update(component, entities)
    })
  }

  /**
   * Run custom logic of an entity e.g. run entity.update()
   * @returns Void if successful
   */
  private runCustomLogicOnEntities(): void {
    this.entities.forEach(entity => {
      if (entity.update) {
        entity.update()
      }
    })
  }

  /**
   * Runs all processors. This should be done per frame e.g. inside your gameloop.
   * @returns Void if successful
   */
  update(): void {
    this.runProcessors()
    this.runCustomLogicOnEntities()
  }
}