document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('user_id');
    
    if (!userId) {
        // If no user_id found in localStorage, redirect to login page
        window.location.href = 'login.html';
    } else {
        // Fetch user profile based on user_id
        fetchUserProfile(userId);
    }

    const logoutButton = document.getElementById('logout')
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        localStorage.removeItem('admin');
        window.location.href = 'index.html';

    })

    const profileForm = document.getElementById('profile-form');
    profileForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get the updated user information from the form
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Send the updated data to the backend
        fetch(`https://mnsingh.pythonanywhere.com/users/profile/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'User updated successfully') {
                alert('Profile updated successfully!');
            } else {
                alert('Update failed: ' + data.message);
            }
        })
        .catch(error => console.error('Error updating profile:', error));
    });
});

// Function to fetch the user profile data from the backend
function fetchUserProfile(userId) {
    // Check if the userId exists in localStorage
    if (!userId) {
        alert("User ID not found. Please log in.");
        return;
    }

    // Fetch user profile from the backend using the userId in the URL
    fetch(`https://mnsingh.pythonanywhere.com/users/profile/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(user => {
        console.log(user);
        if (user.message) {
            alert(user.message);
        } else {
            // Display user profile data in the HTML
            document.getElementById('username').textContent = user.username;
            document.getElementById('email').textContent = user.email;

            // Display the orders if they exist
            const ordersList = document.getElementById('orders');
            if (user.orders && user.orders.length > 0) {
                user.orders.forEach(order => {
                    const orderItem = document.createElement('li');
                    orderItem.textContent = `Order ID: ${order.id}, Status: ${order.status}, Total: $${order.total_amount}, Date: ${new Date(order.timestamp).toLocaleString()}`;
                    ordersList.appendChild(orderItem);
                });
            } else {
                ordersList.innerHTML = '<li>No orders found</li>';
            }

            // Display the addresses if they exist
            const addressesList = document.getElementById('addresses');
            if (user.addresses && user.addresses.length > 0) {
                user.addresses.forEach(address => {
                    const addressItem = document.createElement('li');
                    addressItem.textContent = `Address: ${address.address_line_1}, ${address.address_line_2}, ${address.city}, ${address.state}, ${address.postal_code}, ${address.country}`;
                    addressesList.appendChild(addressItem);
                });
            } else {
                addressesList.innerHTML = '<li>No addresses found</li>';
            }
        }
    })
    .catch(error => console.error('Error fetching user profile:', error));
}
