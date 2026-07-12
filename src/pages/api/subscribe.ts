import type { APIRoute } from 'astro';

export const prerender = false;

const KV_KEY = 'subscribers';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_SUBS = 10000;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

/** POST /api/subscribe — publik. Body: { "email": "x@y.com" } */
export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as any).runtime.env;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'bad json' }, 400);
  }

  const email = String(body?.email ?? '').trim().toLowerCase().slice(0, 254);
  if (!EMAIL_RE.test(email)) return json({ ok: false, error: 'invalid email' }, 400);

  const raw = await env.STOCK.get(KV_KEY);
  const subs: { email: string; ts: number }[] = raw ? JSON.parse(raw) : [];

  if (!subs.some((s) => s.email === email)) {
    if (subs.length >= MAX_SUBS) return json({ ok: false, error: 'full' }, 429);
    subs.push({ email, ts: Date.now() });
    await env.STOCK.put(KV_KEY, JSON.stringify(subs));
  }

  return json({ ok: true });
};

/** GET /api/subscribe — admin only. Daftar subscriber. */
export const GET: APIRoute = async ({ request, locals }) => {
  const env = (locals as any).runtime.env;

  const key = request.headers.get('x-admin-key');
  if (!env.ADMIN_PASSWORD || !key || key !== env.ADMIN_PASSWORD) {
    return json({ ok: false, error: 'unauthorized' }, 401);
  }

  const raw = await env.STOCK.get(KV_KEY);
  return json(raw ? JSON.parse(raw) : []);
};
