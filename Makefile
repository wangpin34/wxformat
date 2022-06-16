PATH := ./node_modules/.bin:${PATH}

.PHONY: dev build

dev:
	craco start

build:
	craco build