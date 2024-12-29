import axios from 'axios';

export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    // Use our proxy endpoint instead of calling Google's API directly
    const response = await axios.get('/api/places/search', {
      params: {
        query: 'test',
        key: apiKey
      }
    });
    return response.data.status !== 'REQUEST_DENIED';
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.status === 'ZERO_RESULTS') {
      // ZERO_RESULTS is actually a valid response, it means the API key works
      return true;
    }
    return false;
  }
}