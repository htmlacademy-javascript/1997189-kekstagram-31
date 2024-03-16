//import {createArraysOfPhotos} from './data.js';

// Задача
// Отобразить фотографии других пользователей.

// Заведите модуль, который будет отвечать за отрисовку миниатюр.

// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Описание изображения description подставьте в атрибут alt изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

// Подключите модуль в проект.

const cardTemplate = document.querySelector('#picture').content.querySelector('.picture');//шаблон фотографий других пользователей
const container = document.querySelector('.pictures');// контайнер, куда будем грузить фото других пользователей

const renderPhotos = (data) => {
  const fragment = document.createDocumentFragment();
  data.forEach(({id, url, description, likes, comments }) => {
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

export { renderPhotos };
