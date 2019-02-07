//textarea - рассчет высоты
function changeHeightTextarea() {

  var txt = $('.js-text-area'),
    hiddenDiv = $(document.createElement('div')),
    content = null;

  txt.addClass('noscroll');
  hiddenDiv.addClass('inp-text-fake');

  txt.after(hiddenDiv);

  txt.keyup(function () {

    content = txt.val();
    content = content.replace(/\n/g, '<br>');
    hiddenDiv.html(content);

    txt.css('height', hiddenDiv.outerHeight());
  })
}

export {changeHeightTextarea}