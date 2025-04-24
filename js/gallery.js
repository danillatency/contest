import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

let sheetResponseBounded = []
let filesResponseBounded = []
let filesResponseBoundedIterator

let apiKey = "AIzaSyAaK_K5ZedO5Gez6qd45s--Djk8XyqeBBw"

async function someBrowsersDoNotSupportGlobalAwaits() {
    let responseAwaits = 1

    let filesResponse
    let sheetResponse

    while (true) {
        filesResponse = await fetch(`https://www.googleapis.com/drive/v3/files?q='1XnpYhqCU8oXx0CC6t5drUXf1vTuBWd89'+in+parents&key=${apiKey}`)
        if (filesResponse["status"] == 200) {
            filesResponse = await filesResponse.json()
            break
        } else {
            responseAwaits += 1
            let time = 2 ** responseAwaits * 1000 + Math.random() * 1000
            changeVariant(time)
            await new Promise(resolve => setTimeout(resolve, time))
        }
    }

    responseAwaits = 1

    while (true) {
        sheetResponse = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1jwUkf-3rJOq5YfDgJVBH6LxURf6eGridgJb_oOIipr4/values/Sheet1?key=${apiKey}`)
        if (sheetResponse["status"] == 200) {
            sheetResponse = await sheetResponse.json()
            break
        } else {
            responseAwaits += 1
            let time = 2 ** responseAwaits * 1000 + Math.random() * 1000
            changeVariant(time)
            await new Promise(resolve => setTimeout(resolve, time))
        }
    }
    sheetResponse["values"].reverse()

    responseAwaits = 1

    for (let [i, elem] of sheetResponse["values"].entries()) {
        if (elem.length == 3 && elem[0] != "For which model is this texture for?") {
            sheetResponseBounded.push(sheetResponse["values"][i])
            filesResponseBounded.push(filesResponse["files"][i])
        }
    }

    for (let elem of filesResponseBounded) {
        let thumbnailResponse
        while (true) {
            thumbnailResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${elem["id"]}?fields=thumbnailLink&key=${apiKey}`)
            if (thumbnailResponse["status"] == 200) {
                thumbnailResponse = await thumbnailResponse.json()
                break
            } else {
                responseAwaits += 1
                let time = 2 ** responseAwaits * 1000 + Math.random() * 1000
                changeVariant(time)
                await new Promise(resolve => setTimeout(resolve, time))
            }
        }
        try {
            elem.thumbnailLink = thumbnailResponse["thumbnailLink"].slice(0, thumbnailResponse["thumbnailLink"].indexOf("=s")) + "=s600"
        } catch (e) {
            elem.thumbnailLink = null
        }

        responseAwaits = 1

        let placeholder = document.createElement("div")
        placeholder.classList.add("grid__placeholder-item")
        document.querySelector(".grid").appendChild(placeholder)
    }

    filesResponseBoundedIterator = filesResponseBounded.entries()
    createPreviews()
}
someBrowsersDoNotSupportGlobalAwaits()

let camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
let renderer = new THREE.WebGLRenderer({ antialias: true })
let loader = new GLTFLoader()
let light = new THREE.HemisphereLight(0xffffff, 0x717173, 3)
let material = new THREE.MeshStandardMaterial()
camera.position.z = 100
renderer.setSize(1200, 1200)
async function createPreviews() {
    let res = filesResponseBoundedIterator.next()
    if (res.done)
        return
    let [i, file] = res.value

    let responseAwaits = 1

    let blobResponse
    while (true) {
        blobResponse = file["thumbnailLink"] == null ? null : (await fetch(`${file["thumbnailLink"]}`))
        if (blobResponse != null && blobResponse["status"] == 200) {
            blobResponse = await blobResponse.blob()
            break
        } else {
            blobResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${file["id"]}?key=${apiKey}&alt=media`)
            if (blobResponse["status"] == 200) {
                blobResponse = await blobResponse.blob()
                break
            } else {
                responseAwaits += 1
                let time = 2 ** responseAwaits * 1000 + Math.random() * 1000
                changeVariant(time)
                await new Promise(resolve => setTimeout(resolve, time))
            }
        }
    }

    let bitmap = await window.createImageBitmap(blobResponse)
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
    manipulativeCanvas.toBlob(blobResponse => {
        renderer.setClearColor(sheetResponseBounded[i][1].length == 7 ?
            parseInt(sheetResponseBounded[i][1].replace("#", ""), 16) : 0x16161a, 1)
        let forModel = sheetResponseBounded[i][0]

        loader.load({
            "T-Shirt": "/models/TShirt.glb",
            "Cap": "/models/Cap.glb",
            "Pants": "/models/Pants.glb",
            "Hoodie": "/models/Hoodie.glb"
        }[forModel], function (gltf) {
            gltf.scene.add(light)
            const loadMeshTextureAndNormals = () => new Promise((resolve, reject) => {
                const manager = new THREE.LoadingManager(() => resolve(textureAndNormals))
                const textureAndNormals = [
                    (new THREE.TextureLoader(manager)).load(URL.createObjectURL(blobResponse)),
                    (new THREE.TextureLoader(manager)).load({
                        "T-Shirt": "/images/T_TShirt_NL_8K.png",
                        "Cap": "/images/T_Cap_NL_8K.png",
                        "Pants": "/images/T_Pants_NL_8K.png",
                        "Hoodie": "/images/T_Hoodie_NL_8K.png",
                    }[forModel]),
                ]
            })
            loadMeshTextureAndNormals().then(result => {
                result[0].flipY = false
                result[1].flipY = false
                material.map = result[0]
                material.normalMap = result[1]
                gltf.scene.traverse(o => {
                    if (o.isMesh) {
                        o.material = material
                    }
                })
                renderer.clear()
                renderer.render(gltf.scene, camera)
                let copiedCanvas = document.createElement("canvas")
                copiedCanvas.classList.add("wide")
                copiedCanvas.setAttribute("width", 1200)
                copiedCanvas.setAttribute("height", 1200)
                copiedCanvas.getContext("2d").drawImage(renderer.domElement, 0, 0)
                document.querySelectorAll(".grid__placeholder-item")[i].appendChild(copiedCanvas)
                document.querySelectorAll(".grid__placeholder-item")[i].style = "background: unset; aspect-ratio: unset;"
                document.querySelectorAll(".grid__placeholder-item")[i].addEventListener("click", () => {
                    window.location.href = `https://contest.innohassle.ru/artwork.html?id=${filesResponseBounded[i]["id"]}`
                })
                createPreviews()
            })
        }, undefined, function (error) {
            console.error(error)
        })
        manipulativeCanvas.remove()
    })
}

// burger
document.querySelector(".burger").addEventListener("click", () => {
    document.querySelector(".burger__line-1").classList.toggle("burger__line-1_full")
    document.querySelector(".navigation-bar__menu").classList.toggle("top-100")
})

let loadingOpacity = 1
function loadingGradualDisappearing() {
    loadingOpacity -= 0.01
    loadingOpacity = Math.max(loadingOpacity, 0)
    document.querySelector(".loading").style.opacity = loadingOpacity
    setTimeout(loadingGradualDisappearing, 40)
}
loadingGradualDisappearing()

function changeVariant(time) {
    document.querySelector(".figure__text").textContent = `The request for artworks is unsuccessful`
    document.querySelector(".bottom-subfont").textContent = `We are going to try again in ${Math.round(time / 1000)} seconds`
    loadingOpacity = 1
}
