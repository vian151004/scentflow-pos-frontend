// ============================================
// DATA LAMA — tetap dipakai DashboardPage & NewSaleModal, JANGAN diubah
// ============================================
export const RAW_MATERIALS = [
  { id: 'BIB-001', name: 'Sauvage Dior', pricePerMl: 6000, stockMl: 780, status: 'Aman' },
  { id: 'BIB-002', name: 'Baccarat Rouge', pricePerMl: 12500, stockMl: 15, status: 'Menipis' },
  { id: 'BIB-003', name: 'Black Opium YSL', pricePerMl: 8500, stockMl: 420, status: 'Aman' },
  { id: 'BIB-004', name: 'Santal 33', pricePerMl: 10000, stockMl: 200, status: 'Aman' },
];

export const BOTTLE_SIZES = ['30ml', '50ml', '100ml'];

export const RATIO_OPTIONS = [
  { label: 'Standard 1:1', multiplier: 1 },
  { label: 'Premium 2:1', multiplier: 1.8 },
];

export const FINISHED_PRODUCTS = [
  {
    id: 1,
    name: 'Sauvage Dior',
    stock: 'TERSEDIA: 780 ML',
    status: 'available',
    pricePerUnit: 6000,
    unitLabel: 'ML',
    categories: ['Men'],
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Baccarat Rouge',
    stock: 'HAMPIR HABIS: 15 ML',
    status: 'warning',
    pricePerUnit: 12500,
    unitLabel: 'ML',
    categories: ['Unisex', 'Exclusive'],
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Black Opium YSL',
    stock: 'TERSEDIA: 420 ML',
    status: 'available',
    pricePerUnit: 8500,
    unitLabel: 'ML',
    categories: ['Women'],
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    name: "J'Adore",
    stock: 'TERSEDIA: 1.2 L',
    status: 'available',
    pricePerUnit: 9200,
    unitLabel: 'ML',
    categories: ['Women'],
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    name: 'Chanel No. 5',
    stock: 'TERSEDIA: 250 ML',
    status: 'available',
    pricePerUnit: 15000,
    unitLabel: 'ML',
    categories: ['Women', 'Exclusive'],
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 6,
    name: 'Eros Versace',
    stock: 'TERSEDIA: 900 ML',
    status: 'available',
    pricePerUnit: 7800,
    unitLabel: 'ML',
    categories: ['Men'],
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=500&auto=format&fit=crop&q=80'
  },
];

export const TABS = ['Semua', 'Men', 'Women', 'Unisex', 'Exclusive'];
export const TAX_RATE = 0.11;

export function formatRupiah(num) {
  return 'Rp ' + Math.round(num).toLocaleString('id-ID');
}

// ============================================
// DATA BARU — khusus dipakai InventarisPage (mandiri, ga connect ke Dashboard)
// ============================================
export const INITIAL_INV_RAW_MATERIALS = [
  { id: 'BIB-001', name: 'Sauvage Dior', pricePerMl: 6000, stockMl: 780, status: 'Aman' },
  { id: 'BIB-002', name: 'Baccarat Rouge', pricePerMl: 12500, stockMl: 15, status: 'Menipis' },
  { id: 'BIB-003', name: 'Black Opium YSL', pricePerMl: 8500, stockMl: 420, status: 'Aman' },
  { id: 'BIB-004', name: 'Santal 33', pricePerMl: 10000, stockMl: 200, status: 'Aman' },
];

export const INITIAL_INV_PACKAGING = [
  { id: 'BTL-030', name: 'Botol Spray 30ml', stockPcs: 40, status: 'Aman' },
  { id: 'BTL-050', name: 'Botol Spray 50ml', stockPcs: 0, status: 'Habis' },
];

export const INITIAL_INV_MIXED_LIQUID = [
  { id: 'MIX-001', name: 'Racikan Citrus Fresh', stockMl: 300, status: 'Aman' },
];

export const INITIAL_INV_FINISHED_PRODUCTS = [
  {
    id: 1,
    name: 'Sauvage Dior',
    pricePerUnit: 6000,
    unitLabel: 'ML',
    stockAmount: 780,
    categories: ['Men'],
    status: 'available',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Baccarat Rouge',
    pricePerUnit: 12500,
    unitLabel: 'ML',
    stockAmount: 15,
    categories: ['Unisex', 'Exclusive'],
    status: 'warning',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&auto=format&fit=crop&q=80'
  },
];