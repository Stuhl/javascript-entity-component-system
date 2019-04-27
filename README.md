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
- TBD

## Tutorial
In essence it works like this:
1. You write components and processors and register them in the system.
2. You compose Entities out of those components you just registered.
3. You register those entities in the system.
4. You call the libraries update function.
5. It will magically update every entity with the corresponding processor.

## Documentation
[Docs](https://stuhl.github.io/javascript-entity-component-system/)

## Roadmap
- Implement a method that will *freeze* a processor and keep component state
- Solve the rendering problem
