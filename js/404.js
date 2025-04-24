class SheightAnimation {
    constructor() {
        this.direction = true
        this.timer = 0

        this.idle = []
        this.cone = []
        this.movement = []
        this.attack = []
        for (let i = 0; i < 16; i++) {
            this.idle.push(document.createElement("img"))
            this.idle[i].setAttribute("src", `/assets/frames/idle/${`${i + 1}`.padStart(4, '0')}.png`)
            this.idle[i].classList.add("frame")
            document.querySelector(".field").appendChild(this.idle[i])
        }
        for (let i = 0; i < 10; i++) {
            this.cone.push(document.createElement("img"))
            this.cone[i].setAttribute("src", `/assets/frames/cone/${`${i + 1}`.padStart(4, '0')}.png`)
            this.cone[i].classList.add("frame")
            document.querySelector(".field").appendChild(this.cone[i])
        }
        for (let i = 0; i < 16; i++) {
            this.movement.push(document.createElement("img"))
            this.movement[i].setAttribute("src", `/assets/frames/movement/${`${i + 1}`.padStart(4, '0')}.png`)
            this.movement[i].classList.add("frame")
            document.querySelector(".field").appendChild(this.movement[i])
        }
        for (let i = 0; i < 19; i++) {
            this.attack.push(document.createElement("img"))
            this.attack[i].setAttribute("src", `/assets/frames/attack/${`${i + 1}`.padStart(4, '0')}.png`)
            this.attack[i].classList.add("frame")
            document.querySelector(".field").appendChild(this.attack[i])
        }

        this.currentAnimation = this.idle
        this.currentAnimationName = "idle"
        this.changeFrameStyles("transform", "scale(0.85)")
    }

    normalize = (animation, reverse = false) => {
        animation.sort((a, b) => {
            return parseInt(a.getAttribute("src").substring(a.getAttribute("src").lastIndexOf('/') + 1)) - parseInt(b.getAttribute("src").substring(b.getAttribute("src").lastIndexOf('/') + 1))

        })
        if (reverse) {
            animation.reverse()
        }
        for (let el of animation)
            el.classList.remove("display")
    }

    death = () => {
        this.changeFrameStyles("opacity", `${Math.random() * 0.5}`)
        setTimeout(this.death, 500)
    }

    setCurrentAnimation = (animation) => {
        if (animation != "attack") {
            if (animation == this.currentAnimationName || !this.currentAnimation[0].getAttribute("src").includes("0001.png"))
                if (this.currentAnimationName != "cone" || !this.currentAnimation[0].getAttribute("src").includes("0010.png"))
                    return
        }
        if (this.currentAnimationName == "attack")
            this.timer += 1
        this.direction = true
        this.currentAnimation[0].classList.remove("display")
        switch (animation) {
            case "movement": {
                if (this.currentAnimationName == "attack" && this.timer > 19) {
                    this.timer = 0
                }
                if (this.currentAnimationName == "cone") {
                    this.currentAnimationName = "movement"
                    this.currentAnimation = this.movement
                } else if (this.currentAnimationName != "movement") {
                    this.normalize(this.cone)
                    this.currentAnimation = this.cone
                    this.currentAnimationName = "cone"
                }
                break
            }
            case "idle": {
                if (this.currentAnimationName == "attack" && this.timer > 19) {
                    this.timer = 0
                }
                if (this.currentAnimationName == "cone") {
                    this.currentAnimationName = "idle"
                    this.currentAnimation = this.idle
                    this.direction = true
                } else if (this.currentAnimationName != "idle") {
                    this.currentAnimation = this.cone
                    this.currentAnimationName = "cone"
                    this.direction = false
                }
                break
            }
            case "attack": {
                this.normalize(this.currentAnimation)
                this.currentAnimation = this.attack
                this.normalize(this.currentAnimation)
                this.currentAnimationName = "attack"
            }
        }
    }

    kill = () => {
        for (let frame of this.idle.concat(this.cone).concat(this.movement).concat(this.attack)) {
            frame.remove()
        }
    }

    changeFrameStyles = (property, value) => {
        for (let frame of this.idle.concat(this.cone).concat(this.movement).concat(this.attack)) {
            frame.style.setProperty(property, value)
        }
    }

    tick = () => {
        this.currentAnimation[0].classList.remove("display")
        if (this.direction)
            this.currentAnimation.push(this.currentAnimation.shift())
        else
            this.currentAnimation.unshift(this.currentAnimation.pop())
        this.currentAnimation[0].classList.add("display")
    }
}

