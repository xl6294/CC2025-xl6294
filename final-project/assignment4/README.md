# Assignment 4: Object Factory

## Overview

<img src="https://static.wikia.nocookie.net/nintendo/images/3/3e/MiiMode.PNG/revision/latest?cb=20191102010242&path-prefix=en" alt="drawing" width="48.5%"/> <img src="https://cdn.myportfolio.com/2dadc82b-4358-4c7c-9b93-22fae2f271af/eb619527-9c5e-47d1-9101-407629f6b1f3_carw_7x5x1920.png?h=2bbace4f37cd1c17daccf45b2b74f78e" alt="drawing" width="50%"/>
_Left: Mii Channel. Right: [My character designs for SCOUT](https://lkylenxin.com/scout)._

I was inspired to create this project in memory of the Mii Channel from Wii. Since I have designed characters composed entirely of simple circles in the past, I created a robot generator program that produces those robots moving left or right in a continuously looping, wrapped movement.

### Features

- When mouse is clicked:
  - if clicking on an empty space, a new robot with randomized attributes will be generated
  - if clicking on an existing robot, then it will be removed
- Holding down the `a` key reveals the visual anchor/center points for each robot

## Process + Links to Drafts on p5.js Web Editor

1. I first used global variables and `setup()` and `draw()` functions to draw the robot variations in body types and expressions.
   - [Body Type I](https://editor.p5js.org/xl6294/sketches/HdV97rZJVu)
   - [Body Type II](https://editor.p5js.org/xl6294/sketches/a8osCt1Wt)
   - [Body Type III](https://editor.p5js.org/xl6294/sketches/s9kVqHwjq)
   - [Body Type IV](https://editor.p5js.org/xl6294/sketches/8o4zMLqtb)
   - [Expressions (Eyes, Mouth, and Nose)](https://editor.p5js.org/xl6294/sketches/9V6QzKNGv)
2. I compiled the variations into a single `Robot` class, then I made a demo that would just generate the varied robots at the position of the mouse when clicked.
   - [Assignment 4 I](https://editor.p5js.org/xl6294/sketches/8F3_UrZuK)
3. Here, I added the shadow circles and the left-or-right randomized wrapped movements.
   - [Assignment 4 II](https://editor.p5js.org/xl6294/sketches/nEdQcDapO)
4. In this draft before the final product, I added `splice()` to delete robots and Array.sort to rearrange the robots by their Y values to create visual depth. (Later in the final draft, I will set up and use a `midY` value that is more accurate in relation to the actual anchor points of the robots.)
   - [Assignment 4 III](https://editor.p5js.org/xl6294/sketches/UXtiHbbg4)
