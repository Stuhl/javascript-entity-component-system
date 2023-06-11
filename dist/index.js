function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "EntityComponentSystem", () => $882b6d93070905b3$export$7403e50fa4958270);
class $882b6d93070905b3$export$7403e50fa4958270 {
    constructor(){
        this.components = [];
        this.processors = [];
        this.entities = [];
    }
    /**
   * Gets all registered processors.
   * @returns All registered processors in an array.
   */ getProcessors() {
        return this.processors;
    }
    /**
   * Gets all components processors.
   * @returns All registered components in an array.
   */ getComponents() {
        return this.components;
    }
    /**
   * Gets all registered entities.
   * @returns All registered entities in an array.
   */ getEntities() {
        return this.entities;
    }
    /**
   * Gets a registered processor by name.
   * @param name - Name of the processor
   * @returns A processor or throws an error.
   */ getProcessor(name) {
        const hasProcessor = this.hasProcessor(name);
        if (!hasProcessor) throw new Error(`getProcessor(): processor "${name}" not found.`);
        return this.processors.find((processor)=>processor.name === name);
    }
    /**
   * Gets a registered component by name.
   * @param name - Name of the component
   * @returns A component or throws an error.
   */ getComponent(name) {
        const hasComponent = this.hasComponent(name);
        if (!hasComponent) throw new Error(`getComponent(): component "${name}" not found.`);
        return this.components.find((component)=>component.name === name);
    }
    /**
   * Gets a registered entity by name.
   * @param name -Name of the entity
   * @returns A entity or throws an error. 
   */ getEntity(name) {
        const hasEntity = this.hasEntity(name);
        if (!hasEntity) throw new Error(`getEntity(): entity "${name}" not found.`);
        return this.entities.find((entity)=>entity.name === name);
    }
    /**
   * Gets all registered entities that match the given name.
   * @param name -Name of the entity
   * @returns An array of entities or an empty array.
   */ getEntitiesByName(name) {
        const entities = [];
        const length = this.entities.length;
        for(let i = 0; i < length; i++){
            const currentEntity = this.entities[i];
            if (currentEntity.name === name) entities.push(currentEntity);
        }
        return entities;
    }
    getEntityComponents(entity, components) {
        const foundComponents = [];
        const length = entity.components.length;
        for (let currentComponent of components)for(let i = 0; i < length; i++){
            const currentEntityComponent = entity.components[i];
            if (currentEntityComponent.name === currentComponent) foundComponents.push(currentEntityComponent);
        }
        return foundComponents;
    }
    /**
   * Checks if processor is registered by name.
   * @param name - Name of the processor
   * @returns true if found or false if not.
   */ hasProcessor(name) {
        let found = false;
        for (let processor of this.processors)if (processor.name === name) found = true;
        return found;
    }
    /**
   * Checks if component is registered.
   * @param name - Name of the component
   * @returns true if found or false if not.
   */ hasComponent(name) {
        let found = false;
        for (let component of this.components)if (component.name === name) found = true;
        return found;
    }
    /**
   * Checks if entity is registered.
   * @param name - Name of the entity
   * @returns true if found or false if not.
   */ hasEntity(name) {
        let found = false;
        for (let entity of this.entities)if (entity.name === name) found = true;
        return found;
    }
    /**
   * Composes a entity with given components.
   * @param name - Name of the entity
   * @param components - An array of component names
   * @param processors - An array of processor names
   * @returns The composed entity or throws an error.
   */ createEntity(name, components, processors) {
        const entityName = name;
        const allComponents = [];
        const allProcessors = [];
        components.forEach((componentName)=>{
            const foundComponent = this.getComponent(componentName);
            const copy = JSON.parse(JSON.stringify(foundComponent));
            if (copy.onAttach) foundComponent.onAttach();
            allComponents.push(copy);
        });
        processors.forEach((processorName)=>{
            const foundProcessor = this.getProcessor(processorName);
            allProcessors.push(foundProcessor);
        });
        return {
            name: entityName,
            components: allComponents,
            processors: allProcessors
        };
    }
    /**
   * Checks if an entity has target component.
   * @param entity - entity object
   * @param component - Name of component
   * @returns true if entity has the component or false if not
   */ entityHasComponent(entity, component) {
        const length = entity.components.length;
        for(let i = 0; i < length; i++){
            if (entity.components[i].name === component) return true;
        }
        return false;
    }
    /**
   * Checks if an entity has target processor.
   * @param entity - entity object
   * @param processor - Name of processor
   * @returns true if entity has the processor or false if not
   */ entityHasProcessor(entity, processor) {
        const length = entity.processors.length;
        for(let i = 0; i < length; i++){
            if (entity.processors[i].name === processor) return true;
        }
        return false;
    }
    /**
   * Removes a component from an entity.
   * @param entity - entity object
   * @param component - Name of component
   * @returns Void if operation successful or throw an error.
   */ removeComponentFromEntity(entity, component) {
        if (!this.entityHasComponent(entity, component)) throw new Error(`removeComponentFromEntity(): component ${component} not found in entity ${entity.name}`);
        let index = null;
        const length = entity.components.length;
        for(let i = 0; i < length; i++)if (entity.components[i].name === component) {
            index = i;
            break;
        }
        entity.components.splice(index, 1);
    }
    /**
   * Removes processor from an entity.
   * @param entity - entity object
   * @param processor - Name of processor
   * @returns Void if operation successful or throws an error.
   */ removeProcessorFromEntity(entity, processor) {
        if (!this.entityHasProcessor(entity, processor)) throw new Error(`removeProcessorFromEntity(): Processor ${processor} not found in entity ${entity.name}`);
        let index = null;
        const length = entity.processors.length;
        for(let i = 0; i < length; i++)if (entity.processors[i].name === processor) {
            index = i;
            break;
        }
        entity.processors.splice(index, 1);
    }
    /**
   * Adds a component to an entity.
   * @param entity - entity object
   * @param component - Name of component
   * @returns Void if operation is successful or throws an error.
   */ addComponentToEntity(entity, component) {
        if (this.entityHasComponent(entity, component)) throw new Error(`addComponentToEntity(): Can't add component ${component} - this entity already has this component.`);
        if (!this.hasComponent(component)) throw new Error(`addComponentToEntity(): You can't add component ${component} to entity ${entity.name}, because the component is not registered.`);
        entity.components.push(this.getComponent(component));
    }
    /**
   * Adds a processor to an entity.
   * @param entity - entity object
   * @param processor - Name of processor
   * @returns Void if operation is successful or throws an error.
   */ addProcessorToEntity(entity, processor) {
        if (this.entityHasProcessor(entity, processor)) throw new Error(`addProcessorToEntity(): Can't add processor ${processor} - this entity already this processor.`);
        if (!this.hasProcessor(processor)) throw new Error(`addProcessorToEntity(): You can't add processor ${processor} to entity ${entity.name}, because the processor is not registerd.`);
        entity.processors.push(this.getProcessor(processor));
    }
    /**
   * Adds a entity to the system.
   * @param entity - entity object
   * @returns Void if successful
   */ addEntity(entity) {
        this.entities.push(entity);
    }
    /**
   * Adds a component to the system.
   * @param component - component object
   * @returns Void if successful
   */ addComponent(component) {
        const passedComponent = component;
        if (passedComponent.onAttach) passedComponent.onAttach();
        this.components.push(passedComponent);
    }
    /**
   * Adds a processor to the system.
   * @param processor - processor object
   * @returns Void if successful
   */ addProcessor(processor) {
        this.processors.push(processor);
    }
    /**
   * Removes an entity from the system.
   * @param entity - entity object
   * @returns Void if successful or throws an error.
   */ removeEntity(entity) {
        const length = this.entities.length;
        for(let i = 0; i < length; i++)if (this.entities[i] === entity) {
            this.entities.splice(i, 1);
            return;
        }
        throw new Error(`removeEntity(): entity "${entity.name}" not found.`);
    }
    /**
   * Removes all entities from the system.
   * @returns void
   */ removeAllEntities() {
        this.entities = [];
    }
    /**
   * Gets all entities that have the target component registered.
   * @param componentName - Name of the component
   * @returns All entities in an array.
   */ getEntitiesFromRequiredComponents(components) {
        const entities = [];
        let entitiesAmount = this.entities.length;
        for(let i = 0; i < entitiesAmount; i++){
            const currentEntity = this.entities[i];
            let hasAllComponents = true;
            for(let j = 0; j < components.length; j++){
                const currentComponent = components[j];
                if (!this.entityHasComponent(currentEntity, currentComponent)) {
                    hasAllComponents = false;
                    break;
                }
            }
            if (hasAllComponents) entities.push(currentEntity);
        }
        return entities;
    }
    /**
   * Runs all processors for it's corresponding components e.g. run the prcoessors update function.
   * @returns Void if successful
   */ runProcessors() {
        this.processors.forEach((processor)=>{
            const entities = this.getEntitiesFromRequiredComponents(processor.required);
            const entityAmount = entities.length;
            for(let i = 0; i < entityAmount; i++){
                const currentEntity = entities[i];
                const hasProcessor = this.entityHasProcessor(currentEntity, processor.name);
                if (hasProcessor) {
                    const components = this.getEntityComponents(currentEntity, processor.required);
                    processor.update(currentEntity, components, processor);
                }
            }
        });
    }
    /**
   * Runs all processors. This should be done per frame e.g. inside your gameloop.
   * @returns Void if successful
   */ update() {
        this.runProcessors();
    }
}


//# sourceMappingURL=index.js.map
