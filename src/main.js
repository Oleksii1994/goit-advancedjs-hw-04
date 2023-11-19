import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

import { fetchImages } from './image-api';

const searchForm = document.getElementById('search-form');
const loader = document.querySelector('.loader-container');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-wrapper');

let previousQueryToSearch = '';
let page = 1;
let simpleLightbox = null;

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
      }) => `<li class="photo-card gallery__item" data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" data-aos-duration="1500" >
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

const checkIfNewSearchQuery = newValue => {
  if (!newValue.trim()) {
    iziToast.warning({
      message: "Sorry, search field can't be empty.",
      position: 'topRight',
    });
    loader.classList.add('is-hidden');
    throw new Error();
  }

  if (newValue === previousQueryToSearch) {
    iziToast.warning({
      message: 'Try to find images by another word.',
      position: 'topRight',
    });
    throw new Error();
  }

  if (newValue !== previousQueryToSearch) {
    previousQueryToSearch = newValue;
    loader.classList.remove('is-hidden');
    loadMoreBtn.classList.add('is-hidden');
    gallery.classList.add('is-hidden');
    gallery.innerHTML = '';
  }
};

const handleSubmit = async event => {
  event.preventDefault();
  const { value } = event.currentTarget.elements.searchQuery;

  checkIfNewSearchQuery(value.trim());
  page = 1;

  try {
    const { hits } = await fetchImages(value.trim(), page);

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

    simpleLightbox = new SimpleLightbox('.gallery__link', {
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
    event.target.elements.searchQuery.value = '';
  } catch (error) {
    console.log(error);
  }
};

const onLoadMore = async () => {
  page += 1;
  const { hits } = await fetchImages(previousQueryToSearch, page);
  gallery.insertAdjacentHTML('beforeend', createMarkup(hits));

  simpleLightbox.refresh();
};

function isBottomReached() {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.offsetHeight;

  return scrollTop + windowHeight >= documentHeight - 30; // Буфер 10px
}

// Обробник події прокрутки
window.addEventListener('scroll', function () {
  if (isBottomReached()) {
    onLoadMore();
  }
});

searchForm.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);
