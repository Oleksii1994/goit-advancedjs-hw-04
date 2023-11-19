import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function createMarkup(arrayOfImages) {
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
}

export function isBottomReached() {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.offsetHeight;
  return scrollTop + windowHeight >= documentHeight - 30; // Буфер 10px
}

export function isUpButtonShow() {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.offsetHeight;
  return scrollTop + windowHeight >= documentHeight / 3; // Буфер 10px
}

export function createWarningMessage(message) {
  iziToast.warning({
    message,
    position: 'topRight',
  });
}

export function createInfoMessage(message) {
  iziToast.info({
    message,
    position: 'topRight',
  });
}

export function createSuccessMessage(message) {
  iziToast.success({
    message,
    position: 'topRight',
  });
}
