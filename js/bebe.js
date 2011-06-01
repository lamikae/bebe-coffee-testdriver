/* globals */var MAGIC_W, addPics, fitBackground, images, init, nextPic, onDisplay, prevPic, transformX;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
images = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg"];
onDisplay = null;
MAGIC_W = 460;
/* functions */
addPics = function() {
  var el, fragment, i, offset_left, pic, _len;
  fragment = document.createDocumentFragment();
  for (i = 0, _len = images.length; i < _len; i++) {
    pic = images[i];
    el = document.createElement("img");
    el.src = "images/" + pic;
    el.id = "img" + (i + 1);
    el.className = "pic";
    if (i > 0) {
      el.style.display = 'none';
      offset_left = MAGIC_W + 19;
      $(el).offset({
        left: offset_left
      });
    }
    fragment.appendChild(el);
  }
  return $('#slideshow').append(fragment.cloneNode(true));
};
nextPic = function() {
  var n, o;
  if (onDisplay < images.length) {
    o = $('#slideshow :nth-child(' + onDisplay + ')');
    n = $('#slideshow :nth-child(' + (onDisplay + 1) + ')');
    if (onDisplay === 1) {
      transformX(o, -MAGIC_W);
    } else {
      transformX(o, -2 * MAGIC_W);
    }
    n.show();
    transformX(n, -MAGIC_W);
    onDisplay += 1;
    $('#prev').fadeIn();
  }
  if (onDisplay === images.length) {
    return $('#next').fadeOut();
  }
};
prevPic = function() {
  var n, o;
  if (onDisplay > 1) {
    o = $('#slideshow :nth-child(' + onDisplay + ')');
    n = $('#slideshow :nth-child(' + (onDisplay - 1) + ')');
    transformX(o, 0);
    if (onDisplay > 2) {
      transformX(n, -MAGIC_W);
    } else {
      transformX(n, 0);
    }
    onDisplay -= 1;
    $('#next').fadeIn();
  }
  if (onDisplay === 1) {
    return $('#prev').fadeOut();
  }
};
transformX = function(dom, x) {
  return dom.css("position", "absolute").css("-moz-transform", "translate(" + x + "px, 0)").css("-webkit-transform", "translate(" + x + "px, 0)").css("-o-transform", "translate(" + x + "px, 0)");
};
init = function() {
  addPics();
  onDisplay = 1;
  $('#prev').hide();
  $('#prev').bind('click', __bind(function(event) {
    return prevPic();
  }, this));
  $('#next').bind('click', __bind(function(event) {
    return nextPic();
  }, this));
  $(window).bind('resize', __bind(function(event) {
    return fitBackground();
  }, this));
  return fitBackground();
};
fitBackground = function() {
  return $('#content').height($(window).height());
};
jQuery(document).bind("ready", __bind(function() {
  return init();
}, this));