const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const mysql = require("mysql2");
const io = socketio(server);

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chat_db"
});

app.use(express.json());
app.use(express.static("public"));

//routes

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/client/login.html");
})

app.get("/reg", (req, res) =>{
    res.sendFile(__dirname + "/client/register.html");
})

app.get("/landing", (req, res) =>{
    res.sendFile(__dirname + "/client/landing.html");
})

//api

app.post("/login", (req, res)=> {

    const {username, password} = req.body;

    const query = "SELECT * FROM users WHERE username = ? AND password = ?";

    con.query(query, [username, password], (err, result) =>{
        if(!err){
            return res.status(200).json({login: 1});
        }
        return res.status(500).json({message: "Server errror."});
    });
});

app.post("/register", (req, res)=>{

    const {username, password, firstname, lastname, gender} = req.body;

    const query = "INSERT INTO users(username, password, firstname, lastname, gender) VALUES(?, ?, ?, ?, ?)";

    con.query(query, [username, password, firstname, lastname, gender], (err, result)=>{

        console.log(result);

        if(!err){
            return res.status(201).json({message: 200});
        }
        
        return res.status(500).json({message: "Server Error."});
    });

});

//sending message
app.post("/chats", (req, res)=>{

    const {sender, receiver, message, files} = req.body;

    const query = "INSERT INTO chats(sender, receiver, message, files) VALUES(?, ?, ?, ?)";

    con.query(query, [sender, receiver, message, files], (err, result)=>{

        console.log(result);

        if(!err){
            return res.status(201).json({message: "Successfully created"});
        }
        
        return res.status(500).json({message: "Server Error."});
    });

});

//get message
app.get("/chats:id", (req, res)=> {

    const query = "SELECT * FROM chats";

    con.query(query, (err, result) =>{
        if(!err){
            return res.status(200).json(result);
        }
        return res.status(500).json({message: "Server errror."});
    });
});

//edit message
app.put("/chats/:id", (req, res)=>{

    const {message} = req.body;
    const id = req.params.id;

    const query = "UPDATE chats SET message = ? WHERE product_id = ? ";

    con.query(query, [message,id], (err, result)=>{

        console.log(result);
        if(!err){
            return res.status(204).json({message: "Successfully updated."});
        }
        return res.status(500).json({message: "Server errror."});
    });
});

//delete message
app.delete("/chats/:id", (req, res) =>{
    const id = req.params.id;

    const query = "DELETE FROM chats WHERE product_id = ?";

    con.query(query, [id], (err, result)=>{
        
        console.log(result);

        if(!err){
            if(result.affectedRows > 0){
                return res.status(200).json({message: "Successfully deleted."});
            }
            return res.status(404).json({message: "message not found"});
           
        }
        return res.status(500).json({message: "Server errror."});
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


