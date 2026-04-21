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

function renderCart() {
  const el = document.getElementById('cartItems');
  if (cart.length === 0) {
    el.innerHTML = '<div class="empty-cart">🛒<br><br>Votre panier est vide.</div>';
    return;
  }
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  el.innerHTML = cart.map(c => `
    <div class="cart-item">
      <img src="${c.img || DEFAULT_IMG}" alt="${c.name}" onerror="this.src='${DEFAULT_IMG}'">
      <div class="cart-item-info">
        <h4>${c.name}</h4>
        <p>${c.price} DH × ${c.qty} = ${c.price * c.qty} DH</p>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" onclick="changeQty(${c.id}, -1)">−</button>
        <span class="qty-num">${c.qty}</span>
        <button class="qty-btn" onclick="changeQty(${c.id}, 1)">+</button>
      </div>
      <button class="btn-remove-cart" onclick="removeFromCart(${c.id})">✕</button>
    </div>
  `).join('') + `
    <div class="cart-total">
      <span>Total</span>
      <span>${total} DH</span>
    </div>
  `;
}



function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}




// Modal

function openModal(id = null) {
  editingId = id;
  const modal = document.getElementById('modalOverlay');
  const title = document.getElementById('modalTitle');
  const btn   = document.getElementById('modalConfirm');

  if (id) {
    const p = products.find(x => x.id === id);
    document.getElementById('mName').value  = p.name;
    document.getElementById('mPrice').value = p.price;
    document.getElementById('mImg').value   = p.img || '';
    document.getElementById('mDesc').value  = p.desc;
    title.textContent = 'Modifier le Produit';
    btn.textContent   = 'Enregistrer';
  } else {
    document.getElementById('mName').value  = '';
    document.getElementById('mPrice').value = '';
    document.getElementById('mImg').value   = '';
    document.getElementById('mDesc').value  = '';
    title.textContent = 'Ajouter un Produit';
    btn.textContent   = 'Envoyer le message';
  }
  modal.classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  editingId = null;
}



function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}








renderProducts();