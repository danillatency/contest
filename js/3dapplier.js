import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

let currentModelIdentifier = 0
let identifiers = [0, 1, 2, 3]
const models = ["/models/TShirt.glb", "/models/Hoodie.glb", "/models/Cap.glb", "/models/Pants.glb"]
const scenes = []
const cameras = []
const renderers = []
const loaders = []
const lights = []
for (let i of identifiers) {
    scenes.push(new THREE.Scene())
    cameras.push(new THREE.PerspectiveCamera(75, 1, 0.1, 1000))
    renderers.push(new THREE.WebGLRenderer({ antialias: true }))
    loaders.push(new GLTFLoader())
    lights.push(new THREE.HemisphereLight(0xffffff, 0x717173, 3))
}

const minimodels = ["/models/TShirt.glb", "/models/Hoodie.glb", "/models/Cap.glb", "/models/Pants.glb"]
const miniscenes = []
const minicameras = []
const minirenderers = []
const miniloaders = []
const minilights = []
const clocks = []
const deltas = []
for (let i of identifiers) {
    miniscenes.push(new THREE.Scene())
    minicameras.push(new THREE.PerspectiveCamera(50, 1, 0.1, 1000))
    minirenderers.push(new THREE.WebGLRenderer({ antialias: true }))
    miniloaders.push(new GLTFLoader())
    minilights.push(new THREE.HemisphereLight(0xffffff, 0x000000, 3))
    clocks.push(new THREE.Clock())
    deltas.push(0)
}

// initialize models
let times = 8
for (let i of identifiers) {
    loaders[i].load(models[i], function (gltf) {
        scenes[i].add(gltf.scene)
        let texture = (new THREE.TextureLoader()).load("/images/White.png")
        texture.flipY = false
        let normals = (new THREE.TextureLoader()).load(models[i].replace("models/", "images/T_").replace(".glb", "_NL_8K.png"))
        normals.flipY = false
        gltf.scene.traverse(o => {
            if (o.isMesh) {
                o.material = new THREE.MeshStandardMaterial({ map: texture, normalMap: normals })
            }
        })
        models[i] = gltf.scene
        times -= 1
        if (times == 0)
            document.querySelector(".loading").remove()
    }, undefined, function (error) {
        console.error(error)
    })

    cameras[i].position.z = 150
    scenes[i].add(lights[i])
    renderers[i].setSize(1920, 1920)
    renderers[i].setClearColor(0x16161a, 0)
    renderers[i].setAnimationLoop(() => {
        renderers[i].render(scenes[i], cameras[i])
    })
    document.querySelector(`#viewer${i}`).appendChild(renderers[i].domElement)
    renderers[i].domElement.classList.add("viewer__window")
}

// initialize minimodels
for (let i of identifiers) {
    miniloaders[i].load(minimodels[i], function (gltf) {
        miniscenes[i].add(gltf.scene)
        gltf.scene.traverse(o => {
            if (o.isMesh) {
                let normals = (new THREE.TextureLoader()).load(minimodels[i].replace("models/", "images/T_").replace(".glb", "_NL_8K.png"))
                normals.flipY = false
                o.material = new THREE.MeshStandardMaterial({ normalMap: normals })
            }
        })
        minimodels[i] = gltf.scene
        times -= 1
        if (times == 0)
            document.querySelector(".loading").remove()
    }, undefined, function (error) {
        console.error(error)
    })

    minicameras[i].position.z = 150
    miniscenes[i].add(minilights[i])
    minirenderers[i].setSize(500, 500)
    minirenderers[i].setClearColor(0x2b2b2c, 0)
    minirenderers[i].setAnimationLoop(() => {
        deltas[i] += clocks[i].getDelta()
        if (deltas[i] > 0.04) {
            minirenderers[i].render(miniscenes[i], minicameras[i])
            try {
                minimodels[i].rotation.y += 0.02
            } catch { }
            deltas[i] = 0
        }
    })
    document.querySelector(".control-panel__window").appendChild(minirenderers[i].domElement)
    minirenderers[i].domElement.classList.add("control-panel__window__model")
    minirenderers[i].domElement.setAttribute("id", `icon${i}`)
    minirenderers[i].domElement.addEventListener("click", () => {
        currentModelIdentifier = i
        updateEverything()
    })
}
updateEverything()

