//inventory

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

const products = [
    { name: "Macbook Pro", code: "#0001", type: "Laptop", price: "$1,241", quantity: 44, image: "https://placekitten.com/40/40" },
    { name: "iPhone 14 pro", code: "#0002", type: "Phone", price: "$1,499", quantity: 23, image: "https://placekitten.com/41/41" },
    { name: "Zoom75", code: "#0003", type: "Keyboard", price: "$215", quantity: 23, image: "https://placekitten.com/42/42" },
    { name: "Airpods Pro", code: "#0004", type: "Earphones", price: "$249", quantity: 23, image: "https://placekitten.com/43/43" },
    { name: "Samsung Galaxy Fold", code: "#0005", type: "Phone", price: "$1,199", quantity: 23, image: "https://placekitten.com/44/44" },
    { name: "Samsung Odyssey", code: "#0006", type: "Displays", price: "$500", quantity: 23, image: "https://placekitten.com/45/45" },
    { name: "Logitech Superlight", code: "#0007", type: "Mouse", price: "$159", quantity: 23, image: "https://placekitten.com/46/46" },
];

// Function to populate the product table
function populateProductTable() {
    const tableBody = document.querySelector('tbody');
    products.forEach(product => {
        const row = `
            <tr class="border-t">
                <td class="px-6 py-4">${product.name}</td>
                <td class="px-6 py-4">${product.code}</td>
                <td class="px-6 py-4">${product.type}</td>
                <td class="px-6 py-4">${product.price}</td>
                <td class="px-6 py-4">${product.quantity}</td>
                <td class="px-6 py-4"><img src="${product.image}" alt="${product.name}" class="w-10 h-10 rounded"></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Call the function to populate the table when the page loads
window.onload = populateProductTable;

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
