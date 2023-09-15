// logout button
let logoutBtn = document.getElementById('logoutBtn')
logoutBtn.addEventListener('click', () => {
    window.location.href = "/logout"
})

// saveBtn
let saveBtn = document.getElementById('saveBtn')
saveBtn.addEventListener('click', (e) => {
    e.preventDefault()
})