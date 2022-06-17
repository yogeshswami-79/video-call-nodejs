socket.on('user-connected', userId => {
    makeCall(userId, myVideo.srcObject)
})


socket.on('user-disconnected', userId => {
    closeCall(userId)
})


const emitUserId = (id) => {
    socket.emit("join-room", ROOM_ID, id)
}