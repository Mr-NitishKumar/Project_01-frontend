// Get DOM elements
const loadCartButton = document.getElementById('loadCart');
const cartContents = document.getElementById('cartContents');
const addToCartForm = document.getElementById('addToCartForm');
const updateCartForm = document.getElementById('updateCartForm');
const removeFromCartForm = document.getElementById('removeFromCartForm');

// Replace with actual user ID
const userId = localStorage.getItem('user_id');

if (!userId){
    window.location.href = 'login.html';
}


// Load cart function
loadCartButton.addEventListener('click', function() {
    fetch(`https://mnsingh.pythonanywhere.com/cart/${userId}/cart`)
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                cartContents.innerHTML = `<p>${data.message}</p>`;
            } else {
                cartContents.innerHTML = '';
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = `Product ID: ${item.product_id}, Quantity: ${item.quantity}`;
                    cartContents.appendChild(li);
                });
            }
        })
        .catch(error => console.error('Error fetching cart:', error));
});

// Add product to cart function
addToCartForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const productId = document.getElementById('productId').value;
    const quantity = document.getElementById('quantity').value;

    const data = { product_id: productId, quantity: quantity };
    console.log('Product ID:', productId, 'Quantity:', quantity);


    fetch(`https://mnsingh.pythonanywhere.com/cart/${userId}/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadCartButton.click();  // Reload cart
    })
    .catch(error => console.error('Error adding product to cart:', error));
});

// Update cart function
updateCartForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const productId = document.getElementById('updateProductId').value;
    const quantity = document.getElementById('updateQuantity').value;

    const data = { items: [{ product_id: productId, quantity: quantity }] };

    fetch(`https://mnsingh.pythonanywhere.com/cart/${userId}/cart`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadCartButton.click();  // Reload cart
    })
    .catch(error => console.error('Error updating cart:', error));
});

// Remove product from cart function
removeFromCartForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const productId = document.getElementById('removeProductId').value;

    const data = { cart_id: userId, product_id: productId };

    fetch(`https://mnsingh.pythonanywhere.com/cart/${userId}/cart`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadCartButton.click();  // Reload cart
    })
    .catch(error => console.error('Error removing product from cart:', error));
});
