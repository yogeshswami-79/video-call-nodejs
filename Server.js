const express = require("express");
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server,{cors: {origin: "*"}})
const homeRoute = require("./Routes/mainRoute")
const PORT = process.env.PORT || 3001
const { PeerServer } = require("peer")

// Init PeerServer Instance
PeerServer({
    hostname:"/",
    port:'3002'
})

// set app ViewEngine to ejs
app.set('view engine', 'ejs')

// app Static Route to public folder
app.use(express.static('public'))


// Handle main Route
app.use("/", homeRoute)

// Handle Socket events
const handleSocket = socket => {
    socket.on('join-room', (roomId, uid) => {
        console.log(`connected uid: ${uid}`)

        // Join Room
        socket.join(roomId)
        
        // BroadCast message event to room
        // socket.on('message', (id, data) => { socket.to(roomId).emit("msg", { id, data }) })
        
        // BroadCast userConnected to room
        socket.to(roomId).emit('newUser', uid);

        // ON user disconnected
        socket.on('disconnect', () => {
            console.log(`disConnected : ${uid}`)
            io.to(roomId).emit('user-disconnected', uid);               // Broadcast user-disconnected to room
        })
    })
}

// On new Socket Connection
io.on("connection", socket => handleSocket(socket))


server.listen(PORT, () => console.log(`listening on port:${PORT}`))