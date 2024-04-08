import {
  commentElement,
  commentsContainer,
  commentsLoader,
  quantityOfVisibleComments
} from './modal.js';
let comments = [];
let currentCount = 0;
const STEP = 5;
//let COUNT = 0;

const renderNextComments = () => {
  const fragment = document.createDocumentFragment();
  const renderedComments = comments.slice(currentCount, currentCount + STEP);

  renderedComments.forEach(({avatar,name,message}) => {
    const commentElementClone = commentElement.cloneNode(true);

    commentElementClone.querySelector('.social__picture').src = avatar;
    commentElementClone.querySelector('.social__picture').alt = name;
    commentElementClone.querySelector('.social__text').textContent = message;

    fragment.appendChild(commentElementClone);
    currentCount++;
  });
  commentsContainer.appendChild(fragment);

  quantityOfVisibleComments.textContent = currentCount;

  if (currentCount >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const clearComments = () => {
  currentCount = 0;
  //COUNT = 0;
  commentsContainer.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', renderNextComments);
};

const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;

  renderNextComments();
  commentsLoader.addEventListener('click', renderNextComments);
};


export {renderComments,clearComments};
