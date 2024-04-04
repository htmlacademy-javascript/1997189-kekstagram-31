import { isEscapeKey } from './utils.js';
import { validate } from './validation.js';
import {closeUploadModal} from './filter-modal.js';
//import {renderPhotos} from './renderThumbnails.js';
import{onDocumentKeyDown} from './filter-modal.js';
const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const ROUTE = {
  GET_DATA: '/data'
  // SEND_DATA: '/',
};
const ALERT_SHOW_TIME = 5000;
const form = document.querySelector('.img-upload__form');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successTemplate.cloneNode(true);
const submitBtn = document.querySelector('.img-upload__submit');
//Поведение кнопки опубликовать во время отправки

const blockSubmitBtn = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = submitButtonText.SENDING;
};

const unBlockSubmitBtn = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = submitButtonText.IDLE;
};

//СООБЩЕНИЕ ОШИБКИ ЗАГРУЗКИ ПРИНЯТНЫХ ФОТО
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const errorMessage = dataErrorTemplate.cloneNode(true);

const showDataErrorMessage = () => {
  document.body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  },ALERT_SHOW_TIME);
};


//Принял фото с сервера, отрисовал их вместо генерированных фото из data.js
//Оборачиваем прием с сервера в функцию, чтоб можно было вызвать с любого модуля
// const getData = (onSuccess) => {
//   fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
//   .then((response) => response.json())
//   .then((photos) => {
//     //renderPhotos(photos);
//     onSuccess(photos);
//   })
//     .then((photos) => {
//       onSuccess(photos);
//     })
//     .catch(() => {
//       showDataErrorMessage();
//       throw new Error('Не удалось соединиться с сервером');//ДОБАВИЛА ВЫБРОС ОШИБКИ
//     });
// };


const getData = (onSuccess) => {
  fetch(`${BASE_URL}${ROUTE.GET_DATA}`)
    .then((response) => response.json())
    .then((photos) => {
      //renderPhotos(photos);
      onSuccess(photos);
    })
    .catch(() => {
      showDataErrorMessage();
      throw new Error('Не удалось соединиться с сервером');//ДОБАВИЛА ВЫБРОС ОШИБКИ
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

function closeSuccessMessage() {
  successMessage.remove();
  //successButton.removeEventListener('click', closeSuccessMessage); Как удалить обработчик клика, если кнопку ищу,когда окно открывается
  document.removeEventListener('keydown', onSuccessButtonKeyDown);
}

const errorLoadTemplate = document.querySelector('#error').content.querySelector('.error');

//удаление визуала об ошибке
const closeErrorMessage = () => {
  errorLoadTemplate.remove();
  //добавляю закрытие по escape всего мод окна
  document.addEventListener('keydown', onDocumentKeyDown);
};

const onErrorButtonKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();//нужен
    closeErrorMessage();
  }
};

//ПРОБЛЕМА - ПРИ ЗАКРЫТИИ ESCAPE ЗАКРЫВАЕТСЯ ВСЕ ОКНО!!!
//СООБЩЕНИ ОШИБКИ ОТПРАВКИ
const showErrorMessage = () => {
  document.body.append(errorLoadTemplate);
  const errorButtonClose = document.querySelector('.error__button');
   //удаляю закрытие по escape всего мод окна
  document.removeEventListener('keydown', onDocumentKeyDown);
  errorButtonClose.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onErrorButtonKeyDown);
};

//ПРИНИМАЮ ФОРМДАТА ДЛЯ ОТПРАВКИ ДАННЫХ
// const sendData = (body,cb) => {

//   fetch('https://31.javascript.htmlacademy.pro/kekstagram',
//     {
//       method: 'POST',
//       body,
//     },
//   //добавляем then после добавления ф closeUploadModal в setFilterModalSubmit , кот. вызвана в main
//   ).then((response) => {
//     if (response.ok) {
//       cb();
//       //setFilterModalSubmit(closeUploadModal);
//       showSuccessMessage();
//     } else {
//       showErrorMessage();
//       throw new Error();//выброс ошибки в случае, если не верно что - то в отправке
//     }
//   })
//     .catch((err) => {
//       showErrorMessage(err.message);
//       throw new Error('Не удалось отправить форму. Попробуйте ещё раз');//если нет инета или адрес не верный
//     })
//     .finally(() => {
//       unBlockSubmitBtn();
//     });
// };

// //ПРИНИМАЮ ФУНКЦИЮ ДЛЯ ЗАКРЫТИЯ ОКНА ОТПРАВКИ ДАННЫХ
// function setFilterModalSubmit (onSuccess) {
//   //Отправка формы, если форма проходит валидацию!
//   form.addEventListener('submit', (evt) => {
//     //если не поставить, то форма улетит на сервер
//     evt.preventDefault();
//     if (
//       validate()
//     ) {
//       blockSubmitBtn();
//       const formData = new FormData(evt.target);
//       sendData(formData);
//     }
//   });
// }

//ОТПРАВКА ФОТО НА СЕРВЕР
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
//BASE_URL
      fetch('https://31.javascript.htmlacademy.pro/kekstagram',
        {
          method: 'POST',
          body: formData,
        },
        //добавляем then после добавления ф closeUploadModal в setFilterModalSubmit , кот. вызвана в main
      ).then((response) => {
        if (response.ok) {
          onSuccess();
          showSuccessMessage();
        } else {
          showErrorMessage();
          throw new Error();//выброс ошибки в случае, если не верно что - то в отправке
        }
      })
        .catch((err) => {
          //console.log(err);
          showErrorMessage(err.message);
          throw new Error('Не удалось отправить форму. Попробуйте ещё раз');//если нет инета или адрес не верный
        })
        .finally(() => {
          unBlockSubmitBtn();
        });
    }
  });
};

export { setFilterModalSubmit, getData };
