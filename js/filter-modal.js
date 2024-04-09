import {body} from './modal.js';
import {isEscapeKey} from './utils.js';
import{Effects,ImgEffects} from './constants.js';
import {resetScale} from './scale.js';
import{pristineReset,validate} from './validation.js';
import {sendData} from './api.js';

const ALERT_SHOW_TIME = 5000;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successTemplate.cloneNode(true);
const submitBtn = document.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const thumbnails = [...document.querySelectorAll('.effects__preview')];
const imgUploadBtnCancel = document.querySelector('.img-upload__cancel');
const effectsList = document.querySelector('.effects__list');
const effectLevelInput = document.querySelector('.effect-level__value');

const sliderContainer = document.querySelector('.effect-level__slider');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const form = document.querySelector('.img-upload__form');
const errorLoadTemplate = document.querySelector('#error').content.querySelector('.error');

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const errorMessage = dataErrorTemplate.cloneNode(true);

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const resetFilter = () => {
  imgUploadPreview.style.filter = 'none';
};

const updateSlider = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    const currentEffect = evt.target.value;
    sliderContainer.noUiSlider.updateOptions(Effects[currentEffect]);
  }
};

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    closeUploadModal ();
  }
};

function closeUploadModal () {
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  resetScale();
  resetFilter();
  pristineReset();
  form.reset();
  effectsList.removeEventListener('change', updateSlider);
  document.removeEventListener('keydown', onDocumentKeyDown);
  imgUploadBtnCancel.removeEventListener('click', closeUploadModal);
}

effectLevelInput.value = 100;

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
  effectLevelInput.value = sliderContainer.noUiSlider.get();
  const currentEffect = document.querySelector('.effects__radio:checked');
  getEffectToPhoto(currentEffect.value, effectLevelInput.value);
});

const openUploadModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  imgUploadEffectLevel.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeyDown);
  imgUploadBtnCancel.addEventListener('click', closeUploadModal);
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

imgUploadInput.addEventListener('change',showFilterModal);

function getEffectToPhoto (effect,value) {
  imgUploadPreview.style.filter = ImgEffects[effect](value);
  if(effect === 'none') {
    imgUploadEffectLevel.classList.add('hidden');
  } else {
    imgUploadEffectLevel.classList.remove('hidden');
  }
}

export const blockSubmitBtn = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = SubmitButtonText.SENDING;
};

export const unBlockSubmitBtn = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = SubmitButtonText.IDLE;
};

const showDataErrorMessage = () => {
  document.body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  },ALERT_SHOW_TIME);
};

const onSuccessButtonKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

export const showSuccessMessage = () => {
  document.body.append(successMessage);
  const successOverlay = document.querySelector('.success');
  successOverlay.addEventListener ('click',closeSuccessOverlay);
  const successButton = successMessage.querySelector('.success__button');
  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onSuccessButtonKeyDown);
};

function closeSuccessMessage() {
  successMessage.remove();
  document.removeEventListener('keydown', onSuccessButtonKeyDown);
}

function closeSuccessOverlay (evt) {
  if (evt.target.classList.contains('success')) {
    closeSuccessMessage();
  }
}

const closeErrorMessage = () => {
  errorLoadTemplate.remove();
  document.addEventListener('keydown', onDocumentKeyDown);
  document.removeEventListener('keydown', onErrorButtonKeyDown);
};

function closeErrorOverlay (evt) {
  if (evt.target.classList.contains('error')) {
    closeErrorMessage();
  }
}

function onErrorButtonKeyDown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
}

export const showErrorMessage = () => {
  document.body.append(errorLoadTemplate);
  const errorButtonClose = document.querySelector('.error__button');
  const errorOverlay = document.querySelector('.error');
  errorOverlay.addEventListener ('click',closeErrorOverlay);
  //удаляю закрытие по escape всего мод окна
  document.removeEventListener('keydown', onDocumentKeyDown);
  errorButtonClose.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onErrorButtonKeyDown);
};

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


export {
  getEffectToPhoto,
  imgUploadPreview,
  closeUploadModal,
  onDocumentKeyDown,
  showDataErrorMessage
};
