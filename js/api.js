import {showDataErrorMessage,showSuccessMessage,showErrorMessage,unBlockSubmitBtn,closeUploadModal} from './filter-modal.js';
import {BASE_URL,ROUTE, errorText} from './constants.js';

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
    })
    .catch(() => {
      showDataErrorMessage();
      throw new Error(errorText.GET_DATA);
    });
};

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
