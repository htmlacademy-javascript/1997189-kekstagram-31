import {body} from './modal.js';
import {isEscapeKey} from './utils.js';
import{EFFECTS,getChromeStyleFilter,getSepiaStyleFilter,getMarvinStyleFilter,getPhobosStyleFilter,getHeatStyleFilter} from './constants.js';
import {resetScale} from './scale.js';

//красный значок инстаграмма на основном окне
const imgUploadInput = document.querySelector('.img-upload__input');
//модальное окно с фильтрами
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
//большое фото
const imgUploadPreview = document.querySelector('.img-upload__preview img');
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

//сброс фильтра с главной картинки
const resetFilter = () => {
  imgUploadPreview.style.filter = 'none';
};

//Нажатие escape
const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();//нужен
    body.classList.remove('modal-open');
    imgUploadOverlay.classList.add('hidden');
  }
};

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

//Обновление настроек слайдера для каждого эффекта
const updateSlider = (evt) => {
  //const currentInput = evt.target.closest('.effects__item');
  if (evt.target.checked) {
    console.log(evt.target);
    const currentEffect = evt.target.value;
    sliderContainer.noUiSlider.updateOptions(EFFECTS[currentEffect]);//VALUE - CHROME
    sliderContainer.noUiSlider.on('update',() => {
    //запись в спрятанный инпут значение ползунка
      effectLevelInput.value = sliderContainer.noUiSlider.get();
      console.log(effectLevelInput.value);
      getEffectToPhoto(currentEffect,effectLevelInput.value);
    });
  } else {
    sliderContainer.noUiSlider.updateOptions(EFFECTS[0]);// Это сброс до настроек без эффектов. Он здесь нужен?
  }
};

//Закрытие окна. Удаление обработчика escape. Удаление обработчика клика,Удаление посл класса с больш фото. удаление scale
const closeUploadModal = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  resetScale();
  resetFilter();
  //Удаляю слушатель с ul - checkbox
  effectsList.removeEventListener('change', updateSlider);
  document.removeEventListener('keydown', onDocumentKeyDown);
  imgUploadBtnCancel.removeEventListener('click', closeUploadModal);
};

//Открытие мод окна. Добавление обработчика закрытия escape. Добавл обработчика Х
const openUploadModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  imgUploadEffectLevel.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeyDown);
  imgUploadBtnCancel.addEventListener('click', closeUploadModal);
  //Ставлю слушатель на ul effects__list
  effectsList.addEventListener('change', updateSlider);
};

const showFilterModal = (evt) => {
  //evt.preventDefault();
  openUploadModal();
  //imgUploadInput.value = '';// при выборе другой фотографии в дальнейшем
};

//На появление в инпуте файла, показываю модальное окно с котенком
imgUploadInput.addEventListener('change',showFilterModal);

function getEffectToPhoto (effect,value) {
  switch(effect){
    case 'chrome' :
      imgUploadPreview.style.filter = getChromeStyleFilter(value);
      imgUploadEffectLevel.classList.remove('hidden');
      break;
    case 'sepia' :
      imgUploadPreview.style.filter = getSepiaStyleFilter(value);
      imgUploadEffectLevel.classList.remove('hidden');
      break;
    case 'marvin' :
      imgUploadPreview.style.filter = getMarvinStyleFilter(value);
      imgUploadEffectLevel.classList.remove('hidden');
      break;
    case 'phobos' :
      imgUploadPreview.style.filter = getPhobosStyleFilter(value);
      imgUploadEffectLevel.classList.remove('hidden');
      break;
    case 'heat' :
      imgUploadPreview.style.filter = getHeatStyleFilter(value);
      imgUploadEffectLevel.classList.remove('hidden');
      break;
    default:
      imgUploadPreview.style.filter = 'none';
      imgUploadEffectLevel.classList.add('hidden');
  }
}


export {getEffectToPhoto,imgUploadPreview};