class Innocent {
    constructor(globalMultiplicator, backgroundWidth, backgroundHeight, deltaTime) {
        this.eaten = false
        this.originX
        this.originY
        this.deltaTime = deltaTime
        this.backgroundWidth = backgroundWidth
        this.backgroundHeight = backgroundHeight
        do {
            this.x = Math.random() * backgroundWidth
            this.y = Math.random() * backgroundHeight
        } while (backgroundWidth / 2 - backgroundWidth / 12 - 400 * globalMultiplicator <= this.x && this.x <= 200 * globalMultiplicator + backgroundWidth / 2 + backgroundWidth / 12)
        this.domElement = document.createElement("img")
        this.domElement.classList.add("innocent")
        this.domElement.style.setProperty("width", `${200 * globalMultiplicator}px`)
        this.domElement.style.setProperty("left", `${this.x}px`)
        this.domElement.style.setProperty("top", `${this.y}px`)
        this.domElement.style.setProperty("animation-delay", `${Math.random() * 4000}ms`)
        this.domElement.setAttribute("src", `/assets/innocents/${["svelte", "fastapi", "react", "rubyonrails", "django", "angular"][Math.floor(Math.random() * 6)]}.svg`)
        document.querySelector(".background").appendChild(this.domElement)
        this.calculateOrigin()
    }

    kill = () => {
        this.domElement.remove()
    }

    relocate = () => {
        setTimeout(() => {
            this.eaten = false
            this.x = Math.random() * this.backgroundWidth
            this.y = Math.random() * this.backgroundHeight
            this.calculateOrigin()
            this.domElement.style.setProperty("left", `${this.x}px`)
            this.domElement.style.setProperty("top", `${this.y}px`)
            this.domElement.setAttribute("src", `/assets/innocents/${["svelte", "fastapi", "react", "rubyonrails", "django", "angular"][Math.floor(Math.random() * 6)]}.svg`)
        }, this.deltaTime * 8)
    }

    calculateOrigin = () => {
        this.originX = this.x + parseFloat(this.domElement.style.width) / 2
        this.originY = this.y + parseFloat(this.domElement.style.width) / 2
    }
}

class Sheight {
    constructor(deltaTime, globalMultiplicator, x, y, backgroundWidth, backgroundHeight) {
        this.x = x
        this.y = y
        this.deltaTime = deltaTime
        this.sheightX = backgroundWidth / 2
        this.sheightY = backgroundHeight / 2
        this.angle = 0.0
        this.magnitude = globalMultiplicator * deltaTime  // moves time pixels, scaled by global multiplicator
        this.acceleration = 0
        this.isAccelerated = false
        this.animation = new SheightAnimation()
        this.rect = document.querySelector(".field")
        this.movableObject = document.querySelector(".background")
        this.health = 100
        this.stamina = 100
        this.healthBar = document.querySelector(".bar")
        this.staminaBar = document.querySelectorAll(".bar")[1]
    }

    setAngle = (x, y, xx, yy) => {
        if (xx - x == 0 && y - yy >= 0)
            this.angle = 90
        else if (xx - x == 0 && y - yy < 0)
            this.angle = 270
        else {
            this.angle = Math.atan((y - yy) / (xx - x)) * 180 / Math.PI
            if (this.angle < 0)
                this.angle += 360
            if (xx - x <= 0) {
                if (y - yy >= 0)
                    this.angle -= 180
                else
                    this.angle += 180
            }
        }
        this.rect.style.setProperty("transform", `rotateZ(-${this.angle}deg)`)
    }

