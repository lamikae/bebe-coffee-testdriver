build:
	coffee -b -o js -c coffee/bebe.coffee

stdout:
	coffee -bpc coffee/bebe.coffee

testserver:
	java -jar JsTestDriver.jar --port 4224

test:
	java -jar JsTestDriver.jar --tests all

.PHONY: build testserver test
