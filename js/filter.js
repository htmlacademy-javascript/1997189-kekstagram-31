import { renderPhotos, removeThumbnails } from './render-thumbnails.js';
import { debounce } from './utils.js';

const MAX_RANDOM_PHOTO_COUNT = 10;
const filterFormElement = document.querySelector('.img-filters__form');
const imgFilters = document.querySelector('.img-filters');
const localData = [];

const showImgFilters = (photos) => {
  imgFilters.classList.remove('img-filters--inactive');
  localData.push(...photos.slice());
};

const getActiveButton = (currentButton) => {
  const activeButton = document.querySelector('.img-filters__button--active');
  if (currentButton !== activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }
  currentButton.classList.add('img-filters__button--active');
};

const makeRandomFilter = (photos, count) => {
  const searchForRandomImages = photos.slice().sort(() => 0.5 - Math.random()).slice(0, count);
  renderPhotos(searchForRandomImages);
};

filterFormElement.addEventListener('click', debounce((evt) => {
  removeThumbnails();
  getActiveButton(evt.target);
  switch (evt.target.id) {
    case 'filter-default':
      renderPhotos(localData);
      break;
    case 'filter-random':
      makeRandomFilter(localData, MAX_RANDOM_PHOTO_COUNT);
      break;
    case 'filter-discussed':
      findPopularPhotos(localData);
      break;
  }
}, 500));

const sortByQuantityComments = (arr) => {
  arr.sort((element, nextElement) => element.comments < nextElement.comments ? 1 : -1);
};

function findPopularPhotos(photos) {
  const photosRating = photos.slice();
  sortByQuantityComments(photosRating);
  renderPhotos(photosRating);
}

export { showImgFilters, MAX_RANDOM_PHOTO_COUNT };
