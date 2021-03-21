console.log('Hello from custom-js.js file');

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

/* Загатовка для js в зависимости от ширины экрана */
if (window.matchMedia('(max-width: 640px)').matches) {
  // do functionality on screens smaller than 640px
} else {
  // Декстоп
}

/* Когда нажали кнопку "Отмена" */
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

/* Работа с линией загрузки */

if (document.querySelector('.load-line')) {
  window.makeLoadLine = function (arg, arg2) {
    makeLoadLine(arg, arg2);
  };
}

/**
 * Сделаем линию загрузки
 * @param {string} arg Строка со значением на которое надо сделать линию
 * @param {string} arg2 Время на анимацию
 */
function makeLoadLine(arg, arg2) {
  document.querySelector('.load-line').style.transition = arg2 + 's';
  document.querySelector('.load-line').style.transform =
    'scaleX(' + arg / 100 + ')';
}

/* Открывашка для таблицы .available-table */

if (document.querySelector('.available-table .btn--look')) {
  document
    .querySelectorAll('.available-table .btn--look')
    .forEach((element) => {
      element.addEventListener('click', function (e) {
        // const btnLook = e.target.closest('.btn--look');
        const rowParent = e.target.closest('tr');
        const isOpenTr = rowParent.classList.contains('open');
        const asideBlock = document.querySelector('.page-available__aside');
        const userInfo = rowParent.querySelector('.user-info');

        if (window.matchMedia('(max-width: 1000px)').matches) {
          // do functionality on screens smaller than 768px
        } else {
          userInfo.style.height =
            asideBlock.getBoundingClientRect().height + 'px';
          userInfo.style.width =
            asideBlock.getBoundingClientRect().width + 'px';
        }

        document.querySelectorAll('.available-table tr').forEach((tr) => {
          if (tr == rowParent && isOpenTr) {
            tr.classList.remove('open');
          } else if (tr == rowParent && !isOpenTr) {
            tr.classList.add('open');
          } else {
            tr.classList.remove('open');
          }
        });
      });
    });
}

/* Работа с альтернативным меню */

if (document.querySelector('.btn-menu')) {
  document.querySelector('.btn-menu').addEventListener('click', function () {
    document.querySelector('.alt-menu').classList.toggle('open');
  });

  document
    .querySelector('.alt-menu__close')
    .addEventListener('click', function () {
      document.querySelector('.alt-menu').classList.remove('open');
    });

  document.querySelector('.alt-menu').addEventListener('click', function (e) {
    if (e.target.classList.contains('alt-menu')) {
      document.querySelector('.alt-menu').classList.remove('open');
    }
  });
}

/* Работа с чатом */
/* Работа с левой частью где список чатов сокращённо */
if (document.querySelector('.chats-list')) {
  document.querySelector('.chats-list').addEventListener('click', function (e) {
    if (e.target.closest('.delete')) {
      e.target.closest('.chats-list__item').remove();
    } else if (e.target.closest('.chats-list__item')) {
      document.querySelectorAll('.chats-list__item').forEach((item) => {
        item.classList.remove('open');
      });
      e.target.closest('.chats-list__item').classList.add('open');

      document.querySelector('.chat__aside').classList.add('mob-hide');
    }
  });

  document
    .querySelector('.chat__main .arr-back')
    .addEventListener('click', function () {
      document.querySelector('.chat__aside').classList.remove('mob-hide');

      document.querySelectorAll('.chats-list__item').forEach((item) => {
        item.classList.remove('open');
      });
    });

  document
    .querySelector('.chat__wrap-input .btn-submit')
    .addEventListener('click', function () {
      const textareaValue = document.querySelector(
        '.chat__wrap-input .textarea'
      ).value;
      const attachedImgsArray = document.querySelectorAll(
        '.chat__wrap-attach-imgs img'
      );

      const isTextareaEmpty = textareaValue.length == 0;
      const isAttachedImgEmpty = attachedImgsArray.length == 0;
      const date = new Date();
      const hours =
        date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      const minutes =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      // const currentTime = `${date.getHours()}:${date.getMinutes()}`;
      const currentTime = hours + ':' + minutes;

      if (isTextareaEmpty && isAttachedImgEmpty) {
        console.log('Строка для отправки и прикреплённые изображеня пусты');
      } else if (!isTextareaEmpty && isAttachedImgEmpty) {
        // Есть только строка
        console.log('Только строка');
        sendMessage(textareaValue, null, currentTime);
      } else if (isTextareaEmpty && !isAttachedImgEmpty) {
        console.log('Только Изображения');
        // Есть только изображения
        sendMessage(null, attachedImgsArray, currentTime);
      } else if (!isTextareaEmpty && !isAttachedImgEmpty) {
        console.log('И строка и изображения');
        // Есть и строка и изображения
        sendMessage(textareaValue, attachedImgsArray, currentTime);
      }
    });

  document
    .querySelector('.chat__wrap-input .btn-load-file input')
    .addEventListener('change', attachFilesHandler);
}

