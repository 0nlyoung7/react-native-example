var React = require('react-native');
var {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Switch,
  StyleSheet,
  NavigatorIOS,
  TouchableOpacity,
  PixelRatio
} = React;


import {Router, Route, Schema, Animations, TabBar, Actions} from 'react-native-router-flux'

var FolderFormView = require( '../forms/FolderForm' );

class ModalFormExample extends Route {
    className(){
        return "Route";
    }
}

ModalFormExample.defaultProps = {
  onLeft: function(){
    Actions.pop();
  },
  leftTitle: "Close",
  onRight: function(){

    FolderFormView.onSave( function(result){
      console.log( result );
    });
  },
  rightTitle: "Save",
  component: FolderFormView
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  navigator : {
    backgroundColor: 'red'
  },
  scene: {
    backgroundColor: '#fff',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  bar: {
    backgroundColor: '#f8f8f8',
    borderBottomColor: '#b2b2b2',
    borderBottomWidth: ( 1 / PixelRatio.get() ),
  },
  barTitleText: {
    fontFamily: '.HelveticaNeueInterface-MediumP4',
    fontSize: 17,
    marginTop: 11 + ( 1 / PixelRatio.get() ),
  },
  barLeftButton: {
    paddingRight: 40,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  barRightButton: {
    paddingLeft: 40,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  barBackButton: {
    paddingRight: 40,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  barBackButtonText: {
    marginTop: 11,
    marginLeft: 6,
  },
});

module.exports = ModalFormExample;