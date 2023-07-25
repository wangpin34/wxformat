PATH := ./node_modules/.bin:${PATH}

.PHONY: dev start build

dev:
	vite

start: dev

build:
	tsc && vite build