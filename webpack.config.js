const debug = process.env.NODE_ENV !== 'production';
const production = (process.env.NODE_ENV === 'production')? true : false;
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globImporter = require('node-sass-glob-importer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin = require('copy-webpack-plugin');
/**
 * Given a string, returns a new string with dash separators converedd to
 * camel-case equivalent. This is not as aggressive as `_.camelCase` in
 * converting to uppercase, where Lodash will convert letters following
 * numbers.
 *
 * @param {string} string Input dash-delimited string.
 *
 * @return {string} Camel-cased string.
 */
function camelCaseDash(string) {
	return string.replace(
		/-([a-z])/g,
		(match, letter) => letter.toUpperCase()
	);
}
const gutenbergPackages = [
	'a11y',
	'api-fetch',
	'autop',
	'blob',
	'blocks',
	'block-library',
	'block-serialization-default-parser',
	'block-serialization-spec-parser',
	'components',
	'compose',
	'core-data',
	'data',
	'date',
	'deprecated',
	'dom',
	'dom-ready',
	'edit-post',
	'editor',
	'element',
	'escape-html',
	'format-library',
	'hooks',
	'html-entities',
	'i18n',
	'is-shallow-equal',
	'keycodes',
	'list-reusable-blocks',
	'nux',
	'plugins',
	'redux-routine',
	'rich-text',
	'shortcode',
	'token-list',
	'url',
	'viewport',
	'wordcount',
];

const externals = {
	react: 'React',
	'react-dom': 'ReactDOM',
	tinymce: 'tinymce',
	moment: 'moment',
	jquery: 'jQuery',
	lodash: 'lodash',
	'lodash-es': 'lodash',
	'@babel/polyfill': '@babel/polyfill',
};

gutenbergPackages.forEach((name) => {
	externals[`@wordpress/${name}`] = `window.wp.${camelCaseDash(name)}`;
});

console.log(externals);

const settings = {
	context: __dirname,
	devtool: debug ? 'inline-sourcemap' : false,
	mode: debug ? 'development' : 'production',
	target: 'web',
	entry: {
		editor : path.resolve(__dirname, 'src/index.js'),
		style : path.resolve(__dirname, 'src/style.scss'),
		'editor-styles': path.resolve(__dirname, 'src/editor.scss'),
	},
	resolve: {
		extensions: ['.js', '.jsx', '.scss'],
	},
	externals,
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: `/wp-content/plugins/${path.basename(__dirname)}/dist/`,
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js',
	},
	module: {
		rules:[
			{
				test: /\.(css|scss)$/,
				use: [{
						loader: MiniCssExtractPlugin.loader,
						// loader: (production)? MiniCssExtractPlugin.loader : 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: (!production) ? true : false,
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [require('autoprefixer')({
								'browsers': ['> 1%', 'last 2 versions']
							})],
						}
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass'),
							sourceMap: (!production) ? true : false,
							importer: globImporter()
						}
					}
				],
			},
			{
				test: /\.(js|jsx)?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: [
						'@babel/preset-env',
						'@wordpress/default',
					],
					plugins: [
						'@wordpress/babel-plugin-import-jsx-pragma',
						'@babel/transform-react-jsx',
						'@babel/plugin-transform-runtime',
						'@babel/plugin-syntax-dynamic-import',
						'@babel/plugin-proposal-object-rest-spread',
						'@babel/plugin-proposal-class-properties',
					],
				},
			},
		]
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				extractComments: true,
				parallel: true,
				uglifyOptions: {
					mangle: true,
				},
			}),
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	]
};

if(production){
	settings.plugins = [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new BundleAnalyzerPlugin(),
		new CopyPlugin([
			{ from: 'dist/editor-styles.css', to: path.resolve(__dirname, 'build/gecko-grid-layout/dist/editor-styles.css') },
			{ from: 'dist/style.css', to: path.resolve(__dirname, 'build/gecko-grid-layout/dist/style.css') },
			{ from: 'dist/editor.bundle.js', to: path.resolve(__dirname, 'build/gecko-grid-layout/dist/editor.bundle.js') },
			{ from: 'gecko-grid-layout.php', to: path.resolve(__dirname, 'build/gecko-grid-layout/gecko-grid-layout.php') },
			{ from: 'readme.txt', to: path.resolve(__dirname, 'build/gecko-grid-layout/readme.txt') },
    	]),
	];
}

module.exports = settings;