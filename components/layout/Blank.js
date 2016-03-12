var Actions = require('react-native-router-flux').Actions;
var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

var styles = StyleSheet.create({
  wrapper: {},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
})

var Blank = React.createClass({
  getInitialState: function(){
      return {
          startWithWebview: false,
      }
  },
  componentDidMount: function() {

  },
  render: function() {
    return (
      <View style={styles.container}>
      </View>
    )
  }
})

module.exports = Blank;