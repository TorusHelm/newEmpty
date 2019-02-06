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

export { toggleTabs }