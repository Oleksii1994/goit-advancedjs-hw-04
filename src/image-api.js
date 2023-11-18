import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '34183699-29109d6fbf2dd60241f6d6e15';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = (searchQuery, page) => {
  return axios
    .get(
      `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type="photo"&orientation="horizontal"&safesearch=true&per_page=40&page=${page}`
    )
    .then(response => {
      if (!response.data) {
        throw new Error();
      }
      return response.data;
    });
};
