# Assignment 2 — Generative Pattern

## Overview

- 🌸 I created a flower-like pattern. Each grid cell contains a flower drawn with pie arcs, and the number of petals increases per row.
- 👆 The distance between the cursor and the center of each cell determines the length of the petals. Farther away leads to smaller petals and larger central hole. A yellor circle fills the hole as the pistil.
- 🖱️ When the mouse is pressed, the flowers begin spinning (rotation animation using [`framCount`](https://p5js.org/reference/p5/frameCount/)). The shape and appearance of flowers are also altered. Nearby flowers expand, and distant ones shrink and are replaced by faint placeholder flowers.
- 🎨 I used [HSB](https://www.learnui.design/blog/the-hsb-color-system-practicioners-primer.html) color mode where Hue changes diagonally across the canvas and Opacity fades from top-left (solid) to bottom-right (transparent).

## Process + Links to Drafts on p5.js Web Editor

1. [Drafting a single cell](https://editor.p5js.org/xl6294/sketches/cOgVBtshJ)
   - In this first sketch, I’m drafting the single motif element that will later appear in each grid cell with a `for loop`. I created a full-window canvas with a scale factor based on the smaller window dimension (width or height) using math object `min()` to simulate a 100×100 canvas by scale. The component variations — like the number of petals (which will later correspond to the number of rows) and the petal thickness (which will link to the number of columns) — are currently mapped to the mouse’s X and Y positions for experimentation.
2. [Drafting control by mouse position](https://editor.p5js.org/xl6294/sketches/2wfSsoC7u)
   - In this sketch, I introduce another variation controlled by the mouse position, utilizing the `dist()` function to create a distance-based effect. The length of the petals, `eH`, now depends on the distance between the mouse and the center of each flower. Within a specific range (calculation using `sqrt()` from the [JavaScript Math object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)), the closer the mouse is to the center, the shorter the petals become, eventually creating a larger central hole in the flower.
3. [Drafting two-dimensional `for loops` (X, Y)](https://editor.p5js.org/xl6294/sketches/xV0v9_GYF)
   - In this sketch, I’m drafting the 2D `for loops` to lay out the grid of flower motifs. I’ve backed out the scaling and returned each single-element motif to its original 100×100 size. I also relinked petal count and petal width from mouse position to their row/column positions. I used both calculation and guesswork when deciding what should stay linked vs. unlinked, and which values should remain fixed versus scaled.
4. [Drafting rendering and animation when mouse is pressed](https://editor.p5js.org/xl6294/sketches/aevphcJ8f)
   - In this iteration, I’m adding animation so that the flower motifs rotate using a `windSpeed` variable based on `frameCount`, which kicks in whenever the mouse is pressed. I’m also introducing color with HSB, allowing me to create a gradient by using a variable for the hue value. Hue shifts across the grid from bottom left to top right, while opacity fades toward the bottom right. I used `map()` and [JavaScript Math objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) like `max()`, `min()`, and `abs()`.
5. [Interesting error which leads to final result](https://editor.p5js.org/xl6294/sketches/biFKRkiWc)
   - While tweaking the hue parameter, I accidentally changed the mapping for `eH` (the petal length) to be negative, which flips the arc outside its cell and creates an inside-out popping effect. It was an unexpected but interesting mistake, so I later integrated it into the final result.
6. [Last draft (without pistil and placeholder grey flowers)](https://editor.p5js.org/xl6294/sketches/n2t3OMrHS)
   - This is the last draft where everything came together, including the popping animation effect that appears when the mouse is pressed. At this moment, I’ve only used one `arc()` draw function for the entire composition, embedded within three `for loops`. I later added the yellow pistil and the placeholder grey flower to the final product, utilizing multiple draw functions as required.
