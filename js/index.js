import "https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js"

if (!CSS.supports("animation-timeline", "scroll()")) {
    let animations = []

    function populateWithAnimations() {
        animations.push(document.querySelector(".navigation-bar-support").animate(
            [
                { backgroundColor: "var(--bg)" },
                { backgroundColor: "var(--bc)" }
            ],
            {
                fill: "both",
                timeline: new ScrollTimeline(),
                rangeStart: `${window.innerHeight}px`,
                rangeEnd: `${2000 + window.innerHeight}px`
            }
        ))
        animations.push(document.querySelector(".navigation-bar-support").animate(
            [
                { zIndex: 0, offset: 0.9 },
                { zIndex: 100, offset: 1.0 },
            ],
            {
                fill: "both",
                timeline: new ScrollTimeline(),
                rangeStart: `${window.innerHeight}px`,
                rangeEnd: `${2000 + window.innerHeight}px`
            }
        ))
        animations.push(document.querySelector(".background-1").animate(
            [
                { opacity: 1, transform: "scale(1)" },
                { opacity: 0, transform: "scale(4)" }
            ],
            {
                fill: "both",
                timeline: new ViewTimeline({
                    subject: document.querySelector(".background-1")
                }),
                rangeStart: `${window.innerHeight}px`,
                rangeEnd: `${window.innerHeight + 2000}px`
            }
        ))
        animations.push(document.querySelector("h1").animate(
            {
                opacity: [1, 0]
            },
            {
                fill: "both",
                timeline: new ViewTimeline({
                    subject: document.querySelector("h1")
                }),
                rangeStart: `${window.innerHeight}px`,
                rangeEnd: `${window.innerHeight * 1.5}px`
            }
        ))
        animations.push(document.querySelector("h4").animate(
            {
                opacity: [0, 1]
            },
            {
                fill: "both",
                timeline: new ViewTimeline({
                    subject: document.querySelector("h4")
                }),
                rangeStart: "0px",
                rangeEnd: `50%`
            }
        ))
        animations.push(document.querySelector("h5").animate(
            {
                opacity: [0, 1]
            },
            {
                fill: "both",
                timeline: new ViewTimeline({
                    subject: document.querySelector("h5")
                }),
                rangeStart: "0px",
                rangeEnd: `50%`
            }
        ))
        animations.push(document.querySelector("h6").animate(
            {
                opacity: [0, 1]
            },
            {
                fill: "both",
                timeline: new ViewTimeline({
                    subject: document.querySelector("h6")
                }),
                rangeStart: "0px",
                rangeEnd: `50%`
            }
        ))
        for (let elem of document.querySelectorAll(".figure__stickers__item")) {
            animations.push(elem.animate(
                [
                    { opacity: 0, transform: "rotateZ(180deg) scale(0.2)", offset: 1.0 }
                ],
                {
                    fill: "both",
                    timeline: new ViewTimeline({
                        subject: elem
                    }),
                    rangeStart: "0px",
                    rangeEnd: "150%"
                }
            ))
        }
        animations.push(document.querySelector(".space-for-horizontal-scrolling").animate(
            [
                { opacity: 0, offset: 1.0 }
            ],
            {
                fill: "both",
                timeline: new ViewTimeline({
                    subject: document.querySelector(".space-for-horizontal-scrolling")
                }),
                rangeStart: `${(window.getComputedStyle(document.body).getPropertyValue("--count-of-slides") * 2 - 1) * window.innerHeight + window.innerHeight / 4}px`,
                rangeEnd: `${(window.getComputedStyle(document.body).getPropertyValue("--count-of-slides") * 2) * window.innerHeight + window.innerHeight / 4}px`
            }
        ))
        animations.push(document.querySelector(".pipeline").animate(
            [
                { transform: "translateX(calc((var(--count-of-slides) - 5) * -100dvw))", offset: 0.0 },
                { transform: "translateX(calc((var(--count-of-slides) - 5) * -100dvw))", offset: 0.16 },
                { transform: "translateX(calc((var(--count-of-slides) - 4) * -100dvw))", offset: 0.2 },
                { transform: "translateX(calc((var(--count-of-slides) - 4) * -100dvw))", offset: 0.36 },
                { transform: "translateX(calc((var(--count-of-slides) - 3) * -100dvw))", offset: 0.4 },
                { transform: "translateX(calc((var(--count-of-slides) - 3) * -100dvw))", offset: 0.56 },
                { transform: "translateX(calc((var(--count-of-slides) - 2) * -100dvw))", offset: 0.6 },
                { transform: "translateX(calc((var(--count-of-slides) - 2) * -100dvw))", offset: 0.76 },
                { transform: "translateX(calc((var(--count-of-slides) - 1) * -100dvw))", offset: 0.8 },
                { transform: "translateX(calc((var(--count-of-slides) - 1) * -100dvw))", offset: 0.96 },
                { transform: "translateX(calc((var(--count-of-slides) - 1) * -100dvw))", offset: 1.0 }
            ],
            {
                fill: "both",
                timeline: new ScrollTimeline(),
                rangeStart: `${window.innerHeight + 2000}px`,
                rangeEnd: `${window.innerHeight + 2000 + (window.getComputedStyle(document.body).getPropertyValue("--count-of-slides") * 2 - 1) * window.innerHeight}px`
            }
        ))
        for (let [i, elem] of document.querySelectorAll(".pipeline__fullscreen-slide").entries()) {
            if (i == 4)
                break
            animations.push(elem.animate(
                [
                    { opacity: 1, transform: "scale(1)", offset: 0 },
                    { opacity: 0, transform: "scale(3)", offset: 0.9999 },
                    { opacity: 0, offset: 1.0 }
                ],
                {
                    fill: "both",
                    timeline: new ScrollTimeline(),
                    rangeStart: `${2000 + window.innerHeight + 7.2 * window.innerHeight / 4 * (i + 1) - 7.2 * window.innerHeight / 20}px`,
                    rangeEnd: `${2000 + window.innerHeight + 7.2 * window.innerHeight / 4 * (i + 1)}px`
                }
            ))
        }
        for (let elem of document.querySelectorAll(".slide__logotypes__item")) {
            animations.push(elem.animate(
                [
                    { opacity: 0, transform: "scale(3)", offset: 0.9999 },
                    { opacity: 0, offset: 1.0 }
                ],
                {
                    fill: "both",
                    timeline: new ScrollTimeline(),
                    rangeStart: `${2000 + window.innerHeight + 7.2 * window.innerHeight / 4 * (2 + 1)}px`,
                    rangeEnd: `${2000 + window.innerHeight + 7.2 * window.innerHeight / 4 * (3 + 1)}px`
                }
            ))
        }
        animations.push(document.querySelector(".carousel__pipeline").animate(
            [
                { transform: "translateX(-50%)" }
            ],
            {
                fill: "both",
                timeline: new ViewTimeline({
                    subject: document.querySelector(".carousel__pipeline")
                }),
                rangeStart: "0%",
                rangeEnd: "100%"
            }
        ))
        for (let elem of document.querySelectorAll(".example")) {
            animations.push(elem.animate(
                [
                    { clipPath: "inset(0 0 0 0)", opacity: 1, offset: 0.5 },
                    { clipPath: "inset(0 0 0 0)", opacity: 1, offset: 0.6 },
                    { clipPath: "inset(0 0 0 0)", opacity: 1, offset: 1.0 }
                ],
                {
                    fill: "both",
                    timeline: new ViewTimeline({
                        subject: elem
                    }),
                    rangeStart: "0%",
                    rangeEnd: "100%"
                }
            ))
        }
        animations.push(document.querySelector(".underline").animate(
            [
                { opacity: 1 }
            ],
            {
                fill: "both",
                timeline: new ViewTimeline({
                    subject: document.querySelector("h5")
                }),
                rangeStart: "0%",
                rangeEnd: "50%"
            }
        ))
    }
    let populateWithAnimationsCall
    window.addEventListener("resize", () => {
        clearTimeout(populateWithAnimationsCall)
        populateWithAnimationsCall = setTimeout(() => {
            for (let animation of animations)
                animation.cancel()
            populateWithAnimations()
        }, 1000)
    })
    populateWithAnimations()
}



