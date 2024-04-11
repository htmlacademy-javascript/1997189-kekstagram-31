import {getData} from './api.js';
import {renderPhotos} from './render-thumbnails.js';
import {showImgFilters} from './filter.js';
import './validation.js';

getData((photos) => {
  renderPhotos(photos);
  showImgFilters(photos);
});
