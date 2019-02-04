var window$ = $(window),
  window$width = $(window).innerWidth(),
  document$ = $(document);

function toggleTabs(e){
    var tab_id = $(e).attr('data-tab');

    $('.nav-tab__item').removeClass('active');
    $('.nav-slide__item').addClass('d-none');

    $(e).addClass('active');
    $("#"+tab_id).removeClass('d-none');
}

function changeHeightTextarea(){
    var txt = $('.js-text-area'),
      hiddenDiv = $(document.createElement('div')),
      content = null;

    txt.addClass('noscroll');
    hiddenDiv.addClass('inp-text-fake');

    txt.after(hiddenDiv);

    txt.keyup(function(){
        console.log('key');

        content = txt.val();
        content = content.replace(/\n/g, '<br>');
        hiddenDiv.html(content);

        txt.css('height', hiddenDiv.outerHeight());
    })
}

document$.ready(function () {
    //export js
    $('.search1__current').on('click', function () {
        $(this).parent().addClass('active').find('.search1__input').focus();
    });
    //export js end

    $('.nav-tab__item').click(function(){
        toggleTabs(this);
    })

    $('.nav-tab-survey').click(function(){
        toggleTabs($('.nav-tab__item:last-child'));
    })

    // toggleState('.initHover', '.targetHover', 'mouseenter mouseleave', 'active');
    // toggleState('.init', '.target', 'click', 'active');

    window$.resize(function () {
        if (window$width < 768) {
            selfToggleState('.js_sortingOption', 'click', 'active');
            selfToggleState('.js_tabsOption', 'click', 'active');
        }
    });

    if (window$width < 768) {
        selfToggleState('.js_sortingOption', 'click', 'active');
        selfToggleState('.js_tabsOption', 'click', 'active');
    }

    stateClear('.js_sortingClear', '.js_sortingOption', 'active', 'click');

    eventOutOfElement('.js_outClick', 'active', 'mouseup');

    eventOutOfElement('.js_outClickDouble, .outClickDouble', 'active', 'mouseup');

    //select
    if ($('.js-select').length) {
        $('.js-select').selectric();
    }

    //filter
    openFilterMenu();
    clearFilter();
    selectFilter();

    //textarea
    changeHeightTextarea();
});

/**
 *
 * @param {string} init - элемент по событию которого происходит действие
 * @param {string} target - элемент над которым происходит действие
 * @param {event} event - событие по которому происходит действие
 * @param {string} toggledClass - управляющий класс
 */

// function toggleState(init, target, event, toggledClass) {
//     var mainTarget = target;
//     $(init).each(function () {
//         let $this = $(this);
//         let target = $this.attr('data-target');
//         let target1 = $(`${mainTarget}[data-target="${target}"]`);
//         $this.data({'target': target1});
//         target1.attr('data-state', '');
//         $this.attr('data-state', '');
//         $this.on(event, function () {
//             target1.toggleClass(toggledClass);
//             if (target1.hasClass(toggledClass)) {
//                 target1.attr('data-state', true);
//             } else {
//                 target1.attr('data-state', false);
//             }
//             // target1.parent().find('.search__input').focus();
//         });
//     });
// };

/**
 *
 * @param {string} elem - элемент событие которого смотрим
 * @param {event} event - событие
 * @param {string} className - управляющий класс
 */

function selfToggleState(elem, event, className) {
    $(elem).each(function () {
        $(this).attr('data-state');
    });
    $(elem).on(event, function (e) {
        e.preventDefault();
        var $this = $(this);
        $this.toggleClass(className);
        if ($this.hasClass(className)) {
            $this.attr('data-state', true);
        } else {
            $this.attr('data-state', false);
        }
        // $(document).on(event, function (e){
        //     var div = $(elem);
        //     if (!div.is(e.target)
        //     && div.has(e.target).length === 0) {
        //         div.removeClass(className);
        //     }
        // });
    });
};

/**
 *
 * @param {string} elem - элемент вне которого происходит событие
 * @param {event} event - событие
 * @param {string} className - управляющий класс
 */

function eventOutOfElement(elem, className, event) {
    var eventLet = event,
      elem = elem;
    $(document).on(eventLet, function (e) {
        var div = $(elem);
        if (!div.is(e.target)
          && div.has(e.target).length === 0) {
            div.removeClass(className);
        }
    });
};

function stateClear(elem, target, className, event) {
    $(elem).on(event, function () {
        $(target).removeClass(className);
    });
};

//открытие-закрытие списка фильтров на мобилке
function openFilterMenu(){
    if(window$width <= 767){
        var link = $('.js-filter');

        link.on('click', function(){
            $(this).closest('.filter').toggleClass('is-open');
        })
    }
}

//очистка фильтра
function clearFilter(){
    var link = $('.js-filter-clear');
    link.on('click', function(){
        $(this).siblings().removeClass('is-active');
    })
}

//выбор фильтра
function selectFilter(){
    var link = $('.js-filter-item');
    link.on('click', function(){
        var $this = $(this);
        var listFilter = $this.closest('.list-filter').children('.js-filter-item');

        for (var i=0;i<listFilter.length;i++){
            if($this[0] == listFilter[0]){
                listFilter.removeClass('is-active');
                $(listFilter[0]).addClass('is-active');
            }
            else{
                $(listFilter[0]).removeClass('is-active');
                $this.toggleClass('is-active');
                return false;
            }
        }
    })


    // link.on('click', function(){
    //   var filterId = $(this).attr('data-link');
    //   if(filterId == 'all'){
    //     $(this).siblings().removeClass('is-active');
    //     $(this).addClass('is-active');
    //   }
    //   else{
    //     $(this).toggleClass('is-active');
    //   }
    // })
}