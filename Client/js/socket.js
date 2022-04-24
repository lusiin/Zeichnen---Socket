const form = document.querySelector("form");
const canvas = document.querySelector("canvas-holder")
var socket = io.connect('http://127.0.0.1:5000');

var start_state = false;

const rdybutton = document.getElementById("rdybutton")
//const interface = document.querySelector("interface");
//interface.getElementsByClassName.display = "none"
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const name = formData.get("name")
    console.log(name)
    if (name.length > 0) {
        socket.emit("join", name)
        form.remove()
    }
    
});

rdybutton.addEventListener("click", (event)=> {
    event.preventDefault();
    console.log("Start")
    socket.emit("rdy")
    rdybutton.disabled = true;
    rdybutton.style.backgroundColor = "#808080"
})

//socket listeners
/**
 * @param
 * @param  {} (username
 */
socket.on('new user', (username) => {
    var new_user_name = username
    console.log(new_user_name)
    console.log(`✋ ${new_user} has joined the chat! ✋`);
    var parent = document.getElementById('users');
    var new_user = document.createElement("h5")
    var bk = document.createElement("br")
    parent.appendChild(new_user)
    parent.appendChild(bk)
    new_user.innerHTML = new_user_name
  })
 /**
  * Initiates the gamestart to all users
  * @param  {} "gamestart" 
  * @param  {} (
  */
 socket.on("gamestart", () =>{
    console.log("game has started")
    rdybutton.remove();
    
    var myCanvas = createCanvas(winWidth, winHeight);
        myCanvas.parent("canvas-holder");
    /*fetch(image)
        .then(res => res.json())
        .then(result => {
            console.log(result)
            image.src = result.message
        })
        .catch(err =>console.log(err))
    //.then(response => drawLeftBuffer(response))*/
 });

 socket.on("start",  (image)=>{
    start_state = !start_state;
    if (image) {
        var raw = new Image();
        raw.src = "data:image/jpeg;base64," + image
        raw.onload = function() {
            img = createImage(raw.width, raw.height);
            img.drawingContext.drawImage(raw, 0, 0);
            drawLeftBuffer(img)
        }
    }
    //console.log(image)
    //int_counter()
});

socket.on("turn", (pX, pY)=> {
    leftBuffer(img = "", pX, pY)
})

var counter_element =  
function int_counter(){
    document.querySelector("counter")
}


