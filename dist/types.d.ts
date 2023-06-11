export type Component = {
    name: string;
    state: {
        [key: string]: any;
    };
    onAttach?: Function;
};
export type Processor = {
    name: string;
    required: string[];
    update(entity: Entity, components: Component[], processor: Processor): void;
};
export type Entity = {
    name: string;
    components: Component[];
    processors: Processor[];
};
/**
 * The Entity Component System class.
 */
export class EntityComponentSystem {
    /**
     * All registered components
     * @defaultValue []
     */
    components: Component[];
    /**
     * All registered processors
     * @defaultValue []
     */
    processors: Processor[];
    /**
     * All registered entities
     * @defaultValue []
     */
    entities: Entity[];
    constructor();
    /**
     * Gets all registered processors.
     * @returns All registered processors in an array.
     */
    getProcessors(): Processor[];
    /**
     * Gets all components processors.
     * @returns All registered components in an array.
     */
    getComponents(): Component[];
    /**
     * Gets all registered entities.
     * @returns All registered entities in an array.
     */
    getEntities(): Entity[];
    /**
     * Gets a registered processor by name.
     * @param name - Name of the processor
     * @returns A processor or throws an error.
     */
    getProcessor(name: string): Processor;
    /**
     * Gets a registered component by name.
     * @param name - Name of the component
     * @returns A component or throws an error.
     */
    getComponent(name: string): Component;
    /**
     * Gets a registered entity by name.
     * @param name -Name of the entity
     * @returns A entity or throws an error.
     */
    getEntity(name: string): Entity;
    /**
     * Gets all registered entities that match the given name.
     * @param name -Name of the entity
     * @returns An array of entities or an empty array.
     */
    getEntitiesByName(name: string): Entity[];
    getEntityComponents(entity: Entity, components: string[]): Component[];
    /**
     * Checks if processor is registered by name.
     * @param name - Name of the processor
     * @returns true if found or false if not.
     */
    hasProcessor(name: string): boolean;
    /**
     * Checks if component is registered.
     * @param name - Name of the component
     * @returns true if found or false if not.
     */
    hasComponent(name: string): boolean;
    /**
     * Checks if entity is registered.
     * @param name - Name of the entity
     * @returns true if found or false if not.
     */
    hasEntity(name: string): boolean;
    /**
     * Composes a entity with given components.
     * @param name - Name of the entity
     * @param components - An array of component names
     * @param processors - An array of processor names
     * @returns The composed entity or throws an error.
     */
    createEntity(name: string, components: string[], processors: string[]): Entity;
    /**
     * Checks if an entity has target component.
     * @param entity - entity object
     * @param component - Name of component
     * @returns true if entity has the component or false if not
     */
    entityHasComponent(entity: Entity, component: string): boolean;
    /**
     * Checks if an entity has target processor.
     * @param entity - entity object
     * @param processor - Name of processor
     * @returns true if entity has the processor or false if not
     */
    entityHasProcessor(entity: Entity, processor: string): boolean;
    /**
     * Removes a component from an entity.
     * @param entity - entity object
     * @param component - Name of component
     * @returns Void if operation successful or throw an error.
     */
    removeComponentFromEntity(entity: Entity, component: string): void;
    /**
     * Removes processor from an entity.
     * @param entity - entity object
     * @param processor - Name of processor
     * @returns Void if operation successful or throws an error.
     */
    removeProcessorFromEntity(entity: Entity, processor: string): void;
    /**
     * Adds a component to an entity.
     * @param entity - entity object
     * @param component - Name of component
     * @returns Void if operation is successful or throws an error.
     */
    addComponentToEntity(entity: Entity, component: string): void;
    /**
     * Adds a processor to an entity.
     * @param entity - entity object
     * @param processor - Name of processor
     * @returns Void if operation is successful or throws an error.
     */
    addProcessorToEntity(entity: Entity, processor: string): void;
    /**
     * Adds a entity to the system.
     * @param entity - entity object
     * @returns Void if successful
     */
    addEntity(entity: Entity): void;
    /**
     * Adds a component to the system.
     * @param component - component object
     * @returns Void if successful
     */
    addComponent(component: Component): void;
    /**
     * Adds a processor to the system.
     * @param processor - processor object
     * @returns Void if successful
     */
    addProcessor(processor: Processor): void;
    /**
     * Removes an entity from the system.
     * @param entity - entity object
     * @returns Void if successful or throws an error.
     */
    removeEntity(entity: Entity): void;
    /**
     * Removes all entities from the system.
     * @returns void
     */
    removeAllEntities(): void;
    /**
     * Runs all processors. This should be done per frame e.g. inside your gameloop.
     * @returns Void if successful
     */
    update(): void;
}

//# sourceMappingURL=types.d.ts.map
