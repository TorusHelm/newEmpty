import { enterSaveCityFilter, openFilterMenu, clearFilter, selectFilter, filtrationStatus, enterSaveStatusFilter } from './modules/filters'
import { toggleTabs, eventOutOfElement, selfToggleState } from './modules/tabs'

const windowWidth = $(window).innerWidth();


$(document).ready(function(){
  enterSaveCityFilter();
  enterSaveStatusFilter();
  openFilterMenu();
  clearFilter();
  selectFilter();
  toggleTabs();
  filtrationStatus();


  if (windowWidth < 768) {
    selfToggleState('.js_tabsOption', 'click', 'active');
    eventOutOfElement('.js_outClick', 'active', 'mouseup');
  }

  if ($('.js-select').length) {
    $('.js-select').selectric();
  }
});
