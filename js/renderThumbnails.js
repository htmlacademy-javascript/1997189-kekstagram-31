import { openModal } from './modal.js';
const cardTemplate = document.querySelector('#picture').content.querySelector('.picture');//шаблон фотографий других пользователей
const container = document.querySelector('.pictures');// контайнер, куда будем грузить фото других пользователей
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
    const card = cardTemplate.cloneNode(true);//Клонированный шаблон
    card.dataset.pictureId = id;//добавила дата атрибут id на ссылку, внутри кот. миниатюра, чтобы привязать большую фото к показу;
    card.querySelector('.picture__img').src = url;//url фотографии берем из данных
    card.querySelector('.picture__img').alt = description;
    card.querySelector('.picture__likes').textContent = likes;
    card.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(card);//проверяем добавился ли шаблон в контейнер
  });
  container.appendChild(fragment);
};

container.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    evt.preventDefault();//если убрать http://127.0.0.1:3000/# НОВАЯ СТРАНИЦА!!!
    const currentPhoto = localData.find((photo) => Number(photo.id) === Number(currentPicture.dataset.pictureId)); //нашла фото, которое кликают
    //console.log(localData);
    openModal(currentPhoto);//передаю из thumbnailsContainer.addEventListener в openModal(currentPicture.dataset.pictureId);
  }
});
export { renderPhotos };
