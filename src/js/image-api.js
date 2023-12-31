import axios from 'axios';

const API_KEY = '34183699-29109d6fbf2dd60241f6d6e15';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (searchQuery, page) => {
  const { data } = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
  if (!data) {
    throw new Error();
  }

  return data;
};
