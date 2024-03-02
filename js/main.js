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
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

function getRandomInteger (min,max) {
  const lower = Math.ceil(Math.min(Math.abs(min),Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min),Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
//Количество фотографий
const generateCountOfPhotos = () => {
  let count = 0;
  return function () {
    return ++count;
  };
};
//создать уникальный id
const createUniqueId = (min,max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min,max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const generateId = generateCountOfPhotos();
const generatePhotoId = generateCountOfPhotos();
const generateCommentId = createUniqueId (MIN_COMMENTS, MAX_COMMENTS);
const generateAvatarId = createUniqueId (1,QUANTITY_AVATAR);
//const generateId = d();

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];


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


Array.from({length: QUANTITY_PHOTOS}, createObjectOfPhotos);
