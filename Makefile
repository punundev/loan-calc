.PHONY: setup install run update clean help

PORT ?= 8000

help:
	@echo "Available commands:"
	@echo "  make setup    - Setup project environment"
	@echo "  make install  - Verify/install required local tools"
	@echo "  make run      - Launch local static HTTP server at http://localhost:$(PORT)"
	@echo "  make update   - Check and refresh static assets if applicable"
	@echo "  make clean    - Clean temporary files"

setup: install
	@echo "Project setup complete. Run 'make run' to start the local server."

install:
	@which python3 >/dev/null 2>&1 || which npx >/dev/null 2>&1 || (echo "Please ensure python3 or node/npx is installed." && exit 1)
	@echo "Dependencies verified."

run:
	@if which python3 >/dev/null 2>&1; then \
		echo "Starting static server at http://localhost:$(PORT)..."; \
		python3 -m http.server $(PORT); \
	elif which npx >/dev/null 2>&1; then \
		echo "Starting static server via npx serve at http://localhost:$(PORT)..."; \
		npx serve -l $(PORT) .; \
	else \
		echo "No HTTP server found. Open index.html directly in your web browser."; \
	fi

update:
	@echo "Static project uses CDN resources. No package update needed."

clean:
	@rm -rf .tmp scratch
