const STORAGE_KEY = 'ranti_animals';

function getNextId(animals) {
  if (animals.length === 0) return 100;
  const maxId = Math.max(...animals.map((a) => a.id || 0));
  return maxId + 1;
}

export function getSavedAnimals() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAnimal(animalData) {
  if (typeof window === 'undefined') return null;

  const animals = getSavedAnimals();
  const nextId = getNextId(animals);

  const newAnimal = {
    id: nextId,
    nombre: animalData.nombre,
    categoria: animalData.categoria,
    raza: animalData.raza,
    edad: animalData.edad,
    peso: animalData.peso || 0,
    salud: animalData.salud || 'Bueno',
    precio: animalData.precio || 0,
    descripcion: animalData.descripcion || '',
    image: animalData.image || null,
    images: animalData.images || [],
    producer: 'Comunidad Campesina de Qero',
    location: 'Cusco, Perú',
    createdAt: new Date().toISOString(),
  };

  animals.push(newAnimal);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(animals));
  } catch (e) {
    console.warn('localStorage full, could not save animal:', e);
    try {
      const old = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const trimmed = old.slice(-49);
      trimmed.push(newAnimal);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch {
      // Give up
    }
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('animal-saved', { detail: newAnimal }));
  }

  return newAnimal;
}

export function getAnimalCount(staticCount = 0) {
  return staticCount + getSavedAnimals().length;
}

export function getRecentAnimals(limit = 5) {
  const animals = getSavedAnimals();
  return animals
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
}

export function savedAnimalsToActivities(limit = 3) {
  const recent = getRecentAnimals(limit);
  return recent.map((a) => ({
    icon: 'animal',
    title: 'Nuevo animal registrado',
    description: `${a.nombre} — ${a.raza}, ${a.edad}`,
    time: timeAgo(new Date(a.createdAt)),
    type: 'default',
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
