document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('addProductForm');
    const addProductModal = document.getElementById('addProductModal');
    const addProductLink = document.getElementById('addProductLink');
    const cancelButton = document.getElementById('cancelButton');

    // Flag to prevent multiple submissions
    let isSubmitting = false;

    addProductLink.addEventListener('click', () => {
        addProductModal.style.display = 'block';
    });

    cancelButton.addEventListener('click', () => {
        addProductModal.style.display = 'none';
    });

    addProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (isSubmitting) return; // Prevent multiple submissions
        isSubmitting = true;

        const formData = new FormData(addProductForm);
        const productData = Object.fromEntries(formData.entries());

        // Ensure price is a number
        productData.price = parseFloat(productData.price);
        
        // Ensure quantity is a number
        if (productData.quantity) {
            productData.quantity = parseInt(productData.quantity);
        }

        try {
            const response = await fetch('http://localhost:3000/product/add-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Product added successfully!');
                addProductModal.style.display = 'none';
                addProductForm.reset();
                await populateProductTable(); // Await the table population
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred.');
        } finally {
            isSubmitting = false; // Allow further submissions
        }
    });

    // Modify the populateProductTable function
    let isPopulating = false;
    async function populateProductTable() {
        if (isPopulating) return; // Prevent multiple simultaneous calls
        isPopulating = true;

        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        try {
            const response = await fetch('http://localhost:3000/product/all-products');
            const products = await response.json();

            products.forEach(product => {
                const row = `
                    <tr class="border-t">
                        <td class="px-6 py-4">${product.name}</td>
                        <td class="px-6 py-4">${product.code || 'N/A'}</td>
                        <td class="px-6 py-4">${product.type || 'N/A'}</td>
                        <td class="px-6 py-4">$${product.price}</td>
                        <td class="px-6 py-4">${product.quantity || 'N/A'}</td>
                        <td class="px-6 py-4"><img src="${product.image}" alt="${product.name}" class="w-10 h-10 rounded"></td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            isPopulating = false;
        }
    }

    // Call populateProductTable only once when the page loads
    populateProductTable();

    // Sidebar and search bar toggle
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

function logout() {
    localStorage.removeItem('userLoggedIn');
    window.location.href = 'login.html'; // Redirect to login page
}
