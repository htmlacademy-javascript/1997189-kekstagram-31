export const QUANTITY_PHOTOS = 25;//относится к id,url
export const MIN_LIKES = 15;
export const MAX_LIKES = 200;
export const MIN_COMMENTS = 0;
export const MAX_COMMENTS = 30;
export const QUANTITY_AVATAR = 6;

export const NAMES = [
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

export const DESCRIPTION = ['Луна','Февраль','Поле','Розовый закат','Кот','Каменистые горы'];

export const MESSAGES = [
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

export const sliderOptionsDefault = {
  start: 100,
  step: 1,
  connect: 'lower',
  range: {
    min: 0,
    max: 100,
  }
};

export const sliderOptionsChromeSepia = {
  range: {
    min:0,
    max:1,
  },
  start: 1,
  step: 0.1,
};

export const sliderOptionsPhobos = {
  range: {
    min:0,
    max:3,
  },
  start: 3,
  step: 0.1,
};

export const sliderOptionsHeat = {
  range: {
    min:1,
    max:3,
  },
  start: 3,
  step: 0.1,
};

//название эффектов - настройка для effects.js
export const EFFECTS = {
  none: sliderOptionsDefault,
  chrome: sliderOptionsChromeSepia,
  sepia: sliderOptionsChromeSepia,
  marvin: sliderOptionsDefault,
  phobos: sliderOptionsPhobos,
  heat: sliderOptionsHeat,
};

export const ImgEffects = {
  none: () => '',
  chrome: (value) => `grayscale(${value})`,
  sepia: (value) => `sepia(${value})`,
  marvin: (value) => `invert(${value}%)`,
  phobos: (value) => `blur(${value}px)`,
  heat: (value) => `brightness(${value})`
};

