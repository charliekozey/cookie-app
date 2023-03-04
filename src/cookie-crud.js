fetch("http://localhost:3000/cookies")
    .then(res => res.json())
    .then(cookies => cookies.forEach(cookie => renderCookie(cookie)))

function renderCookie(cookie) {
    const cookieMenu = document.getElementById("cookie-menu")
    const cookieCard = document.createElement("div")
    const cookieName = document.createElement("h1")
    const cookieQuantity = document.createElement("h2")
    const cookieImage = document.createElement("img")
    const decrementBtn = document.createElement("button")
    const deleteBtn = document.createElement("button")
    const favoriteBtn = document.createElement("button")
    let favoriteToggle = cookie.isFavorite

    cookieCard.id = "cookie-card"
    cookieName.textContent = cookie.name
    cookieQuantity.textContent = `Cookies in stash: ${cookie.quantity}`
    cookieImage.src = cookie.image_url
    decrementBtn.textContent = cookie.quantity > 0 ? "eat one" : "none left :("
    deleteBtn.textContent = "EAT ALL"
    favoriteBtn.textContent = cookie.isFavorite ? "★" : "☆"
    if (cookie.quantity == 0) {
        decrementBtn.disabled = true
    }

    decrementBtn.addEventListener("click", () => {
        let newQuantity = --cookie.quantity
        if (newQuantity <= 0) {
            newQuantity = 0
            decrementBtn.textContent = "none left :\("
            decrementBtn.disabled = true
        }
        cookieQuantity.textContent = `Cookies in stash: ${newQuantity}`
        updateQuantity(cookie, newQuantity)
    })
    deleteBtn.addEventListener("click", () => deleteCookie(cookie, cookieCard))
    favoriteBtn.addEventListener("click", (e) => {
        favoriteToggle = !favoriteToggle
        favoriteBtn.textContent = favoriteToggle ? "★" : "☆"
        updateFavorite(cookie, favoriteToggle)
    })

    cookieCard.append(cookieName, cookieQuantity, cookieImage, decrementBtn, deleteBtn, favoriteBtn)
    cookieMenu.append(cookieCard)
}

function deleteCookie(cookie, cookieCard) {
    fetch(`http://localhost:3000/cookies/${cookie.id}`, {
        method: "DELETE"
    })
        .then(cookieCard.remove())
}

function updateFavorite(cookie, favoriteToggle) {
    fetch(`http://localhost:3000/cookies/${cookie.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"isFavorite": favoriteToggle})
    })
}

function updateQuantity(cookie, newQuantity) {
    fetch(`http://localhost:3000/cookies/${cookie.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"quantity": newQuantity})
    })
        .then(res => res.json())
        .then(cookie => console.log(cookie))
}

function addFormListener() {
    const cookieForm = document.getElementById("new-cookie-form")

    cookieForm.addEventListener("submit", (e) => {
        e.preventDefault()

        const newCookie = {
            "name": e.target.name.value,
            "image_url":  e.target.image.value,
            "quantity":  parseInt(e.target.quantity.value),
            "isFavorite": false
        }
        console.log(e.target.name.value)

        fetch("http://localhost:3000/cookies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCookie)
        })
            .then(res => res.json())
            .then(cookie => renderCookie(cookie))

        e.target.reset()
    })
}

addFormListener()