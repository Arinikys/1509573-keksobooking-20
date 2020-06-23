'use strict';

(function () {
  window.sendForm = function (url, form, map, fieldsets) {
    var successMessage = document.querySelector('#success').content.querySelector('.success');

    var hideSuccessMessageByEsc = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        successMessage.classList.add('hidden');
        document.removeEventListener('keydown', hideSuccessMessageByEsc);
      }
    };

    var hideSuccessMessageByClick = function (evt) {
      evt.preventDefault();
      successMessage.classList.add('hidden');
      document.removeEventListener('click', hideSuccessMessageByClick);
    };

    var onSuccess = function () {
      window.clearForm(form);
      window.lockPage(map, form);
      window.lockFieldsets(fieldsets);
      window.setMainPinEventsListener(map, form, fieldsets);
      form.append(successMessage);
      document.addEventListener('keydown', hideSuccessMessageByEsc);
      document.addEventListener('click', hideSuccessMessageByClick);
    };

    var errorMessage = document.querySelector('#error').content.querySelector('.error');

    var hideErrorMessageByEsc = function (evt) {
      if (evt.key === 'Escape') {
        errorMessage.classList.add('hidden');
        document.removeEventListener('keydown', hideErrorMessageByEsc);
        evt.preventDefault();
      }
    };

    var hideErrorMessageByClick = function (evt) {
      errorMessage.classList.add('hidden');
      document.removeEventListener('click', hideErrorMessageByClick);
      evt.preventDefault();
    };

    var onError = function () {
      var main = document.querySelector('main');
      main.append(errorMessage);
      var errorBtn = document.querySelector('.error__button');
      errorBtn.addEventListener('click', function () {
        errorMessage.classList.add('hidden');
      });
      document.addEventListener('keydown', hideErrorMessageByEsc);
      document.addEventListener('click', hideErrorMessageByClick);
    };

    var submitHandler = function (evt) {
      window.upload(url, new FormData(form), onSuccess, onError);
      evt.preventDefault();
    };

    form.addEventListener('submit', submitHandler);
  };
})();
