const express = require("express");
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)
const {v4: uuidV4} = require('uuid')
const PORT = process.env.PORT || 3000
const {PeerServer} = require("peer")
PeerServer(server)

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.redirect(`/${uuidV4()}`)
})

app.get('/:room',(req,res)=>{
    res.render('room', {roomid:req.params.room})
})

io.on("connection",socket=>{
    socket.on('join-room', (roomId,uid)=>{
        socket.join(roomId)

        console.log(`connected uid: ${uid}`)

        io.to(roomId).emit('user-connected', uid);

        socket.on('disconnect', ()=>{
            console.log(`disConnected : ${uid}`)
            io.to(roomId).emit('user-disconnected', uid);
        })
    }) 
})


server.listen(PORT, ()=>console.log(`listening on port:${PORT}`))