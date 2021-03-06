var React = require('react-native');
var {
  View,
  Text,
  Image,
  Switch,
  PixelRatio,
  StyleSheet,
  TouchableHighlight
} = React;

var Icon = require('react-native-vector-icons/FontAwesome');
var GiftedListView = require('react-native-gifted-listview');
var Actions = require('react-native-router-flux').Actions;

var List1 = require('./List1');
var List2 = require('./List2');

import ActionButton from 'react-native-action-button';

var ListViewExample = React.createClass({
  getInitialState: function() {
    return {
      name:'',
      message:'',
      image:'',
      tabInx:0
    };
  },
  componentDidMount: function() {
    var param = this.props.data;
    console.log( param );
    if ( param ){
      param = JSON.parse( param );
      this.setState({location: param.location, tag: param.tag});
    }
  },
  _renderTopView: function() {
    return (
      <TouchableHighlight 
        underlayColor='#c8c7cc'
        style={{margin:10}}
      >
        <View>
          <View style={ styles.row } >
            <View style={ styles.textContainer }>
              <Text style={ styles.name } numberOfLines={ 1 }>
                { this.state.location }
              </Text>
              <Text style={ styles.tag } numberOfLines={ 1 }>
                { this.state.tag }
              </Text>
              <View style={ styles.countWrapB } >
                <Text style={ styles.countB} numberOfLines={ 1 }>
                  2
                </Text>
                <Text style={ styles.labelWrap }>
                  Pin
                </Text>
              </View>
            </View>
          </View>
          <View style={ styles.cellBorder } />
        </View>
      </TouchableHighlight>
    );
  },
  _getTabStyle: function(tabIndex){
    if( tabIndex == this.state.tabInx ){
      return styles.tabItemOn;
    } else {
      return styles.tabItemOff;
    }
  },
  _onPressTab0: function(tabIndex){
    this.setState( {tabInx:0} );
  },
  _onPressTab1: function(tabIndex){
    this.setState( {tabInx:1} );
  },
  _renderTabbar: function() {
    return (
      <View style={{'flexDirection':'row'}}>
        <TouchableHighlight style={ this._getTabStyle(0) } onPress={this._onPressTab0} >
          <Text style={ styles.tabTitle }>
            Scrap
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={ this._getTabStyle(1) } onPress={this._onPressTab1}  >
          <Text style={ styles.tabTitle }>
            Meal
          </Text>          
        </TouchableHighlight>
      </View>
    );
  },
  _renderListView: function() {
    if( 0 == this.state.tabInx ){
      return (
        <List1 />
      );
    } else {
      return (
        <List2 />
      );      
    }
  },
  render: function() {
    return (
      <View style={styles.container}>
        {this._renderTopView()}
        {this._renderTabbar()}
        {this._renderListView()}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 64,
  },
  navBar: {
    height: 64,
    backgroundColor: '#f8f8f8'
  },
  row: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    height: 80,
    padding: 10
  },
  textContainer: {
    flex: 1
  },
  countWrapB: {
    position: 'absolute',
    top: 40,
    right: 0,
    flexDirection: 'row',
  },
  labelWrap: {
    color: '#999999'
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2
  },
  tag: {
    marginTop:20,
    color: '#999999',
    fontSize: 12,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(),
    marginLeft: 4
  },
  itemWrapper: {
    height: 40,
    margin: 10,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  itemValueWrapperR: {
    flex: 8,
    alignSelf: 'center',
    alignItems: 'flex-end',
    padding: 5
  },
  countB: {
    color: 'green',
    fontSize: 13,
    width: 30,
    textAlign : 'right',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  tabItemOn: {
    flex: 1,
    underlayColor: '#c8c7cc',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderColor: '#455469',
    borderWidth: 1,
    backgroundColor: '#455469',
    padding: 20,
    color: 'white'
  },
  tabItemOff: {
    flex: 1,
    underlayColor: '#c8c7cc',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderColor: '#455469',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 20,
    color: '#455469'
  },
  tabTitle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center'
  }
});

module.exports = ListViewExample;