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
  const hashtagArr = [...hashtagElement.trim().split(' ')];
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

//ГДЕ ВЫЗЫВАЕМ???
// validation(
//   hashtagInput,
//   commentTextarea
// );

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
//     validate(formForValidation, hashtagInput, commentTextarea)
//   ) {
//     formForValidation.submit();
//   }
// });


// КУДА СТАВИМ И ПОЧЕМУ?
export const pristineReset = () => pristine.reset();




/**const validation = (
  hashtagElem,
  commentElem
) => {
  let message = '';
  const getErrorMessage = () => message;
  //функция для валидации хэштегов
  const validateHashtags = (hashtagElement) => {
    const hashtagArr = [...hashtagElement.trim().split(' ')];
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

  return pristine.validate();
};

//ГДЕ ВЫЗЫВАЕМ???
validation(
  hashtagInput,
  commentTextarea
);

//Обработка ESC  - чтоб не улетало автоматически
commentTextarea.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
});

//Отправка формы на валидацию

formForValidation.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (
    validation(formForValidation, hashtagInput, commentTextarea)
  ) {
    formForValidation.submit();
  }
});


// КУДА СТАВИМ И ПОЧЕМУ?
pristine.reset();

 */

 //Cравнение хэштэгов на уникальность
  // const compareHashtags = (array) => {
  //   const uniqueArr = [...new Set(array)];
  //   //return array.length === uniqueArr.length;//Если длины равны, то хэштэги уникальны - true
  //   if (array.length === uniqueArr.length) {
  //     checkAllHashtags(uniqueArr);//Передаю далее ОНИ ВСЕ УНИКАЛЬНЫЕ
  //     return true;
  //   }
  //   message = errorMessage.hashtag.NOT_UNIQUE_HASHTAG;
  //   return false;// ОШИБКА = НЕ УНИКАЛЬНЫЕ ХЭШТЭГИ checkAllHashtags(uniqueArr);
 // };

// uploadFormElement.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   if (
//     validation(uploadFormElement, hashtagsValueElement, commentValueElement)
//   ) {
//     uploadFormElement.submit();
//   }
// });


 // //добавляю в массив
  // addHashtagToArray(hashtagValue);

  // //Проверяю один хэштэг при помощи РЕГУЛЯРНОГО ВЫРАЖЕНИЯ
  // const checkOneHashtag = (value) => {
  //   const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  //   const isValid = hashtag.test(value);
  //   if (isValid) {
  //     return isValid;
  //   }
  //   message = errorMessage.hashtag.INVALID_HASHTAG;
  //   return false;
  // };

  // //Проверяю ВСЕ хэштэги при помощи регулярного выражения
  // const checkAllHashtags = (arrOfHashtags) => {
  //   arrOfHashtags.forEach ((element) => {
  //     checkOneHashtag(element);
  //   });
  // };

  // //Cравнение хэштэгов на уникальность
  // const compareHashtags = (array) => {
  //   const uniqueArr = [...new Set(array)];
  //   //return array.length === uniqueArr.length;//Если длины равны, то хэштэги уникальны - true
  //   if (array.length === uniqueArr.length) {
  //     checkAllHashtags(uniqueArr);//Передаю далее ОНИ ВСЕ УНИКАЛЬНЫЕ
  //     return true;
  //   }
  //   message = errorMessage.hashtag.NOT_UNIQUE_HASHTAG;
  //   return false;// ОШИБКА = НЕ УНИКАЛЬНЫЕ ХЭШТЭГИ checkAllHashtags(uniqueArr);
  // };

  // //Добавила хэштэги в массив
  // function addHashtagToArray (value) {
  //   const hashtagArr = [...value.trim().split(' ')];
  //   //hashtagArr.length = (hashtagArr.length) > 5 ? hashtagArr.length = 5 : hashtagArr.length;
  //   if(hashtagArr.length > 5) {
  //     message = errorMessage.hashtag.INCORRECT_QUANTITY;
  //     return false;//ошибка - превышено КОЛИЧЕСТВО ХЭШТЭГОВ
  //   }
  //   compareHashtags (hashtagArr);//вызываю функцию сравнения хэштегов
  //   return true;
  // }

// //Cтавлю слушатель на инпут. Сохраняю input.value
// hashtagInput.addEventListener('change', (evt) => {
//   const hashtagValue = hashtagInput.value;
//   //addHashtagToArray(hashtagValue);
//   validation(hashtagValue);
// });

