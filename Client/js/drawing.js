var timer = 10;
//States
var turn = false;
var wait = false;
var start = false;


var winWidth = 800;
var winHeight = 600;
var top_scale = 0.15;

var leftBuffer;
var rightBuffer;
var topBuffer;

var tmp_mX = [];
var tmp_mY = [];

var mX = []
var mY = [];

function setup() {
    frameRate(30)
    //var myCanvas = createCanvas(winWidth, winHeight);
    //    myCanvas.parent("canvas-holder");
    topBuffer = createGraphics(winWidth, winHeight * top_scale)
    leftBuffer = createGraphics(winWidth / 2, 300);
    rightBuffer = createGraphics(winWidth / 2, 300);
    console.log(start_state)

}
function draw() {

    //image(topbuffer,0,0)
    stroke(1);

    //first turn
    if (start) {
        if (frameCount % 60 == 0 && timer > 0) {
            timer--;
            drawTopBuffer(timer)
        }
        if (timer == 0) {
            turn = false;
            socket.emit("turn ended", mX, mY)
            noLoop();
        }
    }else if (start && mouseX > winWidth/2 && mouseIsPressed) {
        append(tmp_mX, mouseX);
        append(tmp_mY, mouseY)
        drawPhaseRB(mouseX, mouseY, pmouseX, pmouseY);
    }
    // First turn
    
    
    // Waiting Phase
    if (wait) {
        
    }
    //Drawing Buffers
    image(leftBuffer, 0, winHeight * 0.2);
    image(topBuffer, 0, 0)
    image(rightBuffer, winWidth / 2, winHeight * 0.1)
}

// Handler of the Buffers
function drawDataLB(pX, pY) {
    for (var ix = 1; ix < pX.length; ix++) {
        for (var iy = 1; iy < pY.length; iy++) {
            leftBuffer.line(ix, iy, ix - 1, iy - 1)
        }
    }
}

function drawImageLB(img) {
    leftBuffer.image(img, 0, 0, 400, 400)
}

function drawPhaseRB(x, y, px, py) {
    console.log(x+y)
    rightBuffer.fill(0, 0, 0);
    rightBuffer.line(x, y, px, py);
}

function mouseReleased() {
    //console.log(tmp_mX)
    if (start && tmp_mX.length > 0 && tmp_mY.length > 0) {
        append(mX, tmp_mX)
        append(mY, tmp_mY)
        tmp_mX = []
        tmp_mY = []
        //console.log(mX)
    }
}

function drawTopBuffer(timer) {
    topBuffer.background(255, 255, 255);
    topBuffer.fill(0, 0, 0);
    topBuffer.textSize(22);
    textAlign(CENTER);
    //topBuffer.rect(0,0, winHeight*top_scale, winHeight*top_scale)
    topBuffer.text("verbleibende Zeit:" + timer, winWidth / 2, winHeight * 0.15);
    if (timer == 0) {
        topBuffer.text("Game Over");
    }
}

function sendMessage() {
    socket.emit("message", "Hey")
    timer = 5
}