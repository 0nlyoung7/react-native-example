var React = require('react-native');
var {AppRegistry, Navigator, StyleSheet,Text,View} = React;
var RNGMap = require('react-native-gmaps');

var RNGMapsExample = React.createClass({
  render() {
    return (
      <RNGMap
        ref={'gmap'}
        style={ { height: 500, width: 500 } }
        markers={ [
              { coordinates: {lng: 0.1, lat: 51.0}, id:0 },
              { 
                coordinates: {lng: -0.2, lat: 51.0}, 
                title: "Click marker to see this title!",
                snippet: "Subtitle",
                id: 1,
                /*
                 * Able to use "my_icon" or {uri: 'my_icon', width: 100, height: 100 } here as well
                 */
                icon: {uri: 'my_icon', width: 100, height: 100 }, // <-- android/app/src/main/res/drawable/my_icon.png
                /*
                 * color is only working with default icon
                 */
              }
          ] }
        zoomLevel={5}
        onMapChange={(e) => console.log("1111111 : " + JSON.stringify(e))}
        onMapError={(e) => console.log('Map error --> ', e)}
        center={ { lng: 34.1, lat: 51.0 } } 
        /*
         * clickMarker shows Info Window of Marker with id: 0,
         * hides Info Window if given null
         */
        clickMarker={1}/>
    );
  }
});

AppRegistry.registerComponent('BaseApp', () => RNGMapsExample);
