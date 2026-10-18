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

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const city = readLocationHeader(req, 'x-vercel-ip-city', 'Unknown City');
  const region = readLocationHeader(req, 'x-vercel-ip-country-region', 'Unknown Region');
  const country = readLocationHeader(req, 'x-vercel-ip-country', 'Unknown Country');

  console.log(`Visitor from: ${city}, ${region}, ${country}`);

  return res.status(200).json({ success: true });
}
