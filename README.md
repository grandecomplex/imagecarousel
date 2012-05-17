
CSS Image Carousel
=========

### A CSS transition image carousel.
Current only supports webkit.

It allows the user to tap thumbnails to slide into a larger view. This is a progressively enhancement, as shown in the markup below.

#### To initialize
```
var carousel = new ImageCarousel();
```

#### HTML Markup
```
<div class="imageCarousel-imageWrapper">
  <img src="Path/to/image-large.jpg" />
</div>

<ul class="imageCarousel-thumbWrapper">
  <li>
    <a href="Path/to/another/image-large.jpg">
      <img src="Path/to/thumbnail/image-small.jpg" />
    </a>
  </li>
  <li>
    <a href="Path/to/another/image-large.jpg">
      <img src="Path/to/thumbnail/image-small.jpg" />
    </a>
  </li>
</ul>
```
