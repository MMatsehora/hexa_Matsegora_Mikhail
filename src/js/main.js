
$(document).ready(function(){
    $(".header__btn--hamburger").on('click', function () {
        $('.sidemenu').removeClass('sidemenu--active-right');
        $('.header__btn--user').removeClass('icon-close');
        if (!$('.sidemenu--left').hasClass('sidemenu--active-left')) { 
            $('.sidemenu--left').addClass('sidemenu--active-left');
        } else { 
            $('.sidemenu--left').removeClass('sidemenu--active-left'); 
        }
    });

    $(".header__btn--user").on('click', function () {
        $('.sidemenu').removeClass('sidemenu--active-left');
        $(this).toggleClass('icon-close');
        if (!$('.sidemenu--right').hasClass('sidemenu--active-right')) { 
            $('.sidemenu--right').addClass('sidemenu--active-right'); 
        } else { 
            $('.sidemenu--right').removeClass('sidemenu--active-right'); 
        }
    });

    $('.menu__link').on('click', function (e) {
        e.preventDefault();
        $(this).parent().addClass('menu__item--active');
        $(".menu__link").not(this).parent().removeClass("menu__item--active");
    });

    $('.menu__btn').on('click', function () {
        $(this).parent().toggleClass('menu__item--submenu');
        $(".menu__btn").not(this).parent().removeClass("menu__item--submenu");
    });

    $('.header__bottom-btn').on('touchmove', function(evt){
        var touch = evt.originalEvent.touches[0];
        var y = touch.clientY;

        $('.statistics').css({"max-height" : y + "px"});

    });

    $('.owl-carousel').owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        autoHeight:true,
        navText : ["",""],
        items: 1,
        autoplay: true,
        autoplayTimeout: 8000, 
        smartSpeed: 2000,
    });
    
});

var ctx2 = document.getElementById('myChart').getContext('2d');

var chart = new Chart(ctx2, {
    // The type of chart we want to create
    type: 'line',
    // The data for our dataset
    data: {
        labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        datasets: [
            {
                fill: false,
                label: "Текущий год", 
                borderColor: '#E03D22',
                pointBackgroundColor: '#E03D22',
                pointRadius: 3,
                borderWidth: 2,
                data: [100900, 80800, 70000, 80000, 100900, 88000, 100900, 80800, 100900, 80800, 100900, 80800],
            },
            {
                fill: false,
                label: "Предыдущий год",
                borderColor: '#24BB9D',
                pointBackgroundColor: '#24BB9D',
                data: [80800, 50800, 76800, 50800, 25800, 50800, 25800, 50800, 25800, 50800, 25800, 50800],
                pointRadius: 3,
                borderWidth: 2,
            },
        ]
    },
    
    // Configuration options go here
    options: {
        legend: {
            position: 'bottom',
        },
        plugins: {
            datalabels: {
                display: false
            }
        },
        tooltips: {
            callbacks: {
                title: function(tooltipItems, data) {
                    return "Дата: " + tooltipItems[0].xLabel + ', ' + '15:45';
                },
                label: function(tooltipItem) {
                    return "Сумма: " + Number(tooltipItem.yLabel)  + ' USD';
                }
            },
            yAlign: 'bottom',
            xPadding: 8,
            yPadding: 8,
            backgroundColor: '#2B2B2B',
            bodyFontColor: 'white',
            bodyFontSize: 12,
            titleFontSize: 12,
            titleFontStyle: 'normal',
            titleFontColor: 'white',
            displayColors: false
        },
        labels: {
            fontColor: '#46A6A4', 
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "#A9A9A9",
                    beginAtZero: true,
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "#A9A9A9",
                },
            }]
        },
        maintainAspectRatio: false
    }
});

