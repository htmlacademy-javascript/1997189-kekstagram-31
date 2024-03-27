import {body} from './modal.js';
import {isEscapeKey} from './utils.js';
import{EFFECTS,getChromeStyleFilter,getSepiaStyleFilter,getMarvinStyleFilter,getPhobosStyleFilter,getHeatStyleFilter} from './constants.js';


const imgUploadInput = document.querySelector('.img-upload__input');//красный значок инстаграмма на основном окне
const imgUploadOverlay = document.querySelector('.img-upload__overlay');//модальное окно с фильтрами

//большое фото
const imgUploadPreview = document.querySelector('.img-upload__preview img');//большая картинка
const imgUploadBtnCancel = document.querySelector('.img-upload__cancel');// кнопка закрытия модального окна с фильтрами
const effectsList = document.querySelector('.effects__list');//ul,в котором радио-кнопки превью - фильтры
const effectLevelInput = document.querySelector('.effect-level__value');//инпут слайдера под ползунком

const sliderContainer = document.querySelector('.effect-level__slider');//контейнер, в котором лежит слайдер

const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');//поле Изменения глубины эффекта, накладываемого на изображение


//Нажатие escape
const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();//нужен
    body.classList.remove('modal-open');
    imgUploadOverlay.classList.add('hidden');
  }
};

//Закрытие окна. Удаление обработчика escape. Удаление обработчика клика,Удаление посл класса с больш фото
const closeUploadModal = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeyDown);
  imgUploadBtnCancel.removeEventListener('click', closeUploadModal);
};

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
    to: (value) => value,
    from: (value) => parseFloat(value).toFixed(0),
  },
});

//Открытие мод окна. Добавление обработчика закрытия escape. Добавл обработчика Х
const openUploadModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  imgUploadEffectLevel.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeyDown);
  imgUploadBtnCancel.addEventListener('click', closeUploadModal);
};

//На появление в инпуте файла, показываю модальное окно с котенком
imgUploadInput.addEventListener('change', (evt) => {
  openUploadModal();
  //imgUploadInput.value = '';
});

//дефолтное значение спрятанного инпута
effectLevelInput.value = 100;


//Ставлю слушатель на ul effects__list
effectsList.addEventListener('change', (evt) => {
  //const currentInput = evt.target.closest('.effects__item');
  if (evt.target.checked) {
    const currentEffect = evt.target.value;
    sliderContainer.noUiSlider.updateOptions(EFFECTS[currentEffect]);//VALUE - CHROME
    sliderContainer.noUiSlider.on('update',() => {
    //запись в спрятанный инпут значение ползунка
      effectLevelInput.value = sliderContainer.noUiSlider.get();
      getEffectToPhoto(currentEffect,effectLevelInput.value);
    });
  }
});

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
