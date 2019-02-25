/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { applyFormat } from '@wordpress/rich-text';

/**
 * Internal dependencies
 */
import SelectFontawesome from './select-fontawesome/index.jsx';

function createIconFormat(className) {
	console.log('createIconFormat', className);
	const format = {
		type: 'gecko/fontawesome-inline',
		attributes: {
			className: className,
		},
	};
	return format;
}

const IconEditor = ({ value, onChangeInputValue, onKeyDown}) => (
	<SelectFontawesome
		value={value}
		onChange={onChangeInputValue}
	/>
);


class InlineIconUI extends Component {
	constructor() {
		super(...arguments);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onChangeInputValue = this.onChangeInputValue.bind(this);
		this.onClickOutside = this.onClickOutside.bind(this);
		this.resetState = this.resetState.bind(this);
		this.state = {
			inputValue: '',
		};
	}

	static getDerivedStateFromProps(props, state) {
		const { activeAttributes: { className } } = props;
		// if (!isShowingInput(props, state)) {
		if (!state.inputValue) {
			return { inputValue: className };
		}
		return null;
	}

	onKeyDown(event) {
		if (event.keyCode === ESCAPE) {
			event.stopPropagation();
			this.resetState();
		}

		if ([LEFT, DOWN, RIGHT, UP, BACKSPACE, ENTER].indexOf(event.keyCode) > -1) {
			// Stop the key event from propagating up to ObserveTyping.startTypingInTextField.
			event.stopPropagation();
		}
	}

	onChangeInputValue(inputValue) {
		const { isActive, value, onChange} = this.props;
		console.log('onChangeInputValue', inputValue);
		this.setState({ inputValue: inputValue });
		const format = createIconFormat(inputValue);
		onChange(applyFormat(value, format));
		console.log('onChangeInputValue state', this.state);
	}

	onClickOutside(event) {
		this.resetState();
	}

	resetState() {
		this.setState({ editLink: false });
	}

	render() {
		const { isActive, activeAttributes: { className }, addingLink, value } = this.props;

		if (!isActive && !addingLink) {
			return null;
		}

		const { inputValue } = this.state;

		return (
			// <Container>
				<div>
				<IconEditor
					value={inputValue}
					onChangeInputValue={this.onChangeInputValue}
					onKeyDown={this.onKeyDown}
					submitLink={this.submitLink}
				/>
				</div>
			// </Container>
		);
	}
}

export default InlineIconUI;
