import type { APIRoute } from 'astro';

export const prerender = false;

const KV_KEY = 'clicks';
const CHANNELS = ['tokopedia', 'shopee', 'tiktok', 'whatsapp'];

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

/** POST /api/clicks — publik, dipanggil otomatis saat tombol beli diklik.
 *  Body: { "product": "arcticle-0000", "channel": "shopee" } */
export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as any).runtime.env;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false }, 400);
  }

  // Reset semua counter — admin only
  if (body?.reset === true) {
    const key = request.headers.get('x-admin-key');
    if (!env.ADMIN_PASSWORD || !key || key !== env.ADMIN_PASSWORD) {
      return json({ ok: false, error: 'unauthorized' }, 401);
    }
    await env.STOCK.put(KV_KEY, '{}');
    return json({ ok: true });
  }

  const product = String(body?.product ?? '').slice(0, 64);
  const channel = String(body?.channel ?? '');
  if (!product || !CHANNELS.includes(channel)) return json({ ok: false }, 400);

  const raw = await env.STOCK.get(KV_KEY);
  const clicks: Record<string, Record<string, number>> = raw ? JSON.parse(raw) : {};
  clicks[product] = clicks[product] ?? {};
  clicks[product][channel] = (clicks[product][channel] ?? 0) + 1;

  await env.STOCK.put(KV_KEY, JSON.stringify(clicks));
  return json({ ok: true });
};

/** GET /api/clicks — admin only. Balikin semua hitungan klik. */
export const GET: APIRoute = async ({ request, locals }) => {
  const env = (locals as any).runtime.env;

  const key = request.headers.get('x-admin-key');
  if (!env.ADMIN_PASSWORD || !key || key !== env.ADMIN_PASSWORD) {
    return json({ ok: false, error: 'unauthorized' }, 401);
  }

  const raw = await env.STOCK.get(KV_KEY);
  return json(raw ? JSON.parse(raw) : {});
};
