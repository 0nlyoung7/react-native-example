'use strict';

var React = require('react-native');
var {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Switch,
  StyleSheet,
  AsyncStorage
} = React;

var Button = require('react-native-button');

var KEY_PREFIX = "@example";
var USER_KEY = KEY_PREFIX + ":user";

var Login = React.createClass({
    componentDidMount: function() {
        var self = this;
        AsyncStorage.getItem(USER_KEY).then((userData) => {
            if(userData != null ){
                var user = JSON.parse( userData );
                self.setState({userId: user.id, password: user.pw, alreadyLogined:true });
            }
        }).done();
    },
    getInitialState: function () {
        return {
            date: null,
            userId: null,
            password: null,
            alreadyLogined : false
        };
    },
    _btnClick: function(){

    },
    render: function () {
        return (
            <View style={styles.container}>
                <View style={styles.loginContainer}>               
                    <TextInput
                        style={styles.input}
                        value={this.state.userId}
                        onChangeText={(text) => this.setState({userId: text})}
                        placeholder={'Enter User ID'}
                        maxLength={12}
                        multiline={false}
                    />
                    <TextInput
                        style={styles.input}
                        value={this.state.password}
                        onChangeText={(text) => this.setState({password: text})}
                        placeholder={'Enter Password'}
                        secureTextEntry={true}
                        maxLength={12}
                        multiline={false}
                    />
                    {this.renderView()}
                </View>
            </View>
        );
    },
    renderView: function() {
        if (this.state.alreadyLogined) {
            return ( <Button style={styles.button} onPress={this._btnLogout}>Log out</Button> );
        }

        return (
            <Button style={styles.button} onPress={this._btnLogin}>Sign In</Button>
        );
    },
    _btnLogin: function(){
        var ud = { 'id':this.state.userId, 'pw': this.state.password };
        AsyncStorage.setItem(USER_KEY, JSON.stringify( ud ) ).then((userData) => {
            this.setState({'alreadyLogined':true});
            console.log( 'save done' );
        }).done();
    },
    _btnLogout: function(){
        AsyncStorage.removeItem(USER_KEY).then((userData) => {
            this.setState({'alreadyLogined':false, 'userId':'', 'password':''});
            console.log( 'clear done' );
        }).done();
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 250,
        color: '#555555',
        padding: 10,
        height: 50,
        borderColor: '#dadada',
        borderWidth: 1,
        borderRadius: 4,
        alignSelf: 'center',
        backgroundColor: '#ffffff'
    },
});



module.exports = Login;