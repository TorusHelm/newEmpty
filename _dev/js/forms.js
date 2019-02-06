import {changeHeightTextarea, textarea} from './modules/textarea'

$(document).ready(function(){
  changeHeightTextarea();

  if ($('.js-select').length) {
    $('.js-select').selectric();
  }
});