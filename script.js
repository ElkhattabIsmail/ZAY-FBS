let products = [
  { id: 1, name: "Huile d'Olive Bio", price: 80, desc: "Première pression à froid, acidité < 0,3%. Goût fruité et délicat.", 
    img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80" },
  { id: 2, name: "Huile d'Olive Bio", price: 80, desc: "Première pression à froid, acidité < 0,3%. Goût fruité et délicat.", 
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
  { id: 3, name: "Huile d'Olive Bio", price: 80, desc: "Première pression à froid, acidité < 0,3%. Goût fruité et délicat.", 
    img: "https://images.unsplash.com/photo-1601379327928-bedfaf9da2d0?w=400&q=80" },
];






// ── NAVIGATION ──
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  const navEl = document.getElementById('nav-' + name);
  if (navEl) navEl.classList.add('active');
  document.getElementById('navLinks').classList.remove('open');
  if (name === 'produits') renderProducts();
  if (name === 'panier') renderCart();
}


const DEFAULT_IMG = "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80";

// ── PRODUCTS List ──
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (products.length === 0) {
    grid.innerHTML = '<p style="padding:2rem;color:var(--text-light);">Aucun produit. Ajoutez-en un !</p>';
    return;
  }
  grid.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.img || DEFAULT_IMG}" alt="${p.name}" onerror="this.src='${DEFAULT_IMG}'">
      <div class="product-card-body">
        <h3>${p.name}</h3>
        <div class="product-price">${p.price} DH</div>
        <p class="product-desc">${p.desc}</p>
        <div class="product-actions">
          <button class="btn-cart" onclick="addToCart(${p.id})">❤ Ajouter au Panier</button>
          <button class="btn-edit" onclick="openModal(${p.id})">Modifier</button>
          <button class="btn-del" onclick="deleteProduct(${p.id})">✕</button>
        </div>
      </div>
    </div>
  `).join('');
}
















renderProducts();