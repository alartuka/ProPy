// INSTRUCTIONS
/* -- "PROPY": Simple image editor --
>> 1. Start by pressing the play button on top left, and press the “Click to start editing!” button, in the "Preview" side on the right. That will go to the upload page. 

>> 2. For this page, you need to upload through the editor. Click the side arrow next to “sketch.js” on the left. From there, click the dropdown of “Sketch Files”, upload your picture by pressing “Upload file” from the dropdown. 

>> 3. Once uploaded, change the default picture name  “gg.png” on line 24 in the preload() function. Then press the play button agian, without doing the upload process agian, move to the next step.

>> 4. Then press the green button on the screen to continue to the editing screen. 

>> 5. In the editing page, press the blue buttons to edit, and press the “Done!” button once completed. 

>> 6. That will give the saving screen with the edited image with its original size. Press the key "s" or "S" to download image.

>> NOTE: Pressing the "reflect" and "Invert(-)" will do and undo
BUT the other buttons, will ONLY increase the application of the filters. To reset the filters (change the image back to its orginal filter), press the key "r" or "R". 

>> NOTE: You can press the key "D" or "d" to go to the Saving screen
*/

let img;
function preload() {
  // Upload Picture
  img = loadImage("gg.png"); // ===> CHANGE THIS "gg.png" ONLY
  // to "name.type" of your uploaded picture
}

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let currentscreen = 0;
let orgimgH;
let orgimgW;
let gryscle = false;
let invert = false;
let cntrst = false;
let tinted = false;
let reflct = false;

function setup() {
  createCanvas(500, 486);
  pixelDensity(1);
  noStroke();
  textAlign(CENTER, CENTER);

  // Save orginal image size
  orgimgH = img.height;
  orgimgW = img.width;
}

function draw() {
  createCanvas(500, 486);
  background("pink");

  // Load pixels and resize to fit the screen
  img.loadPixels();
  img.resize(width - 100, height - 130);

  // Define the screens
  if (currentscreen === 0) {
    main_screen();
  } else if (currentscreen === 1) {
    upload_screen();
  } else if (currentscreen === 2) {
    editing_screen();
  } else if (currentscreen === 3) {
    end_screen();
  } else {
    currentscreen = 0;
  }
}

function mousePressed() {
  if (currentscreen === 0) {
    // Main screen
    if (
      mouseY >= height - 175 &&
      mouseY <= height - 175 + 50 &&
      mouseX >= width / 2 - 100 &&
      mouseX <= width / 2 - 100 + 200
    ) {
      currentscreen = 1; // Go to Upload screen
    }
  }
  if (currentscreen === 1) {
    // Upload screen
    if (
      mouseY >= height / 2 - 30 &&
      mouseY <= height / 2 - 30 + 50 &&
      mouseX >= 150 &&
      mouseX <= 150 + 200
    ) {
      currentscreen = 2; // Go to Editing screen
    }
  }

  if (currentscreen === 2) {
    // Editing screen
    let hs = 22;
    let ws = 80;
    let ys = height - 75;

    if (mouseY >= ys && mouseY <= ys + hs && mouseX >= 63 && mouseX < 63 + ws) {
      // GreyScale
      gryscle = !gryscle;
    }

    if (
      mouseY >= ys + 40 &&
      mouseY <= ys + 40 + hs &&
      mouseX >= 213 &&
      mouseX <= 213 + ws
    ) {
      // Invert(-)
      invert = !invert;
    }

    if (
      mouseY >= ys + 40 &&
      mouseY <= ys + 40 + hs &&
      mouseX >= 63 &&
      mouseX <= 63 + ws
    ) {
      // Contrast
      cntrst = !cntrst;
    }

    if (
      mouseY >= ys &&
      mouseY <= ys + hs &&
      mouseX >= 213 &&
      mouseX <= 213 + ws
    ) {
      // Tint
      tinted = !tinted;
    }

    if (
      mouseY >= ys &&
      mouseY < ys + hs &&
      mouseX >= 363 &&
      mouseX <= 363 + ws
    ) {
      // Reflect
      reflct = !reflct;
    }

    if (
      mouseY >= ys + 40 &&
      mouseY <= ys + 40 + hs &&
      mouseX >= 363 &&
      mouseX <= 363 + ws
    ) {
      // Save button
      saveCanvas("ProPy_image", "png");
      currentscreen = 3; // Go to Save screen
    }
  }
}

function keyPressed() {
  if (key === "d" || key === "D") {
    currentscreen = 3; // Go to Save screen
  }
  if (currentscreen === 3) {
    // Save/download the edited image on the end_screen
    if (key === "s" || key === "S") {
      saveCanvas("ProPy_image", "png");
    }
    if (key === "R" || key === "r") {
      // reset filters ONLY
      preload();
    }
  }
}

function main_screen() {
  // Welcome sign
  fill("white");
  rect(90, 50, 310, 200, 10);
  fill(0);
  textSize(40);
  text("Welcome to", width / 2 - 20, height / 2 - 135);
  textSize(55);
  text("ProPy", width / 2, height / 2 - 50);

  // Start button
  fill("blue");
  rect(width / 2 - 100, height - 175, 200, 50, 18);
  fill("white");
  textSize(18);
  text("Click to start editing!", width / 2, height - 150);
}

