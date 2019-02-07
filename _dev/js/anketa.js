import {changeHeightTextarea} from './modules/textarea'
import {toggleTabs} from './modules/tabs'

$(document).ready(function(){
  changeHeightTextarea();
  toggleTabs();

  if ($('.js-select').length) {
    $('.js-select').selectric();
  }
});
