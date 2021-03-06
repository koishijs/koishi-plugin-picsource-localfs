#!/bin/bash
npm install --save \
	source-map-support

npm install --save-dev \
	@types/node \
	typescript \
	'@typescript-eslint/eslint-plugin@^4.28.2' \
	'@typescript-eslint/parser@^4.28.2 '\
	'eslint@^7.30.0' \
	'eslint-config-prettier@^8.3.0' \
	'eslint-plugin-prettier@^3.4.0' \
	prettier \
	raw-loader \
	ts-loader \
	webpack \
	webpack-cli \
	koishi@next \
	koishi-utils-schemagen
