document.addEventListener('DOMContentLoaded', () => {
    fetchCartItems();

    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });
});

function fetchCartItems() {
    fetch('https://mnsingh.pythonanywhere.com/cart/1/cart') // Replace 1 with the actual user ID
        .then(response => response.json())
        .then(cartItems => {
            const cartList = document.getElementById('cart-items');
            cartList.innerHTML = '';
            let totalAmount = 0;

            cartItems.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <h2>${item.product_name}</h2>
                    <p>Price: $${item.price}</p>
                    <p>Quantity: 
                        <input type="number" value="${item.quantity}" min="1" data-product-id="${item.product_id}">
                    </p>
                    <button onclick="removeFromCart(${item.product_id})">Remove</button>
                `;
                cartList.appendChild(li);
                totalAmount += item.price * item.quantity;
            });

            document.getElementById('total-amount').innerHTML = `Total Amount: $${totalAmount.toFixed(2)}`;

            // Add event listeners to quantity inputs
            const quantityInputs = cartList.querySelectorAll('input[type="number"]');
            quantityInputs.forEach(input => {
                input.addEventListener('change', updateQuantity);
            });
        })
        .catch(error => console.error('Error fetching cart items:', error));
}

function updateQuantity(event) {
    const input = event.target;
    const productId = input.dataset.productId;
    const newQuantity = input.value;

    fetch(`https://mnsingh.pythonanywhere.com/cart/1/cart/${productId}`, { // Replace 1 with the actual user ID
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: newQuantity })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Cart updated successfully') {
            fetchCartItems(); // Refresh cart items
        } else {
            alert('Update failed: ' + data.message);
        }
    })
    .catch(error => console.error('Error updating cart:', error));
}

function removeFromCart(productId) {
    fetch(`https://mnsingh.pythonanywhere.com/cart/1/cart/${productId}`, { // Replace 1 with the actual user ID
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Product removed from cart') {
            fetchCartItems(); // Refresh cart items
        } else {
            alert('Remove failed: ' + data.message);
        }
    })
    .catch(error => console.error('Error removing product from cart:', error));
}
