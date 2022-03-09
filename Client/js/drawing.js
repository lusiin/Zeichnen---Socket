var timer = 16


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

var img = ""

function setup() {
    frameRate(30)
    //var myCanvas = createCanvas(winWidth, winHeight);
    //    myCanvas.parent("canvas-holder");
    topBuffer = createGraphics(winWidth, winHeight*top_scale)
    leftBuffer = createGraphics(winWidth / 2, 300);
    rightBuffer = createGraphics(winWidth / 2, 300);
    console.log(start_state)

}
function draw() {
    //Buffers
    drawLeftBuffer(img);
    drawTopBuffer(timer)
    //image(topbuffer,0,0)
    image(leftBuffer, 0, winHeight*0.2);
    image(topBuffer, 0, 0)

    if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
        timer --;
      }
      if (timer == 0) {

      }

    stroke(1);
    //Mouse Input
    if (start_state = true && mouseX > winWidth / 2 && mouseIsPressed === true) {
        append(tmp_mX, mouseX);
        append(tmp_mY, mouseY)
        drawRightBuffer(mouseX, mouseY, pmouseX, pmouseY);
    }
    image(rightBuffer, winWidth / 2, winHeight * 0.1)
}

function mouseReleased() {
    //console.log(tmp_mX)
    if (start_state=true && tmp_mX.length > 0 && tmp_mY.length > 0) {
        append(mX, tmp_mX)
        append(mY, tmp_mY)
        tmp_mX = []
        tmp_mY = []
        console.log(mX)
    }
}

function drawLeftBuffer(img) {
    if (img == "") {
    } else {
        leftBuffer.image(img, 0, 0, 400, 400)
    }
}

function drawRightBuffer(x, y, px, py) {
    rightBuffer.fill(0, 0, 0);
    //rightBuffer.textSize(32);
    //rightBuffer.text("This is the right buffer!", 50, 50);

    line(x, y, px, py);
}

function drawTopBuffer(timer) {
    topBuffer.background(255, 255, 255);
    topBuffer.fill(0, 0, 0);
    topBuffer.textSize(22);
    textAlign(CENTER);
    //topBuffer.rect(0,0, winHeight*top_scale, winHeight*top_scale)
    topBuffer.text("verbleibende Zeit:"+timer, winWidth / 2, winHeight * 0.15);
}

function sendMessage() {
    socket.emit("message", "Hey")
    timer = 5
}