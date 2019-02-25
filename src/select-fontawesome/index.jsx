import React from 'react';
import Select from 'react-select';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
library.add(fas, fab);

class SelectFontawesome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultValue: null,
			value: null,
			displayDrop: null,
			options: [],
			html: null,
		};
		this.HtmlValue = React.createRef();
	}

	componentDidMount(){
		const options = [];
		if (library.definitions) {
			Object.keys(library.definitions).forEach(function (lib, index) {
				Object.keys(library.definitions[lib]).forEach(function (key, index) {
					const label = <span><FontAwesomeIcon icon={[lib, key]} /> {key}</span>;
					options.push({
						value: `${lib} fa-${key}`, label: label
					});
				});
			});
		}
		this.setState({
			options: options,
		});
		options.forEach(option => {
			if (this.props.value && option.value === this.props.value) {
				this.setState({
					value: { value: option.value, label: option.label },
				});
			}
		});
	}

	// https://hackernoon.com/replacing-componentwillreceiveprops-with-getderivedstatefromprops-c3956f7ce607
	componentDidUpdate(prevProps, prevState) {
		if (prevState.defaultValue !== this.state.defaultValue) {
			this.setState({
				value: null,
			});
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.defaultValue !== prevState.defaultValue) {
			return { defaultValue: nextProps.defaultValue};
		}
		else return null;
	}

	updateState = (element) => {
		this.setState({ 
			value: element,
		});
		if (typeof this.props.onChange === 'function') {
			this.props.onChange(element.value);
		}
	}

	// Render the component.
	render() {
		const { options, value } = this.state;
		console.log(this.state);
		return (
			<div>
				{/* <div ref={this.HtmlValue} onChange={this.updateHtml}>{value && <FontAwesomeIcon icon={value.value} />}</div> */}
				{/* <input type="text" id={this.props.id} name={this.props.name} defaultValue={this.props.value} value={this.state.html}></input> */}
				<Select
					placeholder='Select an icon'
					options={options}
					name={this.props.name}
					onChange={this.updateState}
					value={value}
					isClearable={true}
				/>
			</div>
		);
	}
}

export default SelectFontawesome;