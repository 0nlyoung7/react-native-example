'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, TextInput, Image} = React;
var Button = require('react-native-button');
var Actions = require('react-native-router-flux').Actions;
var SessionStore = require('../stores/SessionStore' );

var Register = React.createClass({
    getInitialState: function() {
        return {
            id: "",
            email:"",
            image:"",
            name: "",
            message: "",
            registered: false
        };
    },
    componentDidMount: function() {
        var self = this;
        SessionStore.get(function(user){
            self.setState({
                id: user.id,
                email: user.email,
                image: user.image,
                name: user.name,
                message: user.message
            });
        });
    },
    render: function() {
        return (
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <View style={styles.itemWrapper}>
                        <Image
                            defaultSource={require('../images/default_user.jpg')}
                            source={ { uri: this.state.image } }
                            style={ styles.cellImage } />
                    </View>
                    <TextInput
                        style={styles.input}
                        value={this.state.name}
                        onChangeText={(text) => this.setState({name: text})}
                        placeholder={'Enter User Name'}
                        maxLength={12}
                        multiline={false}
                    />
                    <TextInput
                        style={styles.input}
                        value={this.state.message}
                        onChangeText={(text) => this.setState({message: text})}
                        placeholder={'Enter User Message'}
                        maxLength={12}
                        multiline={false}
                    />
                    <View style={styles.itemWrapper}>
                        {this.renderView()}
                    </View>
                </View>
            </View>
        );
    },
    renderView: function() {
        if (!this.state.registered) {
            return ( <Button style={styles.button} onPress={this._btnRegister}>Register</Button> );
        }

        return (
            <Button style={styles.button} onPress={this._btnUpdate}>Update</Button>
        );
    },
    _btnRegister: function(){
        var self = this;
        var ud = { 'id' : this.state.id, 'email': this.state.email, 'image': this.state.image, 'name': this.state.name,
         'message': this.state.message, 'registered':true };

        SessionStore.save( ud, function(res){
            self.setState({'registered':true});
            Actions.launch();
        });
    },
    _btnUpdate: function(){

    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    itemWrapper: {
        width: 250,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
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
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        backgroundColor: 'red'
    },
    cellImage: {
        marginBottom: 20,
        height: 120,
        borderRadius: 60,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

module.exports = Register;