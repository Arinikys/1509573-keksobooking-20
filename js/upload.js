'use strict';

(function () {
  window.upload = function (url, method, onSuccess, onError, data) {
    var SUCCESS_STATUS_CODE = 200;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open(method, url);
    xhr.send(data);
  };
})();
