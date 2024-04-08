import {getData} from './api.js';
import {renderPhotos} from './renderThumbnails.js';
import {showImgFilters} from './filter.js';
import './validation.js';

//В точке входа передаем в обработчик события передаем коллбэк закрытия окна при успешной отправке формы//далее смотрим в filter-modal
getData((photos) => {
  renderPhotos(photos);
  showImgFilters(photos);
});


