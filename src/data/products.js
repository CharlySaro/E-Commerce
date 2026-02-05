// Mock data de productos - Motos
const products = [
  // Nakeds
  {
    id: '1',
    name: 'Yamaha MT-07',
    category: 'nakeds',
    price: 7500000,
    description: 'La MT-07 es una naked ligera y ágil, perfecta para la ciudad y carreteras sinuosas. Motor bicilíndrico en línea de 689cc que entrega 73 HP.',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800',
    stock: 5
  },
  {
    id: '2',
    name: 'Kawasaki Z900',
    category: 'nakeds',
    price: 12000000,
    description: 'Naked de alta cilindrada con motor de 4 cilindros de 948cc. Potencia brutal de 125 HP y diseño agresivo.',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    stock: 3
  },
  {
    id: '3',
    name: 'Honda CB650R',
    category: 'nakeds',
    price: 9500000,
    description: 'Naked deportiva con estilo neo-retro. Motor de 4 cilindros en línea de 649cc que produce 95 HP.',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80',
    stock: 7
  },
  
  // Deportivas
  {
    id: '4',
    name: 'Yamaha YZF-R6',
    category: 'deportivas',
    price: 14500000,
    description: 'Supersport de circuito con motor de 4 cilindros de 599cc. 118 HP de pura adrenalina y tecnología de MotoGP.',
    image: 'https://www.motofichas.com/images/cache/10-yamaha-yzf-r6-race-2024-estudio-negro-01-739-a.jpg',
    stock: 4
  },
  {
    id: '5',
    name: 'Kawasaki Ninja ZX-10R',
    category: 'deportivas',
    price: 22000000,
    description: 'Superbike de competición con motor de 998cc y 203 HP. Equipada con control de tracción y modos de conducción.',
    image: 'https://www.motofichas.com/images/cache/10-kawasaki-ninja-zx-10r-2026-estudio-verde-01-739-a.jpg',
    stock: 2
  },
  {
    id: '6',
    name: 'Suzuki GSX-R750',
    category: 'deportivas',
    price: 16500000,
    description: 'La clásica deportiva de 750cc. Motor de 4 cilindros que entrega 148 HP, perfecta balance entre potencia y manejabilidad.',
    image: 'https://www.motofichas.com/images/phocagallery/Suzuki/gsx-r_600_750_2015/02-suzuki-gsx-r-600-750-2015-azul-del.jpg',
    stock: 6
  },
  {
    id: '7',
    name: 'Honda CBR1000RR',
    category: 'deportivas',
    price: 20000000,
    description: 'Superbike con tecnología directa de competición. Motor de 999cc con 189 HP y aerodinámica de vanguardia.',
    image: 'https://www.motofichas.com/images/cache/10-honda-cbr1000rr-r-fireblade-2024-estudio-rojo-01-739-a.jpg',
    stock: 3
  },
  
  // Enduro
  {
    id: '8',
    name: 'KTM 690 Enduro R',
    category: 'enduro',
    price: 13500000,
    description: 'Enduro de alto rendimiento con motor monocilíndrico de 690cc. 74 HP y lista para cualquier terreno.',
    image: 'https://images.unsplash.com/photo-1580310614729-ccd69652491d?w=800&q=80',
    stock: 5
  },
  {
    id: '9',
    name: 'Yamaha Ténéré 700',
    category: 'enduro',
    price: 11500000,
    description: 'La aventurera definitiva. Motor bicilíndrico CP2 de 689cc con 73 HP. Diseñada para el Rally Dakar.',
    image: 'https://www.motofichas.com/images/cache/10-yamaha-tenere-700-2025-estudio-azul-01-739-a.jpg',
    stock: 8
  },
  {
    id: '10',
    name: 'Honda CRF450L',
    category: 'enduro',
    price: 10500000,
    description: 'Enduro ligera basada en la CRF450R de competición. Motor de 450cc monocilíndrico ideal para off-road extremo.',
    image: 'https://www.motofichas.com/images/cache/01-honda-crf-450-l-2019-estatica-739-a.jpg',
    stock: 4
  },
  {
    id: '11',
    name: 'Husqvarna 701 Enduro',
    category: 'enduro',
    price: 14000000,
    description: 'Enduro de alto rendimiento con motor monocilíndrico de 693cc. 74 HP y equipamiento premium.',
    image: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=800&q=80',
    stock: 3
  }
];

// Simular delay de API con Promise
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Obtener todos los productos
export const getProducts = () => {
  return delay(2000).then(() => products);
};

// Obtener productos por categoría
export const getProductsByCategory = (categoryId) => {
  return delay(2000).then(() => {
    return products.filter(product => product.category === categoryId);
  });
};

// Obtener un producto por ID
export const getProductById = (id) => {
  return delay(2000).then(() => {
    return products.find(product => product.id === id);
  });
};

export default products;
