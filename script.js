// Simulated data
const inventoryData = {
    labels: ['Apples', 'Bananas', 'Milk', 'Bread', 'Eggs', 'Lettuce', 'Tomatoes', 'Yogurt', 'Cheese'],
    datasets: [{
        label: 'Current Stock',
        data: [100, 150, 200, 80, 120, 90, 110, 180, 160],
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
    }, {
        label: 'Optimal Stock',
        data: [120, 140, 180, 100, 110, 100, 120, 200, 150],
        backgroundColor: 'rgba(255, 99, 132, 0.6)'
    }]
};

const shelfLifeData = {
    labels: ['Apples', 'Bananas', 'Milk', 'Bread', 'Eggs', 'Lettuce', 'Tomatoes', 'Yogurt', 'Cheese'],
    datasets: [{
        label: 'Days Remaining',
        data: [14, 5, 7, 3, 21, 4, 6, 10, 30],
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
    }]
};

const alerts = [
    "Milk stock low, reorder recommended",
    "Bananas approaching expiration, consider promotion",
    "Bread overstocked, adjust next order",
    "Lettuce nearing expiration, move to front display"
];

const pricingData = [
    { product: "Apples", currentPrice: 1.99, suggestedPrice: 1.79 },
    { product: "Bananas", currentPrice: 0.99, suggestedPrice: 0.89 },
    { product: "Milk", currentPrice: 3.49, suggestedPrice: 3.49 },
    { product: "Bread", currentPrice: 2.49, suggestedPrice: 2.29 },
    { product: "Eggs", currentPrice: 3.99, suggestedPrice: 3.99 },
    { product: "Lettuce", currentPrice: 1.79, suggestedPrice: 1.59 },
    { product: "Tomatoes", currentPrice: 2.99, suggestedPrice: 2.79 },
    { product: "Yogurt", currentPrice: 4.49, suggestedPrice: 4.29 },
    { product: "Cheese", currentPrice: 5.99, suggestedPrice: 5.99 }
];

const storageConditions = {
    temperature: 4, // °C
    humidity: 85 // %
};

// Render charts
function renderChart(elementId, data, type = 'bar') {
    const ctx = document.getElementById(elementId).getContext('2d');
    new Chart(ctx, {
        type: type,
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

renderChart('inventoryChart', inventoryData);
renderChart('stockChart', {
    labels: inventoryData.labels,
    datasets: [inventoryData.datasets[0]]
});
renderChart('shelfLifeChart', shelfLifeData);

// Render alerts
const alertsList = document.getElementById('alertsList');
alerts.forEach(alert => {
    const li = document.createElement('li');
    li.textContent = alert;
    alertsList.appendChild(li);
});

// Render pricing table
const pricingTable = document.getElementById('pricingTable');
pricingData.forEach(item => {
    const row = pricingTable.insertRow();
    row.insertCell(0).textContent = item.product;
    row.insertCell(1).textContent = `$${item.currentPrice}`;
    row.insertCell(2).textContent = `$${item.suggestedPrice}`;
    const actionCell = row.insertCell(3);
    const actionButton = document.createElement('button');
    actionButton.textContent = 'Update Price';
    actionButton.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded';
    actionButton.onclick = () => updatePrice(item.product, item.suggestedPrice);
    actionCell.appendChild(actionButton);
});

// Render storage conditions
const storageConditionsDiv = document.getElementById('storageConditions');
storageConditionsDiv.innerHTML = `
    <p>Temperature: ${storageConditions.temperature}°C</p>
    <p>Humidity: ${storageConditions.humidity}%</p>
`;

function updatePrice(product, newPrice) {
    alert(`Price updated for ${product} to $${newPrice}`);
    // In a real application, this would send an update to the server
}

// Event listeners for buttons
document.getElementById('loginBtn').addEventListener('click', () => {
    alert('Login functionality would be implemented here');
});

document.getElementById('signupBtn').addEventListener('click', () => {
    alert('Sign up functionality would be implemented here');
});

document.getElementById('reportBtn').addEventListener('click', () => {
    const discrepancy = prompt('Please describe the discrepancy:');
    if (discrepancy) {
        alert(`Discrepancy reported: ${discrepancy}`);
        // In a real application, this would send the report to the server
    }
});