$(document).ready(function () {
    console.log
    renderParallax();
    renderSelectorBox();
    renderUnleashSlider();
    renderCircleSlider();
    renderImgModal();
    renderAccordion();
    renderSelectorAbove();
    renderTableInteractive();
    renderTooltip();
    setIdCarousel();
    setIdModalImage();
    checkitem();
    
    $('[data-toggle="tooltip"]').tooltip({html:true});

    $('.horizontalTab').responsiveTabs();       
    $('.horizontalTimeline').timeline();       

    $('.carousel').on('slid', '', checkitem);  // on caroussel move
    $('.carousel').on('slid.bs.carousel', '', checkitem); // on carousel move

    eventsOnClick();
    eventsOnSwipe();
    
    
    $(window).resize(function(){
        renderUnleashSlider();
    });
    
    // $('div[id^="section_"]:nth-last-of-type(2)').one('mouseover', function () {
    //     pipwerks.SCORM.set("cmi.core.lesson_status", "completed");
    //     pipwerks.SCORM.save();
    // });

    
});

function setIdCarousel(){
    $( "div[data-ride='carousel']" ).each(function( index ) {
        $(this).attr('id',"carousel_"+index);
        $(this).find('a').attr('href', "#carousel_"+index);
    });
}

function setIdModalImage(){
    $( "div[data-ddw='imgModal']" ).each(function( index ) {
        $(this).find("span[data-toggle='modal']").attr('data-target',"#imgModal_"+index);;
        $(this).find("div[role='dialog']").attr('id',"imgModal_"+index);
    });
}


function renderParallax(){
    $('parallax').each(function( index ) {
        var grandParent = $(this).parent().parent();
        grandParent.addClass('parallax');
        grandParent.css('background-image',$(this).attr('img'));
        
        var parent = $(this).parent();
        var BKGD = hexToRgba($(this).attr('color'),$(this).attr('opacity'));
        if (typeof BKGD != 'undefined' && BKGD != null) {
            parent.css('background', BKGD);
        }
    });
}
function hexToRgba(hex, opac) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 'rgba('+
        parseInt(result[1], 16)+','+
        parseInt(result[1], 16)+','+
        parseInt(result[1], 16)+','+
        opac+')' : null;
}
function convertRgbToRgba(elem, opac){
    var bg = $(elem).css('background-color');
    if(bg.indexOf('a') == -1){
        var result = bg.replace(')', ', '+opac+')').replace('rgb', 'rgba');
    }
    return result;
}

function renderSelectorBox() {

    $('selector[selector_type="box"] .selector').each(function (i) {
        var delay = 150;
        var parFirst = ($(this).parent().index() == 0);
        
        if (parFirst) {
            $(this).attr('data-aos', 'fade-up-right').attr('data-aos-delay', (delay * i)).attr('data-aos-offset',200);
            $(this).parents('.selectable-area').siblings('.content-area').attr('data-aos', 'fade-right');
        } else {
            $(this).attr('data-aos', 'fade-up-left').attr('data-aos-delay', (delay * i)).attr('data-aos-offset',200);
            $(this).parents('.selectable-area').siblings('.content-area').attr('data-aos', 'fade-left');
        }
             
    });
}

function renderUnleashSlider() {

    if($(window).outerWidth(false) > 980){
        $('.unleash_slider').each(function () {
            var parWidth = $(this).outerWidth(false);
            var nChild = $(this).children().length;
            var divTransform = parseInt(parWidth / nChild);
            $(this).children('.unleash_slide').each(function (i) {
                $(this).css('transform', 'translate(' + parseInt(i * divTransform) + 'px, 0px)');
            });
        });
        //setTimeout(function(){$($('.unleash_slider > .unleash_slide')[0]).trigger("click");},500);
    }else{
        $('.unleash_slide').each(function () {
            $(this).css('transform', '');
        });
    }
}

/***** CIRCLESLIDER *****/
function renderCircleSlider(){
    
    $('.circle_slider').each(function(){
        var element = $(this).find('.circle_element.active')[0];
        changeText(element);

        //PADDING do componente externo
        var tamanhoTotal = $(this).outerWidth(true) ;
        
        var left = ((tamanhoTotal - $(element).outerWidth(true)) / 2);
        left = left - $(element).position().left;

        var elements = $(this).find('.circle_element');
        $(elements).each(function(i){
            var arrow;
            if(i == 0){
                arrow = $(this).find('.left');
            }else if(i == elements.length - 1){
                arrow = $(this).find('.right');
            }
            $(arrow).css({ "opacity": "0.3", "cursor":"default"});
            circleLeftPosition(this, left);
        });

    });
    
    $('.arrow.left').on('click', function() {
        var prev = $(this).parent().prev('.circle_element');
        if (typeof prev != 'undefined' && prev != null && prev.length !=0) {
            clickCircleArrow(this, true);
            changeText(prev);
            $(prev).addClass('active');
            $(this).parent().removeClass('active');
        }
    });

    $('.arrow.right').on('click', function() {
        var next = $(this).parent().next('.circle_element');
        if (typeof next != 'undefined' && next != null && next.length !=0) {
            clickCircleArrow(this, false);
            changeText(next);
            $(next).addClass('active');
            $(this).parent().removeClass('active');
        }
    });
}
function clickCircleArrow() {
    var parent = $(arguments[0]).parent();
    var width = $(arguments[0]).parent().outerWidth(false);
    var left = parseInt($(parent).css('left'));

    var value;
    if (arguments[1]) {
        value = parseInt(width + left);
    } else {
        value = parseInt(-width + left);
    }
    circleLeftPosition(parent, value);
}
function circleLeftPosition(){
    var value = arguments[1];
    $(arguments[0]).parent().find('.circle_element').each(function(){
        //$(this).css('left', value);
        $(this).animate({"left": value+"px"}, "0.75");
    });
}
function changeText(){
    var element = arguments[0];
    var html = $(element).find('.content').html();
    var content = $(element).parent().siblings('.circle_content');
    content.html(html);
    $(content).children().hide();
    $(content).children().fadeIn(500);
}

