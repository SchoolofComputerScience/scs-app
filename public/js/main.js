$(function() {

    $('.open_menu').click(function(){
      $('main, header').toggleClass('nav_open');
      $('.slider_nav_container').toggleClass('open');
      $(this).toggleClass('on');
      is_search_explore_on();
      removeBody();
    });

    $('.js_launch_explore').click(function(){
      $('.modal_search, .launch_search').removeClass('on');
      $('.modal_explore').toggleClass('on');
      $(".modal_contents").scrollTop(0);
      removeBody();
    });

    $('.js_launch_search').click(function(){
      $('.modal_explore, .launch_explore').removeClass('on');
      $('.modal_search').toggleClass('on');
      $(".modal_contents").scrollTop(0);
      removeBody();
    });

    $('.js_launch_explore.desktop, .js_launch_search.desktop').click(function(){
      $(this).toggleClass('on');
    });

    $('.filter_toggle').click(function(){
      $(this).toggleClass('open');
      $(this).prev('.filter_list').toggleClass('visible');
    });

    $('.content_filter .filter_item').click(function(){
      var filter = $(this).data('filter');
      $('.content_filter .filter_item').removeClass('active');
      $(this).addClass('active');
      $(".content_list .filter_item_list").removeClass('visible');
      $(".content_list .filter_item_list[data-filter="+filter+"]").addClass('visible');
    });

    $('.filter_inline_toggle').click(function(){
      $(this).closest('.filter_list').find('.filter_item').each(function(){
        $(this).toggleClass('visible')
      });
      $(this).toggleClass('open');
      $(this).text(function(i, text){
          return text === "More" ? "Less" : "More";
      })
    });

});

function is_search_explore_on(){
  if( $('.open_menu').is('.on') ){
    $('.launch_explore, .launch_search, .modal_explore, .modal_search').removeClass('on');
    if( $('.mobile_nav a, .mobile_nav button').is('.on') ){
      $('.mobile_nav a, .mobile_nav button').removeClass('on');
    }
  }
}


function removeBody(){
  if( !$('.modal').is('.on')  ){
    $('body').removeClass('hold');
  } else{
    $('body').addClass('hold');
  }
}


$('.mobile_nav a, .mobile_nav button').click(function(){

    if(!$('.mobile_nav a, .mobile_nav button').is('.on')){
        $(this).toggleClass('on');

    } else if ( $(this).is('.on') ) {
      $(this).removeClass('on')
    }
    else{
      $('.mobile_nav a, .mobile_nav button').removeClass('on');
      $(this).toggleClass('on')
    }

});


$(document).mouseup(function(e)
{
  var container = $(".slider_nav_container, .open_menu");

  if (!container.is(e.target) && container.has(e.target).length === 0)
  {
    $('main, header').removeClass('nav_open');
    $('.slider_nav_container').removeClass('open');
    $('.open_menu').removeClass('on');
  }

});
