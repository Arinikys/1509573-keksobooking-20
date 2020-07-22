'use strict';
(function () {
  window.clearForm = function (form) {
    var FILE_PREV_PLACEHOLDER = 'img/muffin-grey.svg';
    var filePrev = form.querySelectorAll('.js-file-prev');
    var priceInput = document.querySelector('#price');
    for (var i = 0; i < filePrev.length; i++) {
      filePrev[i].src = FILE_PREV_PLACEHOLDER;
    }
    form.reset();
    priceInput.placeholder = priceInput.dataset.defaultPlaceholder;
  };
})();
