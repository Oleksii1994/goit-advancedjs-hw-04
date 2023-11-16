import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './image-api';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

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
      }) => `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
</div>`
    )
    .join('');
  return markup;
};

const handleSubmit = async event => {
  event.preventDefault();
  const { value } = event.currentTarget.elements.searchQuery;

  try {
    const { hits } = await fetchImages(value);
    console.log(hits);
    if (hits.length === 0) {
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        position: 'topRight',
      });
    }

    gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
  } catch (error) {
    console.log(error);
  }
};

const onLoadMore = async () => {};

searchForm.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);
