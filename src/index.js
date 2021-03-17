// Вендоры
import 'normalize.css';
import '../node_modules/svgxuse/svgxuse.min.js';
import fullpage from 'fullpage.js';
// import fullpage from 'fullpage.js/dist/fullpage.extensions.min';

import '../node_modules/fullpage.js/dist/fullpage.min.css';

// Шрифты
import './assets/fonts/blacklist/font.css';

// Миксины
import './views/mixins/mixins.scss';

// Стили для сайта
import './assets/styles/style.scss';

// Модули нашего проекта
import './views/components/breadcrumbs/breadcrumbs.scss';
import './views/components/buttons/button.scss';
import './views/components/footer/footer.scss';
import './views/components/form/form.scss';
import './views/components/header/header.scss';
import './views/components/links/link.scss';
import './views/components/menu/menu.scss';
import './views/components/tabs/tabs.scss';
import './views/components/tabs/tabs.js';
import './views/components/input/input.scss';
import './views/components/input/input.js';
import './views/components/pagination/pagination.scss';
import './views/components/popup/popup.scss';
import {myPopup} from './views/components/popup/popup.js';
import './views/mixins/mixins.scss';

// Страницы
// import './views/components/pages/index.scss';

/**
 * Эта функция выводит ширину вьюпорта тогда,
 * когда происходит изменение размера окна
 * @date 2021-02-09
 * @return {void}
 */

window.onresize = () => {
  setTimeout(() => {
    console.log(window.innerWidth);
  }, 1);
};

// eslint-disable-next-line new-cap
const fullPageInstance = new fullpage('#fullpage', {
  licenseKey: null,
  anchors: ['first', 'methods', 'compatibility', 'stages', 'guarantees'],
  navigation: true,
  navigationPosition: 'right',
  controlArrows: true,
  autoScrolling: true,
  menu: '#myMenu',
  paddingTop: '72px',
  // fixedElements: '#header, #footer',
  // sectionsColor: ['#ff5f45', '#0798ec', '#fc6c7c', 'grey'],
});

/* Про Попапы */
if (document.querySelector('[data-popup]')) {
  myPopup(document.querySelectorAll('[data-popup]'));
}

if (document.querySelector('#open-popup-login')) {
  document
    .querySelector('#open-popup-login')
    .addEventListener('click', function (e) {
      e.preventDefault();

      window.closeAllPopup();
      window.showOverlay();
      window.openPopup('.popup-login');
    });
}

if (document.querySelector('#open-popup-forgot-password')) {
  document
    .querySelector('#open-popup-forgot-password')
    .addEventListener('click', function (e) {
      e.preventDefault();

      window.closeAllPopup();
      window.showOverlay();
      window.openPopup('.popup-forget-password');
    });
}

if (document.querySelector('#change-profile-info')) {
  document
    .querySelector('#change-profile-info')
    .addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector('#form-profile-readonly').classList.add('dn');
      document.querySelector('.profile-cart__last-line').classList.add('dn');
      document.querySelector('.profile-cart__title').classList.add('dn');
      document.querySelector('#form-profile-live').classList.remove('dn');
      document.querySelector('.list-actions').classList.remove('dn');
    });
}

if (document.querySelector('#cancel-form-profile-live')) {
  document
    .querySelector('#cancel-form-profile-live')
    .addEventListener('click', cancelFormProfileLive);
}

/**
 * Вывел в отдельную функцию, так как возможно придётся
 * отдельно отменять редактирование profile
 * @param {e} e Событие клика
 */
function cancelFormProfileLive(e) {
  document.querySelector('#form-profile-readonly').classList.remove('dn');
  document.querySelector('.profile-cart__last-line').classList.remove('dn');
  document.querySelector('.profile-cart__title').classList.remove('dn');
  document.querySelector('#form-profile-live').classList.add('dn');
  document.querySelector('.list-actions').classList.add('dn');
}

console.log(fullPageInstance);
