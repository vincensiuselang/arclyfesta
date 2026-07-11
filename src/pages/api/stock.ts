import type { APIRoute } from 'astro';

export const prerender = false;

const KV_KEY = 'stock';

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

/** GET /api/stock — publik. Balikin { "arcticle-0000": 3, ... } */
export const GET: APIRoute = async ({ locals }) => {
  const env = (locals as any).runtime.env;
  const raw = await env.STOCK.get(KV_KEY);
  return json(raw ? JSON.parse(raw) : {});
};

/** POST /api/stock — admin only (header x-admin-key).
 *  Body: { "stocks": { "arcticle-0000": 3 } } — merge, bukan replace.
 *  Body kosong ({ "stocks": {} }) dipakai buat verifikasi login. */
export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as any).runtime.env;

  const key = request.headers.get('x-admin-key');
  if (!env.ADMIN_PASSWORD || !key || key !== env.ADMIN_PASSWORD) {
    return json({ ok: false, error: 'unauthorized' }, 401);
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'bad json' }, 400);
  }

  const raw = await env.STOCK.get(KV_KEY);
  const current: Record<string, number> = raw ? JSON.parse(raw) : {};

  for (const [slug, value] of Object.entries(body?.stocks ?? {})) {
    const n = Number(value);
    if (Number.isFinite(n) && n >= 0) current[slug] = Math.floor(n);
  }

  await env.STOCK.put(KV_KEY, JSON.stringify(current));
  return json({ ok: true, stocks: current });
};
