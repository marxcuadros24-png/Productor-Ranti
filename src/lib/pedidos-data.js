export const orders = [
  {
    id: 1258,
    buyer: 'María López',
    buyerImage:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face&auto=format',
    product: '10 kg de Queso Paria',
    date: 'Hoy 10:30 a.m.',
    status: 'enviado',
    total: 120.0,
    delivery: 'Recojo en chacra',
    payment: 'Efectivo',
    phone: '+51 987 654 321',
    address: 'Jr. Los Olivos 123, Coracora',
    items: [
      { name: 'Queso Paria', quantity: 10, unit: 'kg', price: 12.0 },
    ],
  },
  {
    id: 1259,
    buyer: 'Juan Quispe',
    buyerImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format',
    product: '5 lts de Leche Fresca',
    date: 'Ayer 4:15 p.m.',
    status: 'pendiente',
    total: 25.0,
    delivery: 'Entrega en Coracora',
    payment: 'Yape',
    phone: '+51 987 654 322',
    address: 'Av. Primavera 456, Coracora',
    items: [
      { name: 'Leche Fresca', quantity: 5, unit: 'lts', price: 5.0 },
    ],
  },
  {
    id: 1260,
    buyer: 'Carlos Romero',
    buyerImage:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format',
    product: '15 kg de Papa Nativa',
    date: '24 Mayo',
    status: 'entregado',
    total: 52.5,
    delivery: 'Envío por transportista',
    payment: 'Transferencia',
    phone: '+51 987 654 323',
    address: 'Pje. Las Flores 789, Pullo',
    items: [
      { name: 'Papa Nativa', quantity: 15, unit: 'kg', price: 3.5 },
    ],
  },
  {
    id: 1261,
    buyer: 'Rosa Mamani',
    buyerImage:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&auto=format',
    product: '8 kg de Quinua Real',
    date: '22 Mayo',
    status: 'pendiente',
    total: 96.0,
    delivery: 'Recojo en chacra',
    payment: 'Efectivo',
    phone: '+51 987 654 324',
    address: 'Calle Real 321, Coracora',
    items: [
      { name: 'Quinua Real', quantity: 8, unit: 'kg', price: 12.0 },
    ],
  },
  {
    id: 1262,
    buyer: 'Pedro Huamán',
    buyerImage:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face&auto=format',
    product: '20 kg de Maíz Morado',
    date: '20 Mayo',
    status: 'entregado',
    total: 160.0,
    delivery: 'Entrega en Coracora',
    payment: 'Yape',
    phone: '+51 987 654 325',
    address: 'Av. Central 654, Coracora',
    items: [
      { name: 'Maíz Morado', quantity: 20, unit: 'kg', price: 8.0 },
    ],
  },
];

export const chats = [
  {
    buyerId: 'maria-lopez',
    buyerName: 'María López',
    buyerImage:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face&auto=format',
    orderRef: 'Pedido #1258 - Queso Paria',
    lastMessage: 'Sí, perfecto. Muchas gracias.',
    lastTime: '10:32 a.m.',
    online: true,
  },
  {
    buyerId: 'juan-quispe',
    buyerName: 'Juan Quispe',
    buyerImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format',
    orderRef: 'Pedido #1259 - Leche Fresca',
    lastMessage: '¿A qué hora puedo pasar?',
    lastTime: 'Ayer 4:20 p.m.',
    online: true,
  },
  {
    buyerId: 'carlos-romero',
    buyerName: 'Carlos Romero',
    buyerImage:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format',
    orderRef: 'Pedido #1260 - Papa Nativa',
    lastMessage: 'Todo en orden, gracias.',
    lastTime: '24 Mayo',
    online: false,
  },
];

export const messages = {
  'maria-lopez': [
    { id: 1, sender: 'buyer', text: 'Hola, ¿tienes queso paria disponible?', time: '10:15 a.m.' },
    { id: 2, sender: 'me', text: '¡Hola María! Sí, tengo queso paria fresco de esta semana.', time: '10:16 a.m.' },
    { id: 3, sender: 'buyer', text: 'Perfecto, quisiera 10 kg para hoy.', time: '10:18 a.m.' },
    { id: 4, sender: 'me', text: 'Claro, lo preparo. ¿Vienes a la chacra o prefieres que lo lleve a Coracora?', time: '10:20 a.m.' },
    { id: 5, sender: 'buyer', text: 'Mejor recojo en la chacra, así saludo a los animalitos 😊', time: '10:25 a.m.' },
    { id: 6, sender: 'me', text: 'Jaja, te espero entonces. Llegando nomás me avisas.', time: '10:28 a.m.' },
    { id: 7, sender: 'buyer', text: 'Sí, perfecto. Muchas gracias.', time: '10:32 a.m.' },
  ],
  'juan-quispe': [
    { id: 1, sender: 'buyer', text: 'Buenos días, ¿tienes leche fresca?', time: '4:00 p.m.' },
    { id: 2, sender: 'me', text: 'Buenas tardes Juan, sí acabo de ordeñar.', time: '4:05 p.m.' },
    { id: 3, sender: 'buyer', text: 'Necesito 5 litros.', time: '4:10 p.m.' },
    { id: 4, sender: 'me', text: 'Sin problema, te guardo.', time: '4:12 p.m.' },
    { id: 5, sender: 'buyer', text: '¿A qué hora puedo pasar?', time: '4:20 p.m.' },
  ],
  'carlos-romero': [
    { id: 1, sender: 'buyer', text: 'Holaaa, ¿las papas nativas están disponibles?', time: '10:00 a.m.' },
    { id: 2, sender: 'me', text: 'Sí Carlos, recién cosechadas.', time: '10:05 a.m.' },
    { id: 3, sender: 'buyer', text: 'Pídeme 15 kg por favor.', time: '10:08 a.m.' },
    { id: 4, sender: 'me', text: 'Listo, te las preparo para el transporte.', time: '10:12 a.m.' },
    { id: 5, sender: 'buyer', text: 'Todo en orden, gracias.', time: '10:30 a.m.' },
  ],
};
