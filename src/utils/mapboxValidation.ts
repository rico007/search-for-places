import axios from 'axios';

export async function validateMapboxToken(token: string): Promise<boolean> {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/1/1/1?access_token=${token}`
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
}