/******** ZOOM ********/
function renderZoom(){
    
    $('.zoom').each(function(){
        $(this).zoom();
    });

    $('.zoom .effect').on('mouseenter', function(){
        $(this).css('opacity', '0');
    });
}

function renderImgModal(){
    
    $('.zoom .effect').on('mouseenter', function(){
        $(this).css('opacity', '0');
    });

    $('.zoom').on('click', function(){
        $('[data-aos]').each(function(){
            $(this).css('transform', 'none');
        });
    })
}

/**** ACCORDION ****/
function renderAccordion(){
    $('.accordion .card').on('click', function(){
        $(this).toggleClass('active');        
    });
}

/**** SELECTOR ABOVE ****/
function renderSelectorAbove() {
    $('.selector-above .selector-item').each(function (i) {
        var modalID = 'modal-' + i;
        $(this).attr('data-target', '#' + modalID);

        var modalHtml = '<div id="' + modalID + '" class="modal fade" role="dialog">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-body">' + $(this).find('.modal-body').html() + '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $(this).parent().append(modalHtml);
    });
    
     $(window).on('scroll', function () {
        var position = $(this).scrollTop() + 150;

        $('.selector-above:not(.animated)').each(function () {

            if (position >= $(this).offset().top) {
                $(this).addClass('animated');
            }
        });

    });
    
}

/**** TABLE INTERACTIVE ****/
function renderTableInteractive(){
    $('.table-interactive tr').on('click', function(){
        $(this).children().hide();
        $(this).addClass('selected');
        $(this).children().fadeIn();
    });
}

function renderTooltip(){
    $('[data-toggle="tooltip"]').tooltip({html:true});
    
	///////////////////////////////////////// if OS
    var isOS = /iPad|iPhone|iPod/.test(navigator.platform);
	if (isOS){

		$('[data-toggle="tooltip"]').css( 'cursor', 'pointer' );
		 $('body').on("touchstart", function(e){
			$('[data-toggle="tooltip"]').each(function () {
				// hide any open tooltips when the anywhere else in the body is clicked
				if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.tooltip').has(e.target).length === 0) {
					$(this).tooltip('hide');
				}////end if
			});
		});

	}
}

function renderCardSelector(){
    
    var isOS = /iPad|iPhone|iPod/.test(navigator.platform);
	if (isOS){
        
        $('.card-selector').each(function(){
            $(this).addClass('ios');
        });

	}
}

