// Function to fetch and display sales data
document.getElementById('loadSalesData').addEventListener('click', function() {
    fetch('http://mnsingh.pythonanywhere.com/analytics/sales')
        .then(response => response.json())
        .then(data => {
            const salesList = document.getElementById('salesList');
            salesList.innerHTML = ''; // Clear existing data

            data.forEach(sale => {
                const li = document.createElement('li');
                li.textContent = `${sale.month}: $${sale.total_sales.toFixed(2)}`;
                salesList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching sales data:', error));
});

// Function to fetch and display user activity data
document.getElementById('loadUserActivity').addEventListener('click', function() {
    fetch('http://mnsingh.pythonanywhere.com/analytics/user-activity')
        .then(response => response.json())
        .then(data => {
            const userActivityList = document.getElementById('userActivityList');
            userActivityList.innerHTML = ''; // Clear existing data

            data.forEach(activity => {
                const li = document.createElement('li');
                li.textContent = `${activity.month}: ${activity.new_users} new users`;
                userActivityList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching user activity data:', error));
});

// Function to fetch and display sales report by product
document.getElementById('loadSalesReport').addEventListener('click', function() {
    fetch('http://mnsingh.pythonanywhere.com/analytics/reports/sales')
        .then(response => response.json())
        .then(data => {
            const salesReportList = document.getElementById('salesReportList');
            salesReportList.innerHTML = ''; // Clear existing data

            data.forEach(report => {
                const li = document.createElement('li');
                li.textContent = `${report.product_name}: ${report.total_sold} sold, $${report.total_revenue.toFixed(2)} revenue`;
                salesReportList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching sales report data:', error));
});

// Function to fetch and display user report by month
document.getElementById('loadUserReport').addEventListener('click', function() {
    fetch('http://mnsingh.pythonanywhere.com/analytics/reports/users')
        .then(response => response.json())
        .then(data => {
            const userReportList = document.getElementById('userReportList');
            userReportList.innerHTML = ''; // Clear existing data

            data.forEach(report => {
                const li = document.createElement('li');
                li.textContent = `${report.month}: ${report.new_users} new users`;
                userReportList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching user report data:', error));
});
