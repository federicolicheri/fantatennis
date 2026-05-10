export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY || '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';

  try {
    let body = req.body;
    if (typeof body === 'string') body = JSON.parse(body);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return res.status(response.status).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export const config = {
  api: { bodyParser: { sizeLimit: '10mb' } },
};
