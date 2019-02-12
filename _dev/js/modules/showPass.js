export function showPass(){
  let link = $('.js-view-pass');
  link.on('click', function(){
    let inp = $(this).siblings();
    let inpType = inp.prop('type');
    if(inpType === 'password'){
      inp.prop('type', 'text')
    }
    else{
      inp.prop('type', 'password')
    }
  })
}