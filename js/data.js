import {QUANTITY_PHOTOS, MIN_LIKES, MAX_LIKES, MIN_COMMENTS, MAX_COMMENTS, QUANTITY_AVATAR, NAMES, DESCRIPTION, MESSAGES} from './constants.js';

import {getRandomInteger, generateCountOfPhotos, getRandomArrayElement,createUniqueId} from './utils.js';

const generateId = generateCountOfPhotos();
const generatePhotoId = generateCountOfPhotos();
const generateCommentId = createUniqueId (MIN_COMMENTS, MAX_COMMENTS);
const generateAvatarId = createUniqueId (1,QUANTITY_AVATAR);
//const generateId = d();


const createComments = () => ({
  id: generateCommentId(),
  avatar:`img/avatar-${generateAvatarId()}.svg`,
  message: `${getRandomArrayElement(MESSAGES)}`,
  name:`${getRandomArrayElement(NAMES)}`,
});

//console.log (createComments());

const createObjectOfPhotos = () => ({
  id: generateId(),
  url: `photos/${generatePhotoId()}.jpg`,
  description: `${getRandomArrayElement(DESCRIPTION)}`,
  likes: `${getRandomInteger (MIN_LIKES, MAX_LIKES)}`,
  comments: Array.from({length: generateCommentId()}, createComments)
}); //почему не нужен return после стрелки???


const createArraysOfPhotos = () => Array.from({length: QUANTITY_PHOTOS}, createObjectOfPhotos);
//console.log(createArraysOfPhotos());

export{createArraysOfPhotos};//проверить саму функцию
