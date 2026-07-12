import type { APIRoute } from 'astro';

export const prerender = false;

const KV_KEY = 'visits';
const ONLINE_WINDOW_MS = 5 * 60 * 1000; // dianggap "online" kalau aktif 5 menit terakhir
const MAX_RECENT = 500;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

/** POST /api/visit — publik, dipanggil otomatis tiap halaman dibuka.
 *  Body { "reset": true } + header x-admin-key = reset counter (admin only). */
export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as any).runtime.env;
  const now = Date.now();

  // Reset counter visitor — admin only
  let body: any = null;
  try {
    body = await request.json();
  } catch {
    /* body kosong = kunjungan biasa */
  }
  if (body?.reset === true) {
    const key = request.headers.get('x-admin-key');
    if (!env.ADMIN_PASSWORD || !key || key !== env.ADMIN_PASSWORD) {
      return json({ ok: false, error: 'unauthorized' }, 401);
    }
    await env.STOCK.put(KV_KEY, JSON.stringify({ total: 0, recent: [] }));
    return json({ ok: true });
  }

  const raw = await env.STOCK.get(KV_KEY);
  const data: { total: number; recent: number[] } = raw ? JSON.parse(raw) : { total: 0, recent: [] };

  data.total = (data.total ?? 0) + 1;
  data.recent = (data.recent ?? []).filter((t) => now - t < ONLINE_WINDOW_MS);
  data.recent.push(now);
  if (data.recent.length > MAX_RECENT) data.recent = data.recent.slice(-MAX_RECENT);

  await env.STOCK.put(KV_KEY, JSON.stringify(data));
  return json({ ok: true });
};

/** GET /api/visit — admin only. { online, total } */
export const GET: APIRoute = async ({ request, locals }) => {
  const env = (locals as any).runtime.env;

  const key = request.headers.get('x-admin-key');
  if (!env.ADMIN_PASSWORD || !key || key !== env.ADMIN_PASSWORD) {
    return json({ ok: false, error: 'unauthorized' }, 401);
  }

  const now = Date.now();
  const raw = await env.STOCK.get(KV_KEY);
  const data: { total: number; recent: number[] } = raw ? JSON.parse(raw) : { total: 0, recent: [] };
  const online = (data.recent ?? []).filter((t) => now - t < ONLINE_WINDOW_MS).length;

  return json({ online, total: data.total ?? 0 });
};
