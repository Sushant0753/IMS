document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const logoutButton = document.getElementById('logoutButton');
    const addProductLink = document.getElementById('addProductLink');
    const addProductModal = document.getElementById('addProductModal');
    const cancelButton = document.getElementById('cancelButton');
    const addProductForm = document.getElementById('addProductForm');

    // Check login status and show/hide buttons
    if (localStorage.getItem('userLoggedIn') === 'true') {
        loginButton.style.display = 'none';
        signupButton.style.display = 'none';
        logoutButton.style.display = 'inline-block';
    } else {
        loginButton.style.display = 'inline-block';
        signupButton.style.display = 'inline-block';
        logoutButton.style.display = 'none';
    }

    // Show modal when 'Add Product' link is clicked
    if (addProductLink) {
        addProductLink.addEventListener('click', (event) => {
            event.preventDefault();
            addProductModal.style.display = 'flex';
        });
    }

    // Hide modal when 'Cancel' button is clicked
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            addProductModal.style.display = 'none';
        });
    }

    // Handle form submission
    if (addProductForm) {
        addProductForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // Gather form data
            const productData = {
                name: document.getElementById('productName').value,
                price: document.getElementById('productPrice').value,
                brand: document.getElementById('productBrand').value,
                image: document.getElementById('productImage').value,
                expiry: document.getElementById('productExpiry').value
            };
            
            // Process the data (e.g., send it to the server)
            console.log('Product Data:', productData);

            // Close the modal
            addProductModal.style.display = 'none';

            // Optionally, clear the form
            addProductForm.reset();
        });
    }
});

function logout() {
    localStorage.removeItem('userLoggedIn');
    // Redirect to login page
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
const sidebarToggle = document.getElementById('sidebarToggle');
const searchToggle = document.getElementById('searchToggle');
const leftSidebar = document.getElementById('leftSidebar');
const rightSidebar = document.getElementById('rightSidebar');
const searchBar = document.getElementById('searchBar');

sidebarToggle.addEventListener('click', () => {
    leftSidebar.classList.toggle('translate-x-0');
    leftSidebar.classList.toggle('-translate-x-full');
    rightSidebar.classList.toggle('translate-x-0');
    rightSidebar.classList.toggle('translate-x-full');
    leftSidebar.classList.toggle('hidden');
    rightSidebar.classList.toggle('hidden');
});

searchToggle.addEventListener('click', () => {
    searchBar.classList.toggle('hidden');
});

// Close sidebars when clicking outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('#leftSidebar') && 
        !event.target.closest('#rightSidebar') && 
        !event.target.closest('#sidebarToggle') &&
        window.innerWidth < 1024) {
        leftSidebar.classList.remove('translate-x-0');
        leftSidebar.classList.add('-translate-x-full');
        rightSidebar.classList.remove('translate-x-0');
        rightSidebar.classList.add('translate-x-full');
        leftSidebar.classList.add('hidden');
        rightSidebar.classList.add('hidden');
    }
});


});
