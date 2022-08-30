const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
	entry: [
		path.resolve(__dirname, 'public/index.js')
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'projectPlanner.bundle.js',
		clean: true
	},
	devServer:{
       static: {
		   directory: path.join(__dirname, 'public')
	   },
    },
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource'
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: "./public/index.html",
					to: "index.html"
				},
				{
					from: "./public/metacover.png",
					to: "metacover.png"
				},
				{
					from: "./public/favicon.ico",
					to: "favicon.ico"
				},
				{
					from: "./public/pwa/icons",
					to: "pwa/icons"
				},
				{
					from: "./public/pwa/manifest.json",
					to: "pwa/manifest.json"
				},
				{
					from: "./public/pwa/sw/sw.js",
					to: "sw.js"
				}
			]
		})
	],
	mode: 'development'
}
