'use strict';

(function () {
  window.createPins = function (pins) {
    var template = document.querySelector('#pin').content.querySelector('button');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      var elem = template.cloneNode(true);
      var img = elem.children[0];

      elem.style = 'left: ' + (pins[i].location.x + (img.width / 2)) + 'px; top: ' + (pins[i].location.y + img.height) + 'px;';
      elem.dataset.cardId = i;
      img.src = pins[i].author.avatar;
      img.alt = pins[i].offer.description;

      fragment.append(elem);
    }

    return fragment;
  };
})();
