import {commentElement,commentsContainer} from './modal.js';
const fragmentForCurrentPhoto = document.createDocumentFragment();
//const commentElement = modalElement.querySelector('.social__comment');
//const commentsContainer = modalElement.querySelector('.social__comments');//ul для вставки комментов li

const renderComments = (allComments) => {
  console.log(allComments);
  allComments.forEach(({avatar,name,message}) => {
    const commentElementClone = commentElement.cloneNode(true);//Добавила его внутрь форич и количество комментов стало таким, каким нужно для фото, ранее, вне форича был только один коммент. СОЗДАВАТЬ КЛОН ВНУТРИ ЦИКЛА!!!
    commentElementClone.querySelector('.social__picture').src = avatar;
    commentElementClone.querySelector('.social__picture').alt = name;
    commentElementClone.querySelector('.social__text').textContent = message;
    fragmentForCurrentPhoto.appendChild(commentElementClone);
  });
  commentsContainer.appendChild(fragmentForCurrentPhoto);
};

export {renderComments};
