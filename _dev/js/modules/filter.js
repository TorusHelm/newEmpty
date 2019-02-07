const windowWidth = $(window).innerWidth();

//открытие-закрытие списка фильтров на мобилке
function openFilterMenu() {
  if (windowWidth <= 767) {
    let link = $('.js-filter');
    let linkList = $('.js-sub-list');

    link.on('click', function () {
      $(this).closest('.filter').toggleClass('is-open');
    });

    linkList.on('click', function(){
      let hideFilter = linkList.find('.js-filter-item');

      for(let i = 0; i <= hideFilter.length; i++){
        $(hideFilter[i]).insertBefore(linkList);
      }
      linkList.remove();
    })
  }
}

//очистка фильтра
function clearFilter() {
  let link = $('.js-filter-clear');
  link.on('click', function () {
    $(this).siblings().removeClass('is-active');
  })
}

//выбор фильтра
function selectFilter() {
  let link = $('.js-filter-item');
  link.on('click', function () {
    let $this = $(this),
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
      for (let i = 0; i < listFilter.length; i++) {
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

export { openFilterMenu, clearFilter, selectFilter }