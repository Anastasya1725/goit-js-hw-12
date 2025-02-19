import axios from 'axios';

const API_KEY = '48840167-f96030b4e497eb15a171d5d1f';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });

    return response.data.hits;
  } catch (error) {
    console.error("Error fetching data from Pixabay:", error);
    return [];
  }
}