    stay = () => {
        this.animation.setCurrentAnimation("idle")
        if (this.animation.currentAnimationName == "idle") {
            this.acceleration = 0
        } else if (this.animation.currentAnimationName != "attack") {
            this.acceleration -= 0.1
            this.x -= this.magnitude * this.acceleration * Math.cos(this.angle * Math.PI / 180)
            this.y += this.magnitude * this.acceleration * Math.sin(this.angle * Math.PI / 180)
            this.sheightX += this.magnitude * this.acceleration * Math.cos(this.angle * Math.PI / 180)
            this.sheightY -= this.magnitude * this.acceleration * Math.sin(this.angle * Math.PI / 180)
            this.boundCoordinates()
            this.movableObject.style.setProperty("left", `${this.x}px`)
            this.movableObject.style.setProperty("top", `${this.y}px`)
        }
    }

    move = (isAccelerated) => {
        this.isAccelerated = isAccelerated
        this.animation.setCurrentAnimation("movement")
        if (this.animation.currentAnimationName == "movement") {
            if (isAccelerated && this.stamina > 0)
                this.acceleration = 2
            else
                this.acceleration = 1
        } else if (this.animation.currentAnimationName != "attack") {
            this.acceleration += 0.1
            this.acceleration = Math.min(this.acceleration, 1)
        }
        this.x -= this.magnitude * this.acceleration * Math.cos(this.angle * Math.PI / 180)
        this.y += this.magnitude * this.acceleration * Math.sin(this.angle * Math.PI / 180)
        this.sheightX += this.magnitude * this.acceleration * Math.cos(this.angle * Math.PI / 180)
        this.sheightY -= this.magnitude * this.acceleration * Math.sin(this.angle * Math.PI / 180)
        this.boundCoordinates()
        this.movableObject.style.setProperty("left", `${this.x}px`)
        this.movableObject.style.setProperty("top", `${this.y}px`)
    }

    boundCoordinates = () => {
        this.x = Math.min(window.innerWidth / 2 - this.rect.offsetWidth / 6, Math.max(this.x, window.innerWidth / 2 + this.rect.offsetWidth / 6 - parseFloat(this.movableObject.style.width)))
        this.y = Math.min(window.innerHeight / 2 - this.rect.offsetHeight / 3, Math.max(this.y, window.innerHeight / 2 + this.rect.offsetHeight / 3 - parseFloat(this.movableObject.style.height)))
        this.sheightX = Math.min(parseFloat(this.movableObject.style.width) - this.rect.offsetWidth / 6, Math.max(this.rect.offsetWidth / 6, this.sheightX))
        this.sheightY = Math.min(parseFloat(this.movableObject.style.height) - this.rect.offsetHeight / 3, Math.max(this.rect.offsetHeight / 3, this.sheightY))
    }

    eat = (innocent) => {
        this.animation.setCurrentAnimation("attack")
        innocent.relocate()
        setTimeout(() => {
            this.health = Math.min(this.health + 15, 100)
        }, this.deltaTime * 6)
    }

    tick = () => {
        this.animation.tick()
        this.healthBar.style.setProperty("background", `linear-gradient(90deg, rgb(${92 + 100 - this.health}, 168, 92) ${this.health}%, transparent 0%)`)
        if (this.isAccelerated) {
            this.stamina = Math.max(0, this.stamina - 1)
        } else {
            this.stamina = Math.min(100, this.stamina + 1)
        }
        if (this.health == 0) {
            this.health = -1
            this.magnitude = 0
            document.querySelector(".bar").children[0].innerHTML = "Death<br>(reload/resize to revive)"
            this.animation.death()
        }
        this.staminaBar.style.setProperty("background", `linear-gradient(90deg, rgb(255, 255, 255) ${this.stamina}%, transparent 0%)`)
    }
}

class Collisioner {
    constructor(sheight, innocents, frameWidth, deltaTime) {
        this.deltaTime = deltaTime
        this.areaSize = frameWidth / 2
        this.angle = 0
        this.sheight = sheight
        this.innocents = innocents
        this.observer = new IntersectionObserver(this.observation, { root: null, rootMargin: "0px", threshold: 0 })
        this.continuousObservation = []
        for (let elem of innocents) {
            this.observer.observe(elem.domElement)
        }
    }

    observation = (events) => {
        for (let event of events)
            if (event.isIntersecting) {
                this.continuousObservation.push(event.target)
            } else {
                this.continuousObservation.splice(this.continuousObservation.indexOf(event.target), 1)
            }
    }

