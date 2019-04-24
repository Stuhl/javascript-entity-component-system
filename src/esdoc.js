/**
 * Entity Component System Class
 */
export class EntityComponentSystem {
  constructor() {
    /**
     * Property where all the components are stored
     * @access private
     * @type {Array}
     */
    this.components = []
    /**
     * Property where all the processors are stored
     * @access private
     * @type {Array}
     */
    this.processors = []
    /**
     * Property where all the entites are stored
     * @access private
     * @type {Array}
     */
    this.entities = []
  }

  /**
   * Gets all Processor names
   * @returns {Array} Processor Names as String
   */
  getProcessorNames() {
    return this.processors.map(processor => processor.name)
  }

  /**
   * Gets all Processors
   * @returns {[]Object} All registered Processors
   */
  getProcessors() {
    return this.processors
  }

  /**
   * Gets all Components
   * @returns {[]Object} All registered Components
   */
  getComponents() {
    return this.components
  }

  /**
   * Gets all Entities
   * @returns {[]Object} All registered Entities
   */
  getEntities() {
    return this.entities
  }

  /**
   * Checks if System has specified Processor
   * @param {String} processorName Name of the Processor
   * @returns {Boolean} true/false
   */
  hasProcessor(processorName) {
    return this.processors.find(processor => processor.name === processorName)
  }

   /**
   * Checks if System has specified Component
   * @param {String} componentName Name of the Component
   * @returns {Boolean} true/false
   */
  hasComponent(componentName) {
    return this.components.find(component => component.name === componentName)
  }

  /**
   * Checks if System has specified Entity
   * @param {String} entityName Name of the Entity
   * @returns {Boolean} true/false
   */
  hasEntity(entityName) {
    return this.entities.find(entity => entity.name === entityName)
  }

  /**
   * Compose method to compose a Entity out of components
   * @param {String} entityName Name of the Entity
   * @param {[]String} components Name of the components
   * @returns {Object} Entity
   */
  createEntity(name, components) {
    let entity = {name, components}

    components.forEach(component => {
      const componentObject = this.components.find(ecsComponent => component === ecsComponent.name)
      entity = Object.assign(entity, componentObject.state)
    })
    return entity
  }

  /**
   * Checks if Entity has the specified Component
   * @param {Object} entity the Entity you want to check on
   * @param {String} componentName Name of the component
   * @returns {Boolean} true/false
   */
  entityHasComponent(entity, componentName) {
    return entity.components.includes(componentName)
  }

  /**
   * Removes a component from a Entity
   * @param {Object} entity the Entity you want the component to remove from
   * @param {String} componentName Name of the component
   * @returns {void} Mutates the given Entity
   */
  removeComponentFromEntity(entity, componentName) {
    const indexOfComponent = entity.components.indexOf(componentName)
    if (indexOfComponent === -1) {
      throw new Error("Component not found on entity")
    } else {
      entity.components = entity.components.filter(component => component !== componentName)
      const component = ECS.getComponent(componentName)
      const keys = Object.keys(component.state)

      keys.forEach(key => {
        delete entity[key]
      })
    }
  }

  /**
   * Adds a component to a Entity
   * @param {Object} entity the Entity you want to add the component on
   * @param {Object} component The component you want to add
   * @returns {void} Mutates given Entity
   */
  addComponentToEntity(entity, component) {
    if (ECS.entityHasComponent(entity, component.name)) {
      return
    }
    entity = Object.assign(entity, component.state ? component.state : {})
    entity.components.push(component.name)
  }

  /**
   * Add Entity to System
   * @param {Object} entity The Entity you want to register in the system
   * @returns {void}
   */
  addEntity(entity) {
    this.entities.push(entity)
  }

  /**
   * Add Component to System
   * @param {Object} component The Component you want to register in the system
   * @returns {void}
   */
  addComponent(component) {
    this.components.push(component)
  }

  /**
   * Add Processor to System
   * @param {Object} processor The Processor you want to register in the system
   * @returns {void}
   */
  addProcessor(processor) {
    this.processors.push(processor)
  }

  /**
   * @access private
   */
  getEntitiesFromComponent(componentName) {
    return this.entities.filter(entity => {
      return entity.components.includes(componentName)
    })
  }

  /**
   * Get specific component from the system
   * @param {String} componentName the component name
   * @returns {Object} The Component
   */
  getComponent(componentName) {
    return this.components.find(component => componentName === component.name)
  }

  /**
   * Get specific processor from the system
   * @param {String} processorName the processor name
   * @returns {Object} The Processor
   */
  getProcessor(processorName) {
    return this.processors.find(proc => processorName === proc.name)
  }

  /**
   * Get specific entity from the system
   * @param {String} entityName the entities name
   * @returns {Object} The Entity
   */
  getEntity(entityName) {
    return this.entities.find(entity => entityName === entity.name)
  }

  /**
   * @access private
   */
  runProcessors() {
    this.processors.forEach(processor => {
      const entities = this.getEntitiesFromComponent(processor.component)
      const component = this.getComponent(processor.component)
      processor.update(component, entities)
    })
  }

  /**
   * @access private
   */
  runCustomLogicOnEntities() {
    this.entities.forEach(entity => {
      if (entity.update) {
        entity.update()
      }
    })
  }

  /**
   * Update function that updates every entity within the system. This should be called every frame (preferrably inside the game loop)
   * @return {void}
   */
  update() {
    this.runProcessors()
    this.runCustomLogicOnEntities()
  }
}
