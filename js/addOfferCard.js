'use strict';

(function () {
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;
  var PHOTO_CLASS_NAME = 'popup__photo';

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardFragment = document.createDocumentFragment();
  var cardElem = cardTemplate.cloneNode(true);

  var addFeatures = function (features, featureList) {
    for (var featureIndex = 0; featureIndex < featureList.length; featureIndex++) {
      featureList[featureIndex].classList.add('hidden');
    }
    for (var j = 0; j < features.length; j++) {
      for (var i = 0; i < featureList.length; i++) {
        var item = featureList[i];
        if (item.classList.contains('popup__feature--' + features[j])) {
          item.classList.remove('hidden');
        }
      }
    }
  };

  var createPhoto = function (src, className, width, height) {
    var photo = document.createElement('img');
    photo.classList.add(className);
    photo.src = src;
    photo.width = width;
    photo.height = height;

    return photo;
  };

  var appendPhoto = function (photos, photoList, className, width, height) {
    for (var k = 0; k < photos.length; k++) {
      photoList.append(createPhoto(photos[k], className, width, height));
    }
  };

  var updateCardElem = function (selector, attrName, attrVal) {
    if (attrName && attrVal) {
      cardElem.querySelector(selector)[attrName] = attrVal;
      return;
    }
    cardElem.querySelector(selector).display = 'none';
  };


  window.addOfferCard = function (ads) {
    var offerType = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец'
    };
    var offer = ads.offer;

    updateCardElem('.popup__title', 'textContent', offer.title);
    updateCardElem('.popup__text--address', 'textContent', 'textContent', offer.address);
    updateCardElem('.popup__text--price', 'textContent', offer.price + '₽/ночь');
    updateCardElem('.popup__type', 'textContent', offerType[offer.type]);
    updateCardElem('.popup__description', 'textContent', offer.description);
    updateCardElem('.popup__avatar', 'src', ads.author.avatar);

    if (offer.rooms && offer.guests) {
      updateCardElem('.popup__text--capacity', 'textContent', offer.rooms + ' комнаты для ' + offer.guests + ' гостей');
    } else {
      updateCardElem('.popup__text--capacity');
    }

    if (offer.checkin && offer.checkout) {
      updateCardElem('.popup__text--time', 'textContent', 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout);
    } else {
      updateCardElem('.popup__text--time');
    }

    addFeatures(offer.features, cardElem.querySelectorAll('.popup__feature'));

    var photoList = cardElem.querySelector('.popup__photos');
    photoList.innerHTML = '';
    if (offer.photos.length > 0) {
      appendPhoto(offer.photos, photoList, PHOTO_CLASS_NAME, PHOTO_WIDTH, PHOTO_HEIGHT);
    }
    cardElem.classList.remove('hidden');
    cardFragment.append(cardElem);

    return cardFragment;
  };
})();
