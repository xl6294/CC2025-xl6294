# Final Project — Virtual Museum / Escape Room

## Overview

<img src="https://www.rustylake.com/cdn/games/screenshot-80622-en-5.jpg" alt="n/a" width="100%"/>

_Inspiration: The White Door (Game, Rusty Lake)_

For the final project, I intended to reinvent the landing/splash page of my portfolio with p5.js, with inspiration from the game _The White Door_ by Rusty Lake to implement the top-down perspective and “spatial” storytelling. The final product is a two-panel interface framework: the left panel is a 2.5D blueprint/map. The user controls a figure using a mouse or arrow keys to navigate the space and approach different items/installations in a miniature sketch. After selecting the items/installations, the right panel will display details for further interactions.

## Tile Map System + Top-down Perspective + Rendering

<img src="https://img.youtube.com/vi/H3Fn33lYuE0/0.jpg" alt="n/a" width="49%"/> <img src="https://img.youtube.com/vi/IYgZMIB7_PM/0.jpg" alt="n/a" width="49%"/>

Left: [Top Down Game Camera and Movement in HTML, CSS, and JavaScript](https://youtu.be/H3Fn33lYuE0?si=XHU1MxiR27OowWu4)  
Right: [How to build a Tile Set Map Editor using HTML Canvas](https://youtu.be/IYgZMIB7_PM?si=ZviqUlBLHnEGvIm3)

The implementation of a tile map system draws inspiration from two YouTube videos I watched a few years ago. I did not use their exact logic since those were built on `JavaScript` rather than `p5.js`. Influenced by the “simulation + rendering” mechanism in `matter.js`, I then vertically compress the map and reused a rendering technique from Assignment 4 (where objects and the player are rendered using Y-sorting so that items lower on the screen appear more in front) to simulate depth in a top-down perspective.

## Player Movement & Collision

<img src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/m2/62d2cfc4-7c39-4e4f-9726-c1fbcf7a8afb.png" alt="n/a" width="49%"/>

The player character is moved continuously by pressing down the arrow keys (← ↑ ↓ →). The programming logic, especially the use of direction indicators `xd` and `yd`, is informed by the Game Design in Python workshop at the Makerspace. I also attached the code file during the workshop in this folder (`game-design-in-python-workshop-at-makerspace.py`). I used four probe points (at the four corners of the player shadow circle’s bounding box) to detect collisions, and X- and Y-axis movement are checked separately, allowing smooth sliding along objects (though the player cannot slide along the map bounds at the moment).

## Objects Interaction System + HTML Overlay Integration

Exploring a better object management system, I defined the interactive objects in an external JSON file named `objects.json`, and each object will be rendered on a table with a visual representation and a touchpoint to indicate interactivity when the player approaches. When clicked, certain objects trigger an HTML overlay panel containing an `<iframe>` that embeds previous assignments as the object's details. (The integration was informed by the office hour on Dec 9, 11:30 AM, and my previous experience with HTML and CSS.)

## Background Music

The background music is implemented using the p5.sound library and can be toggled on/off.  
Music Credit: [“Gymnopédie No. 1” by Kevin MacLeod, Free Music Archive, CC BY.](https://freemusicarchive.org/music/Kevin_MacLeod/Classical_Sampler/Gymnopedie_No_1/)
