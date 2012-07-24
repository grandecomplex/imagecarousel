
CSS Image Carousel
=========

### A CSS transition image carousel.
Current only supports webkit.

It allows the user to tap thumbnails to slide into a larger view. This is a progressively enhancement, as shown in the markup below.

Sorry for the lack of documentation. If you actually use this and don't personally know me, email me and I'll help.

### Dependency
jQuery

#### To initialize
```
define(["ThumbnailCarousel","ButtonCarousel"], function(ThumbnailCarousel, ButtonCarousel) {
  var carouselSlide = new ThumbnailCarousel({
    thumbWrapper: ".carousel-slide-thumbs", 
    cardWrapper: "#carousel-slide",
  });
  
  var carouselFade = new ThumbnailCarousel({
    type: "fade",
    thumbWrapper: "#carousel-fade-thumbs", 
    cardWrapper: "#carousel-fade"
  });
  
  window.carouselNoThumbsFade = new ButtonCarousel({
    type: "fade",
    cardWrapper: "#carousel-nothumbs-fade",
    autoRotate: true
  });
});
```

#### HTML Markup
```
<div id="carousel-nothumbs-fade" class="imageCarousel-imageWrapper">
  <div class="card">
    <img src="01.jpg" width="500px" height="311px">
    <p>Cool!</p>
  </div>
  <div class="card">
    <img src="" width=500 height=311>
     <p>Awesome!</p>
  </div>
  <div class="card">
    <img src="" width=500 height=311>
     <p>Fantastic!</p>
  </div>
</div>
```
