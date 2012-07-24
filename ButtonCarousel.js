define(["utils", "jquery", "patterns/carousel/BaseCarousel"], function(utils, $, BaseCarousel) {


  var ButtonCarousel = function(options) {
    options = options || {};
    ButtonCarousel.superclass.constructor.apply(this, arguments);

    this.createPagination();
  };
  
  utils.inherits(ButtonCarousel, BaseCarousel);  

  ButtonCarousel.prototype.addEvents = function() {
    var that = this;
    this.$cardWrapper.find(".card").live("webkitAnimationEnd", function() {
      $(this).siblings().removeClass("out");
    });

    $("body").on("click", ".imageCarousel-pagination a", function(e) {
      var index = $(".imageCarousel-pagination a").index(this);
      e.preventDefault();
      that.clearTimer();
      
      if (that.index === index) {
        return;
      }
      
      that.transition(index);
    });

  
    ButtonCarousel.superclass.addEvents.apply(this, arguments);
  };

  ButtonCarousel.prototype.removeEvents = function() {
    Buttoncarousel.superclass.removeEvents.apply(this, arguments);
    $("body").off("click", ".imageCarousel-pagination a");
  };

  ButtonCarousel.prototype.transition = function(index) {
  // TODO generalize and abstract the index++ timing stuff for also thumbnails if it becomes a business reason.
    var $current = this.$cardWrapper.find(".in");
    var $paginationButtons = $(this.pagination).find("li");

    if (!$current.length) {
      this.$cardWrapper.children().first().addClass("in");
      return this.index = 0;
    }

    if (typeof index !== "undefined") {
      this.index = index;
    } else {
      if (this.$cardWrapper.find(".card").length === this.index+1) {
        this.index = 0;
      } else {
        this.index++;
      }
    }
    
    $paginationButtons.removeClass("current");
    $paginationButtons.eq(this.index).addClass("current");
    
    $(this.pagination).find("li").eq(index).addClass("current");
    
    this.$cardWrapper.find(".card").eq(this.index).addClass("in");

    $current.removeClass("in").addClass("out");
  };

  ButtonCarousel.prototype.createPagination = function() {
    var $images = this.$cardWrapper.find(".card");
    var numberOfButtons = $images.length;
    var pagination = document.createElement("ul");
    var buttons = document.createDocumentFragment();
    pagination.className = "imageCarousel-pagination";
  
    $images.each(function(i) {
      var button = document.createElement("li");
      if (i === 0) {
        button.className = "current";
      }
      var a = document.createElement("a");
      a.innerText = i;
      a.setAttribute("href", "#");
    
      button.appendChild(a);
      buttons.appendChild(button);
    });
  
    pagination.appendChild(buttons);
    
    this.pagination = pagination;
  
    this.$cardWrapper.after(pagination);
  };
  
  return ButtonCarousel;
});