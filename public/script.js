
window.addEventListener('DOMContentLoaded', e => {
    const socket = io('/')
    const main = "main"
    const peer = new Peer()
    
    const peers = {}

    const videoGrid = document.getElementById("video-grid")
    const myVideo = document.createElement("video")
    const copyBtn = document.getElementById("copy-txt");

    myVideo.className = "yoyo"
    myVideo.muted = true;

    const addVideo = (video, stream) => {
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => video.play())
        videoGrid.appendChild(video);
    }

    const handleCall = call => {
        const vid = document.createElement('video')

        call.on('stream', stream => {
            addVideo(vid, stream)
        })

        call.on('close', () => {
            vid.remove()
        })
    }

    const getVideoStream = async () => {
        const stream = await navigator.mediaDevices.getUserMedia(
            {
                video: true,
                audio: true
            })

        addVideo(myVideo, stream);

        peer.on('call', (call) => {
            call.answer(stream)
            peers[main] = call
            handleCall(call)
        })


        socket.on('user-connected', userId => {
            const call = peer.call(userId, stream)
            peers[userId] = call;
            handleCall(call)
        })



        socket.on('user-disconnected', uid => {
            if (peers[uid]) {
                peers[uid].close()
            }
            else {
                if (peers[main]){
                    peers[main].close()
                }
            }
        })

    }



    getVideoStream()


    peer.on('open', id => {
        socket.emit("join-room", ROOM_ID, id)

        copyBtn.addEventListener("click", () => {
            const roomUrl = `localhost:3000/${ROOM_ID}`
            navigator.clipboard.writeText(roomUrl)
        })
    })
})