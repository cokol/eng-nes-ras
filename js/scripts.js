$(window).load(function() {
  // $(".page-title").css("margin-top",$(".wrapper").height()/2 - 340 - $(".page-title").height() - 50);
  $(".pic-title-onload").delay(5000).fadeOut(800);
  $(".pic-title-afterload").delay(5000).fadeIn(800);
  cupMove();
  
  $(".sunrise-slider").css("height",$(".wrapper").height());
  
  $(".sunrise-slider").sunriseSlider();
  
});

$(window).resize(function() {
  $(".sunrise-slider").css("height",$(".wrapper").height());
});

$(document).ready(function() {
  $(".popup .close").click(function () {
    closePopup();
  });
  
  $(".wallpapers-gallery").wallpapersGallery();
  
});

$(window).resize(function() {
  cupMove();
  pupMakeup();
});

function cupMove() {
  
    if ($(".wrapper").width() > 1000 && $(".wrapper").width() < 2084) {
      $(".main-cup").css("margin-bottom", 340 - ($(window).width() - 1000)*.1 - $(window).width()*$(window).width()*$(window).width()*$(window).width()*0.000000000008);
    } else if ($(".wrapper").width() >= 2084) {
      $(".main-cup").css("margin-bottom",85);
    } else {
      $(".main-cup").css("margin-bottom",340);
    }
    
  
}

function openPopup(pupId) {
  if (!$(".tint").length) {
    $("body").append("<div class='tint' />");
  }
  $(".popup").fadeOut(250);
  $("#" + pupId).fadeIn();
  pupMakeup();
  
  jQuery(document).keydown(function(e){
    if (e == null) { // ie
      keycode = event.keyCode;
    } else { // mozilla
      keycode = e.which;
    }
    
    if(keycode == 27){ // escape, close box
      closePopup()
    }
    
  });
  
  $(".tint").live("click", function () {
    closePopup();
  });
  
}

function pupMakeup () {
  $(".tint").css("height",$(window).height()).css("width",$(window).width());
  
  var pupTop = $(window).scrollTop() + ($(window).height()-$(".popup").height())/2;
  if (pupTop < -165) {
    pupTop = -165;
  }
  
  $(".popup").css("top",pupTop).css("left",($(window).width()-$(".popup").width())/2 - 20);
  
}

function closePopup() {
  $(".tint").remove();
  $(".popup").fadeOut(250);
}


(function( jQuery ) {
  jQuery.fn.wallpapersGallery = function() {
    var gallery = $(this);
    var items = $(".wallpapers-gallery .item");
    items.wrapAll("<div class='gallery-cont' />");
    var gallerySize = items.length;
    var framesNum = Math.ceil(gallerySize/6);
    for (i=0;i<framesNum;i++) {
      var row = items.slice(i*6,i*6+6);
      row.wrapAll("<div class='gal-frame' frameindex='" + i + "' />");
    }
    var frames = $(".gal-frame");
    frames.hide();
    frames.eq(0).show().addClass("act-frame");
    
    gallery.find(".ttl").each(function() {
      $(this).html("<div class='txt'><span>" + $(this).html() + "</span></div><div class='shadow'><span>" + $(this).html() + "</span></div>");
    });
    
    gallery.append("<div class='prev' />");
    gallery.append("<div class='next' />");
    
    var prevBtn = gallery.find(".prev");
    var nextBtn = gallery.find(".next");
    
    nextBtn.on("click",function() {
      if (parseInt($(".act-frame").attr("frameindex")) < framesNum-1) {
        $(".act-frame").fadeOut(250,function() {
          $(this).removeClass("act-frame");
          $(this).next(".gal-frame").fadeIn(250).addClass("act-frame")
        });
      } else {
        $(".act-frame").fadeOut(250,function() {
          $(this).removeClass("act-frame");
          frames.eq(0).fadeIn(250).addClass("act-frame")
        });
      }
    });
    
    prevBtn.on("click",function() {
      if (parseInt($(".act-frame").attr("frameindex")) > 0) {
        $(".act-frame").fadeOut(250,function() {
          $(this).removeClass("act-frame");
          $(this).prev(".gal-frame").fadeIn(250).addClass("act-frame")
        });
      } else {
        $(".act-frame").fadeOut(250,function() {
          $(this).removeClass("act-frame");
          frames.eq(framesNum - 1).fadeIn(250).addClass("act-frame")
        });
      }
    });
    
    $(".wg-pic").bind("mouseenter",function() {
      $(this).fadeTo(50, 0.5);
      $(this).find(".ttl").show();
    });
    
    $(".wg-pic").bind("mouseleave",function() {
      $(this).fadeTo(50, 1);
      $(this).find(".ttl").hide();
    });
    
  }
})( jQuery );

function RecurringTimer(callback, delay) {
  var timerId, start, remaining = delay;

  this.pause = function() {
    window.clearTimeout(timerId);
    remaining -= new Date() - start;
  };

  var resume = function() {
    start = new Date();
    timerId = window.setTimeout(function() {
      remaining = delay;
      resume();
      callback();
    }, remaining);
  };
  
  var restart = function() {
    window.clearTimeout(timerId);
    start = new Date();
    timerId = window.setTimeout(function() {
      restart();
      callback();
    }, delay);
  };
  
  this.resume = resume;
  this.restart = restart;

  this.resume();
}

(function( jQuery ) {
  jQuery.fn.sunriseSlider = function() {
    var slider = $(this);
    var slides = slider.children(".slide");
    var sliderSize = slides.size();
    
    slides.eq(0).show().addClass("slide-act");
    
    if (sliderSize > 1) {
    
      var timer = new RecurringTimer(function() {
        var curSlide = $(".slide-act");
        if ($(".slide-act").next(".slide").length) {
          curSlide.next(".slide").fadeIn(1000).addClass("slide-act");
          curSlide.fadeOut(1000).removeClass("slide-act");
          curSlide.next(".slide").find(".pic-title-onload").show().delay(3000).fadeOut(800);
          curSlide.next(".slide").find(".pic-title-afterload").hide().delay(3000).fadeIn(800);
          
        } else {
          slides.eq(0).fadeIn(1000).addClass("slide-act")
          curSlide.fadeOut(1000).removeClass("slide-act");
          slides.eq(0).find(".pic-title-onload").show().delay(3000).fadeOut(800);
          slides.eq(0).find(".pic-title-afterload").hide().delay(3000).fadeIn(800);
        }
      }, 10000);
      
    }
    
  }
  
  
  
})( jQuery );
