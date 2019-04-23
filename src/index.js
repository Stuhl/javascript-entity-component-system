class EntityComponentSystem {
  constructor() {
    this.components = []
    this.processors = []
    this.entities = []
  }

  getProcessorNames() {
    return this.processors.map(processor => processor.name)
  }

  hasProcessor(processorName) {
    return this.processors.find(processor => processor.name === processorName)
  }

  hasComponent(componentName) {
    return this.components.find(component => component.name === componentName)
  }

  hasEntity(entityName) {
    return this.entities.find(entity => entity.name === entityName)
  }

  createEntity(name, components) {
    let entity = {name, components}

    components.forEach(component => {
      const componentObject = this.components.find(ecsComponent => component === ecsComponent.name)
      entity = Object.assign(entity, componentObject.state)
    })
    return entity
  }

  entityHasComponent(entity, componentName) {
    return entity.components.includes(componentName)
  }

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

  addComponentToEntity(entity, component) {
    if (ECS.entityHasComponent(entity, component.name)) {
      return
    }
    entity = Object.assign(entity, component.state ? component.state : {})
    entity.components.push(component.name)
  }

  addEntity(entity) {
    this.entities.push(entity)
  }

  addComponent(component) {
    this.components.push(component)
  }

  addProcessor(processor) {
    this.processors.push(processor)
  }

  getEntitiesFromComponent(componentName) {
    return this.entities.filter(entity => {
      return entity.components.includes(componentName)
    })
  }

  getComponent(componentName) {
    return this.components.find(component => componentName === component.name)
  }

  runProcessors() {
    this.processors.forEach(processor => {
      const entities = this.getEntitiesFromComponent(processor.component)
      const component = this.getComponent(processor.component)
      processor.update(component, entities)
    })
  }

  runCustomLogicOnEntities() {
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

module.exports = EntityComponentSystem
