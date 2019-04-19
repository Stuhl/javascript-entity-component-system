class EntityComponentSystem {
  constructor() {
    this.components = []
    this.processors = []
    this.entities = []
  }

  displayProcessors() {
    this.processors.forEach(processor => console.log(processor.name))
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

  getEntitiesFromComponent(component) {
    return this.entities.filter(entity => {
      return entity.components.includes(component)
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

export default EntityComponentSystem
