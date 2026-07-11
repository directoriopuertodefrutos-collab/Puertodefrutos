import type { Business } from "@/types";

export const businesses: Business[] = [
  {
    id: "1",
    name: "Casa Delta",
    slug: "casa-delta",
    category: "decoracion",
    description:
      "Casa Delta es un espacio dedicado a la decoración contemporánea con esencia ribereña. Fundada en 2005, ofrece piezas únicas que fusionan el diseño moderno con las tradiciones del Delta del Paraná. Su catálogo incluye desde cerámicas artesanales hasta mobiliario de autor, todo seleccionado con una curaduría impecable.",
    shortDescription:
      "Decoración contemporánea con esencia del Delta. Piezas únicas seleccionadas con curaduría impecable.",
    story:
      "Nació en 2005 como un pequeño taller de cerámica artesanal. Con los años, fuimos creciendo hasta convertirnos en un referente de la decoración contemporánea en el Puerto de Frutos. Cada pieza que seleccionamos cuenta una historia y está hecha por manos argentinas.",
    image: "/images/businesses/casa-delta.jpg",
    images: [
      "/images/businesses/casa-delta-1.jpg",
      "/images/businesses/casa-delta-2.jpg",
      "/images/businesses/casa-delta-3.jpg",
    ],
    logo: "/images/businesses/casa-delta-logo.svg",
    rating: 4.8,
    reviewCount: 124,
    featured: true,
    premium: true,
    schedule: {
      monday: { open: "10:00", close: "19:00" },
      tuesday: { open: "10:00", close: "19:00" },
      wednesday: { open: "10:00", close: "19:00" },
      thursday: { open: "10:00", close: "19:00" },
      friday: { open: "10:00", close: "19:00" },
      saturday: { open: "10:00", close: "20:00" },
      sunday: { open: "11:00", close: "19:00" },
    },
    contact: {
      phone: "11 4728-3940",
      email: "info@casadelta.com.ar",
      website: "https://casadelta.com.ar",
      whatsapp: "5491147283940",
    },
    location: {
      address: "Local 42, Puerto de Frutos, Tigre",
      latitude: -34.4212,
      longitude: -58.5792,
      mapUrl: "https://maps.google.com/?q=-34.4212,-58.5792",
    },
    products: [
      {
        id: "pd1",
        name: "Jarrón Artesanal Delta",
        description: "Cerámica esmaltada hecha a mano",
        price: "$12.500",
        image: "/images/products/jarron-delta.jpg",
        category: "Cerámica",
      },
      {
        id: "pd2",
        name: "Almohadones de Lino",
        description: "Set de 2 almohadones bordados",
        price: "$8.900",
        image: "/images/products/almohadones.jpg",
        category: "Textil",
      },
      {
        id: "pd3",
        name: "Velas Aromáticas",
        description: "Triada de velas de soja",
        price: "$6.500",
        image: "/images/products/velas.jpg",
        category: "Iluminación",
      },
    ],
    tags: [
      "decoración",
      "cerámica",
      "diseño",
      "artesanal",
      "contemporáneo",
      "delta",
    ],
    established: 2005,
    social: {
      instagram: "@casadeltainspo",
      facebook: "CasaDeltaTigre",
    },
  },
  {
    id: "2",
    name: "Muebles del Río",
    slug: "muebles-del-rio",
    category: "muebles",
    description:
      "Taller especializado en muebles de madera maciza y mimbre. Trabajamos con maderas recuperadas del Delta y materiales sustentables. Cada mueble es diseñado y construido en nuestro taller de Tigre.",
    shortDescription:
      "Muebles de madera maciza y mimbre, diseñados y construidos en Tigre.",
    story:
      "Muebles del Río comenzó como un emprendimiento familiar en 1998. Don Roberto, carpintero de oficio, empezó restaurando muebles antiguos y con el tiempo se especializó en diseño propio. Hoy, tres generaciones trabajan juntas creando piezas que duran toda la vida.",
    image: "/images/businesses/muebles-del-rio.jpg",
    images: [
      "/images/businesses/muebles-del-rio-1.jpg",
      "/images/businesses/muebles-del-rio-2.jpg",
    ],
    rating: 4.7,
    reviewCount: 98,
    featured: true,
    premium: true,
    schedule: {
      tuesday: { open: "10:00", close: "18:00" },
      wednesday: { open: "10:00", close: "18:00" },
      thursday: { open: "10:00", close: "18:00" },
      friday: { open: "10:00", close: "18:00" },
      saturday: { open: "10:00", close: "19:00" },
      sunday: { open: "11:00", close: "18:00" },
    },
    contact: {
      phone: "11 4728-4152",
      whatsapp: "5491147284152",
      website: "https://mueblesdelrio.com.ar",
    },
    location: {
      address: "Local 28, Puerto de Frutos, Tigre",
      latitude: -34.4215,
      longitude: -58.5795,
    },
    products: [
      {
        id: "pm1",
        name: "Mesa de Roble Macizo",
        description: "Mesa para 6 personas, madera recuperada",
        price: "$85.000",
        image: "/images/products/mesa-roble.jpg",
        category: "Mesas",
      },
      {
        id: "pm2",
        name: "Sillón de Mimbre",
        description: "Sillón tejido a mano con estructura de hierro",
        price: "$45.000",
        image: "/images/products/sillon-mimbre.jpg",
        category: "Sillones",
      },
    ],
    tags: ["muebles", "madera", "mimbre", "artesanal", "sustentable"],
    established: 1998,
    social: {
      instagram: "@mueblesdelriotigre",
      facebook: "MueblesDelRio",
    },
  },
  {
    id: "3",
    name: "Luz del Delta",
    slug: "luz-del-delta",
    category: "iluminacion",
    description:
      "Iluminación artesanal y diseño lumínico. Trabajamos con vidrio soplado, metal reciclado y fibras naturales. Cada lámpara es una obra de arte que transforma la luz en emoción.",
    shortDescription:
      "Lámparas artesanales que transforman la luz en emoción.",
    story:
      "Somos apasionados de la luz. En nuestro taller del Delta, combinamos técnicas ancestrales de vidrio soplado con diseño contemporáneo. Cada pieza es única, como el reflejo del sol sobre el río.",
    image: "/images/businesses/luz-del-delta.jpg",
    images: ["/images/businesses/luz-del-delta-1.jpg"],
    rating: 4.9,
    reviewCount: 76,
    featured: true,
    premium: false,
    schedule: {
      wednesday: { open: "11:00", close: "19:00" },
      thursday: { open: "11:00", close: "19:00" },
      friday: { open: "11:00", close: "19:00" },
      saturday: { open: "10:00", close: "20:00" },
      sunday: { open: "11:00", close: "19:00" },
    },
    contact: {
      phone: "11 4728-3671",
      whatsapp: "5491147283671",
    },
    location: {
      address: "Local 15, Puerto de Frutos, Tigre",
      latitude: -34.4218,
      longitude: -58.5789,
    },
    products: [
      {
        id: "pl1",
        name: "Lámpara de Vidrio Soplado",
        description: "Artesanal, colores disponibles: verde, azul, ámbar",
        price: "$28.000",
        image: "/images/products/lampara-vidrio.jpg",
        category: "Lámparas",
      },
    ],
    tags: ["iluminación", "lámparas", "vidrio soplado", "diseño"],
    social: {
      instagram: "@luzdeldelta",
    },
  },
  {
    id: "4",
    name: "Verde Nativo",
    slug: "verde-nativo",
    category: "plantas",
    description:
      "Vivero especializado en plantas nativas del Delta del Paraná. Cultivamos especies autóctonas, plantas acuáticas, helechos, y árboles nativos. También ofrecemos talleres de jardinería y diseño de espacios verdes.",
    shortDescription:
      "Vivero de plantas nativas del Delta. Especies autóctonas y diseño de jardines.",
    story:
      "Verde Nativo nació del amor por la flora del Delta. Somos biólogos y paisajistas apasionados por preservar la biodiversidad ribereña. Cada planta que vendemos es cultivada de manera sustentable en nuestro vivero.",
    image: "/images/businesses/verde-nativo.jpg",
    images: ["/images/businesses/verde-nativo-1.jpg"],
    rating: 4.6,
    reviewCount: 89,
    featured: false,
    premium: false,
    schedule: {
      monday: { open: "09:00", close: "18:00" },
      tuesday: { open: "09:00", close: "18:00" },
      wednesday: { open: "09:00", close: "18:00" },
      thursday: { open: "09:00", close: "18:00" },
      friday: { open: "09:00", close: "18:00" },
      saturday: { open: "09:00", close: "19:00" },
      sunday: { open: "10:00", close: "17:00" },
    },
    contact: {
      phone: "11 4728-4521",
      whatsapp: "5491147284521",
      email: "info@verdenativo.com.ar",
    },
    location: {
      address: "Local 8, Puerto de Frutos, Tigre",
      latitude: -34.422,
      longitude: -58.5798,
    },
    products: [
      {
        id: "pv1",
        name: "Helecho Delta",
        description: "Helecho nativo en maceta artesanal",
        price: "$4.500",
        image: "/images/products/helecho.jpg",
        category: "Plantas",
      },
    ],
    tags: ["plantas", "vivero", "nativas", "delta", "jardinería"],
    established: 2012,
    social: {
      instagram: "@verdenativo.ok",
    },
  },
  {
    id: "5",
    name: "Arte Ribereño",
    slug: "arte-ribereno",
    category: "arte",
    description:
      "Galería de arte contemporáneo con foco en artistas del Delta. Pinturas, esculturas, grabados y fotografía. Representamos a más de 20 artistas locales y organizamos exposiciones mensuales.",
    shortDescription:
      "Galería de arte contemporáneo del Delta. Artistas locales y exposiciones mensuales.",
    story:
      "Arte Ribereño es un espacio de encuentro entre el arte y el paisaje del Delta. Fundada en 2015 por un colectivo de artistas plásticos, la galería se ha convertido en un punto de referencia para el arte emergente de la región.",
    image: "/images/businesses/arte-ribereno.jpg",
    images: ["/images/businesses/arte-ribereno-1.jpg"],
    rating: 4.5,
    reviewCount: 63,
    featured: true,
    premium: true,
    schedule: {
      thursday: { open: "14:00", close: "20:00" },
      friday: { open: "14:00", close: "20:00" },
      saturday: { open: "11:00", close: "21:00" },
      sunday: { open: "11:00", close: "20:00" },
    },
    contact: {
      phone: "11 4728-3892",
      whatsapp: "5491147283892",
      email: "galeria@arteribereno.com",
      website: "https://arteribereno.com.ar",
    },
    location: {
      address: "Local 35, Puerto de Frutos, Tigre",
      latitude: -34.4214,
      longitude: -58.5785,
    },
    products: [
      {
        id: "pa1",
        name: "Pintura 'Atardecer en el Delta'",
        description: "Óleo sobre lienzo, 80x100cm",
        price: "$95.000",
        image: "/images/products/atardecer-delta.jpg",
        category: "Pintura",
      },
    ],
    tags: ["arte", "galería", "pintura", "escultura", "contemporáneo"],
    established: 2015,
    social: {
      instagram: "@arteribereno",
      facebook: "ArteRibereno",
    },
  },
  {
    id: "6",
    name: "Dulces del Tigre",
    slug: "dulces-del-tigre",
    category: "gastronomia",
    description:
      "Dulces artesanales, conservas y delicias regionales. Producimos dulce de leche, mermeladas, alfajores, y conservas de frutas del Delta. Todo elaborado de forma artesanal con recetas de familia.",
    shortDescription:
      "Dulces artesanales y conservas regionales. Sabores auténticos del Delta.",
    story:
      "La abuela María empezó en 1985 haciendo dulces en su cocina. Hoy, seguimos usando sus recetas originales, combinando frutas del Delta con técnicas artesanales. Cada frasco cuenta una historia de amor por la cocina.",
    image: "/images/businesses/dulces-del-tigre.jpg",
    images: ["/images/businesses/dulces-del-tigre-1.jpg"],
    rating: 4.9,
    reviewCount: 215,
    featured: true,
    premium: false,
    schedule: {
      monday: { open: "10:00", close: "19:00" },
      tuesday: { open: "10:00", close: "19:00" },
      wednesday: { open: "10:00", close: "19:00" },
      thursday: { open: "10:00", close: "19:00" },
      friday: { open: "10:00", close: "19:00" },
      saturday: { open: "09:00", close: "20:00" },
      sunday: { open: "09:00", close: "20:00" },
    },
    contact: {
      phone: "11 4728-5123",
      whatsapp: "5491147285123",
    },
    location: {
      address: "Local 5, Puerto de Frutos, Tigre",
      latitude: -34.4219,
      longitude: -58.5799,
    },
    products: [
      {
        id: "pg1",
        name: "Dulce de Leche Artesanal",
        description: "500g, receta familiar",
        price: "$3.200",
        image: "/images/products/dulce-leche.jpg",
        category: "Dulces",
      },
      {
        id: "pg2",
        name: "Alfajores del Delta",
        description: "Caja x 6 alfajores de maicena",
        price: "$5.800",
        image: "/images/products/alfajores.jpg",
        category: "Alfajores",
      },
    ],
    tags: ["gastronomía", "dulces", "artesanal", "regional", "conservas"],
    established: 1985,
    social: {
      instagram: "@dulcesdeltigre.ok",
    },
  },
  {
    id: "7",
    name: "Textiles del Paraná",
    slug: "textiles-del-parana",
    category: "textil",
    description:
      "Taller textil especializado en fibras naturales. Trabajamos con lana de oveja, algodón orgánico, lino y seda. Nuestras piezas incluyen indumentaria, accesorios y decoración textil, todo tejido a mano o en telar.",
    shortDescription:
      "Textiles en fibras naturales. Indumentaria y decoración tejida a mano.",
    story:
      "Nuestra familia lleva cuatro generaciones en el mundo textil. Heredamos los telares de la bisabuela y los conocimientos ancestrales. Cada prenda que creamos es una pieza única que honra nuestras raíces.",
    image: "/images/businesses/textiles-parana.jpg",
    images: ["/images/businesses/textiles-parana-1.jpg"],
    rating: 4.7,
    reviewCount: 134,
    featured: false,
    premium: true,
    schedule: {
      friday: { open: "10:00", close: "19:00" },
      saturday: { open: "10:00", close: "20:00" },
      sunday: { open: "11:00", close: "19:00" },
    },
    contact: {
      phone: "11 4728-6734",
      whatsapp: "5491147286734",
      email: "textiles@delparana.com",
    },
    location: {
      address: "Local 22, Puerto de Frutos, Tigre",
      latitude: -34.4217,
      longitude: -58.5791,
    },
    products: [
      {
        id: "pt1",
        name: "Poncho de Lana",
        description: "Tejido a mano, lana de oveja",
        price: "$22.000",
        image: "/images/products/poncho.jpg",
        category: "Indumentaria",
      },
    ],
    tags: ["textil", "indumentaria", "lana", "artesanal", "telar"],
    established: 1978,
    social: {
      instagram: "@textilesdelparana",
    },
  },
  {
    id: "8",
    name: "Antigüedades del Puerto",
    slug: "antiguedades-del-puerto",
    category: "antiguedades",
    description:
      "Antigüedades y objetos de colección. Especializados en muebles de época, discos de vinilo, cámaras fotográficas antiguas, libros, vajilla y objetos decorativos con historia.",
    shortDescription:
      "Antigüedades, vinilos, cámaras y objetos con historia.",
    story:
      "Cada objeto que vendemos tiene una historia que contar. Desde 1990 recorremos ferias, mercados y casas particulares rescatando piezas únicas. Somos apasionados por preservar la memoria material del pasado.",
    image: "/images/businesses/antiguedades-puerto.jpg",
    images: ["/images/businesses/antiguedades-puerto-1.jpg"],
    rating: 4.4,
    reviewCount: 72,
    featured: false,
    premium: false,
    schedule: {
      saturday: { open: "10:00", close: "19:00" },
      sunday: { open: "11:00", close: "19:00" },
    },
    contact: {
      phone: "11 4728-7890",
      whatsapp: "5491147287890",
    },
    location: {
      address: "Local 50, Puerto de Frutos, Tigre",
      latitude: -34.4208,
      longitude: -58.5788,
    },
    products: [
      {
        id: "paa1",
        name: "Cámara Kodak Retina",
        description: "Año 1954, funcionando",
        price: "$18.000",
        image: "/images/products/kodak-retina.jpg",
        category: "Colección",
      },
    ],
    tags: ["antigüedades", "colección", "vinilos", "retro", "vintage"],
    established: 1990,
    social: {
      instagram: "@antigüedadesdelpuerto",
    },
  },
  {
    id: "9",
    name: "Rincón de Jardín",
    slug: "rincon-de-jardin",
    category: "jardin",
    description:
      "Todo para tu espacio verde. Macetas artesanales, herramientas de jardinería, muebles de exterior, fuentes de agua y accesorios decorativos para jardín, balcón y terraza.",
    shortDescription:
      "Macetas, muebles de exterior y accesorios para tu jardín.",
    story:
      "Nuestra pasión por la jardinería nos llevó a crear este espacio en el Puerto de Frutos. Buscamos los mejores productos para que cada persona pueda crear su propio paraíso verde, sin importar el tamaño de su espacio.",
    image: "/images/businesses/rincon-jardin.jpg",
    images: ["/images/businesses/rincon-jardin-1.jpg"],
    rating: 4.3,
    reviewCount: 56,
    featured: true,
    premium: false,
    schedule: {
      monday: { open: "10:00", close: "18:00" },
      tuesday: { open: "10:00", close: "18:00" },
      wednesday: { open: "10:00", close: "18:00" },
      thursday: { open: "10:00", close: "18:00" },
      friday: { open: "10:00", close: "19:00" },
      saturday: { open: "10:00", close: "20:00" },
      sunday: { open: "11:00", close: "19:00" },
    },
    contact: {
      phone: "11 4728-4567",
      whatsapp: "5491147284567",
    },
    location: {
      address: "Local 12, Puerto de Frutos, Tigre",
      latitude: -34.4213,
      longitude: -58.5796,
    },
    products: [
      {
        id: "pj1",
        name: "Maceta Artesanal Grande",
        description: "Cerámica esmaltada, 40cm diámetro",
        price: "$9.500",
        image: "/images/products/maceta.jpg",
        category: "Macetas",
      },
    ],
    tags: ["jardín", "macetas", "exterior", "decoración"],
    social: {
      instagram: "@rincondejardin.tigre",
    },
  },
  {
    id: "10",
    name: "Regalos del Delta",
    slug: "regalos-del-delta",
    category: "regalos",
    description:
      "Tienda de regalos originales y souvenirs del Delta. Encontrá artesanías, objetos personalizados, kits de regalo, bolsos, carteras, bijou y todo lo necesario para el regalo perfecto.",
    shortDescription:
      "Regalos originales, artesanías y souvenirs del Delta.",
    story:
      "Creemos que regalar es un arte. Por eso seleccionamos cada producto con cariño. Trabajamos con más de 50 artesanos locales para ofrecer una variedad única de regalos para todas las ocasiones.",
    image: "/images/businesses/regalos-delta.jpg",
    images: ["/images/businesses/regalos-delta-1.jpg"],
    rating: 4.5,
    reviewCount: 91,
    featured: false,
    premium: false,
    schedule: {
      monday: { open: "11:00", close: "19:00" },
      tuesday: { open: "11:00", close: "19:00" },
      wednesday: { open: "11:00", close: "19:00" },
      thursday: { open: "11:00", close: "19:00" },
      friday: { open: "11:00", close: "19:00" },
      saturday: { open: "10:00", close: "20:00" },
      sunday: { open: "11:00", close: "20:00" },
    },
    contact: {
      phone: "11 4728-2345",
      whatsapp: "5491147282345",
      email: "hola@regalosdeldelta.com.ar",
    },
    location: {
      address: "Local 3, Puerto de Frutos, Tigre",
      latitude: -34.4221,
      longitude: -58.5801,
    },
    products: [
      {
        id: "pr1",
        name: "Kit de Mate Delta",
        description: "Mate, termo y yerba artesanal",
        price: "$15.000",
        image: "/images/products/kit-mate.jpg",
        category: "Regalos",
      },
    ],
    tags: ["regalos", "souvenirs", "artesanías", "delta"],
    social: {
      instagram: "@regalosdeldelta",
      facebook: "RegalosDelDelta",
    },
  },
];
