const hoodies = [
  { name: "Metro Gray", price: 1299, category: "men", image: "assets/hoodies/metro-gray.jpg" },
  { name: "Rust Core", price: 1499, category: "women", image: "assets/hoodies/rust-core.jpg" },
  { name: "Ocean Fade", price: 1699, category: "more", image: "assets/hoodies/ocean-fade.jpg" },
  { name: "Night Black", price: 1999, category: "men", image: "assets/hoodies/night-black.jpg" },
  { name: "Moss Green", price: 1399, category: "women", image: "assets/hoodies/moss-green.jpg" },
  { name: "Sand Dune", price: 1199, category: "more", image: "assets/hoodies/sand-dune.jpg" },
  { name: "Signal Red", price: 1799, category: "men", image: "assets/hoodies/signal-red.jpg" },
  { name: "Cloud White", price: 1599, category: "women", image: "assets/hoodies/cloud-white.jpg" }
];

const productsEl = document.getElementById("products");
const shuffleBtn = document.getElementById("shuffle");
const cartCountEl = document.getElementById("cart-count");
const tabsEl = document.getElementById("category-tabs");
let cartCount = 0;
let activeFilter = "all";

function buildFallbackImage(name) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="700" viewBox="0 0 900 700"><rect width="900" height="700" fill="#dce8ee"/><path d="M230 245l95-80h250l95 80-62 85v245H292V330z" fill="#7c97a3"/><rect x="365" y="200" width="170" height="70" rx="14" fill="#edf4f7"/><text x="50%" y="620" text-anchor="middle" fill="#123040" font-size="44" font-family="Arial, sans-serif">${name} Hoodie</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getVisibleHoodies() {
  if (activeFilter === "all") {
    return hoodies;
  }
  return hoodies.filter((hoodie) => hoodie.category === activeFilter);
}

function renderProducts(items) {
  productsEl.innerHTML = items
    .map(
      (item) => `
      <article class="card">
        <img class="product-image" src="${item.image}" alt="${item.name} Hoodie" loading="lazy">
        <div class="card-body">
          <h3>${item.name} Hoodie</h3>
          <p class="price">₹${item.price}</p>
          <div class="card-actions">
            <button class="add-btn" data-name="${item.name}">Add to Cart</button>
          </div>
        </div>
      </article>
    `
    )
    .join("");

  const addButtons = document.querySelectorAll(".add-btn");
  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      cartCount += 1;
      cartCountEl.textContent = String(cartCount);
      button.textContent = "Added";
      setTimeout(() => {
        button.textContent = "Add to Cart";
      }, 700);
    });
  });

  const images = document.querySelectorAll(".product-image");
  images.forEach((img) => {
    img.addEventListener("error", () => {
      if (img.dataset.fallback === "true") {
        return;
      }
      img.dataset.fallback = "true";
      const label = img.alt.replace(" Hoodie", "");
      img.src = buildFallbackImage(label);
    });
  });
}

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

shuffleBtn.addEventListener("click", () => {
  renderProducts(shuffle(getVisibleHoodies()));
});

tabsEl.addEventListener("click", (event) => {
  const button = event.target.closest(".tab-btn");
  if (!button) {
    return;
  }
  activeFilter = button.dataset.filter;
  document.querySelectorAll(".tab-btn").forEach((tab) => {
    tab.classList.remove("active");
  });
  button.classList.add("active");
  renderProducts(getVisibleHoodies());
});

renderProducts(getVisibleHoodies());
