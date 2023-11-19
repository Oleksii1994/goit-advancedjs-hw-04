import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import debounce from 'lodash.debounce';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './anchor-scroll';

import { fetchImages } from './image-api';
import {
  createMarkup,
  isBottomReached,
  isUpButtonShow,
  createWarningMessage,
  createInfoMessage,
  createSuccessMessage,
} from './helpers';

AOS.init();

const searchForm = document.getElementById('search-form');
const loader = document.querySelector('.loader-container');
const gallery = document.querySelector('.gallery');
const upBtn = document.querySelector('.up-button');

let previousQueryToSearch = '';
const perPage = 40;
let page = 1;
let simpleLightbox = null;
let loading = false;
let firstFetchedHits;

loader.classList.add('is-hidden');
gallery.classList.add('is-hidden');

function checkIfNewSearchQuery(newValue) {
  if (!newValue.trim()) {
    createWarningMessage("Sorry, search field can't be empty.");
    loader.classList.add('is-hidden');

    throw new Error();
  }

  if (newValue === previousQueryToSearch) {
    createWarningMessage('Try to find images by another word.');

    throw new Error();
  }

  if (newValue !== previousQueryToSearch) {
    previousQueryToSearch = newValue;
    loader.classList.remove('is-hidden');
    gallery.classList.add('is-hidden');
    gallery.innerHTML = '';
  }
}

async function handleSubmit(event) {
  event.preventDefault();
  const { value } = event.currentTarget.elements.searchQuery;

  page = 1;

  try {
    checkIfNewSearchQuery(value.trim());

    const { hits, totalHits } = await fetchImages(value.trim(), page);

    if (!hits || hits.length === 0) {
      createWarningMessage(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      event.target.elements.searchQuery.value = '';
      loader.classList.add('is-hidden');
      return;
    }

    firstFetchedHits = totalHits;

    createSuccessMessage(`Hooray! We found ${totalHits} images`);

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

    event.target.elements.searchQuery.value = '';
  } catch (error) {
    console.log(error);
  }
}

async function loadMore() {
  if (loading) {
    return;
  }
  loading = true;
  page += 1;

  try {
    loader.classList.remove('is-hidden');
    const { hits, totalHits } = await fetchImages(previousQueryToSearch, page);
    const totalPages = Math.ceil(totalHits / perPage);

    if (totalPages === page) {
      createInfoMessage(
        "We're sorry, but you've reached the end of search results."
      );

      loading = false;
      return;
    }

    gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
    loader.classList.add('is-hidden');

    loading = false;
    simpleLightbox.refresh();
  } catch (error) {
    console.log(error.message);
  }
}

function onScrollLoadMore() {
  if (isUpButtonShow()) {
    upBtn.classList.remove('is-hidden');
  }

  if (firstFetchedHits <= perPage) {
    return;
  }

  if (isBottomReached() && !loading) {
    loadMore();
  }
}

window.addEventListener('scroll', debounce(onScrollLoadMore, 100));
searchForm.addEventListener('submit', handleSubmit);
