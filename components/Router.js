'use strict';

var React = require('react-native');
var qs = require('qs');
var {AppRegistry, Navigator, StyleSheet,Text,View, Linking} = React;
var Launch = require('./layout/Launch');
var Register = require('./layout/Register');
var Login = require('./layout/Login');
var Login2 = require('./layout/Login2');
var SocialLoginExample = require('./layout/SocialLoginExample');
var RNRF = require('react-native-router-flux');
var {Scene, Router, TabBar, Modal, Schema, Actions, Reducer} = RNRF;

var Error = require('./layout/Error');
var Home = require('./layout/Home');
var TabView = require('./layout/TabView');
var MapViewExample = require('./layout/MapView');
var CalendarExample = require('./layout/Calendar');
var WebViewExample = require('./layout/WebView');
var WebViewExample2 = require('./layout/WebView2');
var FormExample = require('./layout/Form');
var ModalForm = require('./layout/ModalForm');
var ProfileExample = require('./layout/Profile');
var ListViewExample = require('./layout/ListView');
var DetailViewExample = require('./layout/DetailView');
var GridViewExample = require('./layout/GridView');
var SwiperExample = require('./layout/Swiper');
var Splash = require('./layout/Splash');
var Blank = require('./layout/Blank');
var SocialShareExample = require('./layout/SocialShareExample');
var ReactNativeModalBox = require('./layout/ReactNativeModalBox');

import DBHelper from './libs/DBHelper'

class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex:1, backgroundColor:"transparent",justifyContent: "center",
        alignItems: "center",}

});

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{

        console.log( state );
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

var Example = React.createClass({
    getInitialState: function(){
        return {
          launchFromShare: false,
          url:null
        }
    },
    componentWillMount: function(){
        Linking.addEventListener('url', this._handleOpenURL);
    },
    componentDidMount: function(){
        DBHelper.initDB();

        var self = this;
        setTimeout(function(){
            if( self.state.launchFromShare ){
                Actions.webview2({url:url});
                self.setState({
                  launchFromShare: false,
                  url:null,
                });
            } else {
                Actions.splash();
            }
        }, 200 )
    },
    componentWillUnmount: function(){
        Linking.removeEventListener('url', this._handleOpenURL);
    },
    _handleOpenURL: function(event){
        var url = event.url.replace('myrnexample://', '');
        this.setState({
            url:url,    
            launchFromShare: true,
        });

        Actions.webview2({data:url});
    },
    render: function(){
        return (
            <Router createReducer={reducerCreate} sceneStyle={{backgroundColor:'#FFFFFF'}}>
                <Scene key="modal" component={Modal} >
                    <Scene key="root" hideNavBar={true}>
                        <Scene key="register" component={Register} title="Register"/>
                        <Scene key="home" component={Home} title="Replace" type="replace"/>
                        <Scene key="login" direction="Vertical">
                            <Scene key="loginModal" hideNavBar={true} component={Login}  schema="modal"/>
                            <Scene key="loginModal2" hideNavBar={true} component={Login2} title="Login2"/>
                        </Scene>
                        <Scene key="socialLogin" hideNavBar={true} component={SocialLoginExample} title="SocialLogin"/>
                        <Scene key="register2" component={Register} title="Register2"  schema="withoutAnimation"/>
                        <Scene key="error" type="modal" component={Error}/>
                        <Scene key="modalBox" type="modal" component={ReactNativeModalBox}/>
                        <Scene key="webview" title="WebView" component={WebViewExample} showNavigationBar={false}/>
                        <Scene key="webview2" title="WebView2" component={WebViewExample2} showNavigationBar={false}/>
                        <Scene key="form" title="form" component={FormExample} showNavigationBar={false}/>
                        <Scene key="profile" title="profile" component={ProfileExample} showNavigationBar={false}/>
                        <Scene key="gridview" title="gridview" component={GridViewExample} showNavigationBar={false}/>
                        <Scene key="calendarview" title="calendarview" component={CalendarExample} showNavigationBar={false}/>
                        <Scene key="socialview" title="socialview" component={SocialShareExample} showNavigationBar={false}/>

                        <Scene key="tabbar" tabs={true} default="tab1">
                            <Scene key="tab1" title="Tab #1" initial={true} icon={TabIcon}>
                                <Scene key="tab1_1" component={TabView} title="Tab #1_1" />
                                <Scene key="tab1_2" component={TabView} title="Tab #1_2" />
                            </Scene>
                            <Scene key="tab2" title="Tab #2" icon={TabIcon}>
                                <Scene key="tab2_1" component={TabView} title="Tab #2_1" />
                                <Scene key="tab2_2" component={TabView} title="Tab #2_2" />
                            </Scene>
                            <Scene key="tab3" title="Tab #3" icon={TabIcon} >
                                <Scene key="listView" title="ListView" component={ListViewExample} />
                                <Scene key="detailView" title="DetailView" component={DetailViewExample} />
                                <ModalForm key="modalform" title="Form"  />
                            </Scene>
                            <Scene key="tab4" title="Tab #4" icon={TabIcon} >
                                <Scene key="mapView" title="MapView" component={MapViewExample} />
                            </Scene>
                        </Scene>
                        <Scene key="launch" component={Launch}  title="Launch" hideNavBar={true}/>
                        <Scene key="swiper" component={SwiperExample}  title="Swiper" hideNavBar={true}/>
                        <Scene key="splash" title="splash" component={Splash} showNavigationBar={false} schema="withoutAnimation"/>
                        <Scene key="blank" initial={true} title="blank" component={Blank} showNavigationBar={false} schema="withoutAnimation"/>
                    </Scene>
                    <Scene key="error" component={Error}/>
                </Scene>
            </Router>
        );
    }
})

module.exports = Example;