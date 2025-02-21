import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = new SimpleLightbox('.gallery a');

export function renderGallery(images, isNewSearch = false) {
  const gallery = document.querySelector('.gallery');

  if (isNewSearch) {
    gallery.innerHTML = '';
  }

  if (images.length === 0) {
    iziToast.error({
      title: 'Error',
      message: 'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  const fragment = document.createDocumentFragment();

  images.forEach(image => {
    const imageCard = createImageCard(image);
    fragment.appendChild(imageCard);
  });

  gallery.appendChild(fragment);

  lightbox.refresh();

  if (!isNewSearch) {
    smoothScroll();
  }
}

function createImageCard(image) {
  const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;

  const card = document.createElement('div');
  card.classList.add('gallery__item');

  const link = document.createElement('a');
  link.href = largeImageURL;
  link.setAttribute('data-lightbox', 'gallery');

  const img = document.createElement('img');
  img.src = webformatURL;
  img.alt = tags;

  link.appendChild(img);
  card.appendChild(link);

  const info = document.createElement('div');
  info.classList.add('info');

  info.innerHTML = `
    <p class="info-item"><b>Likes:</b> ${likes}</p>
    <p class="info-item"><b>Views:</b> ${views}</p>
    <p class="info-item"><b>Comments:</b> ${comments}</p>
    <p class="info-item"><b>Downloads:</b> ${downloads}</p>
  `;

  card.appendChild(info);
  return card;
}

export function showLoader(isLoading) {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = isLoading ? 'block' : 'none';
  }
}

export function toggleLoadMoreButton(isVisible) {
  const button = document.querySelector('#load-more');
  if (button) {
    button.classList.toggle('hidden', !isVisible);
  }
}

function smoothScroll() {
  const firstCard = document.querySelector('.gallery__item');
  if (firstCard) {
    const cardHeight = firstCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth'
    });
  }
}