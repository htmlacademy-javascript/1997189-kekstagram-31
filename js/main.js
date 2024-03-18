import {createArraysOfPhotos} from './data.js';
import {renderPhotos} from './renderThumbnails.js';


const data = createArraysOfPhotos();
renderPhotos(data);
