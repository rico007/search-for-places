import express from 'express';
import cors from 'cors';
import { createServer } from 'vite';
import axios from 'axios';
import { config } from 'dotenv';

config();

const app = express();
app.use(cors());

// Proxy endpoint for Places API
app.get('/api/places/search', async (req, res) => {
  try {
    const { query, key } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    if (!key) {
      return res.status(400).json({ error: 'API key is required' });
    }

    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/textsearch/json',
      {
        params: {
          query,
          key,
        },
      }
    );
    
    if (response.data.status === 'ZERO_RESULTS') {
      return res.json({ results: [], status: 'ZERO_RESULTS' });
    }

    if (response.data.status !== 'OK') {
      throw new Error(response.data.error_message || 'Failed to fetch places');
    }

    res.json(response.data);
  } catch (error) {
    console.error('Places API Error:', error);
    res.status(500).json({ 
      error: error.response?.data?.error_message || 'Failed to fetch places',
      message: error.message 
    });
  }
});

// Create Vite server
const vite = await createServer({
  server: { middlewareMode: true }
});

app.use(vite.middlewares);

const port = process.env.PORT || 5173;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});