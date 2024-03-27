
// import {body} from './modal.js';
// import {isEscapeKey} from './utils.js';

// import {imgUploadEffectLevel} from './effects.js';


// const imgUploadInput = document.querySelector('.img-upload__input');
// const imgUploadOverlay = document.querySelector('.img-upload__overlay');

// //большое фото
// const imgUploadPreview = document.querySelector('.img-upload__preview img');//большая картинка
// const imgUploadBtnCancel = document.querySelector('.img-upload__cancel');


// //Нажатие escape
// const onDocumentKeyDown = (evt) => {
//   if (isEscapeKey(evt)) {
//     evt.preventDefault();//нужен
//     body.classList.remove('modal-open');
//     imgUploadOverlay.classList.add('hidden');
//   }
// };

// const allEffects = ['effects__preview--none', 'effects__preview--chrome','effects__preview--sepia','effects__preview--marvin','effects__preview--phobos','effects__preview--heat'];


// //Закрытие окна. Удаление обработчика escape. Удаление обработчика клика,Удаление посл класса с больш фото
// const closeUploadModal = () => {
//   imgUploadOverlay.classList.add('hidden');
//   body.classList.remove('modal-open');

//   document.removeEventListener('keydown', onDocumentKeyDown);
//   imgUploadBtnCancel.removeEventListener('click', closeUploadModal);
// };

// //Открытие мод окна. Добавление обработчика закрытия escape. Добавл обработчика Х
// const openUploadModal = () => {
//   imgUploadOverlay.classList.remove('hidden');
//   body.classList.add('modal-open');
//   imgUploadEffectLevel.classList.add('hidden');

//   document.addEventListener('keydown', onDocumentKeyDown);
//   imgUploadBtnCancel.addEventListener('click', closeUploadModal);
// };

// console.log(5);
// //На появление в инпуте файла, показываю модальное окно с котенком
// imgUploadInput.addEventListener('change', (evt) => {
//   openUploadModal();

//   //Находим файл, который подгрузился;
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


//export{allEffects,imgUploadPreview};
