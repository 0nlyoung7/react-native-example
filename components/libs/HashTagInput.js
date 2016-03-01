'use strict'

var React = require('react-native');

var {
	ListView,
	Platform,
	TouchableHighlight,
	View,
	Text,
	TextInput,
	Dimensions
} = React;

var {
  width,
  height
} = Dimensions.get('window');

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
			tags: [],
			tagViewWidth: 0,
		}
	},
    componentDidMount() {
		this.measureTextInput();
    },
	measureTextInput: function(){
		this._textInput.measure(this.logProgressBarLayout);
	},
	measureTagView: function(){
		var self = this;
		this._tagView.measure(function(ox, oy, w, h, px, py) {
			if( w > 200 ){
				self._textInput.setNativeProps({style:{flex: 0.2}});
				self._tagView.setNativeProps({style:{flex: 0.8}});
			}
		});
	},
	logProgressBarLayout: function(ox, oy, w, h, px, py) {

	},
	_addTag: function(){
		var textValue = this.state.textValue;
		this.state.tags.push( {'name':this.state.textValue} );
		setTimeout(() => {
			this._clearText();
			this.state.textValue = '';
			this.measureTagView();
		}, 1);

		return;
	},
	_removeTag: function(){
		var tsize = this.state.tags.length;
		if( tsize >= 1 ){
			var newTags = this.state.tags.slice( 0, tsize-1 );
			var sliced = this.state.tags[tsize-1];

			this._textInput.setNativeProps({text: sliced.name});

			this.setState({
				tags: newTags,
				textValue: sliced.name
			});
		}
	},
	getTags: function(){
		var tags = this.state.tags.map(function(row, i) {
			return row.name;
		});

		return tags;
	},
	_handleKeyPress: function(evt) {
		if( evt.nativeEvent.key == ' '){
			//space bar is pressed
			this._addTag();
			//_moveCursorToEndOfInput(this);
		} else if( evt.nativeEvent.key == 'Backspace' ){
			//backspace pressed
			var currentText = this.state.textValue;

			if( currentText.trim() == '' ){
				this._removeTag();
			}
		}
	},
	_clearText: function() {
		this._textInput.setNativeProps({text: ''});
	},
	_renderTags: function(){

		var tagNodes = this.state.tags.map(function(row, i) {
			return <Text key={i} style={{alignSelf: 'center',padding:5,alignItems: 'center', color: 'blue'}}>#{row.name}</Text>
		});

		return tagNodes;
	},
	render() {
		return (

			<View style={this.defaultStyles.defaultView}>
				<View ref={component => this._tagView = component}
					style={this.defaultStyles.defaultTags}>
					{this._renderTags()}
				</View>
				<TextInput ref={component => this._textInput = component} 
					style={[this.defaultStyles.defaultInput]}
					onChangeText={(text) => this.setState({textValue: text})}
					onKeyPress={this._handleKeyPress}>
				</TextInput>
			</View>
		);
	},
	defaultStyles: {
		defaultInput: {
			height: 40,
			flex:1,
			alignSelf: 'center',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection:'row',
		},
		defaultTags: {
			height: 40,
			flexDirection:'row',
		    justifyContent: 'flex-end',
		    alignItems: 'center',
		    alignSelf: 'flex-end',
	    },
		defaultView: {
			margin: 10,
			flexDirection:'row',	     
			justifyContent: 'center',
			alignSelf: 'stretch',
			alignItems: 'stretch',
			borderColor: 'gray',
			borderWidth: 1,
	    }
	},
});

module.exports = HashTagInput;