const STORAGE_KEY = 'ranti_products';

/**
 * Calculate next available ID from existing products
 */
function getNextId(products) {
  if (products.length === 0) return 100;
  const maxId = Math.max(...products.map((p) => p.id || 0));
  return maxId + 1;
}

/**
 * Get all saved products from localStorage
 */
export function getSavedProducts() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Save a new product with auto-generated ID and timestamp
 */
export function saveProduct(productData) {
  if (typeof window === 'undefined') return null;

  const products = getSavedProducts();
  const nextId = getNextId(products);

  const newProduct = {
    id: nextId,
    nombre: productData.nombre,
    precio: productData.precio,
    unit: productData.unit,
    stock: productData.stock || 0,
    descripcion: productData.descripcion || '',
    images: productData.images || [],
    image: productData.images?.[0] || null,
    producer: 'Comunidad Campesina de Qero',
    location: 'Cusco, Perú',
    createdAt: new Date().toISOString(),
  };

  products.push(newProduct);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.warn('localStorage full, could not save product:', e);
    try {
      const old = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const trimmed = old.slice(-49);
      trimmed.push(newProduct);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch {
      // Give up
    }
  }

  // Dispatch custom event so dashboard can update
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('product-saved', { detail: newProduct }));
  }

  return newProduct;
}

/**
 * Get total product count (static + dynamic)
 */
export function getProductCount(staticCount = 0) {
  return staticCount + getSavedProducts().length;
}

/**
 * Get recent saved products for activity feed
 */
export function getRecentProducts(limit = 5) {
  const products = getSavedProducts();
  return products
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
}

/**
 * Convert saved products to activity feed format
 */
export function savedProductsToActivities(limit = 3) {
  const recent = getRecentProducts(limit);
  return recent.map((p) => ({
    icon: 'product',
    title: 'Nuevo producto creado',
    description: `${p.nombre} — ${p.stock || 0} ${p.unit} disponibles`,
    time: timeAgo(new Date(p.createdAt)),
    type: 'new',
  }));
}

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - date) / 1000);
  if (seconds < 60) return 'Hace unos segundos';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `Hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `Hace ${days} día${days > 1 ? 's' : ''}`;
  return 'Hace más de un mes';
}
