'use strict';


var React = require('react-native');
var Calendar = require('react-native-calendar');
var moment = require('moment');

var {
	PropTypes,
	StyleSheet,
	TouchableOpacity,
	View,
	Text
} = React;

var customDayHeadings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

var CalendarExample = React.createClass({
	getInitialState: function() {
		return {
	  		selectedDate: moment().format()
		};
	},
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.navBar} />
				<View style={{marginTop:64}} >
					<Calendar
						ref="calendar"
						scrollEnabled={true}
						showControls={true}
						dayHeadings={customDayHeadings}
						titleFormat={'MMMM YYYY'}
						prevButtonText={'Prev'}
						nextButtonText={'Next'}
						onDateSelect={(date) => this.setState({selectedDate: date})}
						onTouchPrev={() => console.log('Back TOUCH')}
						onTouchNext={() => console.log('Forward TOUCH')}
						onSwipePrev={() => console.log('Back SWIPE')}
						onSwipeNext={() => console.log('Forward SWIPE')}/>
					<Text>Selected Date: {moment(this.state.selectedDate).format('MMMM DD YYYY')}</Text>
				</View>
			</View>
		)
	},
});

const styles = StyleSheet.create({

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4d4d4d'
  },

  title: {
    color: 'white',
    fontSize: 32,
    paddingVertical: 15
  },


});

module.exports = CalendarExample;