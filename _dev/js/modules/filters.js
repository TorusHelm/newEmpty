const windowWidth = $(window).innerWidth();

//открытие-закрытие списка фильтров на мобилке
function openFilterMenu() {
  if (windowWidth <= 767) {
    let link = $('.js-filter');
    let linkList = $('.js-sub-list');

    link.on('click', function () {
      $(this).closest('.filter').toggleClass('is-open');
    });

    linkList.on('click', function () {
      let hideFilter = linkList.find('.js-filter-item');

      for (let i = 0; i <= hideFilter.length; i++) {
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
    initFilter($(this));
    saveCityFilter();
  });
}

function initFilter($this){
  let link = $('.js-filter-item');
  let list = $this.closest('.js-list-filter'),
    subListLink = list.find('.js-sub-list'),
    listFilter = list.children('.js-filter-item'),
    allFilter = list.find('.js-filter-item');

  if ($.inArray($this[0], listFilter) >= 0) {
    changeClass($this, listFilter)
  } else {
    if (windowWidth >= 768) {
      $this.insertAfter(listFilter[listFilter.length - 1]);

      //удаляю список, если в нем больше нет городов
      if (listFilter.length + 1 === allFilter.length) {
        subListLink.remove();
      }
    }
    changeClass($this, listFilter);
  }

  function changeClass($this, listFilter) {
    const allOrders = $('.js-order');
    for (let i = 0; i < listFilter.length; i++) {
      if ($this[0] === listFilter[0]) {
        listFilter.removeClass('is-active');
        $(listFilter[0]).addClass('is-active');
        allOrders.removeClass('d-none').addClass('js-f-order');
        changeStatus($('.js-status.is-active'));

      } else {
        $(listFilter[0]).removeClass('is-active');
        $this.toggleClass('is-active');
        //если ниодин город не выбран
        if (!link.hasClass('is-active')) {
          $(listFilter[0]).addClass('is-active');
          allOrders.removeClass('d-none').addClass('js-f-order');
          changeStatus($('.js-status.is-active'));
        } else {
          allOrders.addClass('d-none').removeClass('js-f-order');
          filtrationCity();
          //здесь запуск функции для статуса
          changeStatus($('.js-status.is-active'));
        }
        return false;
      }
    }
  }

}

//фильтр для городов
function filtrationCity() {

  $('.js-city.is-active').each(function () {
    let city = $(this).attr('data-href');

    $('[data-city = ' + city + ']').removeClass('d-none').addClass('js-f-order');
  });
}

//фильтр для статуса
function filtrationStatus() {
  const linkStatus = $('.js-status');
  linkStatus.on('click', function () {
    changeStatus($(this));
    saveStatusFilter();
  })
}

//смена статуса
function changeStatus(elem) {
  const linkStatus = $('.js-status');
  let status = elem.attr('data-status');
  $(linkStatus).removeClass('is-active');
  $(elem).addClass('is-active');

  if($('.js-f-order').length){
    if (status === 'all-status') {
      $('.js-f-order').removeClass('d-none');
      // filtrationCity();
    } else {
      $('.js-f-order').addClass('d-none');
      $('.js-f-order').filter(function (index) {
        return $(this).attr("data-status") === status;
      })
        .removeClass('d-none');
    }
  }
  else{
    $('.js-order').addClass('js-f-order');
    changeStatus($('.js-status.is-active'));
  }
}

//сохраняю выбор статуса
function saveStatusFilter() {
  // let filterStatus = $('.js-status.is-active').attr('data-status');
  let filterStatus = {};
  filterStatus = $('.js-status.is-active').attr('data-status');
  let str = JSON.stringify(filterStatus);
  console.log(str);
  localStorage.setItem('storeStatus', str);
}

// подгружаю выбранные значения для статуса
function enterSaveStatusFilter(){
  if (localStorage.getItem("storeStatus")) {
    let filterStatus = localStorage.getItem("storeStatus");
    let status = JSON.parse(filterStatus);

    let t = $('.js-status[data-status='+ status +']');
    changeStatus(t);
  }
}

// запоминаю выбранные значения для города
function saveCityFilter() {

  let filterCity = {};
  let cityActive = $('.js-city.is-active');
  let cityNum = cityActive.length;

  for(let i=0;i<cityNum;i++){
     filterCity[i] = $(cityActive[i]).attr('data-href');
  }
  let str = JSON.stringify(filterCity);
  localStorage.setItem('storeCity', str);
  localStorage.setItem('cityNum', cityNum);
}

// подгружаю выбранные значения для города
function enterSaveCityFilter(){
  const allOrders = $('.js-order');
  if (localStorage.getItem("storeCity")) {

    let filterCity = localStorage.getItem("storeCity");
    let cityNum = localStorage.getItem("cityNum");
    if(cityNum > 0){
      $('.js-filter-item').removeClass('is-active');
      let city = JSON.parse(filterCity);
      let cityFilter;

      for(let i=0; i<cityNum; i++){
        cityFilter = $('.js-city[data-href=' + city[i] +']');
        initFilter(cityFilter);
      }
      allOrders.addClass('d-none').removeClass('js-f-order');
    }
    else{
      allOrders.removeClass('d-none').addClass('js-f-order');
    }

    filtrationCity();
  }
}

export {enterSaveCityFilter, openFilterMenu, clearFilter, selectFilter, filtrationStatus, enterSaveStatusFilter}