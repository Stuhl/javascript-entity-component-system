# A Entity component system that is easy to understand (and lightweight!)

## Why
I was interested in how these system work. I needed a simple library that isn't too big and doesn't have unnecessary features nobody really needs.

## What's a *Entity-Component-System* anyway?
There are alot of articles out there that explains the system. One of those that I used to understand is this [Entity System for Javascript](https://entity-system-js.readthedocs.io/en/latest/)
You will also see naming similarities in this library as I got inspired by it.
If you want a general explanation then head over to [Wikipedia](https://en.wikipedia.org/wiki/Entity_component_system)

## Features
- Gives the most basic features to get going
- it's small (*1.61kb minified*)
- no dependencies
- it has documentation

## Problems
- Because the philosophy of this library is to be lightweight and simple,  I haven't found a solution yet to make rendering work in a intelligent manner (It would call the rendering processor multiple times per frame which is baaad), so for now use this only to update entities. However there are methods implemented to help you work inside your rendering function.

## Live Demo
[JS BIN](https://jsbin.com/bunetigumo/edit?html,output)

## Tutorial
In essence it works like this:
1. You write components and processors and register them in the system.
2. You compose Entities out of those components you just registered.
3. You register those entities in the system.
4. You call the libraries update function.
5. It will magically update every entity with the corresponding processor.

#### Import the Module
```JavaScript
import {EntityComponentSystem} from "javascript-entity-component-system"
const ECS = new EntityComponentSystem()
```

#### "How do I define components?"
Remeber Components are just data. No logic at all. In this library I decided to go with Objects:
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
The state property however is not required. You can also define Components to just "mark" entities.
A component that doesn't have a state property could look like this:
```JavaScript
const GravityComponent = {
  name: "Gravity"
}
```

#### "How do I define Processors?"
They are almost the same as Components. They are also Objects:
```JavaScript
const PullDownProcessor = {
  name: "PullDown",
  component: "Gravity",
  update(component, entities) {
    entities.forEach(entity => {
      // Do something on those entities
    })
  }
}
```

All the properties you see are **required**. The first is the name of the processor and the second one is the component it should act upon. Then there is something that is different from the component Object. It's the update function.

That function is being called every frame and basically inside of that you will write all your logic code. For example in this case this processor corresponds to the "Gravity" component. That means this processor has to pull (hence the name) entities down to earth.

This could be done like so:
```JavaScript
update(component, entities) {
    entities.forEach(entity => {
      if (ECS.entityHasComponent(entity, "Position")) {
        entity.y += 9.81
      }
    })
```

The update function will get 2 arguments passed down from the system. The first is the component this processor acts on, it can be useful in some cases but most of the time you don't need it. The second argument are the entities that all have a "Gravity" Component attached. You don't have to filter away the components you need. It will be done for you by the system, nice and simple.

With those you then can iterate through them (I used a .forEach as you can see) and then apply logic.
In some cases you will need to check for some other components, like here, you need a position component attached otherwise you can't apply gravity force to it.

You can do that with **ECS.entityHasComponent()**. There is some explanation in the docs. Feel free to read it up :)

#### "How do I register my components and processors in the system?"
That's simple to do.

```JavaScript
// Register Component
ECS.addComponent(PositionComponent)
ECS.addComponent(GravityComponent)

// Register Processor
ECS.addProcessor(PullDownProcessor)
```

Now they are registered in the system and ready for composing.

#### "How to create entities though?"
That's simple too.
You just compose them.

```JavaScript
const Player = ECS.createEntity("Player", ["Position", "Gravity"])
```

#### "Do we need to register those in the system too?"
Yup.
```JavaScript
ECS.addEntity(Player)
```

The decision why you need to manually do it was because you then can create the entity first, make some changes in some properties where you don't feel like creating a whole new component is overkill and then insert it into the system.
This way gives more flexibility.

#### "Okay I got it but how does the system update my entites?"
Now you're almost done.
You now only need to call the update function of the system.
```JavaScript
// You should do this every frame. Preferrably inside your gameloop.
ECS.update()
```

And now everything is updating nicely :)

#### "How do I go from here?"
Well the only thing you have to worry about is to make more components and processors that act upon them.

Please note though that this system is designed for continous logic. Gravity for example is something that always acts on some entity. Having a player get damage for couple of seconds is not continous. I am experimenting with some solutions for this and there are for sure some hacks you can do to make it work but I would suggest you only use this for continous effects and make something yourself for one-time-effects.

One solution would be to add Components that does damage the some entity and then dettach it from the entity again after couple of seconds but it wouldn't be all that easy. You would have to define couple of variables that keep track of the time that has elapsed etc.

However I do have some helper methods implemented in the library that can ease the pain to code one-time-effects and would like to know how you guys cope this.

Other than that have fun deving! :)

## Documentation
[Docs](https://stuhl.github.io/javascript-entity-component-system/)

## Roadmap
- Implement a method that will *freeze* a processor and keep component state
- Solve the rendering problem
- Making Error handling cosistent. Some methods lack error handling. Be careful about this.