function updateEverything() {
    for (let i of identifiers) {
        let currentIcon = document.querySelector(`#icon${i}`)
        for (let style of ["moved_up", "moved_down", "disclosed_up", "disclosed_down"]) {
            currentIcon.classList.remove(style)
        }
        if (Math.abs(currentModelIdentifier - i) > 1) {
            currentIcon.classList.add(currentModelIdentifier - i > 0 ? "disclosed_up" : "disclosed_down")
        } else if (Math.abs(currentModelIdentifier - i) == 1) {
            currentIcon.classList.add(currentModelIdentifier - i > 0 ? "moved_up" : "moved_down")
        }
    }
    document.querySelector(".viewers").style.transform = `translateX(calc(${document.querySelector(".viewer").clientWidth}px * -${currentModelIdentifier}))`

    document.querySelector("#hint").setAttribute("href", document.querySelector("#hint").getAttribute("data-hrefs").split(',')[currentModelIdentifier])
    document.querySelector("#bw").setAttribute("href", document.querySelector("#bw").getAttribute("data-hrefs").split(',')[currentModelIdentifier])
    document.querySelector("#model").setAttribute("href", document.querySelector("#model").getAttribute("data-hrefs").split(',')[currentModelIdentifier])
}

// scene manipulations
let sensetivity = 1 / 100
document.addEventListener("mousemove", (event) => {
    if (event.buttons == 1) {
        models[currentModelIdentifier].rotation.y += event.movementX * sensetivity
        models[currentModelIdentifier].rotation.x += event.movementY * sensetivity
    }
})
let previousTouchX = 0
let previousTouchY = 0
let previousTouchXX = null
let previousTouchYY = null
let scaleMode = false
document.addEventListener("touchstart", (event) => {
    previousTouchX = event.touches[0].screenX
    previousTouchY = event.touches[0].screenY
    if (event.touches.length > 1) {
        scaleMode = true
        previousTouchXX = event.touches[1].screenX
        previousTouchYY = event.touches[1].screenY
    }
})
document.addEventListener("touchmove", (event) => {
    if (scaleMode) {
        let delta = Math.sqrt((previousTouchX - previousTouchXX) ** 2 + (previousTouchY - previousTouchYY) ** 2)
        delta -= Math.sqrt((event.touches[1].screenX - event.touches[0].screenX) ** 2 + (event.touches[1].screenY - event.touches[0].screenY) ** 2)
        cameras[currentModelIdentifier].position.z += delta * 25 * sensetivity
        previousTouchXX = event.touches[1].screenX
        previousTouchYY = event.touches[1].screenY
    } else {
        models[currentModelIdentifier].rotation.y += (event.touches[0].screenX - previousTouchX) * sensetivity
        models[currentModelIdentifier].rotation.x += (event.touches[0].screenY - previousTouchY) * sensetivity
    }
    previousTouchX = event.touches[0].screenX
    previousTouchY = event.touches[0].screenY
})
document.addEventListener("touchend", (event) => {
    if (event.touches.length == 0)
        scaleMode = false
})
document.addEventListener("wheel", event => {
    cameras[currentModelIdentifier].position.z += event.deltaY * 5 * sensetivity
})

// change the texture
document.querySelector("form").addEventListener("change", async () => {
    let reader = new FileReader()
    let bitmap = await window.createImageBitmap(document.querySelector("input").files[0])
    let manipulativeCanvas = document.createElement("canvas")
    manipulativeCanvas.setAttribute("width", bitmap.width)
    manipulativeCanvas.setAttribute("height", bitmap.height)
    let context = manipulativeCanvas.getContext("2d")
    context.drawImage(bitmap, 0, 0)
    let imageData = context.getImageData(0, 0, bitmap.width, bitmap.height)
    let data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
        if (data[i] < 3 && data[i + 1] < 3 && data[i + 2] < 3) {
            data[i] = data[i + 1] = data[i + 2] = 3
        }
    }
    context.putImageData(imageData, 0, 0)
    manipulativeCanvas.toBlob(blob => {
        reader.readAsDataURL(blob)
        reader.onload = (e) => {
            let textureLoader = new THREE.TextureLoader()
            let texture = textureLoader.load(e.target.result)
            texture.flipY = false
            models[currentModelIdentifier].traverse(o => {
                if (o.isMesh) {
                    o.material.map = texture
                }
            })
        }
        document.querySelector("form").reset()
        manipulativeCanvas.remove()
    })
})
// change the color
document.querySelectorAll("form")[1].addEventListener("change", (event) => {
    document.querySelector("body").style.backgroundColor = document.querySelector("#j").value
})
// change the sensetivity
document.querySelectorAll("form")[2].addEventListener("change", (event) => {
    sensetivity = document.querySelector("#k").value / 1000
})

