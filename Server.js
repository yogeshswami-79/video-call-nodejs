const express = require("express");
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server,{cors: {origin: "*"}})
const PORT = process.env.PORT || 3001
// const { ExpressPeerServer, PeerServer } = require("peer")

// Handle Socket events
const handleSocket = socket => {
    socket.on('join-room', (roomId, uid) => {
        console.log(`connected uid: ${uid}`)

        // Join Room
        socket.join(roomId)
        
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