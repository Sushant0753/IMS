//report

// Weekly Sales Chart
const weeklySalesCtx = document.getElementById('weeklySalesChart').getContext('2d');
new Chart(weeklySalesCtx, {
    type: 'heatmap',
    data: {
        // Add your data here
    },
    options: {
        // Configure options
    }
});

// Supplier Performance Chart
const supplierPerformanceCtx = document.getElementById('supplierPerformanceChart').getContext('2d');
new Chart(supplierPerformanceCtx, {
    type: 'bar',
    data: {
        labels: ['Apple', 'Samsung', 'Asus', 'Xiaomi', 'Logitech'],
        datasets: [
            {
                label: 'Early',
                data: [76, 72, 47, 67, 62],
                backgroundColor: '#3B82F6'
            },
            {
                label: 'On Time',
                data: [16, 12, 18, 12, 28],
                backgroundColor: '#F59E0B'
            },
            {
                label: 'Late',
                data: [8, 16, 35, 21, 10],
                backgroundColor: '#EF4444'
            }
        ]
    },
    options: {
        scales: {
            x: { stacked: true },
            y: { stacked: true }
        }
    }
});

// Top Suppliers Pie Chart
const topSuppliersCtx = document.getElementById('topSuppliersChart').getContext('2d');
new Chart(topSuppliersCtx, {
    type: 'pie',
    data: {
        labels: ['Apple', 'Samsung', 'Asus', 'Xiaomi'],
        datasets: [{
            data: [61, 15, 13, 8],
            backgroundColor: ['#3B82F6', '#EF4444', '#10B981', '#8B5CF6']
        }]
    }
});

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
