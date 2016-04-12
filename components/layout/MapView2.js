'use strict';

var React = require('react-native');
var {
  Image,
  MapView,
  PropTypes,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} = React;

var MapView = require('react-native-maps');

var MapView2 = React.createClass({
  getInitialState: function() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  },
  render: function() {
    return (
      <View style={ styles.container }>
        <MapView 
          style={ styles.map }
          region={this.state.region}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 64,
  },
  map: {
    height: 150,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  }
});

module.exports = MapView2;