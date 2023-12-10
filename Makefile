run:
	npm run dev

test:
	npx jest --passWithNoTests

lint:
	npm run check
	npm run lint


validate: lint test

.PHONY: run test lint validate
