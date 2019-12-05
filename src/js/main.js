$(document).ready(function(){

    $(".header__hamburger").on('click', function () {
        $(".header__mob").toggleClass("menu_active");
        if($(".header__mob").hasClass('menu_active')) {
            $(".header__hamburger-line--top").css({'transform': 'rotate(45deg) translate3d(5px,3px,0)'});
            $(".header__hamburger-line--center").css({'transform': 'translate3d(50%,0,0)', 'opacity' : '0'});
            $(".header__hamburger-line--bottom").css({'transform': 'rotate(-45deg) translate3d(4px,-2px,0)'});
        }
        else{
            $(".header__hamburger-line").css({'transform': 'none', 'opacity': '1'});
        }
    });

    $(".close-menu").on('click', function () {
        $(".header__mob").removeClass("menu_active");
        $('.menu_active').css('height',  $('.menu_active').attr('data-height'));
        return false;
    });

    $('.owl-carousel').owlCarousel({
        loop:true,
        nav: true,
        navText : ["",""],
        items: 1,
        autoplay: true,
        autoplayTimeout: 10000, 
        smartSpeed: 1500,
    });
    
    $('.owl-dots').appendTo($('.owl-nav'));

});
