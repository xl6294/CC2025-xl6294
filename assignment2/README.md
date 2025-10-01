# Assignment 2 — Generative Pattern

## Overview

This sketch creates a **generative flower-like grid pattern** inspired by early code-based artworks such as _Schotter_ by Georg Nees.  
Each grid cell contains a radial composition of arc “petals,” which **increase in complexity** down the Y-axis and respond interactively to the mouse.

Built with **p5.js**.

---

## Features

### 🌸 Grid-based Flowers

- The canvas is divided into **100×100px grid cells**.
- Each cell contains a radial flower drawn with **arcs**.
- **Petal count increases per row** (3 at the top, more at the bottom), fulfilling the requirement for increasing complexity along Y.

### 🖱️ Mouse Interaction

- **Distance-based deformation:**  
  Arc height (`eH`) is mapped to the distance between the mouse and the center of each cell.
  - Near the center → larger petals
  - Far away → smaller petals
- **Click to animate:**  
  When the mouse is pressed:
  - The flower petals **begin spinning** (rotation animation).
  - The mapping range of arc height flips, altering the shape and appearance.
  - If a flower collapses to `eH = 0`, a **faint placeholder flower** is drawn.

### 🎨 Color System

- Colors are generated in **HSB mode**.
- **Hue** changes diagonally across the canvas using `abs(x - y)`.
- **Opacity** fades from top-left (opaque) to bottom-right (transparent).

---

## Technical Implementation

- **Two-dimensional for loop** generates the grid.
- **Arc petals** drawn by rotating around the cell center.
- **Variables:**
  - `eW` → petal width mapped to X position.
  - `eH` → petal height mapped to mouse distance.
  - `numP` → number of petals, increasing with Y.
  - `windSpeed` → rotation speed tied to `frameCount` when mouse is pressed.
  - `a` → control variable that offsets arc height mapping when pressed.

---

## Interaction Guide

- **Move mouse around:** nearby flowers expand, distant ones shrink.
- **Click and hold:**
  - Flowers spin continuously.
  - Petal arcs invert vertically, creating a different visual rhythm.

---

## How It Meets Assignment Requirements

- ✅ Uses a **two-dimensional for loop** to draw a repeating grid.
- ✅ **Complexity increases down Y-axis** via petal count.
- ✅ **Mouse interaction** implemented (distance mapping + click-triggered animation).
- ✅ **Color is integrated** thoughtfully, producing diagonal hue and opacity changes.
- ✅ Multiple drawing functions used: `translate()`, `rotate()`, `arc()`, `fill()`, `map()`, `dist()`.

---

## Example Output

_(Add screenshots or GIFs of the pattern here once rendered in the browser)_

---

## Credits

- Inspired by _Schotter_ by Georg Nees (1968–1970).
- Implemented in [p5.js](https://p5js.org/).
