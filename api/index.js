export default async function handler(req, res) {
  let path = req.url || '/';
  // Strip /api prefix if present
  if (path.startsWith('/api/sapi/')) {
    path = path.slice(4);
  } else if (path === '/api' || path === '/api/') {
    path = '/api/v3/ping';
  }

  const targetUrl = 'https://api.binance.com' + path;

  const headers = {};
  if (req.headers['x-mbx-apikey']) {
    headers['X-MBX-APIKEY'] = req.headers['x-mbx-apikey'];
  }
  headers['Accept'] = 'application/json';
  headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
    });
    const data = await response.text();
    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
