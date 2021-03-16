if (document.querySelector('.uni-input')) {
  document.querySelectorAll('.uni-input').forEach((uniInput) => {
    uniInput.addEventListener('click', uniInputClickHandler);
  });
}

/**
 * Кликалка внутри нашего инпута
 * @param {event} e Событие клика.
 */
function uniInputClickHandler(e) {
  const wrapper = e.target.closest('.uni-input');

  if (e.target.closest('.icon-clear')) {
    wrapper.querySelector('input').value = '';
  } else if (e.target.closest('.icon-wrong')) {
    // Хмм, пока не ясно что должно произойти
  } else if (e.target.closest('.icon-hide-pass')) {
    wrapper.querySelector('input').type = 'text';
    wrapper.querySelector('.icon-hide-pass').classList.toggle('dn');
    wrapper.querySelector('.icon-show-pass').classList.toggle('dn');
  } else if (e.target.closest('.icon-show-pass')) {
    wrapper.querySelector('input').type = 'password';
    wrapper.querySelector('.icon-hide-pass').classList.toggle('dn');
    wrapper.querySelector('.icon-show-pass').classList.toggle('dn');
  }
}
