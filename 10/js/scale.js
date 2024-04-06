import { imgUploadPreview } from './filter-modal.js';

//уменьшение размера фотографии
const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');

//- 100% +
//сброс scale
const resetScale = () => {
  scaleInput.value = `${100}%`;
  imgUploadPreview.style.transform = 'none';
};

const renderScale = (value) => {
  scaleInput.value = `${parseInt(value, 10)}%`;
  const resultForScale = `${(parseInt(value, 10) / 100)}`;
  imgUploadPreview.style.transform = `scale(${resultForScale})`;
}

scaleSmallerBtn.addEventListener('click', () => {
  const value = parseInt(scaleInput.value, 10);
  const newValue = (value > 25) ? value - 25 : value;
  renderScale(newValue);
});

scaleBiggerBtn.addEventListener('click', () => {
  const value = parseInt(scaleInput.value, 10);
  const newValue = (value < 100) ? value + 25 : value;
  renderScale(newValue);
});

export { resetScale };
