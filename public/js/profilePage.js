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

// Add an event listener for delete buttons
const deleteBtns = document.querySelectorAll('.deleteBtn');
deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', () => {
        const id = deleteBtn.getAttribute('data-id');
        if (confirm("Are you sure you want to delete this entry?")) {
            // Send an AJAX request to the server to delete the entry
            fetch(`/delete-entry/${id}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    // Reload the page or update the UI as needed
                    window.location.reload(); // For example, you can reload the page
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