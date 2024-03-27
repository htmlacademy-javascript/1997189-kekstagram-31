import {createArraysOfPhotos} from './data.js';
import {renderPhotos} from './renderThumbnails.js';


const data = createArraysOfPhotos();
renderPhotos(data);

import {closeSliderByClick} from './effects.js';

// import{EFFECTS,getChromeStyleFilter,getSepiaStyleFilter,getMarvinStyleFilter,getPhobosStyleFilter,getHeatStyleFilter} from './constants.js';
// import {allEffects,saveEffectForClose,imgUploadPreview} from './filter-modal.js';
// import{scaleInput} from './scale.js'; //Он здесь не нужен, сделан, чтоб подключить соответствующий модуль. Как правильно подключить этот модуль?
// const [none,chrome,sepia,marvin,phobos,heat] = allEffects;

// //Вешаю фильтр на фотографию. Эффекты эКСПОРТ imgUploadPreview
// //Ставлю слушатель на ul effects__list
// const effectsList = document.querySelector('.effects__list');
// const effectLevelInput = document.querySelector('.effect-level__value');//ЧИСЛО ДОЛЖНО БЫТЬ

// effectsList.addEventListener('click', (evt) => {
//   if (evt.target.classList.contains('effects__preview')) {
//     const searchForClass = (effects) => {

//       effects.forEach((effect) => {
//         imgUploadPreview.classList.remove(effect);
//         if(evt.target.classList.contains(effect)) {
//           imgUploadPreview.classList.add(effect);
//           saveEffectForClose(effect);
//           saveEffectForLevel(effect);//вытаскивает спан, т.к. на нем класс хром ит.д
//         }
//       });
//     };
//     searchForClass(allEffects);
//   }
// }
// );

// //В ХТМЛ:Подключила библиотеку. Подключила СТИЛИ библиотеки - появился белый ползунок
// const sliderContainer = document.querySelector('.effect-level__slider');
// //дефолтное значение спрятанного инпута
// effectLevelInput.value = 100;

// const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
// //Создала первичные настройки для слайдера
// noUiSlider.create(sliderContainer, {
//   start: 100,
//   step: 1,
//   connect: 'lower',
//   range: {
//     min: 0,
//     max: 100,
//   },
//   format: {
//     to: (value) => value,
//     from: (value) => parseFloat(value).toFixed(0),
//   },
// });

// //Ищу все радиокнопки
// const effectRadioInputs = [...document.querySelectorAll('.effects__radio')];
// //По Клику на чекбокс возникает change, добавляю параметры конкретного фильтра
// effectRadioInputs.forEach((radioBtn)=> {
//   radioBtn.addEventListener('change',(evt) => {
//     if(evt.target.checked) {
//       const currentEffect = evt.target.value;
//       //изменяем настройки для конкретного фильтра {range,start и т д}
//     sliderContainer.noUiSlider.updateOptions(EFFECTS[currentEffect]);//VALUE - CHROME
//     console.log(currentEffect)
//     //getStyleToPhoto(currentEffect);
//    // selectEffect(currentEffect);
//    //Ставим слушатель обновления события на слайдер
//       sliderContainer.noUiSlider.on('update',() => {
//   //запись в спрятанный инпут значение ползунка
//         effectLevelInput.value = sliderContainer.noUiSlider.get();
//         console.log(effectLevelInput.value);
//         switch(currentEffect){
//           case 'chrome' :
//       imgUploadPreview.style.filter = getChromeStyleFilter(effectLevelInput.value);
//       break;
//       case 'sepia' :
//         imgUploadPreview.style.filter = getSepiaStyleFilter(effectLevelInput.value);
//         break;
//         case 'marvin' :
//           imgUploadPreview.style.filter = getMarvinStyleFilter(effectLevelInput.value);
//           break;
//           case 'phobos' :
//             imgUploadPreview.style.filter = getPhobosStyleFilter(effectLevelInput.value);
//             break;
//             case 'heat' :
//             imgUploadPreview.style.filter = getHeatStyleFilter(effectLevelInput.value);
//             break;
//             default:
//               imgUploadPreview.style.filter = 'none';
//               }
//         });
//     }
//   });
// });


// const saveEffectForLevel = (effect) => {
//   if (effect === none) {
//     imgUploadEffectLevel.classList.add('hidden');
//     //imgUploadPreview.style.filter = 'none';
//   } else {
//     imgUploadEffectLevel.classList.remove('hidden');
//   }
// };
///////////////////////////////////////////////////

//export {imgUploadEffectLevel};

// const saveEffectForLevel = (effect) => {
//   if (effect === none) {
//     imgUploadEffectLevel.classList.add('hidden');
//     //imgUploadPreview.style.filter = 'none';
//   } else {
//     imgUploadEffectLevel.classList.remove('hidden');
//   }
// };

// import {body} from './modal.js';
// import {isEscapeKey} from './utils.js';

