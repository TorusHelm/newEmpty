var windowWidth = $(window).innerWidth();

//переключение табов
function toggleTabs() {
  var tab = $('.js-tab');

  tab.on('click', function(){
    if(!$(this).hasClass('active')){
      var tabId = $(this).attr('data-href');
      tab.removeClass('active');
      $(this).addClass('active');
      $('.js-tab-content').addClass('d-none');
      $(tabId).removeClass('d-none');
    }
  })
}

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

$(document).ready(function () {

   // toggleState('.initHover', '.targetHover', 'mouseenter mouseleave', 'active');
  // toggleState('.init', '.target', 'click', 'active');

  $(window).resize(function () {
    if (windowWidth < 768) {
      selfToggleState('.js_sortingOption', 'click', 'active');
      selfToggleState('.js_tabsOption', 'click', 'active');
    }
  });

  if (windowWidth < 768) {
    selfToggleState('.js_sortingOption', 'click', 'active');
    selfToggleState('.js_tabsOption', 'click', 'active');
  }

  stateClear('.js_sortingClear', '.js_sortingOption', 'active', 'click');

  eventOutOfElement('.js_outClick', 'active', 'mouseup');

  eventOutOfElement('.js_outClickDouble, .outClickDouble', 'active', 'mouseup');

  //select
  if ($('.js-select').length) {
    $('.js-select').selectric();
  }

  //tabs
  toggleTabs();

  //filter
  openFilterMenu();
  clearFilter();
  selectFilter();

  //textarea
  changeHeightTextarea();
});

/**
 *
 * @param {string} init - элемент по событию которого происходит действие
 * @param {string} target - элемент над которым происходит действие
 * @param {event} event - событие по которому происходит действие
 * @param {string} toggledClass - управляющий класс
 */

// function toggleState(init, target, event, toggledClass) {
//     var mainTarget = target;
//     $(init).each(function () {
//         let $this = $(this);
//         let target = $this.attr('data-target');
//         let target1 = $(`${mainTarget}[data-target="${target}"]`);
//         $this.data({'target': target1});
//         target1.attr('data-state', '');
//         $this.attr('data-state', '');
//         $this.on(event, function () {
//             target1.toggleClass(toggledClass);
//             if (target1.hasClass(toggledClass)) {
//                 target1.attr('data-state', true);
//             } else {
//                 target1.attr('data-state', false);
//             }
//             // target1.parent().find('.search__input').focus();
//         });
//     });
// };

/**
 *
 * @param {string} elem - элемент событие которого смотрим
 * @param {event} event - событие
 * @param {string} className - управляющий класс
 */

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

/**
 *
 * @param {string} elem - элемент вне которого происходит событие
 * @param {event} event - событие
 * @param {string} className - управляющий класс
 */

function eventOutOfElement(elem, className, event) {
  $(document).on(event, function (e) {
    let $this = $(elem);
    if (!$this.is(e.target) && $this.has(e.target).length === 0) {
      $this.removeClass(className);
    }
  })
}

function stateClear(elem, target, className, event) {
  $(elem).on(event, function () {
    $(target).removeClass(className);
  });
}

//открытие-закрытие списка фильтров на мобилке
function openFilterMenu() {
  if (windowWidth <= 767) {
    var link = $('.js-filter');
    var linkList = $('.js-sub-list');

    link.on('click', function () {
      $(this).closest('.filter').toggleClass('is-open');
    });

    linkList.on('click', function(){
      var hideFilter = linkList.find('.js-filter-item');

      for(var i = 0; i <= hideFilter.length; i++){
        $(hideFilter[i]).insertBefore(linkList);
      }
      linkList.remove();
    })
  }
}

//очистка фильтра
function clearFilter() {
  var link = $('.js-filter-clear');
  link.on('click', function () {
    $(this).siblings().removeClass('is-active');
  })
}

//выбор фильтра
function selectFilter() {
  var link = $('.js-filter-item');
  link.on('click', function () {
    var $this = $(this),
        list = $this.closest('.js-list-filter'),
        subListLink = list.find('.js-sub-list'),
        listFilter = list.children('.js-filter-item'),
        allFilter = list.find('.js-filter-item');

    if ($.inArray($this[0], listFilter) >= 0) {
      changeClass($this, listFilter)
    } else {
      if (windowWidth >= 768){
        $this.insertAfter(listFilter[listFilter.length - 1]);

        //удаляю список, если в нем больше нет городов
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
  })
}