document.addEventListener("DOMContentLoaded", () => {
  // Fetch all products and display them
  fetchProducts();
  const userId = localStorage.getItem("user_id"); // Make sure to define userId or get it dynamically
  const cart = [];
  const cartContents = document.getElementById("cart-items");

  fetch(`https://mnsingh.pythonanywhere.com/cart/${userId}/cart`)
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        cartContents.innerHTML = `<p>${data.message}</p>`;
      } else {
        cartContents.innerHTML = "";
        data.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = `Product ID: ${item.product_id}, Quantity: ${item.quantity}`;
          cartContents.appendChild(li);
          cart.push({
            product_id: item.product_id,
            quantity: item.quantity,
          });
        });
      }
    })
    .catch((error) => console.error("Error fetching cart:", error));

  // Function to fetch products from backend
  function fetchProducts() {
    fetch("https://mnsingh.pythonanywhere.com/admin/products") // Example API URL
      .then((response) => response.json())
      .then((products) => {
        const productContainer = document.getElementById("product-container");
        products.forEach((product) => {
          // Create a product card
          const productCard = document.createElement("div");
          productCard.classList.add("product-card");
          productCard.innerHTML = `
              <img src="${product.image_url}" alt="${product.name}">
              <h4>${product.name}</h4>
              <p>${product.description}</p>
              <p>$${product.price}</p>
              <button class="add-to-cart-btn" data-product-id="${product.id}">Buy</button>
            `;
          productContainer.appendChild(productCard);
        });

        // Attach event listeners for Buy buttons
        document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
          button.addEventListener("click", (event) => {
            const productId = event.target.getAttribute("data-product-id");
            addToCart(productId);
          });
        });
      })
      .catch((error) => console.error("Error fetching products:", error));
  }

  // Function to add a product to the cart
  function addToCart(productId) {
    fetch(`https://mnsingh.pythonanywhere.com/products/${productId}`)
      .then((response) => response.json())
      .then((product) => {
        // Add product to cart array
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }

  // Function to update the cart UI
  function updateCartUI() {
    const cartItemsList = document.getElementById("cart-items");
    cartItemsList.innerHTML = "";
    cart.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.name} - $${item.price}`;
      cartItemsList.appendChild(listItem);
    });
  }

  // Proceed to Checkout Button
  document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Navigate to checkout page (you can replace this with actual checkout logic)
    alert("Proceeding to checkout!");
    window.location.href = "checkout.html"; // Example checkout page
  });

  // Initial cart UI update
  updateCartUI();
});
