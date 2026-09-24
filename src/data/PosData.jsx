// Database Produk Kasir
export const INITIAL_PRODUCTS = [
  // TIPE 1: CUSTOM BLEND (Bibit Parfum)
  {
    id: 'BIB-001',
    name: 'Sauvage Dior',
    type: 'CUSTOM_BLEND',
    pricePerUnit: 6000, // Rp 6.000 / ml
    unitLabel: 'ML',
    stockMl: 780,
    categories: ['Men'],
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'BIB-002',
    name: 'Baccarat Rouge',
    type: 'CUSTOM_BLEND',
    pricePerUnit: 12500,
    unitLabel: 'ML',
    stockMl: 15,
    categories: ['Unisex', 'Exclusive'],
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&auto=format&fit=crop&q=80'
  },
  // TIPE 2: READY STOCK (Produk Jadi / Sealed Box)
  {
    id: 'RDY-001',
    name: 'Chanel No. 5 100ml Boxed',
    type: 'READY_STOCK',
    price: 1500000, // Harga Pas per Botol
    unitLabel: 'BOTOL',
    stockPcs: 8,
    categories: ['Women', 'Exclusive'],
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&auto=format&fit=crop&q=80'
  }
];

// Master harga botol kosong untuk racikan
export const BOTTLE_PRICES = {
  30: 5000,  // Botol 30ml = Rp 5.000
  50: 8000,  // Botol 50ml = Rp 8.000
  100: 12000 // Botol 100ml = Rp 12.000
};

// Format Currency
export function formatRupiah(num) {
  return 'Rp ' + Math.round(num).toLocaleString('id-ID');
}