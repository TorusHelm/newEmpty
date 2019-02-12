'use strict'; //переключение табов

function toggleTabs() {
  var tab = $('.js-tab');
  tab.on('click', function () {
    changeHeightTab($(this));

    if (!$(this).hasClass('active')) {
      var tabId = $(this).attr('data-href');
      tab.removeClass('active');
      $('.js-tab[data-href="' + tabId + '"]').addClass('active'); //т.к. есть кнопка помимо самих табов

      $('.js-tab-content').addClass('d-none');
      $(tabId).removeClass('d-none');
    }
  }); //выпадающий список табов на мобилке
  //задаю высоту, чтобы не скакал контент

  function changeHeightTab(tab) {
    if ($(window).innerWidth() < 768) {
      var tabHeight = tab.innerHeight();
      tab.closest('.js_tabsOption').css('height', tabHeight);
    }
  }
} //клик внеэлемента


function eventOutOfElement(elem, className, event) {
  $(document).on(event, function (e) {
    var $this = $(elem);

    if (!$this.is(e.target) && $this.has(e.target).length === 0) {
      $this.removeClass(className);
    }
  });
} //смена класса элемента по событию


function selfToggleState(elem, event, className) {
  $(elem).each(function () {
    $(this).attr('data-state');
  });
  $(elem).on(event, function (e) {
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass(className);

    if ($this.hasClass(className)) {
      $this.attr('data-state', true);
    } else {
      $this.attr('data-state', false);
    }
  });
}

var windowWidth = $(window).innerWidth();
$(document).ready(function () {
  toggleTabs();

  if (windowWidth < 768) {
    selfToggleState('.js_tabsOption', 'click', 'active');
    eventOutOfElement('.js_outClick', 'active', 'mouseup');
  }

  if ($('.js-select').length) {
    $('.js-select').selectric();
  }
});
//# sourceMappingURL=maps/lk-provider.js.map
