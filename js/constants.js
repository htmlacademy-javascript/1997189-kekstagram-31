const QUANTITY_PHOTOS = 25;//относится к id,url
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const QUANTITY_AVATAR = 6;

const NAMES = [
  'Илья',
  'Варвара',
  'Иван',
  'Александр',
  'Петр',
  'Юлия',
  'Алексей',
  'Софья',
  'Михаил',
  'Леонид',
  'Мария',
  'Семен',
  'Елена',
  'Екатерина',
  'Николай',
];

const DESCRIPTION = ['Луна','Февраль','Поле','Розовый закат','Кот','Каменистые горы'];

const MESSAGES = [
  'Всё отлично!',
  'Плохо',
  'Ужас',
  'Слишком размыто',
  'Вообще ничего не видно',
  'А где же собачка на фото?',
  'Я думал там холодно',
  'Лучше использовать профессиональную камеру',
  'В целом всё неплохо. Но не всё.',
  'Хорошо бы убирать палец из кадра',
  'Кекс сфотает лучше.',
  'Замечательное фото',
  'Продолжайте фотографировать',
];

const sliderOptionsDefault = {
  start: 100,
  step: 1,
  connect: 'lower',
  range: {
    min: 0,
    max: 100,
  }
}; //проверить нужен ли

const sliderOptionsChromeSepia = {
  range: {
    min:0,
    max:1,
  },
  start: 1,
  step: 0.1,
};

const sliderOptionsPhobos = {
  range: {
    min:0,
    max:3,
  },
  start: 3,
  step: 0.1,
};

const sliderOptionsHeat = {
  range: {
    min:1,
    max:3,
  },
  start: 3,
  step: 0.1,
};

//название эффектов - настройка для effects.js
const EFFECTS = {
  none: sliderOptionsDefault,
  chrome: sliderOptionsChromeSepia,
  sepia: sliderOptionsChromeSepia,
  marvin: sliderOptionsDefault,
  phobos: sliderOptionsPhobos,
  heat: sliderOptionsHeat,
};
console.log(EFFECTS.chrome);
//Применение бОльшего эффекта//value из поля слайдера
const getChromeStyleFilter = (value) => `grayscale(${value})`;
const getSepiaStyleFilter = (value) => `sepia(${value})`;
const getMarvinStyleFilter = (value) => `invert(${value}%)`;
const getPhobosStyleFilter = (value) => `blur(${value}px)`;
const getHeatStyleFilter = (value) => `brightness(${value})`;

export {QUANTITY_PHOTOS, MIN_LIKES, MAX_LIKES, MIN_COMMENTS, MAX_COMMENTS, QUANTITY_AVATAR, NAMES, DESCRIPTION, MESSAGES,EFFECTS,getChromeStyleFilter,getSepiaStyleFilter,getMarvinStyleFilter,getPhobosStyleFilter,getHeatStyleFilter};


