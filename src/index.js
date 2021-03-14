// Вендоры
import 'normalize.css';
import '../node_modules/svgxuse/svgxuse.min.js';

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
import './views/components/pagination/pagination.scss';
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
