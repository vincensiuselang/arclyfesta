/* ============================================================
   KONFIGURASI SITE — SEMUA LINK & PRODUK DIISI DI FILE INI
   ============================================================ */

export const SITE = {
  name: 'ARCLYFESTA',
  tagline: 'The Archive Beyond',
  description:
    'ARCLYFESTA — Dark Archive. Underground streetwear dengan sentuhan editorial luxury. Made in Jakarta, ID.',
  origin: 'Jakarta, ID',
  est: 2024,
  year: 2026,

  instagram: 'https://www.instagram.com/arclyfesta?igsh=ZjQ5OWFoMXB4ZTZw',

  // ↓↓↓ NOMOR WHATSAPP BUAT TERIMA ORDER — format internasional tanpa + dan tanpa 0 di depan.
  // Contoh: 081234567890 jadi '6281234567890'. Kosongin ('') = tombol order gak muncul.
  whatsapp: '6285947094014',
};

export interface Product {
  slug: string; // dipakai di URL: /products/<slug>
  code: string; // nomor arsip, misal "0000"
  name: string; // nama besar di halaman produk
  type: string; // jenis produk, misal "ZIP HOODIE"
  subtitle: string;
  image: string; // gambar di halaman detail produk (spec sheet)
  imageCard?: string; // gambar di kartu homepage (kalau kosong, pakai image)
  sizes?: string[]; // pilihan ukuran buat order WA (default S M L XL)
  specs: { label: string; value: string }[];
  // ↓↓↓ GANTI '#' DENGAN LINK MARKETPLACE LU ↓↓↓
  links: {
    tokopedia: string;
    shopee: string;
    tiktok: string;
  };
}

export const PRODUCTS: Product[] = [
  {
    slug: 'arcticle-0000',
    code: '0000',
    name: 'ARctICLE',
    type: 'ZIP HOODIE',
    subtitle: 'Heavyweight Fleece Structure',
    image: '/assets/arcticle-0000-sheet.jpg',
    imageCard: '/assets/arcticle-0000-card.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    specs: [
      { label: 'Material', value: '330GSM Fleece' },
      { label: 'Zip', value: 'Double YKK Zip' },
      { label: 'Cut / Fit', value: 'Cropped / Raw Hem' },
      { label: 'Origin', value: 'Jakarta, ID' },
    ],
    links: {
      tokopedia: '#', // ← GANTI LINK TOKOPEDIA DI SINI
      shopee: 'https://shopee.co.id/arclyfe_style',
      tiktok: 'https://vt.tiktok.com/ZSXLSt6Jy/?page=Mall',
    },
  },

  /* NAMBAH PRODUK BARU? Duplikat blok di atas, ganti slug, code,
     nama, gambar (taruh file di public/assets/), specs, dan links. */
];

// Label "coming soon" di homepage untuk record berikutnya
export const NEXT_RECORD = 'ARCTICLE 0001';
