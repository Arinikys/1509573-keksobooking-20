'use strict';

(function () {
  window.request = function (url, onSuccess) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      }
    });
    xhr.open('GET', url);
    xhr.send();
  };
})();
