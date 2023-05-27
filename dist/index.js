var t,e,n,o,s;t=module.exports,Object.defineProperty(t,"__esModule",{value:!0,configurable:!0}),e=module.exports,n="default",o=()=>r,Object.defineProperty(e,n,{get:o,set:s,enumerable:!0,configurable:!0});class r{constructor(){this.components=[],this.processors=[],this.entities=[]}getProcessorNames(){return this.processors.map((t=>t.name))}getProcessors(){return this.processors}getComponents(){return this.components}getEntities(){return this.entities}getProcessor(t){if(!this.hasProcessor(t))throw new Error(`getProcessor(): processor "${t}" not found.`);return this.processors.find((e=>e.name===t))}getComponent(t){if(!this.hasComponent(t))throw new Error(`getComponent(): component "${t}" not found.`);return this.components.find((e=>e.name===t))}getEntity(t){if(!this.hasEntity(t))throw new Error(`getEntity(): entity "${t}" not found.`);return this.entities.find((e=>e.name===t))}hasProcessor(t){let e=!1;for(let n of this.processors)n.name===t&&(e=!0);return e}hasComponent(t){let e=!1;for(let n of this.components)n.name===t&&(e=!0);return e}hasEntity(t){let e=!1;for(let n of this.entities)n.name===t&&(e=!0);return e}createEntity(t,e){let n={name:t,components:e,state:{}};return e.forEach((t=>{const e=this.components.find((e=>t===e.name));if(!e)throw new Error(`createEntity(): component ${t} not found. You probably forgot to register the component in the system.`);n.state=Object.assign(n.state,e.state)})),n}entityHasComponent(t,e){return t.components.includes(e)}removeComponentFromEntity(t,e){if(-1===t.components.indexOf(e))throw new Error(`removeComponentFromEntity(): component ${e} not found in entity ${t.name}`);t.components=t.components.filter((t=>t!==e));const n=this.getComponent(e);Object.keys(n.state).forEach((e=>{delete t[e]}))}addComponentToEntity(t,e){if(this.entityHasComponent(t,e))throw new Error(`addComponentToEntity(): Can't add component ${e} - this entity already has this component.`);if(!this.hasComponent(e))throw new Error(`addComponentToEntity(): You can't add component ${e} to entity ${t}, because the component is not registered.`);const n=this.getComponent(e);(t=Object.assign(t,n.state?n.state:{})).components.push(n.name)}addEntity(t){this.entities.push(t)}addComponent(t){const e=t;e.state=t.state?e.state:{},e.onAttach&&e.onAttach(),this.components.push(e)}addProcessor(t){this.processors.push(t)}removeEntity(t){const e=this.entities.indexOf(t);if(-1===e)throw new Error(`removeEntity(): entity "${t.name}" not found.`);this.entities.splice(e,1)}getEntitiesFromComponent(t){return this.entities.filter((e=>e.components.includes(t)))}runProcessors(){this.processors.forEach((t=>{const e=this.getEntitiesFromComponent(t.target),n=this.getComponent(t.target);t.update(n,e)}))}runCustomLogicOnEntities(){this.entities.forEach((t=>{t.update&&t.update()}))}update(){this.runProcessors(),this.runCustomLogicOnEntities()}}
//# sourceMappingURL=index.js.map
