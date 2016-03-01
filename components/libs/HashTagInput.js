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
  			textValue: '',
  			tags: []
  		}
  	},
  	_enterInputFormatting: function(){
  		this.state.tags.push( {'name':this.state.textValue} );
  		return 
  	},
	_handleKeyPress: function(evt) {
		console.log( evt.nativeEvent.key );
		if( evt.nativeEvent.key == ' '){
			//space bar is pressed
			this._enterInputFormatting(this, -1);
			//_moveCursorToEndOfInput(this);
		}
	},
	_renderTags: function(){

		var tagNodes = this.state.tags.map(function(row) {
			return <Text style={{alignSelf: 'center',padding:5,alignItems: 'center'}}>{row.name}</Text>
		});

		return tagNodes;
	},
  	render() {
  		return (

  			<View style={this.defaultStyles.defaultView}>
  				<View >
  					<View style={this.defaultStyles.defaultTags}>
  					{this._renderTags()}
  					</View>
  				</View>
				<TextInput style={this.defaultStyles.defaultInput}
					onChangeText={(text) => this.setState({textValue: text})}
					onKeyPress={this._handleKeyPress}>
				</TextInput>
			</View>
		);
  	},
	defaultStyles: {
		defaultInput: {
			height: 40,
			borderColor: 'gray',
			borderWidth: 1,
			flex: 1,
			width:100,
			alignSelf: 'center',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection:'row',	
		},
		defaultTags: {
			height: 40,
			flexDirection:'row',
		    justifyContent: 'center',
		    alignItems: 'center',
		    alignSelf: 'stretch',
	    },
		defaultView: {
			flexDirection:'row',	     
			justifyContent: 'center',
			alignItems: 'stretch'
	    }
	},
});

module.exports = HashTagInput;