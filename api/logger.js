import process from 'node:process';

const VISITS_KEY = 'portfolio:visits';
const MAX_VISITS = 100_000;

function readLocationHeader(req, name, fallback) {
  const value = req.headers[name];
  if (typeof value !== 'string' || !value) return fallback;

  // Vercel can URL-encode city names containing spaces or accented characters.
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function readCoordinate(req, name, limit) {
  const value = readLocationHeader(req, name, '');
  if (!value.trim()) return null;

  const coordinate = Number(value);
  return Number.isFinite(coordinate) && Math.abs(coordinate) <= limit
    ? coordinate
    : null;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const city = readLocationHeader(req, 'x-vercel-ip-city', 'Unknown City');
  const region = readLocationHeader(req, 'x-vercel-ip-country-region', 'Unknown Region');
  const country = readLocationHeader(req, 'x-vercel-ip-country', 'Unknown Country');
  const latitude = readCoordinate(req, 'x-vercel-ip-latitude', 90);
  const longitude = readCoordinate(req, 'x-vercel-ip-longitude', 180);

  console.log(`Visitor from: ${city}, ${region}, ${country}`);

  // Vercel's Upstash integration may use the KV_* variable names.
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    console.error('Visitor storage is not configured. Set the Upstash REST URL and token.');
    return res.status(503).json({ success: false });
  }

  const visit = {
    visitedAt: new Date().toISOString(),
    city,
    region,
    country,
    latitude,
    longitude,
  };

  try {
    const response = await fetch(`${url.replace(/\/$/, '')}/multi-exec`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ['LPUSH', VISITS_KEY, JSON.stringify(visit)],
        ['LTRIM', VISITS_KEY, 0, MAX_VISITS - 1],
      ]),
      signal: AbortSignal.timeout(3000),
    });

    if (!response.ok) throw new Error('Storage request failed');

    const result = await response.json();
    if (!Array.isArray(result) || result.length !== 2 ||
        !Number.isInteger(result[0]?.result) || result[0].result < 1 ||
        result[1]?.result !== 'OK' || result.some((command) => command.error)) {
      throw new Error('Storage command failed');
    }

    return res.status(200).json({ success: true });
  } catch {
    // Do not include database credentials or provider responses in logs.
    console.error('Could not save visitor location. Check Upstash configuration and free tier usage.');
    return res.status(503).json({ success: false });
  }
}
