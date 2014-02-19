node-test:
	@./node_modules/bin/mocha 

browser-test:
	@node browser-test.js & echo "$$!" > /tmp/scryptsy-browser-test.pid
	@sleep 1
	@open http://localhost:8080

kill: 
	@cat /tmp/scryptsy-browser-test.pid | xargs kill
	@rm /tmp/scryptsy-browser-test.pid

@PHONY: node-test browser-test kill