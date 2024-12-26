// Add Product
document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('user_id');
    const admin = localStorage.getItem('admin');
    if (!userId) {
        // If no user_id found in localStorage, redirect to login page
        window.location.href = 'login.html';
    } 
    else if(admin !== 'true'){
        console.log(admin)
        // Fetch user profile based on user_id
        alert("You are not eligible for this page.");
        window.location.href = 'index.html';

    }

});
document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const data = {
        name: document.getElementById('productName').value,
        description: document.getElementById('productDescription').value,
        price: document.getElementById('productPrice').value,
        stock: document.getElementById('productStock').value,
        category_id: document.getElementById('categoryId').value,
    };

    fetch('http://mnsingh.pythonanywhere.com/admin/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
});

// Update Product
document.getElementById('updateProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const productId = document.getElementById('updateProductId').value;
    const data = {
        name: document.getElementById('updateProductName').value,
        description: document.getElementById('updateProductDescription').value,
        price: document.getElementById('updateProductPrice').value,
        stock: document.getElementById('updateProductStock').value,
        category_id: document.getElementById('updateCategoryId').value,
    };

    fetch(`http://mnsingh.pythonanywhere.com/admin/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
});

// Delete Product
document.getElementById('deleteProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const productId = document.getElementById('deleteProductId').value;

    fetch(`http://mnsingh.pythonanywhere.com/admin/products/${productId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
});

// Update Order Status
document.getElementById('updateOrderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const orderId = document.getElementById('orderId').value;
    const data = {
        status: document.getElementById('orderStatus').value,
    };

    fetch(`http://mnsingh.pythonanywhere.com/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
});

// Update User Role
document.getElementById('updateUserRoleForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const userId = document.getElementById('userId').value;
    const isAdmin = document.getElementById('isAdmin').checked;

    const data = {
        is_admin: isAdmin,
    };

    fetch(`http://mnsingh.pythonanywhere.com/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
});

// Fetch Data: Products, Orders, and Users
function fetchData() {
    // Fetch products
    fetch('http://mnsingh.pythonanywhere.com/admin/products')
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('productList');
        productList.innerHTML = '';
        data.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - $${product.price}  Product ID : ${product.product_id} Stock : ${product.stock}`;
            productList.appendChild(li);
        });
    });

    // Fetch orders
    fetch('http://mnsingh.pythonanywhere.com/admin/orders')
    .then(response => response.json())
    .then(data => {
        const orderList = document.getElementById('orderList');
        orderList.innerHTML = '';
        data.forEach(order => {
            const li = document.createElement('li');
            li.textContent = `Order #${order.id} - Status: ${order.status}`;
            orderList.appendChild(li);
        });
    });

    // Fetch users
    fetch('http://mnsingh.pythonanywhere.com/admin/users')
    .then(response => response.json())
    .then(data => {
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        data.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `Username : ${user.username}  User ID : ${ user.id} (${user.is_admin ? 'Admin' : 'User'})`;
            userList.appendChild(li);
        });
    });
}

// Call fetchData to load data on page load
fetchData();
