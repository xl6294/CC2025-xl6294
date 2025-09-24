// Plum	DDA0DD	221, 160, 221
// Thistle	D8BFD8	216, 191, 216
// Gold	FFD700	255, 215, 0
// DarkSlateBlue	483D8B	72, 61, 139
// DarkOrchid	9932CC	153, 50, 204
// DarkSeaGreen	8FBC8F	143, 188, 143
// DarkSlateGray	2F4F4F	47, 79, 79
// DarkGreen	006400	0, 100, 0

// Functional color roles
let backgroundMain = "#D8BFD8"; // soft background
let backgroundDark = "#2F4F4F"; // dark slate gray
let softAccent = "#DDA0DD"; // plum
let primaryAccent = "#9932CC"; // dark orchid
let heavyAccent = "#483D8B"; // dark slate blue
let highlight = "#FFD700"; // gold
let neuturalGreen = "#8FBC8F"; // dark sea green
let greenContrast = "#006400"; // dark gree

let s; // scale factor

function setup() {
  createCanvas(windowWidth, windowHeight);
  s = width / 100;
  // scale(s);

  strokeWeight(1/s); //

  // fill('rgba(0, 0, 0, 0)')

  rectMode(CORNERS); // Change the rect() mode to rect(x1, y1, x2, y2)
  
  background(backgroundMain)

}

