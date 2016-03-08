var Swiper = require('react-native-swiper');
var Actions = require('react-native-router-flux').Actions;
var React = require('react-native');
var Button = require('react-native-button');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: 'red'
  },
})

var SwiperExample = React.createClass({
  render: function() {
    return (
      <Swiper style={styles.wrapper} showsButtons={false} loop={false} >
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
          <Button style={styles.button} onPress={Actions.launch}>Start</Button>
        </View>
      </Swiper>
    )
  }
})

module.exports = SwiperExample;