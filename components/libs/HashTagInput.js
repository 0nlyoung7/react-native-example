'use strict'

var React = require('react-native');

var {
	ListView,
	Platform,
	TouchableHighlight,
	View,
	Text,
	TextInput
} = React;

var HashTagInput = React.createClass({

	getDefaultProps() {
		return {
			showHashTags: true,
			hideInput: true,
			formatAsBubbles: true,
			wrapTags: true,
			onTagAdded: null,
			onTagSearch: null
		};
	},
	propTypes: {
		showHashTags: React.PropTypes.bool,
		hideInput: React.PropTypes.bool,
		formatAsBubbles: React.PropTypes.bool,
		wrapTags: React.PropTypes.bool,
		onTagAdded: React.PropTypes.func,
		onTagSearch: React.PropTypes.func
	},
  	getInitialState() {
  		return {
  			textValue: ''
  		}
  	},
	onKeyInput: function(evt, elem) {
		console.log( evt.nativeEvent.key );
	},
  	render() {
  		return (
			<TextInput
				style={this.defaultStyles.defaultView}
				onKeyPress={this.onKeyInput}>
			</TextInput>
		);
  	},
	defaultStyles: {
		defaultView: {
			height: 40,
			borderColor: 'gray',
			borderWidth: 1
		}
	},
});

module.exports = HashTagInput;