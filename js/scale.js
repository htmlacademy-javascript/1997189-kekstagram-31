import{imgUploadPreview} from './filter-modal.js';
//ПОЧЕМУ НЕ ПОДКЛЮЧАЕТСЯ ЭТОТ МОДУЛЬ, КАК ПРАВИЛЬНО ЕГО ПОДКЛЮЧИТЬ, ЕСЛИ ИЗ НЕГО НИЧЕГО НЕ НАДО ЭКСПОРТИРОВАТЬ?
//уменьшение размера фотографии
const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');

//- 100% +
//значение по умолчанию в процентах Нужно , если в верстке value стоит уже 100%?

//сброс scale
const resetScale = () => {
  scaleInput.value = `${100}%`;
  imgUploadPreview.style.transform = 'none';
};

scaleSmallerBtn.addEventListener('click', (evt) => {
  if(parseInt(scaleInput.value,10) > 0) {
    scaleInput.value = `${parseInt(scaleInput.value,10) - 25}%`;
    const resultForScale = `${(parseInt(scaleInput.value,10) / 100)}`;
    imgUploadPreview.style.transform = `scale(${resultForScale})`;
  }
});

scaleBiggerBtn.addEventListener('click', (evt) => {
  if(parseInt(scaleInput.value,10) < 100) {
    scaleInput.value = `${parseInt(scaleInput.value,10) + 25}%`;
    const resultForScale = `${(parseInt(scaleInput.value,10) / 100)}`;
    imgUploadPreview.style.transform = `scale(${resultForScale})`;
  }
});

export {resetScale};
