define(["utils", "jquery", "patterns/carousel/BaseCarousel"], function(utils, $, BaseCarousel) {

  var garbageTimer = 0;
  

  var ThumbnailCarousel = function(options) {
    options = options || {};
    this.$thumbWrapper = $( options.thumbWrapper || ".imageCarousel-thumbWrapper" );
  
    ThumbnailCarousel.superclass.constructor.apply(this, arguments);
  };

  utils.inherits(ThumbnailCarousel, BaseCarousel);

  ThumbnailCarousel.prototype.transition = function(el) {
    var href = el.attr("href"),
        card = document.createElement("div"),
        $cardWrapper = this.$cardWrapper,
        title = el.attr("title"),
        $oldCards = $cardWrapper.find(".card");
        
    var img = document.createElement("img");
    if (title !== "" && typeof title !== "undefined") {
      var p = document.createElement("p");
      p.innerText = title;
      card.appendChild(p);
    }
    
    card.className = "card";
      
    $(img).load(function(e) {
      $oldCards.not(card).addClass("out").removeClass("in");
      $(card).addClass("in");
      card.appendChild(img);
      $cardWrapper.append(card);
      
    }.bind(this));
    if (href) {img.setAttribute("src", href);}
  };

  ThumbnailCarousel.prototype.show = function(el) {
    var href = el.attr("href");
    this.$cardWrapper.find("img").attr("src", href);
  };

  ThumbnailCarousel.prototype.transitionFactory = function(e) {
    var element = $(e.target).parent("a");
    e.preventDefault();
  
    if (Modernizr.cssanimations) {
      this.transition(element);
    } else {
      this.show(element);
    }
  };
  
  ThumbnailCarousel.prototype.addEvents = function() {
    this.$thumbWrapper.on("click", this.transitionFactory.bind(this));
    this.$cardWrapper.find(".card").live("webkitAnimationEnd", this.removeElement.bind(this));
    
    this.$cardWrapper.find(".card").live("click", function(e) {
      
      var $this = $(this);
      
      e.preventDefault();
      
      if ($this.hasClass("hover")) {
        $this.removeClass("hover");      
      } else {
        $this.addClass("hover");
      }
      
      return false;
    });
    
    this.$cardWrapper.find("card").blur();
    
    ThumbnailCarousel.superclass.addEvents.apply(this, arguments);
  };
  
  ThumbnailCarousel.prototype.removeEvents = function() {
    ThumbnailCarousel.superClass.removeEvents.apply(this, arguments);
    this.$thumbWrapper.off("click");
    
    ThumbnailCarousel.superclass.removeEvents.apply(this, arguments);
  };
  
  ThumbnailCarousel.prototype.removeElement = function() {
    var imgGarbage = this.$cardWrapper.find(".out");
    clearTimeout(garbageTimer);
    
    setTimeout(function() {
      imgGarbage.addClass("none");
    }, 250);
    
    garbageTimer = setTimeout(function() {
      
      if (imgGarbage.length >= 1) {
        imgGarbage.remove();
      } 
    }.bind(this), 1500);
  };
  
  ThumbnailCarousel.prototype.adjustDimensions = function() {
    var mainImageWidth = this.$cardWrapper.find(".card").width();
    
    ThumbnailCarousel.superclass.adjustDimensions.apply(this, arguments);
    
    this.$thumbWrapper.width(mainImageWidth);
  };
  
  return ThumbnailCarousel;
});