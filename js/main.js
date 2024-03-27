import {createArraysOfPhotos} from './data.js';
import {renderPhotos} from './renderThumbnails.js';


import {getEffectToPhoto} from './filter-modal.js';
//import {scaleSmallerBtn} from './scale.js';

const data = createArraysOfPhotos();
renderPhotos(data);