    lookForCollision = () => {
        for (let innocent of this.continuousObservation) {
            for (let elem of this.innocents) {
                if (elem.domElement == innocent) {
                    innocent = elem
                    break
                }
            }
            if (innocent.eaten)
                continue
            if (innocent.originX - this.sheight.sheightX == 0 && this.sheight.sheightY - innocent.originY >= 0)
                this.angle = 90
            else if (innocent.originX - this.sheight.sheightX == 0 && this.sheight.sheightY - innocent.originY < 0)
                this.angle = 270
            else {
                this.angle = Math.atan((this.sheight.sheightY - innocent.originY) / (innocent.originX - this.sheight.sheightX)) * 180 / Math.PI
                if (this.angle < 0)
                    this.angle += 360
                if (innocent.originX - this.sheight.sheightX <= 0) {
                    if (this.sheight.sheightY - innocent.originY >= 0)
                        this.angle -= 180
                    else
                        this.angle += 180
                }
            }

            if (Math.abs(this.angle - this.sheight.angle) <= 15) {
                if (Math.sqrt((innocent.originX - this.sheight.sheightX) ** 2 + (innocent.originY - this.sheight.sheightY) ** 2) <= this.areaSize) {
                    this.sheight.eat(innocent)
                    document.querySelector("h2").textContent = `Score: ${parseInt(document.querySelector("h2").textContent.replace("Score: ", "")) + 1}`
                    innocent.eaten = true
                }
            }
        }
    }
}

class Game {
    constructor() {
        this.controller = document.querySelector(".big-circle")
        this.musicBox = document.querySelector("audio")
        this.timeoutId
        this.deltaTime = 41.7
        this.width = 1920
        this.height = 1080
        this.visualWidth = document.querySelector(".field").offsetWidth
        this.visualHeight = document.querySelector(".field").offsetHeight
        this.globalMultiplicator = this.visualWidth / this.width
        let [x, y] = this.placeBackground()
        this.sheight = new Sheight(this.deltaTime, this.globalMultiplicator, x, y, this.visualWidth * 6, this.visualHeight * 6)
        this.placePreparedFrames()
        this.innocents = []
        for (let i = 0; i < 20; i++) {
            this.innocents.push(new Innocent(this.globalMultiplicator, this.visualWidth * 6, this.visualHeight * 6, this.deltaTime))
        }
        this.collisioner = new Collisioner(this.sheight, this.innocents, this.visualWidth)

        this.pointerX
        this.pointerY
        this.pointerXX
        this.pointerYY
        this.movementStarted = false
        this.accelerationStarted = false
        this.healthLoosing = 0.0

        this.loop()
    }

    placePreparedFrames = () => {
        this.sheight.animation.changeFrameStyles("width", `${this.visualWidth}px`)
        this.sheight.animation.changeFrameStyles("height", `${this.visualHeight}px`)
    }

    placeBackground = () => {
        let element = document.querySelector(".background")
        element.style.setProperty("left", `${window.innerWidth * 0.5 - this.visualWidth * 3}px`)
        element.style.setProperty("top", `${window.innerHeight * 0.5 - this.visualHeight * 3}px`)
        element.style.setProperty("width", `${this.visualWidth * 6}px`)
        element.style.setProperty("height", `${this.visualHeight * 6}px`)
        return [window.innerWidth * 0.5 - this.visualWidth * 3, window.innerHeight * 0.5 - this.visualHeight * 3]
    }

    loop = () => {
        if (this.movementStarted) {
            this.sheight.setAngle(this.pointerX, this.pointerY, this.pointerXX, this.pointerYY)
            this.controller.style.setProperty("transform", `scale(1) rotateZ(-${this.sheight.angle}deg)`)
            this.sheight.move(this.accelerationStarted)
        } else {
            this.sheight.stay()
        }

        this.sheight.health = Math.max(0, this.sheight.health - this.healthLoosing)

        this.collisioner.lookForCollision()
        this.sheight.tick()
        this.timeoutId = setTimeout(this.loop, 41.7)
    }

