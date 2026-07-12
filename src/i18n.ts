/* ============================================================
   TERJEMAHAN — EN adalah teks asli di halaman (default).
   Tambah/edit terjemahan ID & ZH di sini.
   ============================================================ */

export const translations: Record<string, Record<string, string>> = {
  id: {
    view_archive: 'Lihat Arsip',
    hero_quote: '"Arsip dimulai dari Record 0000. Setelahnya hanyalah entri berikutnya."',
    coming_soon: 'Segera Hadir',
    m1: 'Arsip ini tidak pernah selesai.',
    m2: 'Setiap rilisan tercatat.',
    m3: 'Setiap pakaian bernomor.',
    m4: 'Tidak ada yang direproduksi persis sama.',
    m5: 'Tidak ada yang hidup di luar arsip.',
    archive_begins: 'Arsip Dimulai.',
    buy_tokopedia: 'BELI DI TOKOPEDIA',
    buy_shopee: 'BELI DI SHOPEE',
    buy_tiktok: 'BELI DI TIKTOK SHOP',
  },
  zh: {
    view_archive: '查看档案',
    hero_quote: '"档案始于 0000 号记录。此后的一切，都是新的条目。"',
    coming_soon: '即将发布',
    m1: '档案永无完结。',
    m2: '每次发布皆有记录。',
    m3: '每件服装皆有编号。',
    m4: '绝不完全复刻。',
    m5: '档案之外，一无所有。',
    archive_begins: '档案由此开始。',
    buy_tokopedia: '在 TOKOPEDIA 购买',
    buy_shopee: '在 SHOPEE 购买',
    buy_tiktok: '在 TIKTOK SHOP 购买',
  },
};

/* Teks yang digenerate JavaScript (stock indicator) */
export const jsStrings: Record<string, { stock: string; soldOut: string; soldOutSuffix: string }> = {
  en: { stock: 'STOCK: ', soldOut: 'SOLD OUT', soldOutSuffix: ' — SOLD OUT' },
  id: { stock: 'STOK: ', soldOut: 'STOK HABIS', soldOutSuffix: ' — STOK HABIS' },
  zh: { stock: '库存：', soldOut: '已售罄', soldOutSuffix: ' — 已售罄' },
};

export const getLang = (): string => {
  try {
    return localStorage.getItem('arclyfesta-lang') || 'en';
  } catch {
    return 'en';
  }
};