function upload_screen() {
  // Image holderplace
  fill("white");
  rect(50, 50, width - 100, height - 100, 20);

  // Upload button => *must upload through the editor
  fill("green");
  rect(150, height / 2 - 30, 200, 50, 15);
  textSize(18);
  fill("white");
  text("Upload image!", width / 2, height / 2 - 5);

  // Note:
  textSize(13);
  fill(0);
  text(
    "***Must follow the instructions written\n    in description before pressing!\n *Uploads using this editor",
    width / 2,
    height / 2 + 55
  );
}

const rgb = 255;

function editing_screen() {
  // Image placeholder
  fill("white");
  rect(30, 10, width - 60, height - 100, 20);

  // Tools placeholder
  fill(0);
  rect(30, height - 84, width - 55, 80, 20);

  // Tools buttons
  let c = 0;
  textSize(15);
  for (let i = 63; i < width - 55 + 30; i += 150) {
    for (let j = height - 75; j < height - 30; j += 40) {
      // Draw the buttons
      fill("blue");
      rect(i, j, 80, 22, 5);

      // Label tools buttons
      fill("white");
      if (c === 0) {
        text("GreyScale", i + 40, j + 12);
      } else if (c === 1) {
        text("Contrast", i + 40, j + 12);
      } else if (c === 2) {
        text("Tint", i + 40, j + 12);
      } else if (c === 3) {
        text("Invert(-)", i + 40, j + 12);
      } else if (c === 4) {
        text("Reflect", i + 40, j + 12);
      } else {
        text("Done!", i + 40, j + 12);
      }
      c++;
    }
  }

  // Edit image on-click

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let idx = (x + y * img.width) * 4;
      // (r, g, b) vector
      let r = img.pixels[idx];
      let g = img.pixels[idx + 1];
      let b = img.pixels[idx + 2];

      // Preform operations based on their predicates

      // GreyScale
      if (gryscle) {
        greyscale(r, g, b, idx);
      }

      // Contrast
      if (cntrst) {
        contrast(r, g, b, idx);
      }

      // Tint
      if (tinted) {
        tinting(r, g, b, idx);
      }

      // Negative Invert
      if (invert) {
        negativeInvert(r, g, b, idx);
      }
    }
  }
  
  if (invert) {
    // Can set the image back/ undo invert
    invert = false;
  }
  if (tinted) {
    tinted = false;
  }
  if (gryscle) {
    gryscle = false;
  }
  if (cntrst) {
    cntrst = false;
  }
  
  // UPdate pixels and draw the image
  img.updatePixels();
  image(img, 50, 25);

  // Reflect image
  if (reflct) {
    push();
    scale(-1, 1);
    image(img, -50 * 10 + 50, 25);
    pop();
  }
}

function greyscale(r, g, b, idx) {
  // Multiplies the (r, g, b) vector by a matrix with all entries (1/3); takes the average of the vector/pixel
  let grs = (r + g + b) / 3;
  img.pixels[idx] = constrain(grs, grs - 1, grs + 1);
  img.pixels[idx + 1] = constrain(grs, grs - 1, grs + 1);
  img.pixels[idx + 2] = constrain(grs, grs - 1, grs + 1);
}

function contrast(r, g, b, idx) {
  // Multiplies scalar f by the subtraction of vector (r, g, b) by the vector (255/2, 255/2, 255/2) and the product is added to the  (255/2, 255/2, 255/2) vector
  const contrasted = 100;
  let f = (259 * (contrasted + rgb)) / (rgb * (259 - contrasted));
  let w = rgb / 2;
  img.pixels[idx] = constrain(
    f * (r - w) + w,
    f * (r - w) + w + 1,
    f * (r - w) + w - 1
  );
  img.pixels[idx + 1] = constrain(
    f * (g - w) + w,
    f * (g - w) + w + 1,
    f * (g - w) + w - 1
  );
  img.pixels[idx + 2] = constrain(
    f * (b - w) + w,
    f * (b - w) + w + 1,
    f * (b - w) + w - 1
  );
}

function tinting(r, g, b, idx) {
  // Adds the (r, g, b) vector to the vector (255/2, 0, 255/2)
  img.pixels[idx] = constrain(rgb / 2 + r, rgb / 2 + r - 1, rgb / 2 + r + 1);
  img.pixels[idx + 1] = constrain(g, g - 1, g + 1);
  img.pixels[idx + 2] = constrain(rgb / 2 + b, rgb / 2 + b, rgb / 2 + b);
}

function negativeInvert(r, g, b, idx) {
  // Subtracts the (r, g, b) vector from vector (255, 255, 255)
  img.pixels[idx] = rgb - r;
  img.pixels[idx + 1] = rgb - g;
  img.pixels[idx + 2] = rgb - b;
}

function end_screen() {
  // Display image only with its orginal size
  clear();
  createCanvas(orgimgW, orgimgH);
  img.resize(orgimgW, orgimgH);
  image(img, 0, 0);
}