// const imgUploadInput = document.querySelector('.img-upload__input');
// const imgUploadOverlay = document.querySelector('.img-upload__overlay');

// //большое фото
// const imgUploadPreview = document.querySelector('.img-upload__preview img');
// const imgUploadBtnCancel = document.querySelector('.img-upload__cancel');

// const previewCollection = [...document.querySelectorAll('.effects__preview')];

// //Нажатие escape
// const onDocumentKeyDown = (evt) => {
//   if (isEscapeKey(evt)) {
//     evt.preventDefault();//нужен
//     body.classList.remove('modal-open');
//     imgUploadOverlay.classList.add('hidden');
//   }
// };

// const allEffects = ['effects__preview--none', 'effects__preview--chrome','effects__preview--sepia','effects__preview--marvin','effects__preview--phobos','effects__preview--heat'];

// const [none,chrome,sepia,marvin,phobos,heat] = allEffects;
// let effectForClose = '';
// const saveEffectForClose = (effect) => {
//   effectForClose = effect;
// };

// //Закрытие окна. Удаление обработчика escape. Удаление обработчика клика,Удаление посл класса с больш фото
// const closeUploadModal = () => {
//   imgUploadOverlay.classList.add('hidden');
//   body.classList.remove('modal-open');
//   //по умолчанию класс 'effects__preview--none'
//   imgUploadPreview.classList.remove(effectForClose);
//   imgUploadPreview.classList.add(none);

//   document.removeEventListener('keydown', onDocumentKeyDown);
//   imgUploadBtnCancel.removeEventListener('click', closeUploadModal);
// };

// //Открытие мод окна. Добавление обработчика закрытия escape. Добавл обработчика Х
// const openUploadModal = () => {
//   imgUploadOverlay.classList.remove('hidden');
//   body.classList.add('modal-open');

//   document.addEventListener('keydown', onDocumentKeyDown);
//   imgUploadBtnCancel.addEventListener('click', closeUploadModal);
// };

// //На появление в инпуте файла, показываю модальное окно с котенком
// imgUploadInput.addEventListener('change', (evt) => {
//   openUploadModal();

//   // //Находим файл, который подгрузился;
//   // const file = evt.target.files[0];
//   // //позв читать файлы, хранящиеся на компьютере пользователя
//   // const reader = new FileReader();
//   // reader.addEventListener('load', (evt) => {
//   //   imgUploadPreview.src = evt.target.result;
//   //   previewCollection.map((smallPreview) => {
//   //     smallPreview.style.backgroundImage = `url(${imgUploadPreview.src})`;
//   //   });
//   // });
//   // reader.readAsDataURL(file);
//   // //обнуляем значение, чтоб в след раз записывался файл по change
//   imgUploadInput.value = '';
// });


// //уменьшение размера фотографии
// const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
// const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
// const scaleInput = document.querySelector('.scale__control--value');

// //- 100% +
// //значение по умолчанию в процентах Нужно , если в верстке value стоит уже 100%?
// scaleInput.value = `${100}%`;

// scaleSmallerBtn.addEventListener('click', (evt) => {
//   if(parseInt(scaleInput.value,10) > 0) {
//     scaleInput.value = `${parseInt(scaleInput.value,10) - 25}%`;
//     const resultForScale = `${(parseInt(scaleInput.value,10) / 100)}`;
//     imgUploadPreview.style.transform = `scale(${resultForScale})`;
//   }
// });

// scaleBiggerBtn.addEventListener('click', (evt) => {
//   if(parseInt(scaleInput.value,10) < 100) {
//     scaleInput.value = `${parseInt(scaleInput.value,10) + 25}%`;
//     const resultForScale = `${(parseInt(scaleInput.value,10) / 100)}`;
//     imgUploadPreview.style.transform = `scale(${resultForScale})`;
//   }
// });

// function selectEffect (currentEffect) {
//   switch(currentEffect) {
//     case none:
//       break;
//     case chrome:
//       console.log(currentEffect);
//       imgUploadPreview.style.filter = `grayscale(${effectLevelInput.value})`;
//       console.log(effectLevelInput.value);
//       break;

//     case sepia:
//       console.log(currentEffect);
//       imgUploadPreview.style.filter = `sepia(${effectLevelInput.value})`;
//       break;

//     case marvin:
//       console.log(currentEffect);
//       imgUploadPreview.style.filter = `invert(${effectLevelInput.value}%)`;
//       break;

//     case phobos:
//       console.log(currentEffect);
//       imgUploadPreview.style.filter = `blur(${effectLevelInput.value}px)`;
//       break;

//     case heat:
//       console.log(currentEffect);
//       imgUploadPreview.style.filter = `blur(${effectLevelInput.value})`;
//       break;
//   }
// }

// //Ставим слушатель обновления события на слайдер
// sliderContainer.noUiSlider.on('update',() => {
//   //запись в спрятанный инпут значение ползунка
//   effectLevelInput.value = sliderContainer.noUiSlider.get();
//   console.log(effectLevelInput.value);

// });
