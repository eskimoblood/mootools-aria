# Based on http://gist.github.com/484311 by Felix Geisendšrfer

build:
	@echo "Combining files ..."
	@cat \
	  src/activity.js \
	  src/model.js \
	  src/eventbus.js \
	  src/view.js \
	  src/aria.js  > src/passiveView.js

	@echo "Compiling with Closure REST API ..."
	@curl \
		-s \
		-X POST \
		--data-urlencode compilation_level="SIMPLE_OPTIMIZATIONS" \
		--data-urlencode output_format="text" \
		--data-urlencode output_info="compiled_code" \
		--data-urlencode js_code@src/passiveView.js \
		-o src/passiveView.js \
		http://closure-compiler.appspot.com/compile
	@echo "Build complete:"
	@ls -lh src/passiveView.js | awk '{print $$9, $$5}'

.PHONY: build clean