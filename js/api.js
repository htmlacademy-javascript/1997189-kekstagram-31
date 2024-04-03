import {isEscapeKey} from './utils.js';
import{validate} from './validation.js';
//import {renderPhotos} from './renderThumbnails.js';

const form = document.querySelector('.img-upload__form');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successTemplate.cloneNode(true);
const submitBtn = document.querySelector('.img-upload__submit');
//Поведение кнопки опубликовать во время отправки

const blockSubmitBtn = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = 'Публикую...';
};

const unBlockSubmitBtn = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = 'Опубликовать';
};


//Принял фото с сервера, отрисовал их вместо генерированных фото из data.js
//Оборачиваем прием с сервера в функцию, чтоб можно было вызвать с любого модуля
const getData = (onSuccess) => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      //renderPhotos(photos);
      onSuccess(photos);
    });
};

//добавить внутрь данные по отправке формы, чтобы можно было вызвать с любого места
//const sendData = (onSuccess,onFail,body) => {};
//ДОДЕЛАТЬ:закрытие по клику на произвольную область экрана за пределами блока с сообщением

const onSuccessButtonKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();//нужен
    closeSuccessMessage();
  }
};

//искать кнопку здесь или вне?
const showSuccessMessage = () => {
  // Добавляю визуал об успехе
  document.body.append(successMessage);
  //ставлю слушатель на кнопку закрытия
  const successButton = successMessage.querySelector('.success__button');

  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onSuccessButtonKeyDown);
};

function closeSuccessMessage () {
  successMessage.remove();

  //successButton.removeEventListener('click', closeSuccessMessage); Как удалить обработчик клика, если кнопку ищу,когда окно открывается
  document.removeEventListener('keydown', onSuccessButtonKeyDown);
}

const errorLoadTemplate = document.querySelector('#error').content.querySelector('.error');

//удаление визуала об ошибке
const closeErrorMessage = () => {
  errorLoadTemplate.remove();
};

const onErrorButtonKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();//нужен
    //imgUploadOverlay.classList.remove('hidden');
    closeErrorMessage();
  }
};

//ПРОБЛЕМА - ПРИ ЗАКРЫТИИ ESCAPE ЗАКРЫВАЕТСЯ ВСЕ ОКНО!!!

const showErrorMessage = () => {
  document.body.append(errorLoadTemplate);

  const errorButtonClose = document.querySelector('.error__button');
  errorButtonClose.addEventListener('click',closeErrorMessage);
  document.addEventListener('keydown', onErrorButtonKeyDown);
};

const setFilterModalSubmit = (onSuccess) => {
  //Отправка формы, если форма проходит валидацию!
  form.addEventListener('submit', (evt) => {
  //если не поставить, то форма улетит на сервер
    evt.preventDefault();
    if (
      validate()
    ) {
      blockSubmitBtn();
      const formData = new FormData(evt.target);
      fetch('https://31.javascript.htmlacademy.pro/kekstagram',
        {
          method: 'POST',
          body: formData,
        },
        //добавляем then после добавления ф closeUploadModal в setFilterModalSubmit , кот. вызвана в main
      ).then ((response) => {
        if(response.ok) {
          onSuccess();
          showSuccessMessage();
          unBlockSubmitBtn();
        } else {
          showErrorMessage();
        }
      })
        .catch((err) => {
          //console.log(err);
          showErrorMessage(err.message);
        });
    //   ПОЧЕМУ НЕ НУЖЕН ЗДЕСЬ САБМИТ ДЛЯ ПРОСМОТРА, ЧТО ДАННЫЕ УШЛИ ПО ФЕЧУ?
    // form.submit();
    }
  });
};

export{setFilterModalSubmit,getData};
