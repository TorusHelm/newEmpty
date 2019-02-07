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
    var $this = $(this),
        list = $this.closest('.js-list-filter'),
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
      for (var i = 0; i < listFilter.length; i++) {
        if ($this[0] === listFilter[0]) {
          listFilter.removeClass('is-active');
          $(listFilter[0]).addClass('is-active');
        } else {
          $(listFilter[0]).removeClass('is-active');
          $this.toggleClass('is-active');
          return false;
        }
      }
    }
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
  openFilterMenu();
  clearFilter();
  selectFilter();
  toggleTabs();

  if ($('.js-select').length) {
    $('.js-select').selectric();
  }
});
//# sourceMappingURL=maps/provider.js.map
