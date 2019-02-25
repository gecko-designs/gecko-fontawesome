<?php
/**
 * Plugin Name: Gecko FontAwesome
 * Description: Add a fontawesome icon anywhere in Gutenberg. Well, almost anywhere.
 * Version: 1.0.0
 * Author: Gecko Designs
 * Author URI: https://geckodesigns.com
 * Text Domain: gecko-fontawesome
 * License: GPLv2 or later
 */

defined("ABSPATH") || exit;

add_action( "plugins_loaded", function(){
	new GeckoFontAwesome();
} );


class GeckoFontAwesome {
	public function __construct() {
		add_action("init", [$this, "register_block_type"]);
	}

	public function register_block_type() {
		wp_register_script(
			"gecko-fontawesome-editor",
			plugins_url("/dist/editor.bundle.js", __FILE__),
			[
				'jquery',
				'wp-blocks',
				'wp-editor',
				'wp-element',
				'wp-i18n'
			],
			filemtime( plugin_dir_path(__FILE__) . "dist/editor.bundle.js" )
		);
		wp_register_style(
			"gecko-fontawesome-editor",
			plugins_url("/dist/editor-styles.css", __FILE__),
			[],
			filemtime( plugin_dir_path(__FILE__) . "dist/editor-styles.css" )
		);
		wp_register_style(
			"gecko-fontawesome",
			plugins_url("/dist/style.css", __FILE__),
			[],
			filemtime( plugin_dir_path(__FILE__) . "dist/style.css" )
		);
		// Initialize custom blocks
		// Dynamically import blocks in blocks folder
		register_block_type(
			"gecko/fontawesome", 
			[
				// "render_callback" => [$this, "grid_callback"],
				"style" => "gecko-fontawesome",
				"script" => "",
				"editor_style" => "gecko-fontawesome-editor",
				"editor_script" => "gecko-fontawesome-editor",
			]);
	}

	/**
	 * If the block is dynamic you would render the template here.
	 */
	public function grid_callback( $attributes, $content ) {
		// Sort of a hack at the moment.
	}
}