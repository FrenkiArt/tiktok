if (document.querySelector('.tabs')) {
  document.querySelectorAll('.tabs__item').forEach((tabsItem) => {
    tabsItem.addEventListener('click', tabClickHandler);
  });
}

/**
 * Универсальная обвязка для табберов, при клике на таб
 * добавляет/убирает класс .active
 * @param {event} e Событие клика
 */
function tabClickHandler(e) {
  const parent = e.target.closest('.tabs') || e.target.closest('.menu-list');

  if (e.target.classList.contains('active')) {
    // nothing
  } else {
    if (parent.querySelector('.active')) {
      parent.querySelector('.active').classList.remove('active');
    }
    e.target.classList.add('active');
  }

  if (e.target.dataset.toggle) {
    const wrapper = parent.parentElement;

    wrapper.querySelectorAll('[data-tabelement]').forEach((element) => {
      element.classList.add('dn');
    });

    wrapper.querySelector(e.target.dataset.toggle).classList.remove('dn');
  }
}

// Меню у нас работает аналогично таберу
if (document.querySelector('.menu-list')) {
  document.querySelectorAll('.menu-list__item').forEach((tabsItem) => {
    tabsItem.addEventListener('click', tabClickHandler);
  });
}
