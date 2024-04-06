import {renderPhotos, removeThumbnails} from './renderThumbnails.js';

const MAX_RANDOM_PHOTO_COUNT = 10;
const defaultButton = document.querySelector('#filter-default');
const randomButton = document.querySelector('#filter-random');
const discussedButton = document.querySelector('#filter-discussed');

const imgFilters = document.querySelector('.img-filters');
//форма с фильтрами на главной
const showImgFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

//Определяю активную кнопку
const getActiveButton = (currentButton) => {
  const activeButton = document.querySelector('.img-filters__button--active');
  if (currentButton !== activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }
  currentButton.classList.add('img-filters__button--active');
};

//Фильтр по рандомным фото
const makeRandomFilter = (photos,count) => {
  const searchForRandomImages = photos.slice().sort(() => 0.5 - Math.random()).slice(0, count);
  console.log(searchForRandomImages)
  renderPhotos(searchForRandomImages);
};

 // Обрабатываем нажатие кнопки, применяя рандомный фильтр
const handleRandomButton = (photos, count) => {
  randomButton.addEventListener('click', (evt) => {
    removeThumbnails();
    getActiveButton(evt.target);
    makeRandomFilter(photos,count);
  });
};

const handleDefaultButton = (photos) => {
  defaultButton.addEventListener('click', (evt) => {
    removeThumbnails();
    getActiveButton(evt.target);
    renderPhotos(photos);
  });
};

const sortByQuantityComments = (arr) => {
  arr.sort((a, b) => a.comments < b.comments ? 1 : -1);
};

function findPopularPhotos (photos) {
  const photosRating = photos.slice();
  sortByQuantityComments(photosRating);
  renderPhotos(photosRating);
}

const hundleDiscussedButton = (photos) => {
  discussedButton.addEventListener('click', (evt) => {
    removeThumbnails();
    getActiveButton(evt.target);
    findPopularPhotos(photos);
  });
};

export {showImgFilters,MAX_RANDOM_PHOTO_COUNT,handleRandomButton,handleDefaultButton,hundleDiscussedButton};
