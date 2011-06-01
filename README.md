This is a small web application that I wrote to learn [JsTestDriver](http://code.google.com/p/js-test-driver/) and some [CoffeeScript](http://jashkenas.github.com/coffee-script/).

Live demo is hosted on  [http://lamikae.github.com/bebe-coffee-testdriver](http://lamikae.github.com/bebe-coffee-testdriver).


### running tests

1. start the JsTestDriver builtin Jetty server on port 4224

    `java -jar JsTestDriver.jar --port 4224`

2. attach one or more browsers by opening url [http://localhost:4224/capture](http://localhost:4224/capture)

3. run the tests

    `java -jar JsTestDriver.jar --tests all`


### compiling CoffeeScript

      coffee -b -o js -c coffee/bebe.coffee


