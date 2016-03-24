'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} = React;

var SocialLogin = require('NativeModules').SocialLogin;
var Actions = require('react-native-router-flux').Actions;

var KEY_PREFIX = "@example";
var USER_KEY = KEY_PREFIX + ":user";

var SocialLoginExample = React.createClass({
  getInitialState() {
    return {
      'alreadyLogined':false,
      'name':'...'
    }
  },

  login() {
    SocialLogin.loginWithFacebook((error, info) => {

      if (error) {
        this.setState({result: error});
      } else {
        var ud = { 'id' : info.uid, 'email': info.email, 'image': info.image, 'name': info.name };
        AsyncStorage.setItem(USER_KEY, JSON.stringify( ud ) ).then((userData) => {
          this.setState({'alreadyLogined':true,'name':info.name});
          Actions.launch();
        }).done();
      }
    });
  },

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.login}>
          <Text style={styles.welcome}>
            Facebook Login
          </Text>
        </TouchableHighlight>
        <Text style={styles.instructions}>
          {this.state.name}
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  seperator:{
    marginBottom: 20
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

module.exports =  SocialLoginExample;