# A Entity component system that is easy to understand (and lightweight!)

### Features
- Gives the most basic features to get going
- it's small (*1.61kb minified*)
- no dependencies
- it has documentation

### Problems
- Because the philosophy of this library is to be lightweight and simple,  I haven't found a solution yet to make rendering work in a intelligent manner (It would call the rendering processor multiple times per frame which is baaad), so for now **use this only to update** entities. However there are methods implemented to help you work inside your rendering function.

### Live Demo
- TBD

### Tutorial
- TBD

### Documentation
[Docs](https://stuhl.github.io/javascript-entitiy-component-system/)

### Roadmap
- Implement a method that will *freeze* a processor and keep component state
- Solve the rendering problem
