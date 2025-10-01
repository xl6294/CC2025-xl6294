# Assignment 2 — Generative Pattern

## Overview

- 🌸 I created a flower-like pattern. Each grid cell contains a flower drawn with pie arcs, and the number of petals increases per row.
- 👆 The distance between the cursor and the center of each cell determines the length of the petals. Farther away leads to smaller petals and larger central hole. A yellor circle fills the hole as the pistil.
- 🖱️ When the mouse is pressed, the flowers begin spinning (rotation animation using [`framCount`](https://p5js.org/reference/p5/frameCount/)). The shape and appearance of flowers are also altered. Nearby flowers expand, and distant ones shrink and are replaced by faint placeholder flowers.
- 🎨 I used [HSB](https://www.learnui.design/blog/the-hsb-color-system-practicioners-primer.html) color mode where Hue changes diagonally across the canvas and Opacity fades from top-left (solid) to bottom-right (transparent).

## Drafting Docs (p5.js Web Editor)

- [Drafting a single cell](https://editor.p5js.org/xl6294/sketches/cOgVBtshJ)
- [Drafting for two-dimensional for loops (X, Y)](https://editor.p5js.org/xl6294/sketches/2wfSsoC7u)
- [Drafting integration i](https://editor.p5js.org/xl6294/sketches/xV0v9_GYF)
- [Drafting integration ii](https://editor.p5js.org/xl6294/sketches/aevphcJ8f)
- [Interesting error which leads to final result](https://editor.p5js.org/xl6294/sketches/biFKRkiWc)
- [Final product](https://editor.p5js.org/xl6294/sketches/n2t3OMrHS)
