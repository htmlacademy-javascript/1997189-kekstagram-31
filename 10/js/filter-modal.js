import {body} from './modal.js';
import {isEscapeKey} from './utils.js';
import{EFFECTS,ImgEffects} from './constants.js';
import {resetScale} from './scale.js';
import{pristineReset,validate} from './validation.js';
import {sendData} from './api.js';

//время задержки сообщения об ошибке при получении данных с сервера
const ALERT_SHOW_TIME = 5000;
//темплейт разметки об успешной загрузке изображения на сервер
const successTemplate = document.querySelector('#success').content.querySelector('.success');
//Копия темплейта об успешн загр изображения на сервер
const successMessage = successTemplate.cloneNode(true);

//Кнопка для отправки данных на сервер - ОПУБЛИКОВАТЬ
const submitBtn = document.querySelector('.img-upload__submit');
//Поведение кнопки ОПУБЛИКОВАТЬ
const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

//красный значок инстаграмма на основном окне
const imgUploadInput = document.querySelector('.img-upload__input');
//модальное окно с фильтрами
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
//большое фото
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const thumbnails = [...document.querySelectorAll('.effects__preview')];
// кнопка закрытия модального окна с фильтрами
const imgUploadBtnCancel = document.querySelector('.img-upload__cancel');
//ul,в котором радио-кнопки превью - фильтры
const effectsList = document.querySelector('.effects__list');
//инпут слайдера под ползунком
const effectLevelInput = document.querySelector('.effect-level__value');
//контейнер, в котором лежит слайдер
const sliderContainer = document.querySelector('.effect-level__slider');
//поле Изменения глубины эффекта, накладываемого на изображение
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const form = document.querySelector('.img-upload__form');
const errorLoadTemplate = document.querySelector('#error').content.querySelector('.error');
//СООБЩЕНИЕ ОШИБКИ ЗАГРУЗКИ ПРИНЯТНЫХ ФОТО
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const errorMessage = dataErrorTemplate.cloneNode(true);

//ДЛЯ ПОДСТАНОВКИ ФОТО ПОЛЬЗОВАТЕЛЯ
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

//сброс фильтра с главной картинки
const resetFilter = () => {
  imgUploadPreview.style.filter = 'none';
};

//Обновление настроек слайдера для каждого эффекта
const updateSlider = (evt) => {
  //const currentInput = evt.target.closest('.effects__item');
  if (evt.target.classList.contains('effects__radio')) {
    const currentEffect = evt.target.value;
    sliderContainer.noUiSlider.updateOptions(EFFECTS[currentEffect]);
  }
};

//Нажатие escape на модальное окно
const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    closeUploadModal ();
  }
};

//Закрытие окна. Удаление обработчика escape. Удаление обработчика клика,Удаление посл класса с больш фото. удаление scale
function closeUploadModal () {
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  resetScale();
  resetFilter();
  pristineReset();
  form.reset();
  //Удаляю слушатель с ul - checkbox
  effectsList.removeEventListener('change', updateSlider);
  document.removeEventListener('keydown', onDocumentKeyDown);
  imgUploadBtnCancel.removeEventListener('click', closeUploadModal);
}

//дефолтное значение спрятанного инпута
effectLevelInput.value = 100;

//Создала первичные настройки для слайдера
noUiSlider.create(sliderContainer, {
  start: 100,
  step: 1,
  connect: 'lower',
  range: {
    min: 0,
    max: 100,
  },
  format: {
    to: function (value) {
      if(Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from:  function (value) {
      return parseFloat(value);
    }
  },
});


sliderContainer.noUiSlider.on('update',() => {
  //запись в спрятанный инпут значение ползунка
  effectLevelInput.value = sliderContainer.noUiSlider.get();
  const currentEffect = document.querySelector('.effects__radio:checked');
  getEffectToPhoto(currentEffect.value, effectLevelInput.value);
});

//Открытие мод окна. Добавление обработчика закрытия escape. Добавл обработчика Х
const openUploadModal = () => {
  //УБРАТЬ ЗДЕСЬ И В CLOSE В ОТДЕЛЬНУЮ ФУНКЦИЮ
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  imgUploadEffectLevel.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeyDown);
  imgUploadBtnCancel.addEventListener('click', closeUploadModal);
  //Ставлю слушатель на ul effects__list
  effectsList.addEventListener('change', updateSlider);
};

const showFilterModal = () => {
  openUploadModal();
  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
    thumbnails.forEach((thumbnail) => {
      thumbnail.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
};

//На появление в инпуте файла, показываю модальное окно с котенком
imgUploadInput.addEventListener('change',showFilterModal);

function getEffectToPhoto (effect,value) {
  imgUploadPreview.style.filter = ImgEffects[effect](value);
  if(effect === 'none') {
    imgUploadEffectLevel.classList.add('hidden');
  } else {
    imgUploadEffectLevel.classList.remove('hidden');
  }
}

//Поведение кнопки опубликовать во время отправки
export const blockSubmitBtn = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = submitButtonText.SENDING;
};

export const unBlockSubmitBtn = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = submitButtonText.IDLE;
};

const showDataErrorMessage = () => {
  document.body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  },ALERT_SHOW_TIME);
};

const onSuccessButtonKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();//нужен
    closeSuccessMessage();
  }
};

//искать кнопку здесь или вне?
export const showSuccessMessage = () => {
  // Добавляю визуал об успехе
  document.body.append(successMessage);
  //ставлю слушатель на кнопку закрытия
  const successOverlay = document.querySelector('.success');
  successOverlay.addEventListener ('click',closeSuccessOverlay);
  const successButton = successMessage.querySelector('.success__button');
  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onSuccessButtonKeyDown);
};

function closeSuccessMessage() {
  successMessage.remove();
  //successButton.removeEventListener('click', closeSuccessMessage); Как удалить обработчик клика, если кнопку ищу,когда окно открывается
  document.removeEventListener('keydown', onSuccessButtonKeyDown);
  //Удаление по клику на кнопку. ЗАново искать successButton?
  // successButton.addEventListener('click', closeSuccessMessage);
}

function closeSuccessOverlay (evt) {
  if (evt.target.classList.contains('success')) {
    closeSuccessMessage();
  }
}

//const errorOverlay = document.querySelector('.error');
//удаление визуала об ошибке
// кнопка errorButtonClose ищется и существует только в showErrorMessage
//Как УДАЛИТЬ СЛУШАТЕЛЬ errorOverlay,errorButtonClose и КАК ЕЕ ПРАВИЛЬНО искать без ОШИБКИ В КОНСОЛИ
//он вместе с кнопкой сам уходит, т.к. окно с кнопкой удаляется
const closeErrorMessage = () => {
  errorLoadTemplate.remove();
  //добавляю закрытие по escape всего мод окна
  document.addEventListener('keydown', onDocumentKeyDown);
  document.removeEventListener('keydown', onErrorButtonKeyDown);
  // if (errorOverlay) {
  //   errorOverlay.removeEventListener ('click',closeOverlay);
  // }
  //errorButtonClose.removeEventListener('click', closeErrorMessage);
};

//Функция для закрытия сообщения - ошибки по клику на шторку
function closeErrorOverlay (evt) {
  if (evt.target.classList.contains('error')) {
    closeErrorMessage();
  }
}

function onErrorButtonKeyDown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();//нужен
    closeErrorMessage();
  }
}

//Сообщение ОШИБКА ОТПРАВКИ
export const showErrorMessage = () => {
  document.body.append(errorLoadTemplate);
  const errorButtonClose = document.querySelector('.error__button');
//КУДА ЭТО ВЫНЕСТИ, ЧТОБ НЕ БЫЛО NULL ПРИ ПОИСКЕ errorOverlay
  const errorOverlay = document.querySelector('.error');
  errorOverlay.addEventListener ('click',closeErrorOverlay);
  //удаляю закрытие по escape всего мод окна
  document.removeEventListener('keydown', onDocumentKeyDown);
  errorButtonClose.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onErrorButtonKeyDown);
};

//Отправка формы, если форма проходит валидацию!
form.addEventListener('submit', (evt) => {
  //если не поставить, то форма улетит на сервер
  evt.preventDefault();
  if (
    validate()
  ) {
    blockSubmitBtn();
    const formData = new FormData(evt.target);
    sendData(formData);
  }
});


export {getEffectToPhoto,imgUploadPreview,closeUploadModal,onDocumentKeyDown,showDataErrorMessage};
