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