/**
 * Прикрепление файлов
 * @param {e} e Событие прикрепления файлов
 */
function attachFilesHandler(e) {
  const wrapNewImgs = document.createElement('div');
  wrapNewImgs.classList.add('chat__wrap-attach-imgs');

  for (let i = 0; i < e.target.files.length; i++) {
    const element = e.target.files[i];
    // console.log(element);

    const wrapImg = document.createElement('div');
    wrapImg.classList.add('wrap-img');

    const fr = new FileReader();
    fr.onload = function () {
      wrapImg.dataset.counter = i;
      wrapImg.innerHTML = `
        <img src="${fr.result}" alt="">
        <button class="delete-this-img">
          <svg width="10" height="10">
            <use xlink:href='./assets/svg/svg_sprite.svg#icon-close'></use> 
          </svg>
        </button>
      `;

      wrapImg
        .querySelector('.delete-this-img')
        .addEventListener('click', function (e) {
          console.log(e.target.closest('.wrap-img').dataset.counter);
          e.target.closest('.wrap-img').remove();
        });
    };
    fr.readAsDataURL(element);

    wrapNewImgs.appendChild(wrapImg);
  }

  document.querySelector('.chat__main-footer').appendChild(wrapNewImgs);
}

/**
 * Функция отправки сообщения
 * @param {string} string Значение в текстарея которое
 * надо передать в мессадж.
 * @param {array} imgsUrlArray Массив прикреплённых картинок
 * @param {string} time Текущее время
 */
function sendMessage(string, imgsUrlArray, time) {
  const li = document.createElement('li');
  li.classList.add('list-messages__item');

  if (string != null && imgsUrlArray == null) {
    li.innerHTML = `<div class="message message-client">
      <div class="message__text">${string}</div>
      <div class="message__time">${time}</div> 
    </div>`;

    document.querySelector('.chat__wrap-input .textarea').value = '';
  } else if (string == null && imgsUrlArray != null) {
    li.innerHTML = `<div class="message message-client"> 
      <div class="message__time">${time}</div>
      <div class="message__imgs"></div>
    </div>`;

    imgsUrlArray.forEach((element) => {
      const a = document.createElement('a');
      a.classList.add('wrap-img');
      a.setAttribute('download', 'download');
      a.href = element.src;
      a.innerHTML = `<img src="${element.src}" alt="">`;

      li.querySelector('.message__imgs').appendChild(a);
    });

    document.querySelectorAll('.chat__wrap-attach-imgs').forEach((element) => {
      element.remove();
    });
    document.querySelector('.chat__wrap-input .btn-load-file input').value = '';
  } else if (string != null && imgsUrlArray != null) {
    li.innerHTML = `<div class="message message-client">
      <div class="message__text">${string}</div>
      <div class="message__time">${time}</div> 
      <div class="message__imgs"></div>
    </div>`;

    imgsUrlArray.forEach((element) => {
      const a = document.createElement('a');
      a.classList.add('wrap-img');
      a.setAttribute('download', 'download');
      a.href = element.src;
      a.innerHTML = `<img src="${element.src}" alt="">`;

      li.querySelector('.message__imgs').appendChild(a);
    });

    document.querySelector('.chat__wrap-input .textarea').value = '';
    document.querySelectorAll('.chat__wrap-attach-imgs').forEach((element) => {
      element.remove();
    });
    document.querySelector('.chat__wrap-input .btn-load-file input').value = '';
  }

  document.querySelector('.list-messages').appendChild(li);

  window.autosizeTextarea();

  // После того как добавили новое сообщение, хорошо бы проскролить до него.
  document.querySelector('.chat__main-messages').scrollTo({
    top: document.querySelector('.list-messages').getBoundingClientRect()
      .height,
    behavior: 'smooth',
  });
}