let masks = ["/images/T_TShirt_BW_8K.png", "/images/T_Hoodie_BW_8K.png", "/images/T_Cap_BW_8K.png", "/images/T_Pants_BW_8K.png"]
// buttons
document.querySelector("#uv").addEventListener("click", () => {
    let foundModel
    models[currentModelIdentifier].traverse(o => {
        if (o.isMesh) {
            foundModel = o
        }
    })
    document.querySelector("#texture").setAttribute("src", foundModel.material.map.image.getAttribute("src"))
    document.querySelector("#mask").setAttribute("src", masks[currentModelIdentifier])
    document.querySelector(".uv").classList.toggle("none")
})
document.querySelector(".uv").addEventListener("click", (event) => {
    document.querySelector(".uv").classList.toggle("none")
})

document.querySelector("#k").addEventListener("click", () => {
    document.querySelector("#k").classList.toggle("none")
})

let savedSensetivity
document.querySelector("#question").addEventListener("click", () => {
    document.querySelector(".darken").classList.toggle("none")
    document.querySelector(".rules").classList.toggle("none")
    savedSensetivity = sensetivity
    sensetivity = 0
})

document.querySelector(".darken").addEventListener("click", () => {
    document.querySelector(".darken").classList.toggle("none")
    document.querySelector(".rules").classList.toggle("none")
    sensetivity = savedSensetivity
})

// carousel
for (let elem of document.querySelectorAll(".carousel__handle"))
    elem.addEventListener("click", handleClick)
function handleClick(event) {
    let make = false
    for (let elem of (event.target.getAttribute("id") == "right" ? document.querySelectorAll(".carousel__image") : [...document.querySelectorAll(".carousel__image")].reverse())) {
        if (!elem.classList.contains("invisible")) {
            elem.classList.add("invisible")
            make = true
        } else if (make) {
            make = false
            elem.classList.remove("invisible")
        }
    }
    if (make)
        (event.target.getAttribute("id") == "right" ? document.querySelectorAll(".carousel__image") : [...document.querySelectorAll(".carousel__image")].reverse())[0].classList.remove("invisible")
}


// Cream Soda
let probe
window.addEventListener("resize", creamSoda)
function creamSoda(event) {
    probe = document.querySelector(".rules__image")
    if (event.target.innerWidth <= 800 && probe.getAttribute("data-revolution").includes("Revolution")) {
        for (let elem of [...document.querySelectorAll(".rules__image")].concat([...document.querySelectorAll(".carousel__image")].concat([...document.querySelectorAll(".carousel__higher")]))) {
            let dataRevolution = elem.getAttribute("data-revolution")
            elem.setAttribute("data-revolution", elem.getAttribute("src"))
            elem.setAttribute("src", dataRevolution)
        }
    } else if (event.target.innerWidth > 800 && !probe.getAttribute("data-revolution").includes("Revolution")) {
        for (let elem of [...document.querySelectorAll(".rules__image")].concat([...document.querySelectorAll(".carousel__image")].concat([...document.querySelectorAll(".carousel__higher")]))) {
            let dataRevolution = elem.getAttribute("data-revolution")
            elem.setAttribute("data-revolution", elem.getAttribute("src"))
            elem.setAttribute("src", dataRevolution)
        }
    }
}
creamSoda({ target: window })


// gestures recognition
let gesturePreviousTouchX = 0
let gesturePreviousTouchY = 0
let threshold = 50
let gestureStarted = false
document.querySelector(".control-panel__window").addEventListener("touchstart", (event) => {
    gesturePreviousTouchX = event.touches[0].screenX
    gesturePreviousTouchY = event.touches[0].screenY
    gestureStarted = true
})
document.querySelector(".control-panel__window").addEventListener("touchmove", (event) => {
    if (!gestureStarted)
        return
    if (window.matchMedia("(orientation: portrait)")["matches"]) {
        if (event.touches[0].screenX - gesturePreviousTouchX < -threshold) {
            currentModelIdentifier = Math.min(currentModelIdentifier + 1, 3)
            gestureStarted = false
        } else if (event.touches[0].screenX - gesturePreviousTouchX > threshold) {
            currentModelIdentifier = Math.max(currentModelIdentifier - 1, 0)
            gestureStarted = false
        }
    } else {
        if (event.touches[0].screenY - gesturePreviousTouchY < -threshold) {
            currentModelIdentifier = Math.min(currentModelIdentifier + 1, 3)
            gestureStarted = false
        } else if (event.touches[0].screenY - gesturePreviousTouchY > threshold) {
            currentModelIdentifier = Math.max(currentModelIdentifier - 1, 0)
            gestureStarted = false
        }
    }

    updateEverything()
})
document.querySelector(".control-panel__window").addEventListener("touchend", (event) => {
    gestureStarted = false
})