import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

let currentModelIdentifier = 1
let identifiers = [0, 1, 2, 3, 4]
const models = ["models/TShirt.glb", "models/Hoodie.glb", "models/Cap.glb", "models/Pants.glb", "models/Lantern.glb"]
const scenes = []
const cameras = []
const renderers = []
const loaders = []
const lights = []
const clocks = []
const deltas = []
for (let i of identifiers) {
    scenes.push(new THREE.Scene())
    cameras.push(new THREE.PerspectiveCamera(75, 1, 0.1, 1000))
    renderers.push(new THREE.WebGLRenderer({ antialias: true }))
    loaders.push(new GLTFLoader())
    lights.push(new THREE.HemisphereLight(0xffffff, 0x717173, 3))
    clocks.push(new THREE.Clock())
    deltas.push(0)
}

let times = 5
for (let i of identifiers) {
    loaders[i].load(models[i], function (gltf) {
        scenes[i].add(gltf.scene)
        if (i != 4) {
            let normals = (new THREE.TextureLoader()).load(models[i].replace("models/", "images/T_").replace(".glb", "_NL_8K.png"))
            normals.flipY = false
            gltf.scene.traverse(o => {
                if (o.isMesh) {
                    o.material = new THREE.MeshStandardMaterial({ normalMap: normals })

                }
            })
        }
        models[i] = gltf.scene
        times -= 1
        if (times == 0)
            document.querySelector(".loading").remove()
    }, undefined, function (error) {
        console.error(error)
    })

    cameras[i].position.z = 100
    scenes[i].add(lights[i])
    renderers[i].setSize(window.innerWidth < 800 ? 480 : 1080, window.innerWidth < 800 ? 480 : 1080)
    renderers[i].setClearColor(0x16161a, 0)
    renderers[i].setAnimationLoop(() => {
        deltas[i] += clocks[i].getDelta()
        if (deltas[i] > 0.04) {
            renderers[i].render(scenes[i], cameras[i])
            if (i != 4)
                try {
                    models[i].rotation.y += 0.02
                } catch { }
            deltas[i] = 0
        }
    })
    if (i == 4) {
        document.querySelector(".horizontal-text-block").appendChild(renderers[i].domElement)
        renderers[i].domElement.classList.add("single-3d")
        continue
    }
    document.querySelector(".slide__window").appendChild(renderers[i].domElement)
    renderers[i].domElement.classList.add("slide__window__model")
    renderers[i].domElement.setAttribute("id", `icon${i}`)
    renderers[i].domElement.addEventListener("click", () => {
        currentModelIdentifier = i
        updatePreviews()
    })
}
updatePreviews()

