// TODO: feature detect with modernizr
window.ImageCarousel = (function() {

  var ImageCarousel = function(options) {
    options = options || {};
    this.$thumbWrapper = $( options.thumbWrapper || ".imageCarousel-thumbWrapper" );
    this.$imageWrapper = $( options.imageWrapper || ".imageCarousel-imageWrapper" );
    this.addEvents();
  };
  
  utils.inherits(ImageCarousel, Page);
  
  // TODO: Once integrating modernizr, this will determine what kind of animation to do depending on CSS transforms
  ImageCarousel.prototype.changeFactory = function(e) {
    var element = $(e.target).parent("a");
    e.preventDefault();
    
    this.slide(element);
  };
  
  ImageCarousel.prototype.addEvents = function() {
    this.$thumbWrapper.on("click", this.changeFactory.bind(this));
    this.$imageWrapper.find("img").live("webkitAnimationEnd", this.removeElement.bind(this));
    $(window).unload(this.removeEvents.bind(this));
  };
  
  ImageCarousel.prototype.removeElement = function() {
    this.$imageWrapper.find("img.out").remove();
  }
  
  ImageCarousel.prototype.show = function(el) {
    var href = el.attr("href");
    this.$imageWrapper.find("img").attr("src", href);
  };
  
  ImageCarousel.prototype.slide = function(el) {
    var href = el.attr("href");
    var img = document.createElement("img");
    
    img.setAttribute("src", href);
    $(img).addClass("in slide");

    this.$imageWrapper.addClass("sliding");
    this.$imageWrapper.find("img").addClass("out slide");
    
    this.$imageWrapper.append(img);
  };
  
  ImageCarousel.prototype.removeEvents = function() {
    this.$thumbWrapper.off("click");
    this.$imageWrapper.find("img").die("webkitAnimationEnd");
  };
  
  return ImageCarousel; 
})();