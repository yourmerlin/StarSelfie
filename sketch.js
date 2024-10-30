// Merlin Enriquez
// Section C
// Heart Filter from Apple Photobooth *but 100x*

let selfie;
let range;
let starX = [50,61,83,69,71,50,29,31,17,39];
let starY = [18,37,43,60,82,73,82,60,43,36];
let x1 = [];
let y1 = [];

function preload(){
    selfie = loadImage("https://i.imgur.com/3KICC72.jpeg");
}
function setup() {

    createCanvas(400, 400);
    pixelDensity(2);
    background(220);
    frameRate(30);
    let range = random(0,5);
}

function draw() {

    selfieIMG(-20,-20);
    drawHearts();

}
function selfieIMG(x,y){
    push();
    translate(x,y);
        selfie.loadPixels();
        for (let y = 0; y < selfie.height; y+= 5){
        for (let x = 0; x < selfie.width; x+= 5){
            let rG = randomGaussian(0,mouseX / 5);
            while (rG < -range || rG > range){
                rG = randomGaussian(0,mouseX / 5);
            }
            let index = (x + y * selfie.width) * 4;

            let r = selfie.pixels[index];
            let g = selfie.pixels[index + 1];
            let b = selfie.pixels[index + 2];
            fill(r + rG,g + rG,b + rG);
            noStroke();
            starZ(x *(400 / selfie.width), y * (400 / selfie.height),10,10); }
    }
    pop();

}

function starZ(x,y){

    push();
    scale(random(0.8,1.2));
    translate(x,y);
    var nPoints = starX.length;
    beginShape();
    for(let i = 0; i < nPoints; i++){
        noStroke();
        vertex(starX[i] + random(-3,1),starY[i] + random(-3,1))
    }
    endShape(CLOSE);
    pop();
}

function heart(x, y) {

    //link to equation : https://mathworld.wolfram.com/HeartCurve.html
    push();
    translate(x, y);
    beginShape();
    fill(255,202,202,100);
    strokeWeight(2);
    stroke(225,66,124,150);
    for (let t = 0; t < TWO_PI; t += 0.1) {
        let xH = 16 * pow(sin(t), 3);
        let yH = 13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t);
        vertex(xH, -yH);
    }
    endShape(CLOSE);
    pop();
}
function drawHearts(){

    x1.push(mouseX);
    y1.push(mouseY);
    if (x1.length > 20 || y1.length > 20) {
        x1.shift();
        y1.shift();
    }

    for (let i = 0; i < 20; i++){
    stroke('red');
    heart(x1[i],y1[i],x1[i-1],y1[i-1]);
    }

}
//  random thoughts : make pixel density get smaller to bigger ?

// my thought procress : I wanted to create something interactive for my audience by using MouseX.
// I used the function to make the randomGaussian bigger/smaller due to mouseX position. I also made the stars jitter randomly between (-3,1).
// The hearts are moves across the screen based on mouseX & mouseY movement (hovering),
