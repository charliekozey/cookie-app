// 1. get the cookies on the page
// // fetch
// // renderCookie()
// // forEach

// 2. create delete functionality
// // build delete button
// // put event listener on delete button
// // build deleteCookie() function
// // // send DELETE request to backend
// // // update DOM to remove the corresponding card

// 3. create patch decrement functionality
// // build "eat one cookie" button
// // add event listener to button that calls decrementCookie()
// // build decrementCookie() 
// // // update back end (PATCH request)
// // // update front end to reflect new quantity

fetch("http:/localhost:3000/cookies")
    .then(response => response.json())
    .then(cookies => cookies.forEach(jabberwocky => renderCookie(jabberwocky)))

function renderCookie(cookie) {
    // create dom elements
    // populate dom elements with info from json

    const menu = document.getElementById("cookie-menu")
    const cookieCard = document.createElement("div")
    const cookieName = document.createElement("h1")
    const cookieQuantity = document.createElement("h2")
    const cookieImage = document.createElement("img")
    const favoriteBtn = document.createElement("button")
    const deleteBtn = document.createElement("button")
    const decrementBtn = document.createElement("button")

    cookieName.textContent = cookie.name
    cookieQuantity.textContent = `cookies in stash: ${cookie.quantity}`
    cookieImage.src = cookie.image_url
    favoriteBtn.textContent = "☆"
    deleteBtn.textContent = "EAT ALL"
    decrementBtn.textContent = "EAT ONE"

    cookieCard.id = "cookie-card"

    deleteBtn.addEventListener("click", () => deleteCookie(cookie, cookieCard))
    decrementBtn.addEventListener("click", () => updateQuantity(cookie, cookieQuantity))

    cookieCard.append(cookieName, cookieQuantity, cookieImage, favoriteBtn, deleteBtn, decrementBtn)
    menu.append(cookieCard)
}

function deleteCookie(cookie, cookieCard) {
    fetch(`http://localhost:3000/cookies/${cookie.id}`, {
        method: "DELETE"
    })

    cookieCard.remove()
}

function updateQuantity(cookie, cookieQuantity) {

    let newQuantity = cookie.quantity
    newQuantity--
    cookieQuantity.textContent = `cookies in stash: ${newQuantity}`

    fetch(`http://localhost:3000/cookies/${cookie.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({quantity: --cookie.quantity})
    })
}