    kill = () => {
        clearTimeout(this.timeoutId)
        for (let elem of this.innocents)
            elem.kill()
        this.sheight.animation.kill()
        document.querySelector("h2").textContent = "Score: 0"
        document.querySelector(".bar").children[0].innerHTML = "Health"
    }
}

var game = new Game()

document.addEventListener("mousemove", event => {
    if (event.buttons == 1) {
        if (!game.movementStarted) {
            game.healthLoosing = 0.3
            game.movementStarted = true
            game.pointerX = event.pageX
            game.pointerY = event.pageY
        }
        game.pointerXX = event.pageX
        game.pointerYY = event.pageY
        let handleLength = Math.sqrt((event.pageX - parseInt(game.controller.style.left) - 75) ** 2 + (event.pageY - parseInt(game.controller.style.top) - 75) ** 2)
        handleLength = Math.min(75, handleLength)
        game.controller.children[0].style.setProperty("right", `${50 - handleLength}px`)
    }
})
document.addEventListener("touchmove", (event) => {
    game.pointerXX = event.touches[0].screenX
    game.pointerYY = event.touches[0].screenY
    let handleLength = Math.sqrt((event.touches[0].screenX - parseInt(game.controller.style.left) - 75) ** 2 + (event.touches[0].screenY - parseInt(game.controller.style.top) - 75) ** 2)
    handleLength = Math.min(75, handleLength)
    game.controller.children[0].style.setProperty("right", `${50 - handleLength}px`)
})
document.addEventListener("mousedown", event => {
    if (event.button == 0) {
        game.controller.style.setProperty("left", `${event.clientX - 75}px`)
        game.controller.style.setProperty("top", `${event.clientY - 75}px`)
    }
})
document.addEventListener("touchstart", (event) => {
    if (!game.movementStarted) {
        game.healthLoosing = 0.3
        game.movementStarted = true
        game.pointerX = event.touches[0].screenX
        game.pointerY = event.touches[0].screenY
        game.pointerXX = event.touches[0].screenX
        game.pointerYY = event.touches[0].screenY
        game.controller.style.setProperty("left", `${event.touches[0].pageX - 75}px`)
        game.controller.style.setProperty("top", `${event.touches[0].pageY - 75}px`)
    }
    if (event.touches.length > 1) {
        game.accelerationStarted = true
        game.sheight.isAccelerated = true
    } else {
        game.accelerationStarted = false
        game.sheight.isAccelerated = false
    }
})

document.addEventListener("keydown", event => {
    if (event.key == "Shift") {
        game.accelerationStarted = true
    }
})

document.addEventListener("mouseup", event => {
    if (event.button == 0) {
        game.movementStarted = false
        game.accelerationStarted = false
        game.sheight.isAccelerated = false
        game.controller.style.setProperty("transform", "scale(0)")
    }
})
document.addEventListener("keyup", event => {
    if (event.key == "Shift") {
        game.accelerationStarted = false
        game.sheight.isAccelerated = false
    }
})
document.addEventListener("touchend", (event) => {
    if (event.touches.length == 1) {
        game.accelerationStarted = false
        game.sheight.isAccelerated = false
    } else if (event.touches.length == 0) {
        game.movementStarted = false
        game.accelerationStarted = false
        game.sheight.isAccelerated = false
        game.controller.style.setProperty("transform", "scale(0)")
    }
})

window.addEventListener("resize", () => {
    game.kill()
    game = new Game()
})

let sou = document.querySelector(".sou")
sou.addEventListener("click", () => {
    let data = sou.getAttribute("data-src")
    sou.setAttribute("data-src", sou.getAttribute("src"))
    sou.setAttribute("src", data)
    if (data.includes("on")) {
        game.musicBox.volume = 0
        game.musicBox.muted = false
        game.musicBox.play()
        sou.style.setProperty("opacity", "0.6")
        increaseVolume()
    } else {
        game.musicBox.volume = 0
        game.musicBox.muted = true
    }
})
function increaseVolume() {
    game.musicBox.volume = Math.min(1, game.musicBox.volume + 0.03)
    if (game.musicBox.volume < 100)
        setTimeout(increaseVolume, 41.7)
}
