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
var allMarkers = [];

function filterByColor(color) {
  return function(obj) {
    if ('color' in obj && obj.color == color) {
      return true;
    } else {
      return false;
    }
  }
}

var MapView2 = React.createClass({
  getInitialState: function() {
    return {
      markers:[],
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  },
  componentDidMount: function() {
    allMarkers = [
      { coordinate: { longitude: -122.3905941766903, latitude: 37.76212204839051 },
        key: 'm0',
        color: 'red',
        type:'T',
        title:'Apple'
      },
      { coordinate: { longitude: -122.41, latitude: 37.78},
        key: 'm1',
        color: 'blue',
        type:'M',
        title:'Google'
      },
      { coordinate: { longitude: -122.38111, latitude: 37.766},
        key: 'm2',
        color: 'red',
        type:'T',
        title:'Facebook'
      },
      { coordinate: { longitude: -122.39, latitude: 37.7777},
        key: 'm3',
        color: 'blue',
        type:'M',
        title:'Twitter'
      },
      { coordinate: { longitude: -122.3922, latitude: 37.78899},
        key: 'm4',
        color: 'blue',
        type:'M',
        title:'Instagram'
      }
    ];
    
    this.setState( {markers: allMarkers } );
  },
  filterRed: function() {
    this.setState( {markers: allMarkers.filter( filterByColor("red") ) } );
  },
  filterBlue: function() {
    this.setState( {markers: allMarkers.filter( filterByColor("blue") ) } );
  },
  _onSelectMarker: function(e) {
    var markerStr = e.dispatchMarker;
    var markerRefId = "m"+markerStr.substring( markerStr.lastIndexOf( "\." ) + 1 );

    var self = this;
    setTimeout(function(){
      self.refs[markerRefId].hideCallout();
    }, 500);
  },
  render: function() {
    return (
      <View style={ styles.container }>

        <View style={ styles.mapContainer }>
          <MapView 
            style={ styles.map }
            region={this.state.region}
            >
            {this.state.markers.map(marker => (
              <MapView.Marker 
                ref={marker.key}              
                coordinate={marker.coordinate}
                title={marker.key}
                pinColor={marker.color}
                onSelect={ this._onSelectMarker.bind(this) }
              />
            ))}
          </MapView>
          <View style={styles.topButtonContainer}>
            <TouchableOpacity onPress={this.filterRed} style={[styles.bubble, styles.button]}>
              <Text>Red</Text>
            </TouchableOpacity>
            <View style={{marginTop:6}}/>
            <TouchableOpacity onPress={this.filterBlue} style={[styles.bubble, styles.button]}>
              <Text>Blue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginTop: 64,
    height:300
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  button: {
    width: 60,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  topButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 0,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  }
});

module.exports = MapView2;
