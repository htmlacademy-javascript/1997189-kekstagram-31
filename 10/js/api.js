import {showDataErrorMessage,showSuccessMessage,showErrorMessage,unBlockSubmitBtn,closeUploadModal} from './filter-modal.js';
import {BASE_URL,ROUTE, errorText} from './constants.js';
import {showImgFilters} from './filter.js';
import {MAX_RANDOM_PHOTO_COUNT,handleRandomButton} from './filter.js';

const getData = (onSuccess) => {
  fetch(`${BASE_URL}${ROUTE.GET_DATA}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(errorText.GET_DATA);
      }
      return response.json();
    })
    .then((photos) => {
      onSuccess(photos);
      //ПОКАЗЫВАЮ ФИЛЬТР НА ГЛАВНОЙ СТРАНИЦЕ
      showImgFilters();
      handleRandomButton(photos, MAX_RANDOM_PHOTO_COUNT); // Отрисовка рандомных изображений до выбранного значения
    })
    .catch(() => {
      showDataErrorMessage();
      throw new Error(errorText.GET_DATA);
    });
};
/*const getData = (onSuccess) => {
  fetch(`${BASE_URL}${ROUTE.GET_DATA}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(errorText.GET_DATA);
      }
      return response.json();
    })
    .then((photos) => {
      onSuccess(photos);
      //ПОКАЗЫВАЮ ФИЛЬТР НА ГЛАВНОЙ СТРАНИЦЕ
      showImgFilters();
    })
    .catch(() => {
      showDataErrorMessage();
      throw new Error(errorText.GET_DATA);
    });
};
 */
const sendData = (body) => {
  fetch(BASE_URL,
    {
      method: 'POST',
      body
    }
  ).then((response) => {
    if (response.ok) {
      closeUploadModal();
      showSuccessMessage();
    } else {
      showErrorMessage();
      throw new Error(errorText.SEND_DATA);
    }
  })
    .catch((err) => {
      showErrorMessage(err.message);
      throw new Error(errorText.SEND_DATA);
    })
    .finally(() => {
      unBlockSubmitBtn();
    });
};

export {getData, sendData};
