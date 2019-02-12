'use strict';

var windowWidth = $(window).innerWidth(); //открытие-закрытие списка фильтров на мобилке

function openFilterMenu() {
  if (windowWidth <= 767) {
    var link = $('.js-filter');
    var linkList = $('.js-sub-list');
    link.on('click', function () {
      $(this).closest('.filter').toggleClass('is-open');
    });
    linkList.on('click', function () {
      var hideFilter = linkList.find('.js-filter-item');

      for (var i = 0; i <= hideFilter.length; i++) {
        $(hideFilter[i]).insertBefore(linkList);
      }

      linkList.remove();
    });
  }
} //очистка фильтра


function clearFilter() {
  var link = $('.js-filter-clear');
  link.on('click', function () {
    $(this).siblings().removeClass('is-active');
  });
} //выбор фильтра


function selectFilter() {
  var link = $('.js-filter-item');
  link.on('click', function () {
    initFilter($(this));
    saveCityFilter();
  });
}

function initFilter($this) {
  var link = $('.js-filter-item');
  var list = $this.closest('.js-list-filter'),
      subListLink = list.find('.js-sub-list'),
      listFilter = list.children('.js-filter-item'),
      allFilter = list.find('.js-filter-item');

  if ($.inArray($this[0], listFilter) >= 0) {
    changeClass($this, listFilter);
  } else {
    if (windowWidth >= 768) {
      $this.insertAfter(listFilter[listFilter.length - 1]); //удаляю список, если в нем больше нет городов

      if (listFilter.length + 1 === allFilter.length) {
        subListLink.remove();
      }
    }

    changeClass($this, listFilter);
  }

  function changeClass($this, listFilter) {
    var allOrders = $('.js-order');

    for (var i = 0; i < listFilter.length; i++) {
      if ($this[0] === listFilter[0]) {
        listFilter.removeClass('is-active');
        $(listFilter[0]).addClass('is-active');
        allOrders.removeClass('d-none').addClass('js-f-order');
        changeStatus($('.js-status.is-active'));
      } else {
        $(listFilter[0]).removeClass('is-active');
        $this.toggleClass('is-active'); //если ниодин город не выбран

        if (!link.hasClass('is-active')) {
          $(listFilter[0]).addClass('is-active');
          allOrders.removeClass('d-none').addClass('js-f-order');
          changeStatus($('.js-status.is-active'));
        } else {
          allOrders.addClass('d-none').removeClass('js-f-order');
          filtrationCity(); //здесь запуск функции для статуса

          changeStatus($('.js-status.is-active'));
        }

        return false;
      }
    }
  }
} //фильтр для городов


function filtrationCity() {
  $('.js-city.is-active').each(function () {
    var city = $(this).attr('data-href');
    $('[data-city = ' + city + ']').removeClass('d-none').addClass('js-f-order');
  });
} //фильтр для статуса


function filtrationStatus() {
  var linkStatus = $('.js-status');
  linkStatus.on('click', function () {
    changeStatus($(this));
    saveStatusFilter();
  });
} //смена статуса


function changeStatus(elem) {
  var linkStatus = $('.js-status');
  var status = elem.attr('data-status');
  $(linkStatus).removeClass('is-active');
  $(elem).addClass('is-active');

  if ($('.js-f-order').length) {
    if (status === 'all-status') {
      $('.js-f-order').removeClass('d-none'); // filtrationCity();
    } else {
      $('.js-f-order').addClass('d-none');
      $('.js-f-order').filter(function (index) {
        return $(this).attr("data-status") === status;
      }).removeClass('d-none');
    }
  } else {
    $('.js-order').addClass('js-f-order');
    changeStatus($('.js-status.is-active'));
  }
} //сохраняю выбор статуса


function saveStatusFilter() {
  var filterStatus = $('.js-status.is-active').attr('data-status');
  localStorage.setItem('storeStatus', filterStatus);
} // подгружаю выбранные значения для статуса


function enterSaveStatusFilter() {
  if (localStorage.getItem("storeStatus")) {
    var filterStatus = localStorage.getItem("storeStatus");
    var t = $('.js-status[data-status=' + filterStatus + ']');
    changeStatus(t);
  }
} // запоминаю выбранные значения для города


function saveCityFilter() {
  var filterCity = $('#filter-city').html();
  localStorage.setItem('storeCity', filterCity);
} // подгружаю выбранные значения для города


function enterSaveCityFilter() {
  var allOrders = $('.js-order');

  if (localStorage.getItem("storeCity")) {
    var filterCity = localStorage.getItem("storeCity");
    $('#filter-city').html(filterCity);

    if ($('.js-city.is-active').length) {
      allOrders.addClass('d-none').removeClass('js-f-order');
    } else {
      allOrders.removeClass('d-none').addClass('js-f-order');
    }

    filtrationCity();
  }
} //переключение табов


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

var windowWidth$1 = $(window).innerWidth();
$(document).ready(function () {
  enterSaveCityFilter();
  enterSaveStatusFilter();
  openFilterMenu();
  clearFilter();
  selectFilter();
  toggleTabs();
  filtrationStatus();

  if (windowWidth$1 < 768) {
    selfToggleState('.js_tabsOption', 'click', 'active');
    eventOutOfElement('.js_outClick', 'active', 'mouseup');
  }

  if ($('.js-select').length) {
    $('.js-select').selectric();
  }
});
//# sourceMappingURL=maps/provider.js.map
