// Вендоры
import 'normalize.css';
import '../node_modules/svgxuse/svgxuse.min.js';
import fullpage from 'fullpage.js';
// import fullpage from 'fullpage.js/dist/fullpage.extensions.min';
import customSelect from 'custom-select';
import '../node_modules/custom-select/build/custom-select.css';
import autosize from '../node_modules/autosize/dist/autosize.js';

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
import './views/components/select/select.scss';
import './views/components/select/select.js';
import {myPopup} from './views/components/popup/popup.js';
import './views/mixins/mixins.scss';

// Страницы
// import './views/components/pages/index.scss';

// eslint-disable-next-line new-cap
const fullPageInstance = new fullpage('#fullpage', {
  licenseKey: null,
  anchors: ['first', 'methods', 'compatibility', 'stages', 'guarantees'],
  navigation: true,
  navigationPosition: 'right',
  controlArrows: true,
  autoScrolling: true,
  scrollBar: true,
  menu: '#myMenu',
  scrollOverflowReset: true,
  // dragAndMove: true,
  // paddingTop: '72px',
  // fixedElements: '#header, #footer',
  // sectionsColor: ['#ff5f45', '#0798ec', '#fc6c7c', 'grey'],
});

console.log(fullPageInstance);

/* Про Попапы */
if (document.querySelector('[data-popup]')) {
  myPopup(document.querySelectorAll('[data-popup]'));
}

/* Работа с select-ами */
customSelect('select');

window.autosizeTextarea = function () {
  autosize.update(document.querySelector('.chat__wrap-input textarea'));
};

autosize(document.querySelectorAll('.chat__wrap-input textarea'));

const customJsScript = document.createElement('script');
customJsScript.type = 'text/javascript';
customJsScript.defer = true;
customJsScript.src = './assets/js/custom-js.js';

document.body.appendChild(customJsScript);
