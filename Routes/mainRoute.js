const express = require("express")
const route = express.Router()
const {v4: uuidV4} = require('uuid')

// on Main Visit Return with Some Room
route.get('/', (req, res)=>{
    res.redirect(`/${uuidV4()}`)
})

// Join Room
route.get('/:room',(req,res)=>{
    res.render('room', {roomid:req.params.room})
})

module.exports = route;