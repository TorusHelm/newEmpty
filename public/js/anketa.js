"use strict";function changeHeightTextarea(){var e=$(".js-text-area"),t=$(document.createElement("div")),a=null;e.addClass("noscroll"),t.addClass("inp-text-fake"),e.after(t),e.keyup(function(){a=(a=e.val()).replace(/\n/g,"<br>"),t.html(a),e.css("height",t.outerHeight())})}function toggleTabs(){var t=$(".js-tab");t.on("click",function(){if(!$(this).hasClass("active")){var e=$(this).attr("data-href");t.removeClass("active"),$(this).addClass("active"),$(".js-tab-content").addClass("d-none"),$(e).removeClass("d-none")}})}$(document).ready(function(){changeHeightTextarea(),toggleTabs(),$(".js-select").length&&$(".js-select").selectric()});