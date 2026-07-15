import { Plant, CheckCircle, Cow, Package } from '@phosphor-icons/react/dist/ssr';

export const productorUno = {
  name: 'María Huamán Quispe',
  location: 'Parinacochas, Ayacucho, Perú',
  image:
    'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=200&h=200&fit=crop&crop=face&auto=format',
  rating: 4.9,
  reviewCount: 38,
  description:
    'Soy una agricultora independiente de la provincia de Parinacochas, en las alturas de Ayacucho. Cultivo papas nativas, quinua y habas con métodos tradicionales heredados de mis abuelos. También crío alpacas y ovejas en armonía con la naturaleza. Mis productos son 100% orgánicos, cultivados a más de 3,500 msnm, cerca a la hermosa Laguna de Parinacochas.',
  memberSince: '2023',
  productCount: 8,
  animalCount: 5,
};

const StarIcon = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const BagIcon = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const AnimalIcon = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
  </svg>
);

const OrderIcon = (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

export const stats = [
  { icon: StarIcon, label: 'Valoración', value: '4.9', color: 'earth' },
  { icon: BagIcon, label: 'Productos', value: '8', color: 'green' },
  { icon: AnimalIcon, label: 'Animales', value: '5', color: 'purple' },
  { icon: OrderIcon, label: 'Pedidos', value: '28', color: 'blue' },
];

export const products = [
  {
    id: 1,
    name: 'Papa Nativa',
    price: 3.5,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&h=450&fit=crop&auto=format',
    producer: 'María Huamán Quispe',
    location: 'Parinacochas, Ayacucho',
  },
  {
    id: 2,
    name: 'Quinua Real',
    price: 12.0,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=450&fit=crop&auto=format',
    producer: 'María Huamán Quispe',
    location: 'Parinacochas, Ayacucho',
  },
  {
    id: 3,
    name: 'Habas Secas',
    price: 6.0,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&h=450&fit=crop&auto=format',
    producer: 'María Huamán Quispe',
    location: 'Parinacochas, Ayacucho',
  },
];

export const animals = [
  {
    id: 1,
    name: 'Alpaca',
    breed: 'Huacaya',
    age: '2 años',
    price: 1200,
    image:
      'https://images.unsplash.com/photo-1524024973431-2ad9167462d8?w=600&h=450&fit=crop&auto=format',
    producer: 'María Huamán Quispe',
    location: 'Parinacochas, Ayacucho',
  },
  {
    id: 2,
    name: 'Llama',
    breed: "Q'ara",
    age: '3 años',
    price: 1800,
    image:
      'https://images.unsplash.com/photo-1559532146-fa4fc08a8256?w=600&h=450&fit=crop&auto=format',
    producer: 'María Huamán Quispe',
    location: 'Parinacochas, Ayacucho',
  },
  {
    id: 3,
    name: 'Oveja',
    breed: 'Corriedale',
    age: '1.5 años',
    price: 450,
    image:
      'https://images.unsplash.com/photo-1480044965905-02098d419e96?w=600&h=450&fit=crop&auto=format',
    producer: 'María Huamán Quispe',
    location: 'Parinacochas, Ayacucho',
  },
];

export const activities = [
  {
    icon: <Plant size={18} weight="bold" />,
    title: 'Nuevo producto: Papa Nativa',
    description: 'María agregó un nuevo lote de papas nativas de la temporada desde su parcela en Parinacochas.',
    time: 'Hace 2 horas',
    type: 'new',
  },
  {
    icon: <CheckCircle size={18} weight="bold" />,
    title: 'Pedido completado',
    description: 'Pedido de 30 kg de quinua entregado a cliente en Ayacucho.',
    time: 'Hace 1 día',
    type: 'sale',
  },
  {
    icon: <Cow size={18} weight="bold" />,
    title: 'Nuevo animal registrado',
    description: 'María registró una alpaca Huacaya de 2 años para su venta.',
    time: 'Hace 3 días',
    type: 'default',
  },
  {
    icon: <Package size={18} weight="bold" />,
    title: 'Stock actualizado',
    description: 'María actualizó el inventario de productos disponibles en su tienda.',
    time: 'Hace 5 días',
    type: 'alert',
  },
];
