# Assignment 3: Abstract Clock

## Overview

For this assignment, I illustrated the recurring day and night cycle within a minute. The composition is a cloud frame revealing the changing sky based on time functions. Visual elements of the night phase were inspired by the Mid-Autumn Festival. [(p5.js Web Editor Version)](https://editor.p5js.org/xl6294/sketches/rwATkNll2)

### Features

- Hour-based cloud bumps
- Month dial/ring
- Orbiting celestial body (sun/moon)
- Dynamic sky shading
- Night traveling rabbits

IMPORTANT: if the animated objects are not moving smoothly, please refresh the page.

### Used time functions:

- `month()`
  - determines the current month to rotate the month ring
- `hour()`
  - determines the number of cloud bumps around the frame
- `second()`
  - divides a real-life minute into one circle of day and night phases
- `millis()`
  - smooths `second()` for continuous sun/moon movement
- `day()`
  - determines the number of rabbits crossing the bridge (month ring)

## Process + Links to Drafts on p5.js Web Editor

1. [Draft Sketch 1](https://editor.p5js.org/xl6294/sketches/CiFoX0z-d)
   - First, I mapped out the overall composition that I had previously drafted in GeoGebra. (Somehow the GeoGebra composition wasn’t saved properly, so I don’t have a screenshot.) I then calculated the parametric coordinates for the ellipse and circular paths in order to animate objects along them.
2. [Draft Sketch 2](https://editor.p5js.org/xl6294/sketches/PnBZlGCW8)
   - Here, I experimented with adding zoom with `scale()` and `translate()` functions to ensure that the final view would focus and crop the square area of the setup canvas.
3. [Draft Sketch 3](https://editor.p5js.org/xl6294/sketches/n317Jk4ds)
   - Here, I began using `lerp()` on both the celestial circle (the sun/moon) and the month dial/ring. However, the looping didn’t behave ideally/smoothly for the celestial circle.
4. [Draft Sketch 4](https://editor.p5js.org/xl6294/sketches/ZHeJDJeS_)
   - Here, I explored how to achieve smoother motion for the celestial circle. Instead of using `lerp()` on the coords, I decided to "lerp" `second()` using `millis()`. I did have to sync `millis()` with `second()` using real-time milliseconds, so they refresh (turn "0") at the same time.
