import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showLoader, toggleLoadMoreButton } from './js/render-functions.js';

let searchQuery = '';
let currentPage = 1;
const perPage = 40;
let totalImages = 0;

const form = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('#load-more');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  searchQuery = document.querySelector('#search-query').value.trim();

  if (searchQuery === '') {
      iziToast.error({
          title: 'Error',
          message: 'Please enter a search query!',
      });
      return;
  }

  currentPage = 1;
  showLoader(true);
  toggleLoadMoreButton(false); 

  document.querySelector('.gallery').innerHTML = '';

  try {
      const data = await fetchImages(searchQuery, currentPage);
      totalImages = data.totalHits;

      renderGallery(data.hits, true);

      if (data.hits.length > 0 && currentPage * perPage < totalImages) {
          toggleLoadMoreButton(true);
      } else {
          toggleLoadMoreButton(false);
          iziToast.info({
              title: 'End of Results',
              message: "We're sorry, but you've reached the end of search results.",
          });
      }
  } catch (error) {
      iziToast.error({
          title: 'Error',
          message: 'Something went wrong. Please try again later.',
      });
  } finally {
      showLoader(false);
  }
});



loadMoreButton.addEventListener('click', async () => {
  currentPage++;
  showLoader(true);

  try {
    const data = await fetchImages(searchQuery, currentPage);

    renderGallery(data.hits, false);

    const totalLoaded = currentPage * perPage;

    if (totalLoaded >= totalImages) {
      toggleLoadMoreButton(false);
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    showLoader(false);
  }
});

