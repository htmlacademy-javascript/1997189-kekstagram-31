import {createArraysOfPhotos} from './data.js';

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

const randomUserImageTemplate = document.querySelector('#picture').content;//шаблон фотографий других пошльзователей
const setupRandomUserImage = document.querySelector('.pictures');// контайнер, куда будем грузить фото других пользователей

const randomUsers = createArraysOfPhotos();

const randomUsersFragment = document.createDocumentFragment();
randomUsers.forEach(({ id,url,description,likes,comments}) => {
  const randomUserImage = randomUserImageTemplate.cloneNode(true);//Клонированный шаблон
  randomUserImage.id = id;
  randomUserImage.querySelector('.picture__img').src = url;//url фотографии берем из данных

  randomUserImage.querySelector('.picture__img').alt = description;
  randomUserImage.querySelector('.picture__likes').textContent = likes;
  randomUserImage.querySelector('.picture__comments').textContent = comments.length;
  randomUsersFragment.appendChild(randomUserImage);//проверяем добавился ли шаблон в контейнер
});
setupRandomUserImage.appendChild(randomUsersFragment);

export {randomUsers};


