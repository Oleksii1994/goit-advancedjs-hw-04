import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './image-api';

const searchForm = document.getElementById('search-form');
const loader = document.querySelector('.loader-container');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-wrapper');

loader.classList.add('is-hidden');
gallery.classList.add('is-hidden');

const createMarkup = arrayOfImages => {
  const markup = arrayOfImages
    .map(
      ({
        webformatURL,
        largeImageURL,
        likes,
        views,
        comments,
        downloads,
        tags,
      }) => `<li class="photo-card gallery__item">
    <a class="gallery__link" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" class="gallery__image" loading="lazy" width="380"/></a>
    <div class="info">
        <p class="info-item">
            <b>Likes</b>
            ${likes}
        </p>
            <p class="info-item">
        <b>Views</b>
        ${views}
        </p>
        <p class="info-item">
            <b>Comments</b>
            ${comments}
        </p>
        <p class="info-item">
            <b>Downloads</b>
            ${downloads}
        </p>
    </div>
</li>`
    )
    .join('');
  return markup;
};

const handleSubmit = async event => {
  event.preventDefault();
  const { value } = event.currentTarget.elements.searchQuery;

  loader.classList.remove('is-hidden');

  try {
    const { hits } = await fetchImages(value);
    console.log(hits);
    if (!hits || hits.length === 0) {
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        position: 'topRight',
      });
    }

    loader.classList.add('is-hidden');

    gallery.classList.remove('is-hidden');
    gallery.insertAdjacentHTML('beforeend', createMarkup(hits));

    new SimpleLightbox('.gallery__link', {
      captionDelay: 250,
      captionsData: 'alt',
      scrollZoom: false,
    });

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight / 3,
      behavior: 'smooth',
    });

    loadMoreBtn.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
  }
};

const onLoadMore = async () => {};

searchForm.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);
