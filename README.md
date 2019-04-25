# A Entity component system that is easy to understand (and lightweight!)

## Why
I was interested in how these system work. I needed a simple library that isn't too big and doesn't have unnecessary features nobody really needs.

Because honestly let's face it, if you want to develop a game in JavaScript you usually do something simple or small like Tetris, snake, pong etc. Maybe something with sprites but that's it.

If we wanted to develop a serious game with complex logic it would be the best idea to jump into game engines like Unity or Unreal.

## What's a *Entity-Component-System* anyway?
There are alot of articles out there that explains the system. One of those that I used to understand is this [Entity System for Javascript](https://entity-system-js.readthedocs.io/en/latest/)
You will also see convention similarities in this library as I got inspired by it.

The system consists of 3 things:
- Entities - like players, objects, enemeis, cars etc. In this library Entities are **plain objects**
- Components - just data
- Processors - Basically functions that consist logic

## Features
- Gives the most basic features to get going
- it's small (*1.61kb minified*)
- no dependencies
- it has documentation

## Problems
- Because the philosophy of this library is to be lightweight and simple,  I haven't found a solution yet to make rendering work in a intelligent manner (It would call the rendering processor multiple times per frame which is baaad), so for now use this only to update entities. However there are methods implemented to help you work inside your rendering function.

## Live Demo
- TBD
