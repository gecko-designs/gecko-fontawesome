import { Icon } from './format-type.js';
import { registerFormatType } from '@wordpress/rich-text';
registerFormatType('gecko/fontawesome', Icon);

/**
 * WordPress dependencies
 */
import {registerBlockType} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import * as grid from './grid-layout';
import * as gridItem from './grid-layout-item';

registerBlockType(grid.name, grid.settings);
registerBlockType(gridItem.name, gridItem.settings);