//Cтавлю слушатель на инпут. Сохраняю input.value
// hashtagInput.addEventListener('change', (evt) => {
//   const hashtagValue = hashtagInput.value;
//   addHashtagToArray(hashtagValue);
// });

//Валидация textarea
// const validateTextarea = (commentText) => {
//   if (commentText.length > MAX_COMMENT_LENGTH) {
//     message = ErrorMessage.Comment.BIG_COMMENT_LENGTH;
//     return false;
//   }
//   return true;
// };


//pristine.addValidator(hashtagInput,checkAllHashtags,'Ошибка');


// //Добавляю обработчик события НА ФОРМУ
// formForValidation.addEventListener('submit',(evt) => {
//   //Отменяю отправку по умолчанию, чтоб не перезагр-сь страница
//   evt.preventDefault();
//   //Проверяем валидна ли ФОРМА
//   pristine.validate();
// });

//const isValid = pristine.validate();
  //ПОСМОТРЕТЬ ЧТО ПОДСТАВИТЬ ДЛЯ КЕКСОГРАММА
  // if(isValid) {
  //   console.log('ок');
  // } else {
  //   console.log('Форма не валидна');
  // }

  /*const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;

const errorMessage = {
  hashtag: {
    INVALID_HASHTAG: 'введён невалидный хэштег',
    BIG_QUANTITY: 'превышено количество хэштегов',
    REPEAT_HASHTAG: 'хэштеги повторяются',
  },
  comment: {
    BIG_COMMENT_LENGTH:`длина комментария больше ${MAX_COMMENT_LENGTH} символов`,
  }
}

//Ищу форму для валидации
const formForValidation = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');

//Проверяю один хэштэг при помощи РЕГУЛЯРНОГО ВЫРАЖЕНИЯ
const checkOneHashtag = (value) => {
  const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  const isValid = hashtag.test(value);
  //console.log(hashtag.test(value));
  //addHashtag(value);
  return isValid;
};

//Проверяю ВСЕ хэштэги при помощи регулярного выражения
const checkAllHashtags = (arrOfHashtags) => {
  console.log(Array.isArray(arrOfHashtags));
  arrOfHashtags.forEach ((element) => {
    checkOneHashtag(element);
    console.log(checkOneHashtag(element));
  });
};

//Cравнение хэштэгов на уникальность
const compareHashtags = (array) => {
  const uniqueArr = [...new Set(array)];
  //return array.length === uniqueArr.length;//Если длины равны, то хэштэги уникальны - true
  if (array.length !== uniqueArr.length) {
    checkAllHashtags(uniqueArr);//Передаю далее только уникальные хэштеги
  }
  checkAllHashtags(uniqueArr);
};

//Добавила хэштэги в массив
const addHashtagToArray = (value) => {
  const hashtagArr = [...value.trim().split(' ')];
  hashtagArr.length = (hashtagArr.length) > 5 ? hashtagArr.length = 5 : hashtagArr.length;
  compareHashtags (hashtagArr);//вызываю функцию сравнения хэштегов
};
//Cтавлю слушатель на инпут. Сохраняю input.value
hashtagInput.addEventListener('change', (evt) => {
  const hashtagValue = hashtagInput.value;
  addHashtagToArray(hashtagValue);
});

//Валидация textarea
// const validateTextarea = (commentText) => {
//   if (commentText.length > MAX_COMMENT_LENGTH) {
//     message = ErrorMessage.Comment.BIG_COMMENT_LENGTH;
//     return false;
//   }
//   return true;
// };

//Отдаю форму Pristine
const pristine = new Pristine(formForValidation,{
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  //errorTextClass: 'text-error',
});

const hashtagErrorMessage = (value) => {

}


pristine.addValidator(hashtagInput,checkOneHashtag,'Ошибка');


//Добавляю обработчик события НА ФОРМУ
formForValidation.addEventListener('submit',(evt) => {
  //Отменяю отправку по умолчанию, чтоб не перезагр-сь страница
  evt.preventDefault();
  //Проверяем валидна ли ФОРМА
  pristine.validate();
});

//const isValid = pristine.validate();
  //ПОСМОТРЕТЬ ЧТО ПОДСТАВИТЬ ДЛЯ КЕКСОГРАММА
  // if(isValid) {
  //   console.log('ок');
  // } else {
  //   console.log('Форма не валидна');
  // }
*/






// const validation = (
//   hashTagElement,
//   commentElement) => {
//   let errorMessage = '';
//   const getErrorMessage = () => errorMessage;
//   const validateHashtags = () => {
//   }

// }
