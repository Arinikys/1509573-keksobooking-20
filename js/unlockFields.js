'use strict';
(function () {
  window.unlockFieldsets = function (fieldsetsList) {
    for (var i = 0; i < fieldsetsList.length; i++) {
      fieldsetsList[i].disabled = false;
    }
  };
})();
