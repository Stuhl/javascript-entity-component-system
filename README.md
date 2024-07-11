# Entity Component System for Javascript
[![npm version](https://badgen.net/badge/npm/v2.0.0/blue)](https://www.npmjs.com/package/javascript-entity-component-system)
[![npm downloads](https://badgen.net/badge/downloads/100%20%2F%20week/green)](https://www.npmjs.com/package/javascript-entity-component-system)

JECS (javascript-entity-component-system) is a easy to use [Entity Component System](https://en.wikipedia.org/wiki/Entity_component_system) for JavaScript. JECS will help you to easier develop your games by making composable pieces of code, mixing and remixing them with entities to your liking.

## Installation
```
npm i javascript-entity-component-system
```

## Features
- ⚡ **Simple API** - JECS has a very simple and easy to use API with a mix of object-oriented and prodecural style of methods. 
- 🥤 **No Dependencies** - JECS is built with TypeScript and compiled to JavaScript without the need of any external libraries. The source code is only ~400 lines long.
- 💾 **Lightweight** - JECS is a lightweight library. The minified version sits at 3.80kb.
- 🤝 **TypeScript support** - JECS is built and is best used with TypeScript. Type defintions and hinting are provided naturally.
- 📄 **Documentation** - JECS has documentation for every method and often examples on how to use them.

## Getting started
In essence it works like this:
1. You write components and processors and register them in the system.
2. You compose entities and register those in the system.
3. You call the libraries update function ```ECS.update()``` in your gameloop.
4. Profit

### Import the Module
ES Modules / TypeScript
```TypeScript
import {EntityComponentSystem} from "javascript-entity-component-system" // CLASS
import {Component, Entity, Processor} from "javascript-entity-component-system" // TYPES

const ECS = new EntityComponentSystem()
```

CommonJS / JavaScript
```JavaScript
const {EntityComponentSystem} = require("javascript-entity-component-system") // CLASS

const ECS = new EntityComponentSystem()
```

### Step 1: Components and Processors
#### Components
Let's start with **components**. Components are basically just containers with data. In Computer Science terms we call those ```Data Structures```. This is the basic structure:
```TypeScript
const PositionComponent: Component = {
  name: "position",
  state: {
    x: 0,
    y: 0
  }
}
```

```TypeScript
const physicsComponent: Component = {
  name          : "physics",
  state: {
    accelerationX : 0.1,
    accelerationY : 0.2,
    velocityX     : 0,
    velocityY     : 0
  }
}
```

The name property is **required**. It will define the name of the component and is important because processor will use it to check if an entity has the required component.

The state property is **required** too. However, sometimes you don't need any state. In that case you just put in an empty object:
```TypeScript
const OnDeathFadeComponent: Component = {
  name: "on_death_fade",
  state: {}
}
```

It works the same way as with state, except your processor won't have any data to use. Sometimes that's enough for a processor to do it's job. This is uncommon though.

#### Processors
Now that we have components defined, we can get on to **Processors**.
The structure of them is similar:
```TypeScript
const GravityProcessor: Processor = {
  name: "gravity_processor",
  required: ["position", "mass"],
  update(entity: Entity, components: Component[], processor: Processor) {
    // This will be called for every entity that has a position and mass component
  }
}
```

All properties are **required**. The first one is the name of the processor and the second one are the required components this processor will need. In this case it needs a ```position``` and ```mass``` component.

The third property is the update function, that's where all the logic will happen. This function will be called automagically for every entity that has a ```position``` and ```mass``` component attached. This is very nice because you can focus solely on the logic:
```TypeScript
update(entity: Entity, components: Component[], processor: Processor) {
  const [position, mass] = components // The components hold the state of the entity -> change those!

  const gravity = 2 // Arbitrary gravity force
  const result = mass.state.mass * gravity

  mass.state.velocityY += result
  position.state.y += mass.state.velocityY

}
```

This processor will calculate the gravity force using the entities mass and apply that to it's velocity. To update it's position, we will then add the velocity to it's y position, resulting the entity to move down a bit. This function will be called every frame (inside your gameloop) e.g. it will look like gravity is pulling down on this entity.

#### Register components and processors
Before we can compose entities we need to register the components and processors in the system:

```TypeScript
// Register Component
ECS.addComponent(PositionComponent)
ECS.addComponent(MassComponent)

// Register Processor
ECS.addProcessor(GravityProcessor)
```

### Step 2: Entities
So after we registered our components and processors, we can now compose our entity:

```TypeScript
const Player: Entity = ECS.createEntity("Player", ["position", "physics"], ["gravity_processor"])
```

After that you register it in the system:
```TypeScript
ECS.addEntity(Player)
```

#### Step 3: Let the magic happen
You're soo close. Call the update function ```ECS.update()``` inside the gameloop.
```TypeScript
// You should do this every frame. preferably inside your gameloop.
ECS.update()
```

### What's next?
Well the only thing you have to worry about now is to make more components and processors that act upon them.

In a ECS, components and processors are your bread and butter. You write those to have effects on your entities. It's starts to become real fun when you realize that you can mix and match components and processors to your liking. This flexiblity is the real strength of an ECS. That's why it's such a often used pattern in game development. Enjoy :)

## Documentation
[Docs](https://stuhl.github.io/javascript-entity-component-system/docs)

## Roadmap
- v2.1.0
    - Implement .freeze() and .unfreeze() to make one-time effects possible
    - Better error handling

## Live Examples

You can see the ECS in action at the [Sessionless website](https://sessionless.org), and you can checkout that code in that [website's repo](https://www.github.com/planet-nine-app/sessionless-dot-org). 
There are flames and balloons :).
