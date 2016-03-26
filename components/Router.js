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
var {Route, Schema, Animations, Actions, TabBar} = RNRF;
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
var GridViewExample = require('./layout/GridView');
var SwiperExample = require('./layout/Swiper');
var Splash = require('./layout/Splash');
var Blank = require('./layout/Blank');
var SocialShareExample = require('./layout/SocialShareExample');
var ReactNativeModalBox = require('./layout/ReactNativeModalBox');

import DBHelper from './libs/DBHelper'

// Redux stuff is optional
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

function reducer(state = {}, action) {
    switch (action.type) {
        case Actions.BEFORE_ROUTE:
            //console.log("BEFORE_ROUTE:", action);
            return state;
        case Actions.AFTER_ROUTE:
            //console.log("AFTER_ROUTE:", action);
            return state;
        case Actions.AFTER_POP:
            //console.log("AFTER_POP:", action);
            return state;
        case Actions.BEFORE_POP:
            //console.log("BEFORE_POP:", action);
            return state;
        case Actions.AFTER_DISMISS:
            //console.log("AFTER_DISMISS:", action);
            return state;
        case Actions.BEFORE_DISMISS:
            //console.log("BEFORE_DISMISS:", action);
            return state;
        default:
            return state;
    }

}
let store = createStore(reducer);
const Router = connect()(RNRF.Router);

class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}

class Header extends React.Component {
    render(){
        return <Text>Header</Text>
    }
}

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
            <Provider store={store}>
                <Router hideNavBar={true} name="root">
                    <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
                    <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
                    <Schema name="withoutAnimation"/>
                    <Schema name="tab" type="switch" icon={TabIcon}/>

                    <Route name="register" component={Register} title="Register"/>
                    <Route name="showActionSheet" type="actionSheet" title="What do you want to do?" options={['Delete', 'Save', 'Cancel']} cancelButtonIndex={2} destructiveButtonIndex={0}/>
                    <Route name="home" component={Home} title="Replace" type="replace"/>
                    <Route name="login" schema="modal">
                        <Router name="loginRouter">
                            <Route name="loginModal" hideNavBar={true} component={Login}  schema="modal"/>
                            <Route name="loginModal2" hideNavBar={true} component={Login2} title="Login2"/>

                        </Router>
                    </Route>
                    <Route name="socialLogin" hideNavBar={true} component={SocialLoginExample} title="SocialLogin"/>
                    <Route name="register2" component={Register} title="Register2"  schema="withoutAnimation"/>
                    <Route name="error" type="modal" component={Error}/>
                    <Route name="modalBox" type="modal" component={ReactNativeModalBox}/>
                    <Route name="webview" title="WebView" component={WebViewExample} showNavigationBar={false}/>
                    <Route name="webview2" title="WebView2" component={WebViewExample2} showNavigationBar={false}/>
                    <Route name="form" title="form" component={FormExample} showNavigationBar={false}/>
                    <ModalForm name="modalform" title="form" wrapRouter={true}  />
                    <Route name="profile" title="profile" component={ProfileExample} showNavigationBar={false}/>
                    <Route name="gridview" title="gridview" component={GridViewExample} showNavigationBar={false}/>
                    <Route name="calendarview" title="calendarview" component={CalendarExample} showNavigationBar={false}/>
                    <Route name="socialview" title="socialview" component={SocialShareExample} showNavigationBar={false}/>

                    <Route name="tabbar">
                        <Router footer={TabBar} showNavigationBar={false} tabBarStyle={{backgroundColor: '#f2f2f2'}}>
                            <Route name="tab1" schema="tab" title="Tab #1" initial={true}>
                                <Router onPop={()=>{console.log("onPop is called!"); return true} }>
                                    <Route name="tab1_1" component={TabView} title="Tab #1_1" />
                                    <Route name="tab1_2" component={TabView} title="Tab #1_2" />
                                </Router>
                            </Route>
                            <Route name="tab2" schema="tab" title="Tab #2" >
                                <Router onPop={()=>{console.log("onPop is called!"); return true} }>
                                    <Route name="tab2_1" component={TabView} title="Tab #2_1" />
                                    <Route name="tab2_2" component={TabView} title="Tab #2_2" />
                                </Router>
                            </Route>
                            <Route name="tab3" schema="tab" title="ListView" component={ListViewExample} />
                            <Route name="tab4" schema="tab" title="MapView" component={MapViewExample} />
                        </Router>
                    </Route>
                    <Route name="launch" component={Launch} wrapRouter={true} title="Launch" hideNavBar={true}/>
                    <Route name="swiper" component={SwiperExample} wrapRouter={true} title="Swiper" hideNavBar={true}/>
                    <Route name="splash" title="splash" component={Splash} showNavigationBar={false} schema="withoutAnimation"/>
                    <Route name="blank" initial={true} title="blank" component={Blank} showNavigationBar={false} schema="withoutAnimation"/>
                </Router>
            </Provider>
        );
    }
})

module.exports = Example;