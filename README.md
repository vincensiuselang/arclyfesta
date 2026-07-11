# ARCLYFESTA — Website

Website brand fashion ARCLYFESTA. Dibangun dengan **Astro 5 + Tailwind CSS 4**, siap deploy ke **Cloudflare Pages**.

## Isi Link Marketplace & Instagram

Semua link dikumpulkan di **satu file**: `src/config.ts`

- Link Tokopedia / Shopee / TikTok Shop: ganti `'#'` di bagian `links` produk.
- Link Instagram: ganti `'#'` di `SITE.instagram`.

## Menjalankan Lokal

```bash
npm install
npm run dev      # buka http://localhost:4321
```

## Nambah Produk Baru

1. Taruh foto produk di `public/assets/` (misal `arcticle-0001.png`).
2. Buka `src/config.ts`, duplikat satu blok produk di array `PRODUCTS`, ganti `slug`, `code`, `name`, `image`, `specs`, dan `links`.
3. Selesai — halaman produk otomatis dibuat di `/products/<slug>`, dan muncul di homepage.

## Deploy ke Cloudflare Pages

1. Push folder ini ke repo GitHub.
2. Di dashboard Cloudflare → **Workers & Pages → Create → Pages → Connect to Git**.
3. Pilih repo, lalu set:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. Setiap push ke repo otomatis re-deploy.

Alternatif tanpa Git: `npm run build` lalu upload folder `dist/` via **Direct Upload** di Cloudflare Pages.

## Setup Stock & Admin (sekali aja)

Fitur stock butuh 2 hal di Cloudflare sebelum deploy:

1. **Bikin KV Namespace** (tempat nyimpan data stock):
   Dashboard Cloudflare → **Storage & Databases** → **KV** → **Create namespace** → nama: `arclyfesta-stock` → Create.
   Copy **ID**-nya, lalu paste ke `wrangler.jsonc` menggantikan `PASTE_ID_KV_LU_DISINI`.

2. **Set password admin:**
   Dashboard → **Workers & Pages** → project `arclyfesta` → **Settings** → **Variables and Secrets** → **Add** → Type: **Secret** → Name: `ADMIN_PASSWORD` → Value: password lu → Save.

Setelah itu push seperti biasa. Panel admin ada di `https://domain-lu/admin`:
login pakai password → atur angka stock tiap produk → Save.
Stock 0 = SOLD OUT (badge merah + tombol beli mati di halaman produk).
Produk yang belum pernah di-set stock-nya tidak menampilkan apa-apa.

## Struktur

```
src/
  config.ts              ← EDIT DI SINI: link marketplace, IG, daftar produk
  styles/global.css      ← design tokens (warna, font, spacing)
  layouts/Base.astro     ← <head>, fonts
  components/            ← Header & Footer
  pages/index.astro      ← homepage
  pages/products/[slug].astro  ← template halaman produk (otomatis per produk)
public/assets/           ← logo & foto produk
```
