//import {createArraysOfPhotos} from './data.js';
import {renderPhotos} from './renderThumbnails.js';
import './filter-modal.js';
import './validation.js';
import {setFilterModalSubmit} from './filter-modal.js';
import {closeUploadModal} from './filter-modal.js';

//const data = createArraysOfPhotos();
//renderPhotos(data);

//Принял фото с сервера, отрисовал их вместо генерированных фото из data.js
fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    renderPhotos(photos);
  });

  //В точке входа передаем в обработчик события передаем коллбэк закрытия окна при успешной отправке формы//далее смотрим в filter-modal
setFilterModalSubmit(closeUploadModal);
