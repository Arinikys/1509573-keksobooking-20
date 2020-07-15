'use strict';
(function () {
  window.lockFieldsets = function (fieldsetsList) {
    for (var i = 0; i < fieldsetsList.length; i++) {
      fieldsetsList[i].disabled = true;
    }
  };
})();
