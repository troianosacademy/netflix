function carouselFlix(element, config) {
    console.log(1);
    let currentSection = 1;
    let sections;
    
    $(element).parent().find(config.buttons).on('click', function () {
        if ($(this).attr("data-target") == "nav-left") { 
            if (currentSection != 1) {
                scrollToSection(currentSection - 1);
            }
        }
        else  {
            
            if (currentSection+1 <= sections) {
                scrollToSection(currentSection + 1);
            }
        }
    });
    function setCurrentSection() {
        var carouselWidth = $(element).width();
        var itemWidth = $(element).find('.item').width() + parseInt($(element).find('.item').css('margin-right').replace('px',''));
        var itemQtd = $(element).find('.item').length;
        var ItemsPerSection = carouselWidth / itemWidth;
        sections = Math.round(itemQtd / ItemsPerSection);
        var innerLeft = Math.abs(parseInt($(element).find('.inner').css('left').replace('px','')));
        if (innerLeft == 0) {
            currentSection = 1;
        }else {
            currentSection = Math.round((innerLeft / carouselWidth) + 1);
        }   
    }
    
    function scrollToSection(section) {
        var width = $(element).width() * (Math.abs(currentSection - section));
        if (section < currentSection) {
            $(element).find('.inner').animate({left: '+='+width}, "slow", setCurrentSection);
        } else {
            $(element).find('.inner').animate({left: '-='+width}, "slow", setCurrentSection);
        }
    }
    
    setCurrentSection();
}

$(function() {
    
    setTimeout(function() {
        $('.box-loading').css({opacity: 0});
    }, 500);
    setTimeout(function() {
        $('.box-loading').remove();
    }, 1000);

    let btnSearch = $('.btn-search');
    let searchBox = $('.search');
    let inputSearch = $('.form-search');
    let container = $('.container');

    btnSearch.on("click", function() {
        searchBox.addClass("active");
        inputSearch.focus();
    });

    container.on("click", function() {
        searchBox.removeClass("active");
    });

    inputSearch.on("keyup", function(e) {
        if (event.keyCode === 13) {
            searchBox.submit();
        }
    })

    
    
    
    $('.carousel').each(function(i, e) {
        carouselFlix(e, {buttons: '.navigation'});
    });
    
});