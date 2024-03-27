//КАК ПРАВИЛЬНО ПОДКЛЮЧИТЬ ЭТОТ МОДУЛЬ?

import {allEffects,saveEffectForClose,imgUploadPreview} from './filter-modal.js';
import{scaleInput} from './scale.js'; //Он здесь не нужен, сделан, чтоб подключить соответствующий модуль. Как правильно подключить этот модуль?
const [none,chrome,sepia,marvin,phobos,heat] = allEffects;

//Вешаю фильтр на фотографию. Эффекты эКСПОРТ imgUploadPreview
//Ставлю слушатель на ul effects__list
const effectsList = document.querySelector('.effects__list');

effectsList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('effects__preview')) {
    const searchForClass = (effects) => {

      effects.forEach((effect) => {
        imgUploadPreview.classList.remove(effect);
        if(evt.target.classList.contains(effect)) {
          imgUploadPreview.classList.add(effect);
          saveEffectForClose(effect);
          //saveEffectForLevel(effect);
        }
      });
    };
    searchForClass(allEffects);
  }
}
);

//В ХТМЛ:Подключила библиотеку. Подключила СТИЛИ библиотеки - появился белый ползунок
const sliderContainer = document.querySelector('.effect-level__slider');
//Уровень эффекта записывается в поле
// const effectLevelInput = document.querySelector('.effect-level__value');//ЧИСЛО ДОЛЖНО БЫТЬ
// const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
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
    to:function (value) {
        // if(Number.isInteger(value)) {
        return value;//ПРОВЕРИТЬ для слайдера??? нужно ли
      //}
    },
    from: function (value) {
      return value;//;//получ из слайдера, вернет число без дроби ПРОВЕРЬ НЕОБХОДИМОСТЬ
    }
  }
});
//Добавляю обработчик на слайдер
//Ищу все радиокнопки
const effectRadioInputs = [...document.querySelectorAll('.effects__radio')];
console.log(effectRadioInputs);

// const saveEffectForLevel = (effect) => {
//   // if (effect === none) {
//   //   imgUploadEffectLevel.classList.add('hidden');
//   //   //imgUploadPreview.style.filter = 'none';
//   // } else {
//   //   imgUploadEffectLevel.classList.remove('hidden');
//   // }

//   // switch(effect) {
//   //   case none:
//   //     break;
//   //   case chrome:
//   //     console.log(effect);

//   //     break;

//   //   case sepia:
//   //     console.log(effect);
//   //     break;

//   //   case marvin:
//   //     console.log(effect);
//   //     break;

//   //   case phobos:
//   //     console.log(effect);
//   //     break;

//   //   case heat:
//   //     console.log(effect);
//   //     break;
//   // }

// };


