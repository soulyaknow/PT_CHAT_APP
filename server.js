const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);

const io = socketio(server);

app.use(express.json());

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/client/index.html");
})

app.post("/chats", (req, res)=>{

    const {username, password, firstname, lastname, gender} = req.body;

    const query = "INSERT INTO users(username, password, firstname, lastname, gender) VALUES(?, ?, ?, ?, ?)";

    con.query(query, [username, password, firstname, lastname, gender], (err, result)=>{

        console.log(result);

        if(!err){
            return res.status(201).json({message: "Successfully created"});
        }
        
        return res.status(500).json({message: "Server Error."});
    });

});

io.on("connection", (socket) =>{

    console.log("connected");

    socket.on("chat message", (message) =>{

        io.emit("chat message", message);

    });

    socket.on("disconnect", ()=>{
        console.log("disconnected");


    });


});


server.listen(4000, () =>{
    console.log("Server listening on PORT 4000");
});