if (!CSS.supports("animation-timeline", "scroll()")) {
    let invalidAnimation = document.querySelector(".single-3d").animate(
        [
            { opacity: 0.1, transform: "translateY(100%) scale(1.8) translateX(max(-100dvw, -1000px))", offset: 0.8 },
            { opacity: 0.1, transform: "translateY(100%) scale(1.8) translateX(max(-100dvw, -1000px))", offset: 1.0 }
        ],
        {
            fill: "both",
            timeline: new ViewTimeline({
                subject: document.querySelector(".single-3d")
            }),
            rangeStart: "20%",
            rangeEnd: "100%"
        }
    )
    function playInvalid() {
        invalidAnimation.play()
    }
    let observerForInvalidAnimation = new IntersectionObserver((entries) => {
        for (let entry of entries)
            if (entry.isIntersecting)
                document.addEventListener("scroll", playInvalid)
            else
                document.removeEventListener("scroll", playInvalid)
    }, { root: null, rootMargin: "0px", threshold: 0 })
    observerForInvalidAnimation.observe(document.querySelector(".horizontal-text-block"))
}


function updatePreviews() {
    for (let i of identifiers) {
        if (i == 4)
            break
        let currentIcon = document.querySelector(`#icon${i}`)
        for (let style of ["moved_up", "moved_down", "disclosed_up", "disclosed_down"]) {
            currentIcon.classList.remove(style)
        }
        let difference = currentModelIdentifier - i
        let absoluteDifference = Math.abs(difference)
        if (absoluteDifference > 1) {
            currentIcon.classList.add(difference > 0 ? "disclosed_up" : "disclosed_down")
        } else if (absoluteDifference == 1) {
            currentIcon.classList.add(difference > 0 ? "moved_up" : "moved_down")
        }
    }
    for (let elem of document.querySelectorAll(".button"))
        elem.setAttribute("href", elem.getAttribute("data-paths").split(",")[currentModelIdentifier])
    let thingName = document.querySelector(".buttons-text > span")
    thingName.innerHTML = thingName.getAttribute("data-names").split(",")[currentModelIdentifier]
}

