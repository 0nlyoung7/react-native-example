var Actions = require('react-native-router-flux').Actions;
var React = require('react-native');
var Button = require('react-native-button');

var {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
} = React;

var KEY_PREFIX = "@example";
var INIT_KEY = KEY_PREFIX + ":key";

var styles = StyleSheet.create({
  wrapper: {},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    color: '#9DD6EB',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

var Splash = React.createClass({
  componentDidMount: function() {

    AsyncStorage.getItem(INIT_KEY).then((userData) => {
      setTimeout(function(){
        if(userData == null ){
          Actions.swiper();
        }else{
          var ud = JSON.parse( userData );
          if( ud.initFlg ){
            Actions.launch();
          } else {
            Actions.swiper();            
          }        
        }
      },1000 );
    }).done();

  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello World</Text>
      </View>
    )
  }
})

module.exports = Splash;