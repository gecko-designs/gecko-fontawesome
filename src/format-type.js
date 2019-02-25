/**
 * WordPress dependencies
 */
import { Fragment, Component } from '@wordpress/element';
import { RichTextInserterItem } from '@wordpress/editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFortAwesomeAlt } from '@fortawesome/free-brands-svg-icons';
import InlineIconUI from './inline.js';
import { insertObject } from '@wordpress/rich-text';

const name = 'gecko/fontawesome-inline-icon';

export const Icon = {
	name,
	title: 'FontAwesome Icon',
	keywords: ['icon'],
	// object: true,
	tagName: 'i',
	className: null,
	attributes: {
		className: 'class',
	},
	edit: class ImageEdit extends Component {
		constructor() {
			super(...arguments);
			this.openModal = this.openModal.bind(this);
			this.closeModal = this.closeModal.bind(this);
			this.state = {
				modal: false,
			};
		}

		openModal() {
			this.setState({ modal: true });
		}

		closeModal() {
			this.setState({ modal: false });
		}

		render() {
			const { value } = this.props;
			const { isActive, activeAttributes, onChange } = this.props;
			return (
				<Fragment>
					<RichTextInserterItem
						name={name}
						icon={<FontAwesomeIcon icon={faFortAwesomeAlt} />}
						title={'Inline Icon'}
						onClick={() => {
							onChange(
								insertObject(value, {
									type: name,
									attributes: {
										className: `fab fa-fort-awesome-alt`,
									},
								})
							);
						}}
					/>
					<InlineIconUI
						isActive={isActive}
						activeAttributes={activeAttributes}
						value={value}
						onChange={onChange}
					/>
				</Fragment>
			);
		}
	},
};
