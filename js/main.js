$(document).ready(function(){
  $.fn.selectRange = function(start, end) {
    if(end === undefined) {
        end = start;
    }
    return this.each(function() {
        if('selectionStart' in this) {
            this.selectionStart = start;
            this.selectionEnd = end;
        } else if(this.setSelectionRange) {
            this.setSelectionRange(start, end);
        } else if(this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
  };
  if ($(window).width() <= '768'){
    $(".main-form__number").attr("placeholder", "+7 (___) ___ __ __");
  }
  $(window).on('resize', ()=>{
    if ($(window).width() <= '768'){
      $(".main-form__number").attr("placeholder", "+7 (___) ___ __ __");
    }else{
      $(".main-form__number").attr("placeholder", "");
    }
  })
let modalOpen = false;
  $('#info-btn').on('click', ()=>{
    if (!modalOpen){
      $('#info-btn').text("✕")
      $("body").css('overflow-y', 'scroll');
      modalOpen = true;
      $(".bg-form-1").toggleClass("hidden");
      $(".bg-form-2").toggleClass("hidden");
      $(".bg-img").toggleClass("hidden");
      $(".bg-modal").css("opacity", "1");
      $(".main").toggleClass("hidden");
      $(".footer").toggleClass("hidden");
      $(".modal-info").css({"opacity": "1", "z-index": "9"});
      $(".main-form-success").css("display",'none');
    }else{
      
      $("body").css('overflow', 'hidden');
      $('#info-btn').text("?")
      modalOpen=false;
      $(".bg-modal").css("opacity", "0");
      $(".modal-info").css({"opacity": "0", "z-index": "-1"});
      $(".bg-form-1").toggleClass("hidden");
      $(".bg-form-2").toggleClass("hidden");
      $(".bg-img").toggleClass("hidden");
      $(".main").toggleClass("hidden");
      $(".footer").toggleClass("hidden");
      $(".main-form-success").css("display",'block');

    }
  })

  $('.owl-carousel').owlCarousel({
    loop: true,
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: false,
    startPosition: 0,
    mouseDrag: false,
    responsive :{
      768: {
        mouseDrag: true,
        autoplayHoverPause: true,
      }
    }
  });
  $(".main-form-close").on('click', ()=>{
    $(".main-form-success").animate({marginBottom: '-120px'});
    $(".main-form-success").css('display', 'none');
  })
  $(".modal-form-close").on('click', ()=>{
    $(".modal-form-success").animate({marginLeft: '-400px'});
  })
  
  $(".main-form__number").mask("+7 (999) 999 99 99");
  $(".modal-form-phone").mask("+7 (999) 999 99 99");
  
  $(".main-form__number").on('focus', ()=>{
    $(".main-form__img").css("display", "none");
    $(".main-form__number").val("+7 (___) ___ __ __");
  })
  $(".main-form__number").on('focusout', ()=>{
    if($(".main-form__number").val() == "" || $(".main-form__number").val() == "+7 (___) ___ __ __"){
      $(".main-form__img").css("display", "inline-block")
    }
  })
  var owl = $('.owl-carousel');
  owl.owlCarousel();
  let items, item;
  owl.on('changed.owl.carousel', function(event) {
    items = $(".owl-item");
    for (let i = 0; i < items.length; i++){
      itemClass = items[i].classList.value.split(" ")
      if( itemClass.includes("active")){
        card = i%4
        if (card == 0){
          card = 4
        }

          $(".bg-form-1").css({"background": "url('img/card-"+card+"-form-1.png') no-repeat ", "background-repeat": "no-repeat","background-size": "30%","background-position-x": "0","background-position-y": "100%" });
          $(".bg-form-2").css({"background": "url('img/card-"+card+"-form-2.png')", "background-repeat": "no-repeat","background-size": "30%","background-position-x": "100%","background-position-y": "0" });
          $(".bg-img").css({"background": "url('img/card-"+card+".png')", "background-repeat": "no-repeat","background-size": "40%","background-position-x": "100%","background-position-y": "50%" });
          if ($(window).width() <= '1350'){
            $(".bg-form-1").css("background-size", "300px");
            $(".bg-form-2").css("background-size", "400px");
            $(".bg-img").css("background-size", "600px");
          } if ($(window).width() <= '768'){
            $(".bg-form-2").css({"background-size": "300px"});
            $(".bg-img").css({"background-size": "400px", "background-position-y": "70%"});
          }if ($(window).width() <= '400'){
            $(".bg-img").css({"background-size": "250px"});
          }

      }
    }
  })

  $("#modal-form").validate({
    rules: {
      name: "required",
      email: {
        required: true,
        email: true
      },
      text: {
        required: true
      }
    },
    messages: {
      name: "Ошибка! Введите пожалуйста корректные данные.",
      email: "Ошибка! Введите пожалуйста корректные данные.",
      text: "Ошибка! Введите пожалуйста корректные данные."
    }
  });

  $("#main-form").validate({
    rules:{
      number: "required"
    },
    messages: {
      number: "Ошибка! Введите пожалуйста корректные данные."
    }
  })

  $('#main-form').on('submit', function(e){
    if (!$(".main-form__number").hasClass("error")){
      e.preventDefault();
      var fd = new FormData( this );
      $.ajax({
      url: 'php/send-main.php',
      type: 'POST',
      contentType: false, 
      processData: false, 
      data: fd,
      success: function(msg){
        $(".main-form-success").animate({marginBottom: '0'});
        $(".main-form-success").css('display', 'flex');
        if(msg == 'ok') {
          } else {
          }
      }
      });
      $("input[type='text']").val('');
    }
  });

  $('#modal-form').on('submit', function(e){
    if (!$("#name").hasClass("error") && !$("#email").hasClass("error") && !$(".modal-form__text").hasClass("error")){
      e.preventDefault();
      var fd = new FormData( this );
      $.ajax({
      url: 'php/send-modal.php',
      type: 'POST',
      contentType: false, 
      processData: false, 
      data: fd,
      success: function(msg){
        $(".modal-form-success").animate({marginLeft: '0'});
        if(msg == 'ok') {
          } else {
          }
      }
      });
      $("input[type='text']").val('');
      $('textarea').val('');
    }
  });
});