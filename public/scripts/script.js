const PEERS = {}
const VIDADDED = {}
const MAIN = "main"
const socket = io("/")
const peer = new Peer()
let hidden = false


const requestStream = async () => navigator.mediaDevices.getUserMedia({ video: true, audio: true })

let videoGrid = document.getElementById("video-grid")
let myVideo = document.getElementById("myVideo")

const updateVisibility = () => {
    let anim = 'show'
    if(hidden) anim = "fade"
    myVideo.style.animation = `${anim} 1.2s forwards running`

    hidden = !hidden
}

const addVideo = (id, stream) => {
    if (!VIDADDED[id]) {
        console.log
        const video = document.createElement("video")
        video.addEventListener('loadedmetadata', () => video.play())
        video.srcObject = stream;
        videoGrid.appendChild(video);
        VIDADDED[id] = video
    }
}

const removeVideo = (id) => {
    if (VIDADDED[id]) {
        VIDADDED[id].remove()
    }
}

(async () => {
    myVideo.muted = true
    myVideo.addEventListener('loadedmetadata', () => myVideo.play())
    myVideo.addEventListener('click', updateVisibility)
    myVideo.srcObject = await requestStream()
    requestStreamA()
})()



