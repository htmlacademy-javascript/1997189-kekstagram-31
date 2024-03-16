import {createArraysOfPhotos} from './data.js';
import {renderPhotos} from './renderThumbnails.js';
import {isEscapeKey} from './utils.js';

const data = createArraysOfPhotos();
renderPhotos(data);



const thumbnailsContainer = document.querySelector('.pictures');//контейнер мини- фото
const modalElement = document.querySelector('.big-picture');//модальное окно
//крестик закрытия мод окна большое фото
const bigPictureCloseButton = modalElement.querySelector('.big-picture__cancel');

//Делаю функцию для открытия модального окна, чтоб не повторяться

//Для успешного удаления обработчика запишем его в переменную
const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();//нужен
    modalElement.classList.add('hidden');
  }
};

const openModal = function (pictureId) { //принимаю в pictureId из thumbnailsContainer.addEventListener атрибут openModal(currentPicture.dataset.pictureId);
  modalElement.classList.remove('hidden');
  //currentPicture  - это в массиве дата ищем совпадение с айди кликнутой фотки (pictureId)
  const currentPhoto = data.find((currentPicture) => Number(currentPicture.id) === Number(pictureId)); //нашла фото, которое кликают

  const bigPictureImg = modalElement.querySelector('.big-picture__img img'); // поиск большой фото в разметке
  bigPictureImg.src = currentPhoto.url;// заменяем стандартную большую фото на фото текущей "маленькой"
  const likesCount = modalElement.querySelector('.likes-count');
  likesCount.textContent = currentPhoto.likes;
  const quantityOfVisibleComments = modalElement.querySelector('.social__comment-shown-count');
  quantityOfVisibleComments.textContent = currentPhoto.comments.length;// ЭТО ОБЩЕЕ ЧИСЛО КОММЕНТОВ!!! ПОДУМАТЬ
  const totalСomments = modalElement.querySelector('.social__comment-total-count');
  totalСomments.textContent = currentPhoto.comments.length;
  const descriptionOfPhoto = modalElement.querySelector('.social__caption');
  descriptionOfPhoto.textContent = currentPhoto.description;

  const fragmentForCurrentPhoto = document.createDocumentFragment();//фрагмент для отрисовки КОММЕНТАРИЕВ
  //modalElement.
  const commentsContainer = modalElement.querySelector('.social__comments');//ul для вставки комментов li
  //document.createElement('li').classList.add('social__comment');
  document.addEventListener('keydown', onDocumentKeyDown);
};

//Делаю функцию для закрытия модального окна, чтоб не повторяться
const closeModal = function () {
  //скрыть окно
  modalElement.classList.add('hidden');
  //удалить обработчик для закрытия
  document.removeEventListener('keydown', onDocumentKeyDown);
  //прочая логика
};


//Делаем клик на контейнере container, делегируем
thumbnailsContainer.addEventListener('click',(evt) => {
  const currentPicture = evt.target.closest('.picture');
  //console.log(currentPicture.dataset.pictureId);
  if (currentPicture) {
    openModal(currentPicture.dataset.pictureId);//передаю из thumbnailsContainer.addEventListener в openModal(currentPicture.dataset.pictureId);
  }
});

//Закрытие модального окна по клику на крестик
bigPictureCloseButton.addEventListener('click', (evt) => {
  closeModal();
});

