define(["utils", "LoadEvents", "jquery"], function(utils, LoadEvents, $) {
  var rotationTimer = 0;


  var BaseCarousel = function(options) {
    var parentClass = "slide", initialCard;
    
    options = options || {};
    this.transitionType = options.type || "slide";
    
    this.$cardWrapper = $( options.cardWrapper || ".imageCarousel-imageWrapper" );
    
    initialCard = this.$cardWrapper.find(".card").first();
  
    this.adjustDimensions(initialCard);
    
    if (Modernizr.cssanimations) {
      parentClass = this.transitionType === "slide" ? this.transitionType : "fade";
    } else {
      parentClass = "show";
      this.transitionType = "show";
    }
    
    initialCard.addClass("in");
    
    this.$cardWrapper.addClass(parentClass).css("opacity", 1);
    
    this.index = 0;
    
    if (options.autoRotate) {
      this.setTimer();
    }

    BaseCarousel.superclass.constructor.apply(this, arguments);
  };
  
  utils.inherits(BaseCarousel, LoadEvents);
  
  BaseCarousel.prototype.setTimer = function() {        
    rotationTimer = setTimeout(function() {
      this.transition();
      this.setTimer();
    }.bind(this), 3000);
  };
  
  BaseCarousel.prototype.clearTimer = function() {
    clearTimeout(rotationTimer);
  };
  
  BaseCarousel.prototype.addEvents = function() {
    $(window).bind("resize", function(e) {
      this.adjustDimensions();
    }.bind(this));
  };
  
  BaseCarousel.prototype.removeEvents = function() {
    this.$cardWrapper.find(".card").die("webkitAnimationEnd");
    $(window).unbind("resize");
  };
  
  BaseCarousel.prototype.adjustDimensions = function(parent) {
    var el = $(".imageCarousel-imageWrapper .card");
    var mainImageHeight = el.height();
    this.$cardWrapper.height(mainImageHeight);
  };
  
  return BaseCarousel; 
});