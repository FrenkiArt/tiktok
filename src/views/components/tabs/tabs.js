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
    parent.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');
  }
}

// Меню у нас работает аналогично таберу
if (document.querySelector('.menu-list')) {
  document.querySelectorAll('.menu-list__item').forEach((tabsItem) => {
    tabsItem.addEventListener('click', tabClickHandler);
  });
}
