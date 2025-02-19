import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showLoader } from './js/render-functions.js';

document.querySelector('#search-form').addEventListener('submit', (event) => {
    event.preventDefault();
  
    const searchQuery = document.querySelector('#search-query').value.trim();
  
    if (searchQuery === '') {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a search query!',
      });
      return;
    }
  
    showLoader(true);
  
    fetchImages(searchQuery)
      .then((images) => {
        renderGallery(images);
      })
      .catch((error) => {
        iziToast.error({
          title: 'Error',
          message: 'Something went wrong. Please try again later.',
        });
      })
      .finally(() => {
        showLoader(false);
      });
  });
