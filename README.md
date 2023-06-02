# Entity Component System for Javascript
[![npm version](https://badgen.net/badge/npm/v1.0.1/blue)](https://www.npmjs.com/package/javascript-entity-component-system)
[![npm downloads](https://badgen.net/badge/downloads/100%20%2F%20week/green)](https://www.npmjs.com/package/javascript-entity-component-system)

JECS (javascript-entity-component-system) is a easy to use [Entity Component System](https://en.wikipedia.org/wiki/Entity_component_system) for JavaScript. JECS will help you to easier develop your games by making composable pieces of code, mixing and remixing them with entities to your liking.

## Installation
```
npm i javascript-entity-component-system
```

## Features
- ⚡ **Simple API** - JECS has a very simple and easy to use API with a mix of object-oriented and prodecural type of methods. 
- 🥤 **No Dependencies** - JECS is built with TypeScript and compiled to JavaScript without the need of any external libraries. The source code is only ~250 lines long.
- 💾 **Lightweight** - JECS is a lightweight library. The minified version sits at 2.80kb.
- 🤝 **TypeScript support** - JECS is built and is best used with TypeScript. Type defintions and hinting are provided naturally.
- 📄 **Documentation** - JECS has documentation for every method and often examples on how to use them.

## Live Demo
[JS BIN](https://jsbin.com/bunetigumo/edit?html,output)

## Getting started
In essence it works like this:
1. You write components and processors and register them in the system.
2. You compose entities and register those in the system.
4. You call the libraries update function ```ECS.update()``` in your gameloop.
5. Profit

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
Let's start with **components**. Components are basically just containers with data. This is the basic structure:
```JavaScript
const PositionComponent = {
  name: "Position",
  state: {
    x: 0,
    y: 0
  }
}
```

The name property is **required**. It will define the name of the component and is important because it's an identifier for processors.
The state property however is **not required**. That's useful if you want to mark entities:
```JavaScript
const GravityComponent = {
  name: "Gravity"
}
```

It works the same way as with state, except your processor won't have any data to use. Sometimes that's enough for a processor to do it's job. Don't worry if this doesn't make much sense yet, keep reading.

#### Processors

Now that we have a component defined, we can get on to **Processors**.
The structure of them is similar:
```JavaScript
const PullDownProcessor = {
  name: "PullDown",
  target: "Gravity",
  update(component, entities) {
    entities.forEach(entity => {
      // Do something on those entities
    })
  }
}
```

All properties are **required**. The first one is the name of the processor and the second one is the component it should act upon. The third property is the update function, that's where the logic happens.

That function will be called every frame. For example in this case this processor corresponds to the "Gravity" component. That means that this processor has to pull (hence the name) entities down to earth.

This could be done like so:
```JavaScript
update(component, entities) {
    entities.forEach(entity => {
      if (ECS.entityHasComponent(entity, "Position")) {
        entity.y += 9.81
      }
    })
```

The function will receive the component it's acting upon (Gravity) and all entities that have a Gravity component attached. You can see that we check the entities beforehand for a "Position" component. That's important here, because we want to apply the gravity to the position of the entity, which in this case they only have if there is a position component attached.

#### Register components and processors
Now the easy part. We have to register them in order to compose entities:

```JavaScript
// Register Component
ECS.addComponent(PositionComponent)
ECS.addComponent(GravityComponent)

// Register Processor
ECS.addProcessor(PullDownProcessor)
```

### Step 2: Entities
So after we registered our components and processors, we can now compose entities with those:

```JavaScript
const Player = ECS.createEntity("Player", ["Position", "Gravity"])
```

After that you register the player in the system:
```JavaScript
ECS.addEntity(Player)
```


#### Step 3: Let the magic happen
You're soo close. Call the update function ```ECS.update()``` inside the gameloop.
```JavaScript
// You should do this every frame. preferably inside your gameloop.
ECS.update()
```

### What's next?
Well the only thing you have to worry about now is to make more components and processors that act upon them.

In a ECS, components and processors are your bread and butter. You write those to have effects on your entities. The real strength comes through when you realize that you can mix and match components to your liking. This enables CRAZY flexibility. That's why it's such a often used pattern in game development. Enjoy :)

## Documentation
[Docs](https://stuhl.github.io/javascript-entity-component-system/)

## Roadmap
- v1.1
    - Implement .freeze() and .unfreeze() to make one-time effects possible
	- Better error handling