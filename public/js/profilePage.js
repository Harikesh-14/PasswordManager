// logout button
let logoutBtn = document.getElementById('logoutBtn')
logoutBtn.addEventListener('click', () => {
    window.location.href = "/logout"
})

const copiedBox = document.getElementById('copiedBox');
const copyBtns = document.querySelectorAll('.copyBtn');

copyBtns.forEach(copyBtn => {
    copyBtn.addEventListener('click', () => {
        copiedBox.classList.add('visible');
    
        setTimeout(() => {
            copiedBox.classList.remove('visible');
            copiedBox.innerText = 'Text Copied!';
        }, 1000);
    });
});
