// TODO: feature detect with modernizr
window.ImageCarousel = (function() {
  var timer = 0;
  var ImageCarousel = function(options) {
    options = options || {};
    this.$thumbWrapper = $( options.thumbWrapper || ".imageCarousel-thumbWrapper" );
    this.$imageWrapper = $( options.imageWrapper || ".imageCarousel-imageWrapper" );

    this.$imageWrapper.addClass("sliding").css("opacity", 1);
    this.addEvents();
  };

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
    clearTimeout(timer);
    timer = setTimeout(function() {
      var imgGarbage = this.$imageWrapper.find("img.out");
      if (imgGarbage.length >= 1) {
        this.$imageWrapper.find("img.out").remove();
      } 
    }.bind(this), 1500);

  };

  ImageCarousel.prototype.show = function(el) {
    var href = el.attr("href");
    this.$imageWrapper.find("img").attr("src", href);
  };

  ImageCarousel.prototype.slide = function(el) {
    var href = el.attr("href"),
        img = document.createElement("img"),
        $imageWrapper = this.$imageWrapper,
        $oldImages = $imageWrapper.find("img").not(img);

    img.addEventListener("load", function(e) {
      $oldImages.not(img).addClass("out").removeClass("in");
      $(img).addClass("in");

      $imageWrapper.append(img);
    }.bind(this));

    img.setAttribute("src", href);
  };

  ImageCarousel.prototype.removeEvents = function() {
    this.$thumbWrapper.off("click");
  };

  return ImageCarousel;
})();





