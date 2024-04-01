import {createArraysOfPhotos} from './data.js';
import {renderPhotos} from './renderThumbnails.js';
import './filter-modal.js';
import './validation.js';

const data = createArraysOfPhotos();
renderPhotos(data);


