'use strict';
(function () {
  var form = document.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');

  window.lockFieldsets(fieldsets);

  var unlockPage = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      window.map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      window.unlockFieldsets(fieldsets);
      window.setAddress(form.querySelector('#address'), mainPin);
    }

    mainPin.removeEventListener('mousedown', unlockPage);
    mainPin.removeEventListener('keydown', unlockPage);
  };

  var mainPin = document.querySelector('.map__pin--main');
  mainPin.addEventListener('mousedown', unlockPage);

  mainPin.addEventListener('keydown', unlockPage);
  window.setAddress(form.querySelector('#address'), mainPin);

  var roomNumberSelect = form.querySelector('#room_number');
  var capacitySelect = form.querySelector('#capacity');

  roomNumberSelect.addEventListener('change', function () {
    var roomsCount = Number(roomNumberSelect.value);
    var capacityOption = capacitySelect.children;
    var option;
    var optionValue;
    if (roomsCount === 100) {
      for (var optionIndex = 0; optionIndex < capacityOption.length; optionIndex++) {
        option = capacityOption[optionIndex];
        optionValue = Number(option.value);
        if (optionValue === 0) {
          option.disabled = false;
        } else {
          option.disabled = true;
        }
      }
      return;
    }
    for (var j = 0; j < capacityOption.length; j++) {
      option = capacityOption[j];
      optionValue = Number(option.value);
      if (optionValue > roomsCount || optionValue === 0) {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    }
  });

  var offerType = form.querySelector('#type');
  var offerPrice = form.querySelector('#price');
  var otterTypePriceCorrelation = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  offerType.addEventListener('change', function () {
    var minPrice = otterTypePriceCorrelation[offerType.value];
    offerPrice.placeholder = minPrice;
    offerPrice.min = minPrice;
    offerPrice.value = minPrice;
  });


  var timeinSelect = form.querySelector('#timein');
  var timeinOption = timeinSelect.querySelectorAll('option');
  var timeoutSelect = form.querySelector('#timeout');
  var timeoutOption = timeoutSelect.querySelectorAll('option');

  var setInOutTime = function (timeValue, optionsList) {
    for (var optionIndex = 0; optionIndex < optionsList.length; optionIndex++) {
      var currentOption = optionsList[optionIndex];
      if (currentOption.value === timeValue) {
        currentOption.selected = true;
      } else {
        currentOption.selected = false;
      }
    }
  };

  timeinSelect.addEventListener('change', function () {
    setInOutTime(timeinSelect.value, timeoutOption);
  });

  timeoutSelect.addEventListener('change', function () {
    setInOutTime(timeoutSelect.value, timeinOption);
  });
})();
