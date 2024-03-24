import {commentElement,commentsContainer,commentsLoader,quantityOfVisibleComments} from './modal.js';
let comments = [];
let currentCount = 0;
const step = 5;
let count = 0;

// const renderLoader = () => {

// }

// const renderStatistic = () => {

// }

// const renderComments = (comment) => {

// }

// const renderComments = (portion) => {
//   renderComments(comment)
// }

const renderNextComments = () => {
  const fragment = document.createDocumentFragment();
  const renderedComments = comments.slice(currentCount, currentCount + step);

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
  count = 0;
  commentsContainer.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', renderNextComments);
}

const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;

  renderNextComments();
  commentsLoader.addEventListener('click', renderNextComments);
};



// //const commentElement = modalElement.querySelector('.social__comment');
// //const commentsContainer = modalElement.querySelector('.social__comments');//ul для вставки комментов li

// const COUNT__STEP = 5;
// const startCount = 0;
// let globalComments = [];

// const renderCurrentComments = (glComments) => {
//  console.log(glComments);
//   const fragmentForCurrentPhoto = document.createDocumentFragment();
//   glComments.forEach(({avatar,name,message}) => {

//     const commentElementClone = commentElement.cloneNode(true);
//     commentElementClone.querySelector('.social__picture').src = avatar;
//     commentElementClone.querySelector('.social__picture').alt = name;
//     commentElementClone.querySelector('.social__text').textContent = message;

//     fragmentForCurrentPhoto.appendChild(commentElementClone);
//     //console.log(fragmentForCurrentPhoto);
//   });
//   commentsContainer.appendChild(fragmentForCurrentPhoto);
// };

// const renderComments = (allComments) => {
// console.log(allComments);
// let safityArr = allComments;
// console.log(safityArr);
//   globalComments = safityArr.splice(0, 5);
//   renderCurrentComments(globalComments);

//   commentsLoader.addEventListener('click', (evt) => {
//     globalComments = safityArr.splice(0, 5);
//     if (globalComments.length > allComments.length || globalComments.length === allComments.length) {
//       globalComments.length = allComments.length;
//       commentsLoader.classList.add('hidden');
//     }

//     //globalComments.push(...allComments.slice(0, 5));


//     renderCurrentComments(globalComments);
//   });
// };

export {renderComments,clearComments};
