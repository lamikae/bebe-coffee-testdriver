### globals ###

images = [
  "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg"
  ]
onDisplay = null
MAGIC_W = 460


### functions ###

addPics = () ->
  fragment = document.createDocumentFragment()
  for pic,i in images
    el = document.createElement("img")
    el.src = "images/#{pic}"
    el.id = "img"+(i+1)
    el.className = "pic"
    if i > 0
      el.style.display = 'none'
      offset_left = MAGIC_W + 18 # 18 = 20 - 2 = padding - border, see #slideshow in bebe.css
      $(el).offset({left: offset_left})
    fragment.appendChild( el )
  $('#slideshow').append(fragment.cloneNode(true))


nextPic = () ->
  if (onDisplay < images.length)
    #console.log('next: '+onDisplay+' > '+(onDisplay+1))
    o = $('#slideshow :nth-child('+(onDisplay)+')')
    n = $('#slideshow :nth-child('+(onDisplay+1)+')')
    if onDisplay == 1
      transformX(o, -MAGIC_W)
    else
      transformX(o, -2*MAGIC_W)
    n.show()
    transformX(n, -MAGIC_W)
    onDisplay += 1
    
    $('#prev').fadeIn()
  if (onDisplay) == images.length
    $('#next').fadeOut()


prevPic = () ->
  if (onDisplay > 1)
    #console.log('prev: '+onDisplay+' > '+(onDisplay-1))
    o = $('#slideshow :nth-child('+(onDisplay)+')')
    n = $('#slideshow :nth-child('+(onDisplay-1)+')')
    transformX(o, 0)
    if onDisplay > 2
      transformX(n, -MAGIC_W)
    else
      transformX(n, 0)
    onDisplay -= 1

    $('#next').fadeIn()
  if (onDisplay == 1)
    $('#prev').fadeOut()


transformX = (dom, x) ->
  dom.css("position", "absolute")
    .css("-moz-transform", "translate(" + x + "px, 0)")
    .css("-webkit-transform", "translate(" + x + "px, 0)")
    .css("-o-transform", "translate(" + x + "px, 0)");


init = () ->
  addPics()

  onDisplay = 1

  # hide prev btn
  $('#prev').hide()

  # bind button events
  $('#prev').bind 'click', (event) => prevPic()
  $('#next').bind 'click', (event) => nextPic()
  
  $(window).bind 'resize', (event) => fitBackground()
  
  fitBackground()


fitBackground = () ->
  # set content height same as window, for gradient background to look pretty
  # essential especially for mobiles when they rotate around like crazy
  $('#content').height($(window).height())


jQuery(document).bind "ready", () => init()