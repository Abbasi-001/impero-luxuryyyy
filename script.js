let cart = [];

const products = [
  { 
    id: 1, 
    name: "Royal Ivory Ensemble", 
    price: 24500, 
    img: "https://images.unsplash.com/photo-1585487000160-6eb1f3f3c3e3?w=800",
    desc: "A timeless masterpiece crafted with intricate embroidery and delicate handwork. Designed for elegance that speaks legacy."
  },
  { 
    id: 2, 
    name: "Noir Majesty", 
    price: 27500, 
    img: "https://images.unsplash.com/photo-1591343395084-9c4c5c8b5c5c?w=800",
    desc: "Bold and sophisticated black ensemble with royal detailing. Perfect for those who command attention."
  },
  { 
    id: 3, 
    name: "Golden Heritage", 
    price: 28900, 
    img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800",
    desc: "Luxurious gold embroidered outfit that celebrates tradition with modern grace."
  },
  { 
    id: 4, 
    name: "Empress Rose", 
    price: 23900, 
    img: "https://images.unsplash.com/photo-1610030469984-7c2c3e8f0b0a?w=800",
    desc: "Delicate rose pink ensemble with exquisite craftsmanship for the modern royal woman."
  }
];

function enterSite() {
  const wardrobe = document.getElementById('wardrobe');
  gsap.to(wardrobe, { scale: 1.08, rotation: 1, duration: 1.2, ease: "power2.inOut" });
  
  gsap.to("#title", { opacity: 1, y: -20, duration: 1.2, delay: 0.4 });
  gsap.to("#tagline", { opacity: 1, y: -20, duration: 1.2, delay: 0.6 });

  setTimeout(() => {
    document.getElementById('entryScreen').classList.add('hidden');
    document.getElementById('mainSite').classList.remove('hidden');
    renderProducts();
    gsap.from(".luxury-card", { y: 100, opacity: 0, duration: 1.2, stagger: 0.15 });
  }, 1400);
}

function renderProducts() {
  const container = document.getElementById('productGrid');
  container.innerHTML = '';
  
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = `luxury-card bg-white rounded-3xl overflow-hidden cursor-pointer relative group`;
    card.innerHTML = `
      <div class="overflow-hidden">
        <img src="${product.img}" class="product-img w-full h-96 object-cover">
      </div>
      <div class="p-6">
        <h3 class="heading text-2xl">${product.name}</h3>
        <p class="text-[#C6A76A] text-xl font-medium mt-2">PKR ${product.price.toLocaleString()}</p>
        <button onclick="addToCart(${product.id}); event.stopImmediatePropagation()" 
          class="mt-5 w-full py-4 border border-[#C6A76A] hover:bg-[#C6A76A] hover:text-black transition-all text-sm tracking-widest">
          ADD TO CART
        </button>
      </div>
    `;
    card.onclick = () => showProductModal(product);
    container.appendChild(card);
  });
}

function showProductModal(product) {
  document.getElementById('modalContent').innerHTML = `
    <div>
      <img src="${product.img}" class="w-full rounded-2xl shadow-lg">
    </div>
    <div>
      <h2 class="heading text-4xl text-[#5C3A21]">${product.name}</h2>
      <p class="text-3xl text-[#C6A76A] mt-3">PKR ${product.price.toLocaleString()}</p>
      <p class="mt-6 text-gray-600 leading-relaxed">${product.desc}</p>
      
      <div class="mt-8">
        <p class="font-medium mb-3">Size</p>
        <div class="flex gap-3">
          <button onclick="selectSize(this)" class="size-btn border border-gray-300 px-5 py-2 rounded-xl">S</button>
          <button onclick="selectSize(this)" class="size-btn border border-gray-300 px-5 py-2 rounded-xl">M</button>
          <button onclick="selectSize(this)" class="size-btn border border-gray-300 px-5 py-2 rounded-xl active">L</button>
          <button onclick="selectSize(this)" class="size-btn border border-gray-300 px-5 py-2 rounded-xl">XL</button>
        </div>
      </div>

      <div class="mt-8 flex gap-4">
        <button onclick="addToCart(${product.id}); closeModal()" 
          class="flex-1 py-6 bg-black text-white text-lg tracking-widest hover:bg-[#C6A76A] hover:text-black transition-all">
          ADD TO CART
        </button>
        <button onclick="closeModal()" 
          class="flex-1 py-6 border-2 border-[#C6A76A] text-[#C6A76A] hover:bg-[#C6A76A] hover:text-black transition-all">
          BUY NOW
        </button>
      </div>
    </div>
  `;
  document.getElementById('productModal').classList.remove('hidden');
}

function selectSize(el) {
  document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
  el.classList.add('active');
}

function closeModal() {
  document.getElementById('productModal').classList.add('hidden');
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  document.getElementById('cartCount').textContent = cart.length;
  
  const toast = document.createElement('div');
  toast.style.cssText = `position:fixed; bottom:30px; right:30px; background:#C6A76A; color:#111; padding:18px 32px; border-radius:9999px; font-weight:500; z-index:9999;`;
  toast.textContent = `${product.name} added to cart`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

function toggleCart() {
  alert("🛍️ Full Cart Sidebar Coming Soon");
}

// Auto Enter
setTimeout(() => {
  if (document.getElementById('mainSite').classList.contains('hidden')) enterSite();
}, 6500);