// interactions
let previousScrollLocation = window.scrollY
document.addEventListener("scroll", (event) => {
    previousScrollLocation = window.scrollY
    try {
        models[identifiers[identifiers.length - 1]].rotation.y += (previousScrollLocation - window.scrollY > 0 ? 1 : -1) * 0.03
    } catch { }
})



// burger
document.querySelector(".burger").addEventListener("click", burger)
function burger() {
    document.querySelector(".burger__line-1").classList.toggle("burger__line-1_full")
    document.querySelector(".navigation-bar__menu").classList.toggle("top-100")
}


// Intersection observers
let intersectionObserver = new IntersectionObserver(events => {
    for (let event of events) {
        if (event.isIntersecting) {
            document.querySelector(".curve").classList.add("curve_animation")
        } else {
            // document.querySelector(".curve").classList.remove("curve_animation")
        }
    }
}, { root: null, rootMargin: "0px", threshold: 0 })
intersectionObserver.observe(document.querySelector("h5"))

let intersectionObserverContacts = new IntersectionObserver(events => {
    for (let event of events) {
        if (event.isIntersecting) {
            document.querySelector("#tobottom").classList.add("text-link")
            document.querySelector(".navigation-bar__menu__item").classList.remove("text-link")
        } else {
            document.querySelector("#tobottom").classList.remove("text-link")
            document.querySelector(".navigation-bar__menu__item").classList.add("text-link")
        }
    }
}, { root: null, rootMargin: "0px", threshold: 0 })
intersectionObserverContacts.observe(document.querySelector("#contacts"))

// css can't
let dvhRemember = window.innerHeight
function Up(event) {
    // scroll dvh sync
    if (dvhRemember <= previousScrollLocation && previousScrollLocation <= dvhRemember + 2000) {
        window.scrollTo(0, previousScrollLocation + window.innerHeight - dvhRemember)
        previousScrollLocation = previousScrollLocation + window.innerHeight - dvhRemember
    } else {
        let parameter = Math.max(0, Math.min((previousScrollLocation - 2000) / dvhRemember, 11))
        window.scrollTo(0, previousScrollLocation + window.innerHeight * parameter - dvhRemember * parameter)
        previousScrollLocation = previousScrollLocation + window.innerHeight * parameter - dvhRemember * parameter
    }
    dvhRemember = window.innerHeight

    // menu trans enabling
    if (event.target.matchMedia("(width < 475px)")["matches"]) {
        setTimeout(() => { document.querySelector(".navigation-bar__menu").classList.add("trans") }, 500)
    } else {
        setTimeout(() => { document.querySelector(".navigation-bar__menu").classList.remove("trans") }, 500)
    }

    if (event.target.innerHeight > event.target.innerWidth)
    for (let elem of document.querySelectorAll(".slide")) {
        try {
            if (elem.children[1].classList.contains("rounded-image-60")) {
                elem.children[1].setAttribute("style", `height: calc(100% - ${elem.children[0].offsetHeight}px);`)
            }
        } catch { }
    }
}
Up({ target: window })
window.addEventListener("resize", Up)

// gestures recognition
let previousTouchX = 0
let previousTouchY = 0
let threshold = 50
let gestureStarted = false
document.querySelector(".slide__window").addEventListener("touchstart", (event) => {
    previousTouchX = event.touches[0].screenX
    previousTouchY = event.touches[0].screenY
    gestureStarted = true
})
document.querySelector(".slide__window").addEventListener("touchmove", (event) => {
    if (!gestureStarted)
        return
    if (window.matchMedia("(orientation: portrait)")["matches"]) {
        if (event.touches[0].screenX - previousTouchX < -threshold) {
            currentModelIdentifier = Math.min(currentModelIdentifier + 1, 3)
            gestureStarted = false
        } else if (event.touches[0].screenX - previousTouchX > threshold) {
            currentModelIdentifier = Math.max(currentModelIdentifier - 1, 0)
            gestureStarted = false
        }
    } else {
        if (event.touches[0].screenY - previousTouchY < -threshold) {
            currentModelIdentifier = Math.min(currentModelIdentifier + 1, 3)
            gestureStarted = false
        } else if (event.touches[0].screenY - previousTouchY > threshold) {
            currentModelIdentifier = Math.max(currentModelIdentifier - 1, 0)
            gestureStarted = false
        }
    }

    updatePreviews()
})
document.querySelector(".slide__window").addEventListener("touchend", (event) => {
    gestureStarted = false
})
