// burger
document.querySelector(".burger").addEventListener("click", () => {
    document.querySelector(".burger__line-1").classList.toggle("burger__line-1_full")
    document.querySelector(".navigation-bar__menu").classList.toggle("top-100")
})

function distributeIndicies() {
    let i, elem
    for ([i, elem] of [...document.querySelectorAll(".question")].reverse().entries()) {
        elem.style = `z-index: ${i};`
    }
    for (let elem of document.querySelectorAll(".spacer")) {
        elem.style = `z-index: ${i + 1};`
    }
    document.querySelector(".navigation-bar-support").style = `z-index: ${i + 2};`
    document.querySelector(".navigation-bar").style = `z-index: ${i + 2};`
}
distributeIndicies()

let gate = true
for (let elem of document.querySelectorAll(".faq-entry__circle")) {
    elem.addEventListener("click", event => {
        if (event.target.classList.contains("faq-entry__circle_revolution"))
            undrop(event)
        else drop(event)
    })
}

function drop(event) {
    if (!gate)
        return
    gate = false
    event.target.classList.add("faq-entry__circle_revolution")
    event.target.parentElement.parentElement.style.setProperty("margin-bottom", `${event.target.parentElement.parentElement.children[1].children[0].offsetHeight}px`)
    event.target.parentElement.parentElement.children[1].children[0].classList.add("drop")
    event.target.parentElement.parentElement.children[1].children[0].classList.add("opacity-1")
    gate = true
}

function undrop(event) {
    if (!gate)
        return
    gate = false
    event.target.classList.remove("faq-entry__circle_revolution")
    event.target.parentElement.parentElement.style.setProperty("margin-bottom", "0")
    event.target.parentElement.parentElement.children[1].children[0].classList.remove("drop")
    setTimeout(() => { event.target.parentElement.parentElement.children[1].children[0].classList.remove("opacity-1"); gate = true }, 500)
}

window.addEventListener("resize", () => {
    for (let el of document.querySelectorAll(".faq-entry__circle")) {
        if (el.classList.contains("faq-entry__circle_revolution")) {
            el.parentElement.parentElement.style.setProperty("margin-bottom", `${el.parentElement.parentElement.children[1].children[0].offsetHeight}px`)
        }
    }
})
