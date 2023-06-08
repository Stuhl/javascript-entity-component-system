export type Component = {
  name     : string
  state    : {
    [key: string]: any
  }
  onAttach?: Function
}

export type Processor = {
  name    : string
  required: string[]
  update(entity: Entity, components: Component[], processor: Processor): void
}

export type Entity = {
  name      : string
  components: Component[]
  processors: Processor[]
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
  entities: Entity[]

  constructor() {
    this.components = []
    this.processors = []
    this.entities   = []
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

  getEntityComponents(entity: Entity, components: string[]): Component[] {
    const foundComponents = []
    const length          = entity.components.length

    for (let currentComponent of components) {
      for (let i = 0; i < length; i++) {
        const currentEntityComponent = entity.components[i]

        if (currentEntityComponent.name === currentComponent) {
          foundComponents.push(currentEntityComponent)
        }
      }
    }

    return foundComponents
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
  createEntity(name: string, components: string[], processors: string[]): Entity {
    let entity = {
      name,
      components: [],
      processors: []
    }

    components.forEach(componentName => {
      const foundComponent = this.getComponent(componentName)
      const copy           = JSON.parse(JSON.stringify(foundComponent))

      if (copy.onAttach) {
        foundComponent.onAttach()
      }

      entity.components.push(copy)
    })

    processors.forEach(processorName => {
      const foundProcessor = this.getProcessor(processorName)

      entity.processors.push(foundProcessor)
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
    const length = entity.components.length

    for (let i = 0; i < length; i++) {
      if (entity.components[i].name === component) {
        return true
      }
    }

    return false
  }

  entityHasProcessor(entity: Entity, processor: string): boolean {
    const length = entity.processors.length

    for (let i = 0; i < length; i++) {
      if (entity.processors[i].name === processor) {
        return true
      }
    }

    return false
  }

  /**
   * Removes component from an entity.
   * @param entity - entity object
   * @param component - Name of component
   * @returns Void if operation successful or throw an error.
   */
  removeComponentFromEntity(entity: Entity, component: string): void {
    if (!this.entityHasComponent(entity, component)) {
      throw new Error(`removeComponentFromEntity(): component ${component} not found in entity ${entity.name}`)
    }

    let index = null
    const length = entity.components.length

    for (let i = 0; i < length; i++) {
      if (entity.components[i].name === component) {
        index = i
        break
      }
    }

    entity.components.splice(index, 1)
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

    if (!this.hasComponent(component)) {
      throw new Error(`addComponentToEntity(): You can't add component ${component} to entity ${entity}, because the component is not registered.`)
    }

    entity.components.push(this.getComponent(component))
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
  addComponent<State>(component: Component): void {
    const passedComponent = component as Component

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
    const length = this.entities.length

    for (let i = 0; i < length; i++) {
      if (this.entities[i] === entity) {
        this.entities.splice(i, 1)
        return
      }
    }

    throw new Error(`removeEntity(): entity "${entity.name}" not found.`)
  }

  /**
   * Gets all entities that have the target component registered.
   * @param componentName - Name of the component
   * @returns All entities in an array.
   */
  private getEntitiesFromRequiredComponents(components: string[]): Entity[] {
    const entities = []
    let entitiesAmount = this.entities.length

    for (let i = 0; i < entitiesAmount; i++) {
      const currentEntity = this.entities[i]
      let hasAllComponents = true

      for (let j = 0; j < components.length; j++) {
        const currentComponent = components[j]
        
        if (!this.entityHasComponent(currentEntity, currentComponent)) {
          hasAllComponents = false
          break
        }
      }

      if (hasAllComponents) {
        entities.push(currentEntity)
      }
    }

    return entities
  }


  /**
   * Runs all processors for it's corresponding components e.g. run the prcoessors update function.
   * @returns Void if successful
   */
  private runProcessors(): void {
    this.processors.forEach(processor => {
      const entities     = this.getEntitiesFromRequiredComponents(processor.required)
      const entityAmount = entities.length

      for (let i = 0; i < entityAmount; i++) {
        const currentEntity = entities[i]
        const hasProcessor  = this.entityHasProcessor(currentEntity, processor.name)

        if (hasProcessor) {
          const components = this.getEntityComponents(currentEntity, processor.required)
          processor.update(currentEntity, components, processor)
        }
      }
    })
  }

  /**
   * Runs all processors. This should be done per frame e.g. inside your gameloop.
   * @returns Void if successful
   */
  update(): void {
    this.runProcessors()
  }
}