function eventsOnClick() {
    $('selector .selectable-area .selector').each(function() {
        var contentArea = $(this).parents('selector').children('.content-area');
        normalizaAltura($(this).parent(), contentArea);
    });
    //SELECTOR
    $('selector .selectable-area .selector').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        var element = $(this).children('.content_item').clone();
        
        var parFirst = ($(this).parent().index() == 0);        
        if (parFirst) {
            element.attr('data-aos', 'fade-right');
        }else{
            element.attr('data-aos', 'fade-left');
        }
        
        var contentArea = $(this).parents('selector').children('.content-area');
        $(contentArea).empty();
        $(contentArea).append(element);
        normalizaAltura($(this).parent(), contentArea);
    });

    //UNLEASH SLIDER
    $('.unleash_slider').on('click', function () {
        $(this).addClass('selected');
    });
    $('.unleash_slider .unleash_slide').on('click', function (e) {
        e.stopPropagation();
        if($(window).outerWidth(false) > 980){
            var slide = $(this);
            slide.addClass('active');
            var tamanhoPai = $(slide).parent().outerWidth(false), 
                tamanhoElemento = $(slide).outerWidth(false), 
                numeroIrmaos = $(slide).siblings('.unleash_slide').removeClass('active').length;

            var transformWidth = parseInt( (tamanhoPai - tamanhoElemento) / numeroIrmaos );

            var space = 0;
            $(slide).parent().children('.unleash_slide').each(function (i) {
                if ($(this)[0] == slide[0]) {
                    $(this).css('transform', 'translate(' + space + 'px, 0px)');
                    space+= parseInt($(slide).outerWidth(false));
                } else {
                    $(this).css('transform', 'translate(' + space + 'px, 0px)');
                    space+= transformWidth;
                }
            });
        }
    });
    
    //IMAGE ITERATOR
    $('.icon.interaction, .effect, .image-iterator').on("click", function () {
        var cp = $(this).parent('.iterator-parent');
        if (!$(cp).hasClass('selected') && !$(cp).hasClass('partial')) {

            $(cp).addClass('selected');
            setTimeout(function () {
                $(cp).on('click', function () {
                    $(cp).toggleClass('description');
                });
            }, parseInt($(cp).children().length * 1000));
        }else{
            var item = $(cp).find('.image-iterator:not(.done)')[0];
            if (typeof item != 'undefined' && item != null && item.length !=0) {
                $(item).addClass('done');
            }else{
                item = $(cp).find('.image-iterator').removeClass('done');
                $(item[0]).addClass('done');
            }
        }
        
        $(cp).removeClass('pulsate');
    });
    
    //CARD SELECTOR
    $('.card-selector .card').on('click' ,function(){
        $(this).toggleClass('active');
    });
    
    //FLOAT SELECTOR
    $('.float-selector .select-item').on('click', function(){
        var layer = $(this).attr('layer');
        $(this).siblings('.image-item:not(.keep)').removeClass('selected');
        $(this).siblings('.image-item').removeClass('actual');
        $(this).siblings('.'+layer).addClass('selected').addClass('actual');
        $(this).removeClass('pulsate');
    });

    $('.float-selector.partial .select-item').on('click', function(){
        $(this).next().show();
    });
    
    $('.list-interactive li').on('click', function(){
        $(this).addClass('selected');
        $(this).find('span').removeClass('pulsate');
    });
}

function eventsOnSwipe() {

    $('.unleash_slide').each(function () {
        var hammertime = new Hammer($(this)[0]);
        hammertime.get('swipe').set({
            direction: Hammer.DIRECTION_HORIZONTAL
        });
        hammertime.on("swipeleft", function (e) {
            swipedLeft(e.target, true);
        });
        hammertime.on("swiperight", function (e) {
             swipedLeft(e.target, false);
        });

    });
    
    $('.circle_area').each(function () {
        var hammertime = new Hammer($(this)[0]);
        hammertime.get('swipe').set({
            direction: Hammer.DIRECTION_HORIZONTAL
        });
        var element;
        hammertime.on("swipeleft", function (e) {
            element = $(e.target).parents('.circle_area');
            element = $(element).find('.active .arrow.right');
            $(element).trigger('click');
        });
        hammertime.on("swiperight", function (e) {
            element = $(e.target).parents('.circle_area');
            element = $(element).find('.active .arrow.left');
            $(element).trigger('click');
        });
    });
    
    $('.zoom .effect').each(function () {
        var hammertime = new Hammer($(this)[0]);
        hammertime.get('pan').set({
            direction: Hammer.DIRECTION_ALL
        });
        hammertime.on("panstart", function (e) {
            var effect = $(e.target).parents('.effect');
            $(effect).css('opacity', '0');
        });
    });
}
function swipedLeft(element, boo) {
    if (!boo) {
        var index = $(element).index();
        console.log($(element).hasClass('active'));
        if (index > 0 && $(element).hasClass('active')) {
            element = $(element).parent().children().get(parseInt(index - 1));
        }
    }
    $(element).trigger("click");
}

function recursosTriggers(){
    //trigger
    $('.unleash_slider').each(function(){
        var first = $(this).find('.unleash_slide')[0];
        $(first).trigger("click");
    });
    $('selector').each(function(){
        var first = $(this).find('.selector')[0];
        $(first).trigger("click");

    });
}

function normalizaAltura(selectorArea, contentArea){
   
    var alturaArea = $(selectorArea).height();
    //fixando em 410px
    var alturaConteudo = 410
    //$(contentArea).height();
    
        qtde = 0;
        $(selectorArea).find(" .selector_item").each(function () {
            qtde ++
        })
        
        $(selectorArea).find(" .selector_item").each(function () {
            $(this).css({
                "height":((alturaConteudo+40)/qtde).toString(),
                "line-height":((alturaConteudo+40)/qtde).toString()+"px",
            })        
        })
    

        $(contentArea).css({
            'height': '45px',
            'min-height':'455px',
            'margin-top':'1px',
        })
        
}

function checkitem()                        // check function
{
    var $this = $('.carousel');
    if($('.carousel-inner .item:first').hasClass('active')) {
        $this.children('.left.carousel-control').hide();
        $this.children('.right.carousel-control').show();
    } else if($('.carousel-inner .item:last').hasClass('active')) {
        $this.children('.left.carousel-control').show();
        $this.children('.right.carousel-control').hide();
    } else {
        $this.children('.carousel-control').show();
    } 
}