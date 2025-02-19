import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';


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

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
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
      if (isLoading) {
        loader.style.display = 'block';
      } else {
        loader.style.display = 'none';
      }
    } else {
      console.log("Loader element not found!");
    }
  }
  