/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates face tracking on live video through ml5.faceMesh.
 */

let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };

function preload() {
  // Load the faceMesh model
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  if (faces.length > 0) {
    let leftEye = faces[0].leftEye.keypoints;
    let rightEye = faces[0].rightEye.keypoints;

    let mouth;

    // for (let i = 0; i < leftEye.length; i++) {
    //   circle(leftEye[i].x, leftEye[i].y, 10);
    // }

    beginShape();
    for (let i = 0; i < 8; i++) {
      vertex(leftEye[i].x, leftEye[i].y);
    }
    for (let i = 16; i > 7; i--) {
      vertex(leftEye[i].x, leftEye[i].y);
    }
    endShape();

    beginShape();
    for (let i = 0; i < 8; i++) {
      vertex(rightEye[i].x, rightEye[i].y);
    }
    for (let i = 16; i > 7; i--) {
      vertex(rightEye[i].x, rightEye[i].y);
    }
    endShape();
  }

  // // Draw all the tracked face points
  // for (let i = 0; i < faces.length; i++) {
  //   let face = faces[i];
  //   for (let j = 0; j < face.keypoints.length; j++) {
  //     let keypoint = face.keypoints[j];
  //     fill(0, 255, 0);
  //     noStroke();
  //     circle(keypoint.x, keypoint.y, 5);
  //   }
  // }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}
