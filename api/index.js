export default async function handler(req, res) {
  const url = new URL(req.url, 'https://api.binance.com');
  url.hostname = 'api.binance.com';
  url.protocol = 'https:';

  const headers = {};
  if (req.headers['x-mbx-apikey']) {
    headers['X-MBX-APIKEY'] = req.headers['x-mbx-apikey'];
  }
  headers['Accept'] = 'application/json';

  try {
    const response = await fetch(url.toString(), {
      method: req.method,
      headers: headers,
    });
    const data = await response.text();
    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
}