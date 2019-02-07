import { openFilterMenu, clearFilter, selectFilter } from './modules/filter'
import { toggleTabs, eventOutOfElement, selfToggleState } from './modules/tabs'

const windowWidth = $(window).innerWidth();

$(document).ready(function(){
  openFilterMenu();
  clearFilter();
  selectFilter();
  toggleTabs();

  if (windowWidth < 768) {
    selfToggleState('.js_tabsOption', 'click', 'active');
    eventOutOfElement('.js_outClick', 'active', 'mouseup');
  }

  if ($('.js-select').length) {
    $('.js-select').selectric();
  }
});
