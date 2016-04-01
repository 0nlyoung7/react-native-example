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
var Actions = require('react-native-router-flux').Actions;

var ProfileView = require('./Profile');

import ActionButton from 'react-native-action-button';

var ListViewExample = React.createClass({
  getInitialState: function() {
    return {
      name:'',
      message:'',
      image:''
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
  _renderRowView: function(rowData) {
    var row = rowData;

    return (
      <TouchableHighlight 
        underlayColor='#c8c7cc'
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
                <Text stlye={ styles.labelWrap }>
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
  render: function() {
    return (
      <View style={styles.container}>
        {this._renderRowView()}
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
    color: '#999999',
    fontSize: 11,
    borderColor: 'green',
    borderWidth: 1,
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
});

module.exports = ListViewExample;