'use strict';
(function () {

  window.dragPin = function (evt, mainPin, minXLimit, maxXLimit, minYLimit, maxYLimit) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var topPos = mainPin.offsetTop - shift.y;
      var leftPos = mainPin.offsetLeft - shift.x;
      if (topPos < maxYLimit && topPos > minYLimit) {
        mainPin.style.top = topPos + 'px';
      }
      if (leftPos < maxXLimit && leftPos > minXLimit) {
        mainPin.style.left = leftPos + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.setAddress(window.MAIN_PIN_WIDTH, window.MAIN_PIN_HEIGHT);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
})();
