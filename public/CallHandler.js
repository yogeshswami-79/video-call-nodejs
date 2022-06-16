
const handleCall = (call) => {
    call.on('stream', (stream) => addVideo(call.connectionId, stream))
    call.on('close', () => removeVideo(call.connectionId))
}


peer.on('call',async (call) => {
    const myStream = await requestStream()
    // await call.answer(myStream);
    call.answer(myStream);
    PEERS[MAIN] = call

    handleCall(call)
})

peer.on('open', id => {
    // TODO: emit room id and uid
    emitUserId(id)
})


const makeCall = (userId, stream) => {
    const call = peer.call(userId, stream);
    PEERS[userId] = call

    handleCall(call)
}

const closeCall = (userId) => {
    if (PEERS[userId]) {
        PEERS[userId].close()
        return;
    }
    PEERS[MAIN].close()
}


