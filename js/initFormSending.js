'use strict';

(function () {
  var DEFAULT_ADDRESS = '603 455';
  var PIN_LEFT_POS_VAL = '570px';
  var PIN_TOP_POS_VAL = '375px';

  window.initFormSending = function (url, form, map, fieldsets) {
    var filterForm = document.querySelector('.map__filters');
    var successMessage = document.querySelector('#success').content.querySelector('.success');

    var hideSuccessMessageByEsc = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        successMessage.classList.add('hidden');
        document.removeEventListener('keydown', hideSuccessMessageByEsc);
        document.removeEventListener('click', hideSuccessMessageByClick);
      }
    };

    var hideSuccessMessageByClick = function (evt) {
      evt.preventDefault();
      successMessage.classList.add('hidden');
      document.removeEventListener('click', hideSuccessMessageByClick);
      document.removeEventListener('keydown', hideSuccessMessageByEsc);
    };

    var onSuccess = function () {
      window.clearForm(form);
      filterForm.reset();
      var pin = window.document.querySelector('.map__pin');
      pin.style.left = PIN_LEFT_POS_VAL;
      pin.style.top = PIN_TOP_POS_VAL;
      setTimeout(() => {
        document.getElementsByName('address')[0].value = DEFAULT_ADDRESS;
      }, 0);
      window.lockPage(map, form);
      window.lockFieldsets(fieldsets);
      window.setMainPinEventsListener(map, form, fieldsets);
      form.append(successMessage);
      successMessage.classList.remove('hidden');
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
      errorMessage.classList.remove('hidden');
      var errorBtn = document.querySelector('.error__button');
      errorBtn.addEventListener('click', function () {
        errorMessage.classList.add('hidden');
      });
      document.addEventListener('keydown', hideErrorMessageByEsc);
      document.addEventListener('click', hideErrorMessageByClick);
    };

    var submitHandler = function (evt) {
      window.upload(url, 'POST', onSuccess, onError, new FormData(form));
      evt.preventDefault();
    };

    form.addEventListener('submit', submitHandler);
  };
})();
