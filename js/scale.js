import { imgUploadPreview } from './filter-modal.js';


const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const MAX_SCALE_VALUE = 100;
const SCALE_STEP = 25;

const resetScale = () => {
  scaleInput.value = `${MAX_SCALE_VALUE}%`;
  imgUploadPreview.style.transform = 'none';
};

const renderScale = (value) => {
  scaleInput.value = `${parseInt(value, 10)}%`;
  const resultForScale = `${(parseInt(value, 10) / 100)}`;
  imgUploadPreview.style.transform = `scale(${resultForScale})`;
};

scaleSmallerBtn.addEventListener('click', () => {
  const value = parseInt(scaleInput.value, 10);
  const newValue = (value > SCALE_STEP) ? value - SCALE_STEP : value;
  renderScale(newValue);
});

scaleBiggerBtn.addEventListener('click', () => {
  const value = parseInt(scaleInput.value, 10);
  const newValue = (value < MAX_SCALE_VALUE) ? value + SCALE_STEP : value;
  renderScale(newValue);
});

export { resetScale };
