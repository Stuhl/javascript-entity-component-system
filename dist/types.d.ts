export type Component = {
    name: string;
    state: object;
    onAttach?: Function;
    onDetach?: Function;
};
export type ComponentArgument = {
    name: string;
    state?: object;
};
export type Processor = {
    name: string;
    target: string;
    update(component: Component, entities: Entity[]): void;
};
export type Entity = {
    name: string;
    components: string[];
    state: {
        [key: string]: any;
    };
    update?: Function;
};
/**
 * The Entity Component System class.
 */
export default class EntityComponentSystem {
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
    * Gets registered processor names.
    * @returns All registered processor names in an array.
    */
    getProcessorNames(): string[];
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
     * @returnsA A entity or throws an error.
     */
    getEntity(name: string): Component;
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
     * @returns The composed entity or throws an error.
     */
    createEntity(name: string, components: string[]): Entity;
    /**
     * Checks if an entity has target component.
     * @param entity - entity object
     * @param component - Name of component
     * @returns true if entity has the component or false if not
     */
    entityHasComponent(entity: Entity, component: string): boolean;
    /**
     * Removes component from an entity.
     * @param entity - entity object
     * @param component - Name of component
     * @returns Void if operation successful or throw an error.
     */
    removeComponentFromEntity(entity: Entity, targetComponent: string): void;
    /**
     * Adds a component to an entity.
     * @param entity - entity object
     * @param component - Name of component
     * @returns Void if operation is successful or throws an error.
     */
    addComponentToEntity(entity: Entity, component: string): void;
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
    addComponent(component: ComponentArgument): void;
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
     * Runs all processors. This should be done per frame e.g. inside your gameloop.
     * @returns Void if successful
     */
    update(): void;
}

//# sourceMappingURL=types.d.ts.map
