export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

export const responsive2 = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

export const ProductData = [
  {
    id: 1,
    imageurl: "https://eventrush.co/cdn/shop/files/preview_images/5d1de1c6f6c9464ebff817047c877ac8.thumbnail.0000000000_533x.jpg?v=1708930999%22",
    name: "Colorful sneakers",
    price: 19.99,
    description: "MARCH MADNESS DAY-LIT PARTY ON THE PATIO AT O'MALLEY'S ALLEY (OCALA, FL) ",
    date: "Sat,March 23,2024",
    location: "Jacksonville, FL",
    variants: [
      {
        type: "Basic",
        price: 19.99,
        description: "basic ticket price"
      },
      {
        type: "VIP",
        price: 29.99,
        description: "VIP entry skip the que"
      },
      {
        type: "Super VIP",
        price: 39.99,
        description: "skip the que without any wait"
      }
    ]

  },
  {
    id: 2,
    imageurl: "https://eventrush.co/cdn/shop/files/Screenshot2024-02-22at21-36-43LindseyAlex_trubustafree_Instagramphotosandvideos_533x.png?v=1708657425",
    name: "Sport sneakers",
    price: 21.99,
    description: "MARCH MADNESS DAY-LIT PARTY ON THE PATIO AT O'MALLEY'S ALLEY (OCALA, FL) ",
    date: "Sat,March 23,2024",
    location: "Jacksonville, FL",
    variants: [
      {
        type: "Basic",
        price: 19.99,
        description: "basic ticket price"
      },
      {
        type: "VIP",
        price: 29.99,
        description: "VIP entry skip the que"
      },
      {
        type: "Super VIP",
        price: 39.99,
        description: "skip the que without any wait"
      }
    ]
  },
  {
    id: 3,
    imageurl: "https://eventrush.co/cdn/shop/files/3_533x.png?v=1690783833",
    name: "iWatch",
    price: 99.99,
    description: "MARCH MADNESS DAY-LIT PARTY ON THE PATIO AT O'MALLEY'S ALLEY (OCALA, FL) ",
    date: "Sat,March 23,2024",
    location: "Jacksonville, FL",
    variants: [
      {
        type: "Basic",
        price: 19.99,
        description: "basic ticket price"
      },
      {
        type: "VIP",
        price: 29.99,
        description: "VIP entry skip the que"
      },
      {
        type: "Super VIP",
        price: 39.99,
        description: "skip the que without any wait"
      }
    ]
  },
  {
    id: 4,
    imageurl: "//eventrush.co/cdn/shop/files/1_1be6edf0-ddc6-4426-9b64-ba6a8ac7d3ef_533x.png?v=1692400510",
    name: "Water Bottle",
    price: 14.99,
    description: "MARCH MADNESS DAY-LIT PARTY ON THE PATIO AT O'MALLEY'S ALLEY (OCALA, FL) ",
    date: "Sat,March 23,2024",
    location: "Jacksonville, FL",
    variants: [
      {
        type: "Basic",
        price: 19.99,
        description: "basic ticket price"
      },
      {
        type: "VIP",
        price: 29.99,
        description: "VIP entry skip the que"
      },
      {
        type: "Super VIP",
        price: 39.99,
        description: "skip the que without any wait"
      }
    ]
  },
  {
    id: 5,
    imageurl: "//eventrush.co/cdn/shop/files/preview_images/917feed619ac457daa5a33126c0bd6d0.thumbnail.0000000000_533x.jpg?v=1695089372",
    name: "Vans sneakers",
    price: 38.99,
    description: "MARCH MADNESS DAY-LIT PARTY ON THE PATIO AT O'MALLEY'S ALLEY (OCALA, FL) ",
    date: "Sat,March 23,2024",
    location: "Jacksonville, FL",
    variants: [
      {
        type: "Basic",
        price: 19.99,
        description: "basic ticket price"
      },
      {
        type: "VIP",
        price: 29.99,
        description: "VIP entry skip the que"
      },
      {
        type: "Super VIP",
        price: 39.99,
        description: "skip the que without any wait"
      }
    ]
  },

];


export const subCategories = [


  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
]
export const filters = [


  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
]