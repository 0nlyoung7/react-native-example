import WebViewBridge from 'react-native-webview-bridge';


import ViewSnapshotter from 'react-native-view-snapshot';

import ActionButton from 'react-native-action-button';

import RNFS from "react-native-fs";

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  WebView
} = React;

const injectScript = `
  function webViewBridgeReady(cb) {
    //checks whether WebViewBirdge exists in global scope.
    if (window.WebViewBridge) {
      cb(window.WebViewBridge);
      return;
    }

    function handler() {
      //remove the handler from listener since we don't need it anymore
      document.removeEventListener('WebViewBridge', handler, false);
      //pass the WebViewBridge object to the callback
      cb(window.WebViewBridge);
    }

    //if WebViewBridge doesn't exist in global scope attach itself to document
    //event system. Once the code is being injected by extension, the handler will
    //be called.
    document.addEventListener('WebViewBridge', handler, false);
  }

  function getNaverMapInfo(){
    var result = {};
    var address = $$.getSingle(".map > .address").innerHTML;
    var img = $$.getSingle(".map > .map_sr > img").src;
    var tit = $$.getSingle(".map > .tit").innerHTML;
    var id = $$.getSingle(".map > .map_sr").id;
    result = { T : tit, I : img, A : address, ID : id };
    console.log( result );
    return JSON.stringify(result);
  }

  webViewBridgeReady(function (webViewBridge) {
    webViewBridge.onMessage = function (message) {
      //alert('got a message from Native: ' + message);

      webViewBridge.send( getNaverMapInfo() );
    };
  });
`;

var WebViewExample2 = React.createClass({
  componentDidMount() {
    setTimeout(() => {
      this.refs.webviewbridge.sendToBridge("hahaha");
    }, 5000);
  },
  getInitialState: function(){
      return {
        url:'http://www.naver.com'
      }
  },
  takeSnapshot: function(){
    var ref = React.findNodeHandle(this.refs.container);

    ViewSnapshotter.saveSnapshotToPath(ref, this.imagePath(), (error, successfulWrite) => {
        if (successfulWrite) {
            console.log( 'success' );
            this.setState({catSaved: true})
        } else {
          console.log(error)
        }
    });
  },
  imagePath: function(){
    return RNFS.CachesDirectoryPath+"/webview" + Date.now()+ ".png";
  },
  componentWillMount: function(){
    if( this.props.data ){
      this.setState({
        url:this.props.data,
      });
    }
  },
  onBridgeMessage: function (message) {
    console.log(message);
  },
  render: function() {
    return (
      <View style={[styles.container]} ref="container">
        <WebViewBridge
          ref="webviewbridge"
          style={styles.webView}
          onBridgeMessage={this.onBridgeMessage}
          injectedJavaScript={injectScript}
          scalesPageToFit={true}
          source={{uri:this.state.url}}/>
        <ActionButton 
          buttonColor="rgba(231,76,60,1)" 
          onPress={ this.takeSnapshot }
          offsetY={60}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  webView: {
    height: 350,
  }
});

module.exports = WebViewExample2;