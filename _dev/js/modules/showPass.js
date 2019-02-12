export function showPass(){
  let link = $('.js-view-pass');
  link.on('click', function(){
    let inp = $(this).siblings();
    let inpType = inp.prop('type');
    (inpType === 'password') ? inp.prop('type', 'text') : inp.prop('type', 'password');
  })
}