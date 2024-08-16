// report.js
async function fetchDataAndCreateCharts() {
    try {
        const response = await fetch('http://localhost:3000/product/graph-data');
        const data = await response.json();

        createWeeklySalesChart(data.weeklySales);
        createTopProductsChart(data.topProducts);
        createTopBrandsChart(data.topBrands);
    } catch (error) {
        console.error('Error fetching graph data:', error);
    }
}

function createWeeklySalesChart(data) {
    const ctx = document.getElementById('weeklySalesChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Weekly Sales',
                data: data.values,
                borderColor: '#3B82F6',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Quantity Sold'
                    }
                }
            }
        }
    });
}

function createTopProductsChart(data) {
    const ctx = document.getElementById('topProductsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Quantity',
                data: data.values,
                backgroundColor: '#10B981'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Quantity'
                    }
                }
            }
        }
    });
}

function createTopBrandsChart(data) {
    const ctx = document.getElementById('topBrandsChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: ['#3B82F6', '#EF4444', '#10B981', '#8B5CF6', '#F59E0B']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}

// Call the function to fetch data and create charts when the page loads
document.addEventListener('DOMContentLoaded', fetchDataAndCreateCharts);

function logout() {
    // Implement logout functionality here
    console.log('Logout clicked');
}