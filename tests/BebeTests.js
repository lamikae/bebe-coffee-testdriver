BebeTest = TestCase("BebeTest");

BebeTest.prototype.test_images = function() {
  assertNotNull(images);
  assertEquals(7, images.length);
};


BebeTest.prototype.test_addPics = function() {
  /*:DOC += <div id="slideshow"></div> */
  var el = document.getElementById('slideshow');
  assertNotNull(el);
  assertEquals(0, el.children.length);

  init();
  
  var _images = el.children;
  assertEquals(7, _images.length);
  for(var i = 0; i < _images.length; i++) {
    var img = _images[i];
    assertTagName('IMG', img);
    var re = new RegExp("images/"+images[i]);
    assertMatch(re, img.src);
    if (i > 0) {
      assertEquals('none', img.style.display);
    }
  }
};

BebeTest.prototype.test_addNextPic = function() {
  /*:DOC += <div id="container" style="width: 1000px"><div id="slideshow" style="width: 460px; margin: 0 auto;"></div></div> */
  
  // various browsers tend to handle the left offset differently,
  // in this test environment, making it close to impossible to
  // test image offsets.
  // Firefox4 seems to fail this test.
  
  init();
  assertEquals(460, MAGIC_W);

  assertEquals(1,onDisplay);
  var img1 = document.getElementById('img1');
  assertNotNull(img1);
  assertNotEquals(0, $(img1).offset().left)
  var img1_offset1 = $(img1).offset();

  var img2 = document.getElementById('img2');
  assertEquals(0, $(img2).offset().left);
  // need to "show" img2 to get a proper offset
  $(img2).show()
  var img2_offset1 = $(img2).offset();
  //jstestdriver.console.log('img2_offset1',img2_offset1.left);

  // transform img1 to left
  nextPic();
  assertEquals(2,onDisplay);

  var img1_offset2 = $(img1).offset();
  //jstestdriver.console.log('img1_offset2',img1_offset2.left);
  var img1_offset_diff = img1_offset2.left - img1_offset1.left;
  assert(img1_offset_diff < 0);
  
  // transform img2 to left
  nextPic();
  assertEquals(3,onDisplay);
  
  var img2_offset3 = $(img2).offset();
  var img2_offset_diff = img2_offset3.left - img2_offset1.left;
  assert(img2_offset_diff < 0);

};


