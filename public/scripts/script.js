const PEERS = {}
const VIDADDED = {}
const MAIN = "main" 

const socket = io("/")
const peer = new Peer()

const requestStream = async () => navigator.mediaDevices.getUserMedia({ video: true, audio: true })


let videoGrid = document.getElementById("video-grid")
let myVideo = document.getElementById("myVideo")

const addVideo = (id, stream) => {
    if(!VIDADDED[id]){
        console.log
        const video = document.createElement("video")
        video.addEventListener('loadedmetadata', () => video.play())
        video.srcObject = stream;
        videoGrid.appendChild(video);
        VIDADDED[id] = video
    }
}

const removeVideo = (id) => {
    if(VIDADDED[id]) {
        VIDADDED[id].remove()
    }
}

(async () => {
    const myVideo = document.getElementById("myVideo")
    myVideo.muted = true
    myVideo.addEventListener('loadedmetadata', () => myVideo.play())
    myVideo.srcObject = await requestStream()
})()



