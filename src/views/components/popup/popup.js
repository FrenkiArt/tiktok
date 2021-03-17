/* eslint-disable space-before-function-paren */
/* eslint-disable no-invalid-this */
/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
/**
 * скрипт для модалок
 * @param {elements} trigers элементы при клике на которые будет
 * отрабатывать попап
 */
function myPopup(trigers) {
  /**
   * @param myPopup(trigers) Запускаем наши попапы
   * @param trigers - это тригеры которые будут вызывать появление попапа.
   * Внутри trigers должны быть:
   * @param [data-popup] data атрибут внутри которого прописан селектор,
   * по которому будет найден и запущен попап.
   */
  const allPopup = document.querySelectorAll('.popup');

  const popup_trigers = trigers;

  document.addEventListener('click', listenDomClick);

  allPopup.forEach((element) => {
    element.style.display = 'block';
    if (element.querySelector('.popup__btn-close') != null) {
      element
        .querySelector('.popup__btn-close')
        .addEventListener('click', closeThisPopup);
    }
    if (element.querySelector('.close-popup') != null) {
      element.querySelectorAll('.close-popup').forEach((close_popup) => {
        close_popup.addEventListener('click', closeThisPopup);
      });
    }
  });

  popup_trigers.forEach((element) => {
    element.addEventListener('click', popupTrigerHandler);
  });

  document.querySelector('.overlay').addEventListener('click', clickOnOverlay);

  function popupTrigerHandler(e) {
    if (e.target.classList.contains('close_popup')) {
      // Так как надо закрыть текущий попап, то не будем прерывать событие
      e.target.closest('.popup').classList.remove('popup-open');
    } else {
      e.preventDefault();
    }

    const searchPopup = this.dataset.popup;
    const targetPopup = document.querySelector(searchPopup);

    if (e.target.classList.contains('complain')) {
      // Передаём артикул
      const parentOrderCart = e.target.closest('.order-cart');
      const articul = parentOrderCart.querySelector('.articul').textContent;
      document.querySelector(
        '.popup-complain .article-number'
      ).textContent = articul;
      document.querySelector('.popup-complain .inpur-articul').value = articul;
    }

    if (searchPopup == '.popup-wishes') {
      // если это попап с желаниями
      const profile = e.target
        .closest('.order-cart__footer')
        .querySelector('.order-cart__profile')
        .cloneNode(true);
      const wishText = e.target.closest('.order-cart__wishes').dataset.wish;
      let wishFiles = e.target.closest('.order-cart__wishes').dataset.files;
      let wishFilesName = e.target.closest('.order-cart__wishes').dataset.name;
      wishFiles = wishFiles.split('|');
      wishFilesName = wishFilesName.split('|');

      profile.classList.remove('dn');

      document.querySelectorAll(
        '.popup-wishes .popup-wishes__tab-content'
      )[0].textContent = wishText;
      document.querySelectorAll(
        '.popup-wishes .popup-wishes__tab-content'
      )[1].textContent = '';

      for (let i = 0; i < wishFiles.length; i++) {
        const new_a = document.createElement('a');
        new_a.download = true;
        new_a.href = wishFiles[i];
        new_a.textContent = wishFilesName[i];
        document
          .querySelectorAll('.popup-wishes .popup-wishes__tab-content')[1]
          .appendChild(new_a);
      }

      if (e.target.textContent == 'Пожелания') {
        // вручную переключаем мужду табами
        document
          .querySelectorAll('.popup-wishes .popup-wishes__tab')[0]
          .classList.add('active');
        document
          .querySelectorAll('.popup-wishes .popup-wishes__tab')[1]
          .classList.remove('active');
        document
          .querySelectorAll('.popup-wishes .popup-wishes__tab-content')[0]
          .classList.add('active');
        document
          .querySelectorAll('.popup-wishes .popup-wishes__tab-content')[1]
          .classList.remove('active');
      } else {
        document
          .querySelectorAll('.popup-wishes .popup-wishes__tab')[0]
          .classList.remove('active');
        document
          .querySelectorAll('.popup-wishes .popup-wishes__tab')[1]
          .classList.add('active');
        document
          .querySelectorAll('.popup-wishes .popup-wishes__tab-content')[0]
          .classList.remove('active');
        document
          .querySelectorAll('.popup-wishes .popup-wishes__tab-content')[1]
          .classList.add('active');
      }

      /* копируем провайл и разворачиваем его и после вставляем в попап */
      profile.classList.add('reverse');
      document.querySelector('.popup-wishes__header').innerHTML = '';
      document.querySelector('.popup-wishes__header').appendChild(profile);
    }

    targetPopup.classList.add('popup-open');
    showOverlay();
    if (targetPopup.clientHeight > window.innerHeight) {
      targetPopup.classList.add('popup-long');
    }
  }

  window.openPopup = function (selector) {
    document.querySelector(selector).classList.add('popup-open');
  };
  window.closePopup = function (selector) {
    document.querySelector(selector).classList.remove('popup-open');
  };

  function closeThisPopup(e) {
    e.target.closest('.popup').classList.remove('popup-open');
    hideOverlay();
  }

  function closeAllPopup() {
    allPopup.forEach((element) => {
      element.classList.remove('popup-open');
    });
    hideOverlay();
  }

  window.closeAllPopup = function () {
    closeAllPopup();
  };

  function listenDomClick(e) {
    // console.log('click e.target is ', e.target);
  }

  function showOverlay() {
    document.querySelector('.overlay').classList.add('popup-open');
    freezeBody();
  }

  window.showOverlay = function () {
    document.querySelector('.overlay').classList.add('popup-open');
    freezeBody();
  };

  function hideOverlay() {
    document.querySelector('.overlay').classList.remove('popup-open');
    unFreezeBody();
  }

  window.hideOverlay = function () {
    document.querySelector('.overlay').classList.remove('popup-open');
    unFreezeBody();
  };

  function clickOnOverlay(e) {
    closeAllPopup();
  }

  function freezeBody() {
    document.body.classList.add('popup-open');
  }

  function unFreezeBody() {
    document.body.classList.remove('popup-open');
  }
}

export {myPopup};
