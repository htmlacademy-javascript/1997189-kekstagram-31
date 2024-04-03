import{isEscapeKey} from './utils.js';

//Ищу форму для валидации
const formForValidation = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentTextarea = document.querySelector('.text__description');

const MAX_COMMENT_LENGTH = 140;

const errorMessage = {
  hashtag: {
    INVALID_HASHTAG: 'введён невалидный хэштег',
    INCORRECT_QUANTITY: 'превышено количество хэштегов',
    NOT_UNIQUE_HASHTAG: 'хэштеги повторяются',
  },
  comment: {
    MAX_COMMENT_LENGTH:`длина комментария больше ${MAX_COMMENT_LENGTH} символов`,
  }
};

//Отдаю форму Pristine
const pristine = new Pristine(
  formForValidation,
  {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
  });

//общая функция для валиадции хэштэгов и комментов - validation
//в validation передаю найденные поля инпут и текстэриа

let message = '';
const getErrorMessage = () => message;
//функция для валидации хэштегов
const validateHashtags = (hashtagElement) => {
  const hashtagArr = [...hashtagElement.replace(/\s+/g,' ').trim().split(' ')];
  //console.log(hashtagElement.trim().split(' '))
  const hashtagReg = /^#[a-zа-яё0-9]{1,19}$/i;
  const uniqueArr = [...new Set(hashtagArr)];

  if(!hashtagElement) {
    return true;
  } else {
     if(hashtagArr.length > 5) {
      message = errorMessage.hashtag.INCORRECT_QUANTITY;
      return false;
    }
    if(hashtagArr.length !== uniqueArr.length) {
      message = errorMessage.hashtag.NOT_UNIQUE_HASHTAG;
      return false;
    }
    if(!hashtagArr.every((elem) => hashtagReg.test(elem))) {
      message = errorMessage.hashtag.INVALID_HASHTAG;
      return false;
    }
    return true;
  }
};
  //функция для валидации комментов
const validateComment = (comment) => {
  if (comment.length > MAX_COMMENT_LENGTH) {
    message = errorMessage.comment.MAX_COMMENT_LENGTH;//ЗАЧЕМ ЕСЛИ МОЖНО ПОСТАВИТЬ  maxlength="140"
    return false;
  }
  return true;
};

pristine.addValidator(
  hashtagInput,
  validateHashtags,
  getErrorMessage
);

pristine.addValidator(
  commentTextarea,
  validateComment,
  getErrorMessage
);

pristine.validate();

//Обработка ESC  - чтоб не улетало автоматически
commentTextarea.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
});

//Отправка формы на валидацию

// formForValidation.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   if (
//     pristine.validate()
//   ) {
//     formForValidation.submit();
//   }
// });


// КУДА СТАВИМ И ПОЧЕМУ?
export const pristineReset = () => pristine.reset();
export const validate = () => pristine.validate();
