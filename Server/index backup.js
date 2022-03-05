const express = require("express");
const app = express();
const server = require("http").createServer(app)
var io = require('socket.io')(server, {cors : {origin:"*"}});
var fs = require('fs');
var _ = require('lodash');
const port = process.env.Port || 5000

//Users
var users = {}
var gamestate = false;

app.get("/", (req, res) =>{
    res.status(200).json({
        message: "Welcome to the server"
    })
});

app.use(express.static(__dirname + '/node_modules'));

var tmp_image = fs.readFileSync('Images/rousseau.jpg', {encoding: 'base64'});;
var playerlist = []

io.on('connection', (socket) => {
    var user_id = socket.id
    //console.log("User connected:" +socket.id);

    //joining via Name entry
    socket.on("join", (data)=>{
        users[socket.id] = {"Name": data,
                            "Gamestate" : gamestate}
        
        //user = new Player(socket.id, data)
        io.emit("new user", data);
    });

    //Disconnect
    socket.on("disconnect", () => {
        console.log(`Player ${users[socket.id]} disconnected!`);
        io.emit("user left", )
        delete users[socket.id];
    });

    //Changing state to rdy
    socket.on("rdy", () => {
        
        _.set(users, `${user_id}.Gamestate`, true);
        console.log(`Player ${socket.id} is ready`)

        bol_gamestate = []
        _.forOwn(users, function(value, key){
            bol_gamestate.push(value.Gamestate)
        })
        //console.log(bol_gamestate)

        //Check if all are ready
        if(bol_gamestate.every(
                (value) =>{return value;}
        )){
            console.log("game is ready to start");
            io.emit("gamestart")
            var player_iterator = Object.keys(users).length;
            console.log("Turn: "+ player_iterator)
            //console.log(Object.keys(users)[0])
            io.to(Object.keys(users)[0]).emit("turn", tmp_image.toString('base64'));
            //io.emit("gamestart", 15, "https://picsum.photos/200/300")
        }
        
    });
    
});

server.listen(5000, ()=> {
    console.log(`listening on ${port}`)
})

class Gamehandler{
    constructor(){
        this.player_count = 0
    }
    increase_player_count(){
        this.player_count+= 1
    }
    decrease_player_count(){
        this.player_count-= 1
    }
}

class Player{
    constructor(socket_id, name){
        this.socket_id = socket_id
        this.name = name
        this.gamestate = false
    }
    gamestate(bol){
        !this.gamestate
    }
}