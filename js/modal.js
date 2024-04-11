import {isEscapeKey} from './utils.js';
import {renderComments,clearComments} from './render-comments.js';

const modalElement = document.querySelector('.big-picture');
const bigPictureCloseButton = modalElement.querySelector('.big-picture__cancel');
const bigPictureImg = modalElement.querySelector('.big-picture__img img');
const likesCount = modalElement.querySelector('.likes-count');
const quantityOfVisibleComments = modalElement.querySelector('.social__comment-shown-count');
const totalСomments = modalElement.querySelector('.social__comment-total-count');
const descriptionOfPhoto = modalElement.querySelector('.social__caption');
const commentsContainer = modalElement.querySelector('.social__comments');//ul для вставки комментов li
const commentElement = modalElement.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');

const body = document.querySelector('body');

const closeModal = function () {
  clearComments();
  modalElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

function onDocumentKeyDown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    body.classList.remove('modal-open');
    modalElement.classList.add('hidden');
    closeModal();
  }
}

const openModal = function ({url, likes, comments, description}) {
  modalElement.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  totalСomments.textContent = comments.length;
  descriptionOfPhoto.textContent = description;
  body.classList.add('modal-open');
  commentsContainer.innerHTML = '';
  renderComments(comments);
  document.addEventListener('keydown', onDocumentKeyDown);
};

bigPictureCloseButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  body.classList.remove('modal-open');
  closeModal();
});

export {
  commentElement,
  openModal,
  commentsContainer,
  commentsLoader,
  quantityOfVisibleComments,
  body
};