function draw() {
  scale(s);

  // Begin drawing

  // Draw the physical canvas/paper of the artwork
  fill(backgroundDark); // Change fill color
  rect(0.7774408693644, 0.8252147001786, 99.1964382770099, 40.5076040662696);


  // Draw the scattered objects

  // Top-left area
  // Draw the three bars
  fill(greenContrast); // Change fill color
  rect(2.6332852934469% width, 6.9813303752316% width, 10.3900205648872% width, 7.3295722412337% width); // rect(x1, y1, x2, y2)
  rect(2.6332852934469% width, 8.017000208404% width, 10.3900205648872% width, 8.3607141919892% width); // rect(x1, y1, x2, y2)
  rect(2.6332852934469% width, 9.0354120116193% width, 10.3900205648872% width, 9.3589013113127% width); // rect(x1, y1, x2, y2)
  // Draw the line across the three bars
  stroke(neuturalGreen); // Assign stroke color for drawing lines
  line(5.1961203684895, 5.2418280446425, 12.8469390401439, 12.7780753884353); // line(x1, y1, x2, y2)
  // Draw the horizontal line
  line(2.2832435631058, 14.2507009828738, 27.2643884322168, 14.2507009828738); // line(x1, y1, x2, y2)
  noStroke() // Remove stroke for incoming fill-only shapes
  // Draw the small circle
  fill(primaryAccent); // Change fill color
  circle(15.4672212472178, 11.9798986528623, 2 * 0.8185133961368); // circle(x, y, d)
  // Draw the quadrilateral
  fill(neuturalGreen); // Change fill color
  quad(30.6783278454118, 5.1068356906396, 34.7615827469832, 6.8568020770274, 35.1561830105805, 15.5380078761669, 28.9969875918235, 16.6874956005589); // quad(x1, y1, x2, y2, x3, y3, x4, y4)

  // Top-right area
  // Draw the small circle
  fill(highlight); // Change fill color
  circle(73.0328188186419, 14.4961522652832, 2 * 1.0503401944717); // circle(x, y, d)
  // Draw the triangle
  fill(softAccent); // Change fill color
  triangle(92.7575546901546, 4.8425461432347, 90.0513472751721, 10.8008109966145, 95.4714777639284, 10.8008109966145); // triangle(x1, y1, x2, y2, x3, y3)
  
  blendMode(EXCLUSION); // Setting blending mode for rendering, EXCLUSION has less contrast than DIFFERENCE

  // Draw the overlapping bar
  fill(highlight); // Change fill color
  rect(90.8243601354171, 10.53395018755, 91.2766539702648, 12.3996622562968); // rect(x1, y1, x2, y2)

  // Bottom-left area
  // Draw the rectangle
  fill(neuturalGreen); // Change fill color
  rect(6.5290262461013, 31.979717358309, 7.1908373834168, 33.5841079942255); // rect(x1, y1, x2, y2)

  // Bottom-right area
  // Draw the bars
  fill(heavyAccent); // Change fill color
  rect(81.4009548985583, 35.9605290011875, 97.889744415051, 36.3482413636907); // rect(x1, y1, x2, y2)
  fill(255); // Change fill color
  rect(81.4009548985583, 35.9605290011875, 88.5220868101393, 36.3482413636907); // rect(x1, y1, x2, y2)
  fill(neuturalGreen); // Change fill color
  rect(81.4009548985583, 35.9605290011875, 83.9839325698857, 36.3482413636907); // rect(x1, y1, x2, y2)
  fill(greenContrast); // Change fill color
  rect(81.4009548985583, 35.9605290011875, 81.8324436685234, 36.3482413636907); // rect(x1, y1, x2, y2)


  // Draw the middle chaotic area

  // Draw the left triangle with strings
  // Draw the triangle
  stroke(highlight); // Change stroke color
  fill(greenContrast); // Change fill color
  triangle(2.808069989824, 15.9913576531022, 25.0653748933605, 37.6866094025094, 23.3792154309713, 27.0075994740447); // triangle(x1, y1, x2, y2, x3, y3)
  // Draw the strings
  line(2.808069989824, 15.9913576531022, 23.6578115079102, 28.7720412946577); // line(x1, y1, x2, y2)
  line(2.808069989824, 15.9913576531022, 23.9470410229002, 30.6038282229277); // line(x1, y1, x2, y2)
  line(2.808069989824, 15.9913576531022, 24.2727280397797, 32.6665126631645); // line(x1, y1, x2, y2)
  line(2.808069989824, 15.9913576531022, 24.627277245655, 34.9119909670416); // line(x1, y1, x2, y2)
  noStroke(); // Remove stroke for following drawings

  // Center-left area
  // Draw the quadrilateral touching the triagle above
  fill(highlight); // Change fill color
  quad(25.0653748933605, 37.6866094025094, 23.3792154309713, 27.0075994740447, 33.3765862866293, 19.587949941456, 30.7791554524918, 32.8624373544005); // quad(x1, y1, x2, y2, x3, y3, x4, y4)

  blendMode(BLEND); // Setting blending mode back to default

  // Center-right area
  // Draw the irregular polygon
  fill(backgroundMain); // Change fill color
  beginShape();
  vertex(47.0561628703415, 23.3681519977942);
  vertex(47.0561628703415, 3.3652512513369);
  vertex(57.5661998708155, 3.3652512513369);
  vertex(57.5661998708155, 19.5956243440933);
  vertex(65.2344047254535, 19.5956243440933);
  vertex(65.2344047254535, 21.1727516615055);
  vertex(74.7248493951632, 21.1727516615055);
  vertex(76.0813787988629, 19.5956243440933); // C2
  vertex(84.1329732482536, 19.5956243440933);
  vertex(84.1329732482536, 23.873190918575);
  vertex(96.0487152175628, 23.873190918575);
  vertex(96.0487152175628, 31.6647848168072); // I2
  vertex(68.1351091929873, 31.6647848168072);
  vertex(68.1351091929873, 37.2941456008137);
  vertex(59.2882513687224, 37.2941456008137);
  vertex(59.2882513687224, 33.1319305903947);
  vertex(50.7995421781137, 33.1319305903947);
  endShape();

  blendMode(DIFFERENCE); // Setting blending mode for rendering

  // Draw the next overlapping quadrilateral
  fill(softAccent); // Change fill color
  quad(27.1553120971662, 32.3219150575738, 33.3765862866293, 19.587949941456, 40.1580190266932, 21.4619250482171, 34.2753087182003, 33.3839137560947); // quad(x1, y1, x2, y2, x3, y3, x4, y4)
  // Draw the irregular pentagon
  fill(neuturalGreen); // Change fill color
  beginShape();
  vertex(50.7995421781137, 33.1319305903947);
  vertex(65.2344047254535, 19.5956243440933);
  vertex(57.5661998708155, 19.5956243440933);
  vertex(57.5661998708155, 14.9657133853773);
  vertex(40.9405069904394, 21.6781570778791);
  endShape();
  
  blendMode(BLEND); // Setting blending mode back to default

  // Draw the next overlapping quadrilateral
  fill(heavyAccent); // Change fill color
  quad(40.1580190266932, 21.4619250482171, 34.2753087182003, 33.3839137560947, 39.7446129201635, 34.1996998095796, 47.0561628703415, 23.3681519977942); // quad(x1, y1, x2, y2, x3, y3, x4, y4)


  // Draw the triangle inside
  fill(heavyAccent); // Change fill color
  triangle(62.2970263241626, 27.6948802128289, 69.6739609854552, 27.6948802128289, 65.9946549165989, 31.5839051930448); // triangle(x1, y1, x2, y2, x3, y3)
  // Draw the overlapping bars
  fill(neuturalGreen); // Change fill color
  rect(71.1898523110427, 30.3005258291071, 71.6607914353417, 34.8664444263117); // rect(x1, y1, x2, y2)
  fill(highlight); // Change fill color
  rect(71.1898523110427, 30.3005258291071, 71.675980403495, 31.0616079038992); // rect(x1, y1, x2, y2)
  // Draw the far right overlapping rectangle and bar
  fill(neuturalGreen); // Change fill color
  rect(89.6668981330765, 28.360416249761, 96.0487152175628, 31.6647848168072); // rect(x1, y1, x2, y2)
  fill(backgroundDark); // Change fill color
  rect(89.6668981330765, 31.187417664552, 96.0487152175628, 31.3410590457906); // rect(x1, y1, x2, y2)

  // Draw the "P" shape
  // Draw the irregular pentagon
  fill(greenContrast); // Change fill color
  beginShape();
  vertex(77.1287778264008, 21.8371479199032); // W3
  vertex(80.3223976899208, 21.8371479199032);
  vertex(80.3223976899208, 12.1397165362797);
  vertex(78.3768042764028, 5.6182210171484);
  vertex(78.3768042764028, 19.5956243440933);
  endShape();
  // Subtract arc fan
  fill(backgroundMain); // Change fill color
  arc(75.6450222168773, 19.5956243440933, 2 * 2.6881143297308, 2 * 2.6881143297308, radians(0), radians(56.5665885097687), OPEN); // arc(x, y, w, h, start, stop, [mode], [detail])
  // Overlapping bars
  fill(highlight); // Change fill color
  rect(79.3887476957364, 20.2036711572398, 83.2218874937364, 20.4804624336818); // rect(x1, y1, x2, y2)
  rect(79.3887476957364, 21.1727516615055, 83.2218874937364, 21.4366504795725); // rect(x1, y1, x2, y2)

  // Draw the ear shape
  fill(greenContrast); // Change fill color
  beginShape();
  curveVertex(78.3768042764028, 5.6182210171484); // Point C //control point (not rendered)
  curveVertex(78.3768042764028, 5.6182210171484); // Point C
  curveVertex(80.8234088693675, 5.2424626325634); // Point D
  curveVertex(81.908933091502, 6.3279868546979);  // Point E
  curveVertex(81.984084768419, 8.131627100706);   // Point F
  curveVertex(81.0154631548221, 9.6012598937497); // Point G
  curveVertex(80.3223976899208, 12.1397165362797);// Point H
  curveVertex(80.3223976899208, 12.1397165362797);// Point H //control point (not rendered)
  endShape();

  blendMode(DIFFERENCE); // Setting blending mode for rendering

  // Draw the big splash shape
  fill(highlight); // Change fill color
  beginShape();
  curveVertex(39.7446129201635, 34.1996998095796); // Point C //control point (not rendered)
  curveVertex(39.7446129201635, 34.1996998095796); // Point C
  curveVertex(39.5667697490487, 34.5244569046587); // Point D
  curveVertex(39.0873664182177, 34.8801432468882); // Point E
  curveVertex(37.6336918021493, 35.0657187297906); // Point F
  curveVertex(35.2289428362063, 37.0374582356281); // Point G
  curveVertex(39.234280342182, 37.19210447138);   // Point H
  curveVertex(41.6699585552753, 37.9189417794142); // Point I
  curveVertex(46.4783141161765, 36.1061297947313); // Point J
  curveVertex(49.3217778389759, 35.6852223357643); // Point K
  curveVertex(51.4730826292518, 36.3119067746707); // Point L
  // curveVertex(52.3336045453621, 37.7897596305994); // Point M, skipped for shape continuity
  curveVertex(52.8012794997699, 37.9020016196573); // Point N
  curveVertex(57.4166530009803, 34.083480870528);  // Point O
  curveVertex(59.2369500772288, 34.8437225906082); // Point P
  curveVertex(62.8989594894464, 32.2738914241397); // Point Q
  curveVertex(57.256038553076, 29.9503357444576);  // Point R
  // curveVertex(57.5023140398625, 28.9224032778702); // Point S, skipped for shape continuity
  curveVertex(60.7681411472496, 27.5625342856139); // Point T
  // curveVertex(61.1000776729185, 26.5774323384676); // Point U, skipped for shape continuity
  // curveVertex(60.7619631765054, 25.3484109891817); // Point V, skipped for shape continuity
  curveVertex(60.272661941668, 25.1565281519906);  // Point W
  curveVertex(54.113222867832, 24.8111390450465);  // Point Z
  curveVertex(54.5929299608099, 20.8775408826278); // Point A1
  curveVertex(54.0038405620717, 19.0627529727516); // Point B1
  // curveVertex(52.8831965476204, 18.7486330596099); // Point C1, skipped for shape continuity
  curveVertex(52.3398539951591, 18.8589995155786); // Point D1
  curveVertex(50.2938296960473, 22.1105651029639); // Point E1
  curveVertex(47.0561628703415, 23.3681519977942); // Point F1
  curveVertex(47.0561628703415, 23.3681519977942); // Point F1 //control point (not rendered)
  endShape();

  blendMode(BLEND); // Setting blending mode back to default

  // Draw the flipped "C" shaped
  fill(heavyAccent); // Change fill color
  beginShape();
  curveVertex(47.0561628703415, 23.3681519977942); // Point C //control point (not rendered)
  curveVertex(47.0561628703415, 23.3681519977942); // Point C
  curveVertex(51.2594990773357, 25.746708556953);  // Point D
  curveVertex(51.9300568948539, 30.5157742625954); // Point E
  curveVertex(50.7995421781137, 33.1319305903947); // Point F
  curveVertex(49.0859596027321, 34.3442647009409); // Point G
  curveVertex(46.0354588155297, 34.9653006691499); // Point H
  curveVertex(39.7446129201635, 34.1996998095796); // Point I
  curveVertex(39.7446129201635, 34.1996998095796); // Point I //control point (not rendered)
  endShape();
  
  // Draw the "E" shape
  fill(neuturalGreen); // Change fill color
  beginShape();
  curveVertex(43.2369309021009, 25.199257203689); // A1 // prepend last point for smooth closure
  curveVertex(42.0768498100259, 25.754078595551); // C
  curveVertex(41.1353347208057, 26.6787809153209); // D
  curveVertex(40.967207026302, 27.2840406155339); // E
  curveVertex(41.1857730291567, 27.8808939310217); // F
  curveVertex(41.2025857986071, 28.637468556288); // G
  curveVertex(40.63935802202, 30.1842433457213); // H
  curveVertex(40.916768717951, 30.8147222001098); // I
  curveVertex(42.1356945031022, 30.9071924320868); // J
  curveVertex(42.3206349670561, 32.168150140864); // K
  curveVertex(42.9931457450706, 32.4287480673446); // L
  curveVertex(44.8173312304348, 32.0504607547114); // M
  // curveVertex(46.826457179753, 30.0749603442939); // N
  curveVertex(46.526457179753, 30.5749603442939); // N is altered for smoothness
  curveVertex(46.5742656379976, 29.427668720455); // O
  curveVertex(45.8513165516321, 29.200963328751); // P
  curveVertex(44.9938653096636, 29.3688240273787); // Q
  curveVertex(44.4390439178017, 29.3183857190276); // R
  curveVertex(44.3381673010995, 28.9232856369441); // S
  curveVertex(44.8761759235111, 28.217149320029); // T
  curveVertex(44.5987652275801, 27.645151587167); // U
  curveVertex(43.3209947493527, 27.7716109295944); // V
  curveVertex(43.0183648992462, 27.2672278460835); // W
  curveVertex(43.7917522939628, 25.6027636704977); // Z
  curveVertex(43.2369309021009, 25.199257203689); // A1
  curveVertex(42.0768498100259, 25.754078595551); // C // append first two points again for smooth closure
  curveVertex(41.1353347208057, 26.6787809153209); // D // append first two points again for smooth closure
  endShape();
  
  blendMode(DIFFERENCE); // Setting blending mode for rendering

  // Draw the next overlapping triangle
  fill(neuturalGreen); // Change fill color
  triangle(30.7791554524918, 32.8624373544005, 33.3765862866293, 19.587949941456, 37.0798899637893, 33.8022372176413); // triangle(x1, y1, x2, y2, x3, y3)

  // Top-middle area
  // Draw the laying down quadrilateral
  fill(heavyAccent); // Change fill color
  quad(43.7458766902461, 8.2814538671733, 48.9578900616597, 8.2814538671733, 48.3024871826197, 9.3589013113127, 43.7458766902461, 10.1748399621779); // quad(x1, y1, x2, y2, x3, y3, x4, y4)


  blendMode(BLEND); // Setting blending mode back to default

  // Draw last ellipse
  fill(highlight); // Change fill color
  translate(43.2312951617475, 29.9346105564975); // move origin to ellipse center
  rotate(radians(19.1678963520082)); // rotate by 45 degrees
  ellipse(0, 0, 0.8343119335113, 1.6373877536782); // ellipse(x, y, w, [h])

}
