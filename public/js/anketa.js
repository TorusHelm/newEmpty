'use strict'; //textarea - рассчет высоты

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
  });
} //переключение табов


function toggleTabs() {
  var tab = $('.js-tab');
  tab.on('click', function () {
    if (!$(this).hasClass('active')) {
      var tabId = $(this).attr('data-href');
      tab.removeClass('active');
      $(this).addClass('active');
      $('.js-tab-content').addClass('d-none');
      $(tabId).removeClass('d-none');
    }
  });
}

$(document).ready(function () {
  changeHeightTextarea();
  toggleTabs();

  if ($('.js-select').length) {
    $('.js-select').selectric();
  }
});
//# sourceMappingURL=maps/anketa.js.map
