import { openModal } from './modal.js';
const cardTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
const localData = [];

const setData = (photos) => {
  localData.length = 0;
  localData.push(...photos);
};
export const removeThumbnails = () => {
  document.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
};
const renderPhotos = (data) => {
  setData(data);
  const fragment = document.createDocumentFragment();
  data.forEach(({ id, url, description, likes, comments }) => {
    const card = cardTemplate.cloneNode(true);
    card.dataset.pictureId = id;
    card.querySelector('.picture__img').src = url;
    card.querySelector('.picture__img').alt = description;
    card.querySelector('.picture__likes').textContent = likes;
    card.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(card);
  });
  container.appendChild(fragment);
};

container.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    evt.preventDefault();
    const currentPhoto = localData.find((photo) => Number(photo.id) === Number(currentPicture.dataset.pictureId));
    openModal(currentPhoto);
  }
});
export { renderPhotos };
