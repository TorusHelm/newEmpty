//переключение табов
function toggleTabs() {
  let tab = $('.js-tab');

  tab.on('click', function(){

    if(!$(this).hasClass('active')){
      let tabId = $(this).attr('data-href');
      tab.removeClass('active');
      $(this).addClass('active');
      $('.js-tab-content').addClass('d-none');
      $(tabId).removeClass('d-none');
    }
  })
}

//клик внеэлемента
function eventOutOfElement(elem, className, event) {
  $(document).on(event, function (e) {
    let $this = $(elem);
    if (!$this.is(e.target) && $this.has(e.target).length === 0) {
      $this.removeClass(className);
    }
  })
}

//смена класса элемента по событию
function selfToggleState(elem, event, className) {
  $(elem).each(function () {
    $(this).attr('data-state');
  });
  $(elem).on(event, function (e) {
    e.preventDefault();
    let $this = $(this);
    $this.toggleClass(className);
    if ($this.hasClass(className)) {
      $this.attr('data-state', true);
    } else {
      $this.attr('data-state', false);
    }
  });
}

export { toggleTabs, eventOutOfElement, selfToggleState }