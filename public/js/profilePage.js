// logout button
let logoutBtn = document.getElementById('logoutBtn')
logoutBtn.addEventListener('click', () => {
    window.location.href = "/logout"
})

const copiedBox = document.getElementById('copiedBox');
const copyBtns = document.querySelectorAll('.copyBtn');

copyBtns.forEach(copyBtn => {
    copyBtn.addEventListener('click', () => {
        const textToCopy = copyBtn.parentElement.querySelector('span').getAttribute('data-text');

        // Create a temporary textarea element to copy text to clipboard
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = textToCopy;
        document.body.appendChild(tempTextarea);

        // Select and copy the text
        tempTextarea.select();
        document.execCommand('copy');

        // Remove the temporary textarea
        document.body.removeChild(tempTextarea);

        copiedBox.classList.add('visible');
        copiedBox.innerText = 'Text Copied!';

        setTimeout(() => {
            copiedBox.classList.remove('visible');
        }, 1000);
    });
});


// Add an event listener for delete buttons
const deleteBtns = document.querySelectorAll('.deleteBtn');
deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', () => {
        const id = deleteBtn.getAttribute('data-id');
        if (confirm("Are you sure you want to delete this entry?")) {
            fetch(`/delete-entry/${id}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                } else {
                    console.error('Error deleting entry');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });
});