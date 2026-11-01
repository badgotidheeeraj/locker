
const products = [
  {
    id: 1,
    name: "Premium Brass Door Lock",
    category: "Door Locks",
    price: 1299,
    oldPrice: 1699,
    image: "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=600"
  },
  {
    id: 2,
    name: "Digital Smart Door Lock",
    category: "Smart Locks",
    price: 4999,
    oldPrice: 5999,
    image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=600"
  },
  {
    id: 3,
    name: "Heavy Duty Steel Padlock",
    category: "Padlocks",
    price: 599,
    oldPrice: 799,
    image: "https://images.unsplash.com/photo-1504203700686-6c0b4b5e0e2b?w=600"
  },
  {
    id: 4,
    name: "Fingerprint Door Lock",
    category: "Smart Locks",
    price: 6499,
    oldPrice: 7499,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600"
  },
  {
    id: 5,
    name: "Premium Pressure Cooker",
    category: "Cookers",
    price: 1899,
    oldPrice: 2299,
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600"
  },
  {
    id: 6,
    name: "Combination Security Lock",
    category: "Padlocks",
    price: 449,
    oldPrice: 599,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600"
  },
  {
    id: 7,
    name: "Modern Door Handle Lock",
    category: "Door Locks",
    price: 999,
    oldPrice: 1299,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600"
  },
  {
    id: 8,
    name: "Aluminium Pressure Cooker",
    category: "Cookers",
    price: 1499,
    oldPrice: 1799,
    image: "https://images.unsplash.com/photo-1584990347449-a8d4f0b2d7d2?w=600"
  }
];

let selectedCategory = "All";
let cart = [];

const container = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");

function renderProducts() {
  const query = searchInput.value.toLowerCase();

  const filtered = products.filter(product => {
    const categoryMatch =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const searchMatch =
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);

    return categoryMatch && searchMatch;
  });

  container.innerHTML = filtered.length
    ? filtered.map(product => `
      <div class="col-6 col-md-4 col-lg-3">
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <div class="product-info">
            <p class="product-category">${product.category}</p>
            <h5>${product.name}</h5>
            <p>
              <span class="product-price">₹${product.price.toLocaleString("en-IN")}</span>
              <span class="old-price">₹${product.oldPrice.toLocaleString("en-IN")}</span>
            </p>
            <button class="add-cart" onclick="addToCart(${product.id})">
              ADD TO CART +
            </button>
          </div>
        </div>
      </div>
    `).join("")
    : `<div class="col-12 text-center py-5">No products found.</div>`;

  document.querySelectorAll(".filter-btn").forEach(button => {
    button.classList.toggle(
      "active",
      button.textContent.trim() === selectedCategory ||
      (selectedCategory === "All" && button.textContent.trim() === "All")
    );
  });
}

function filterCategory(category) {
  selectedCategory = category;
  renderProducts();
  document.getElementById("products").scrollIntoView({
    behavior: "smooth"
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

function changeQuantity(id, amount) {
  const item = cart.find(p => p.id === id);
  if (!item) return;

  item.quantity += amount;
  cart = cart.filter(p => p.quantity > 0);
  updateCart();
}

function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent =
    total.toLocaleString("en-IN");

  document.getElementById("cartItems").innerHTML = cart.length
    ? cart.map(item => `
      <div class="border-bottom py-3">
        <h6>${item.name}</h6>
        <p>₹${item.price.toLocaleString("en-IN")}</p>
        <div class="d-flex align-items-center gap-3">
          <button class="btn btn-sm btn-outline-dark"
            onclick="changeQuantity(${item.id}, -1)">−</button>
          <span>${item.quantity}</span>
          <button class="btn btn-sm btn-outline-dark"
            onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
    `).join("")
    : "<p>Your cart is empty.</p>";
}

function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Replace with your actual WhatsApp number, including country code.
  const phone = "91XXXXXXXXXX";

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const message = cart.map(item =>
    `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
  ).join("\n");

  const text = `Hello LOCKORA!\nI want to order:\n\n${message}\n\nTotal: ₹${total}`;

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
    "_blank"
  );
}

searchInput.addEventListener("input", renderProducts);

renderProducts();
