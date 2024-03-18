import {isEscapeKey} from './utils.js';
import {renderComments} from './render-comments.js';

const modalElement = document.querySelector('.big-picture');//модальное окно
//крестик закрытия мод окна большое фото
const bigPictureCloseButton = modalElement.querySelector('.big-picture__cancel');
const bigPictureImg = modalElement.querySelector('.big-picture__img img');
const likesCount = modalElement.querySelector('.likes-count');
const quantityOfVisibleComments = modalElement.querySelector('.social__comment-shown-count');
const totalСomments = modalElement.querySelector('.social__comment-total-count');
const descriptionOfPhoto = modalElement.querySelector('.social__caption');
const commentsContainer = modalElement.querySelector('.social__comments');//ul для вставки комментов li
const commentElement = modalElement.querySelector('.social__comment');
const commentsCount = modalElement.querySelector('.social__comment-count');
const commentsLoader = modalElement.querySelector('.comments-loader');
const body = document.querySelector('body');


const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();//нужен
    body.classList.remove('modal-open');
    modalElement.classList.add('hidden');
  }
};

const openModal = function ({url, likes, comments, description}) {
  modalElement.classList.remove('hidden');

  bigPictureImg.src = url;// заменяем стандартную большую фото на фото текущей "маленькой"
  likesCount.textContent = likes;
  quantityOfVisibleComments.textContent = comments.length;
  totalСomments.textContent = comments.length;
  descriptionOfPhoto.textContent = description;
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
  //const fragmentForCurrentPhoto = document.createDocumentFragment();
  commentsContainer.innerHTML = '';
  //const allComments = comments;

  renderComments(comments);

  // comments.forEach(({avatar,name,message}) => {
  //   const commentElementClone = commentElement.cloneNode(true);//Добавила его внутрь форич и количество комментов стало таким, каким нужно для фото, ранее, вне форича был только один коммент. СОЗДАВАТЬ КЛОН ВНУТРИ ЦИКЛА!!!
  //   commentElementClone.querySelector('.social__picture').src = avatar;
  //   commentElementClone.querySelector('.social__picture').alt = name;
  //   commentElementClone.querySelector('.social__text').textContent = message;
  //   fragmentForCurrentPhoto.appendChild(commentElementClone);
  // });
  // commentsContainer.appendChild(fragmentForCurrentPhoto);
  document.addEventListener('keydown', onDocumentKeyDown);
};

//Делаю функцию для закрытия модального окна, чтоб не повторяться
const closeModal = function () {
  //body.classList.remove('modal-open'); почему если сюда добавить , не сработает при закрытии ESC
  //скрыть окно
  modalElement.classList.add('hidden');
  //удалить обработчик для закрытия
  document.removeEventListener('keydown', onDocumentKeyDown);
  //прочая логика
};

//Закрытие модального окна по клику на крестик
bigPictureCloseButton.addEventListener('click', (evt) => {
  body.classList.remove('modal-open');
  closeModal();
});

export {commentElement, openModal, commentsContainer};
