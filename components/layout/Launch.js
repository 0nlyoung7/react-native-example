'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, TouchableHighlight} = React;
var Button = require('react-native-button');
var Actions = require('react-native-router-flux').Actions;

class Launch extends React.Component {
    componentDidMount() {
        setTimeout(function(){              
            // Actions.tabbar();
        }, 500 ) 
    }
    render(){
        return (
            <View style={styles.container}>
                <Text>Launch page</Text>
                <Button onPress={()=>Actions.login({data:"Custom data", title:'Custom title' })}>Go to Login page</Button>
                <Button onPress={Actions.register}>Go to Register page</Button>
                <Button onPress={Actions.register2}>Go to Register page without animation</Button>
                <Button onPress={Actions.webview}>Go to WebView page</Button>
                <Button onPress={Actions.webview2}>Go to WebView page with Bridge</Button>
                <Button onPress={()=>Actions.error("Error message")}>Popup error</Button>
                <Button onPress={Actions.modalBox}>PopUp with ReactNativeModalBox</Button>
                <Button onPress={Actions.tabbar}>Go to TabBar page</Button>
                <Button onPress={Actions.form}>Go to Form page</Button>
                <Button onPress={Actions.profile}>Go to Profile page</Button>
                <Button onPress={Actions.listview}>Go to ListView page</Button>
                <Button onPress={Actions.gridview}>Go to GridView page</Button>
                <Button onPress={Actions.calendarview}>Go to CalendarView page</Button>
                <Button onPress={()=>Actions.showActionSheet({callback:index=>alert("Selected:"+index)})}>Show ActionSheet</Button>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
});

module.exports = Launch;