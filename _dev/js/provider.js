import { openFilterMenu, clearFilter, selectFilter } from './modules/filter'
import { toggleTabs } from './modules/tabs'

$(document).ready(function(){
  openFilterMenu();
  clearFilter();
  selectFilter();
  toggleTabs();

  if ($('.js-select').length) {
    $('.js-select').selectric();
  }
});
