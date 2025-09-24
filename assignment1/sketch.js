let s; // scale factor

function setup() {
  createCanvas(windowWidth, windowHeight);
  s = width / 100;
  // scale(s);

  strokeWeight(1/s); //

  rectMode(CORNERS); // Change the rect() mode to rect(x1, y1, x2, y2)
  
  background('beige')

}

function draw() {
  scale(s);

  // Draw the scattered objects

  // Top-left area

  // Draw the three bars
  rect(2.6332852934469, 6.9813303752316, 10.3900205648872, 7.3295722412337);
  rect(2.6332852934469, 8.017000208404, 10.3900205648872, 8.3607141919892);
  rect(2.6332852934469, 9.0354120116193, 10.3900205648872, 9.3589013113127);

  // Draw the line across the three bars
  line(5.1961203684895, 5.2418280446425, 12.8469390401439, 12.7780753884353); // line(x1, y1, x2, y2)

  // Draw the horizontal line
  line(2.2832435631058, 14.2507009828738, 27.2643884322168, 14.2507009828738); // line(x1, y1, x2, y2)

  // Draw the small circle
  circle(15.4672212472178, 11.9798986528623, 0.8185133961368); // circle(x, y, d)

  // Draw the quadrilateral
  quad(30.6783278454118, 5.1068356906396, 34.7615827469832, 6.8568020770274, 35.1561830105805, 15.5380078761669, 28.9969875918235, 16.6874956005589) // quad(x1, y1, x2, y2, x3, y3, x4, y4)

  // Top-middle area
  quad(43.7458766902461, 8.2814538671733, 48.9578900616597, 8.2814538671733, 48.3024871826197, 9.3589013113127, 43.7458766902461, 10.1748399621779) // quad(x1, y1, x2, y2, x3, y3, x4, y4)




  // Draw the middle chaotic area




  // Draw the ear shape
  beginShape();

  //control point (not rendered)
  curveVertex(78.3768042764028, 5.6182210171484); // Point C
  
  curveVertex(78.3768042764028, 5.6182210171484); // Point C
  curveVertex(80.8234088693675, 5.2424626325634); // Point D
  curveVertex(81.908933091502, 6.3279868546979);  // Point E
  curveVertex(81.984084768419, 8.131627100706);   // Point F
  curveVertex(81.0154631548221, 9.6012598937497); // Point G
  curveVertex(80.3223976899208, 12.1397165362797);// Point H

  //control point (not rendered)
  curveVertex(80.3223976899208, 12.1397165362797);// Point H
  
  endShape();
  

  // Draw the big splash shape
  
  beginShape();

  //control point (not rendered)
  curveVertex(39.7446129201635, 34.1996998095796); // Point C
  
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

  //control point (not rendered)
  curveVertex(47.0561628703415, 23.3681519977942); // Point F1
  
  endShape();
  




  // Draw the flipped "C" shaped
  beginShape();

  //control point (not rendered)
  curveVertex(47.0561628703415, 23.3681519977942); // Point C
  
  curveVertex(47.0561628703415, 23.3681519977942); // Point C
  curveVertex(51.2594990773357, 25.746708556953);  // Point D
  curveVertex(51.9300568948539, 30.5157742625954); // Point E
  curveVertex(50.7995421781137, 33.1319305903947); // Point F
  curveVertex(49.0859596027321, 34.3442647009409); // Point G
  curveVertex(46.0354588155297, 34.9653006691499); // Point H
  curveVertex(39.7446129201635, 34.1996998095796); // Point I

  //control point (not rendered)
  curveVertex(39.7446129201635, 34.1996998095796); // Point I
  
  endShape();
  




  // Draw the "E" shape
  beginShape();

  // prepend last point for smooth closure
  curveVertex(43.2369309021009, 25.199257203689); // A1
  
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
  
  // append first two points again for smooth closure
  curveVertex(42.0768498100259, 25.754078595551); // C
  curveVertex(41.1353347208057, 26.6787809153209); // D
  
  endShape();
  
  
  
}
