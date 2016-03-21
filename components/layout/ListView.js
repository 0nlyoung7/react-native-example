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

var GiftedListView = require('react-native-gifted-listview');
var Icon = require('react-native-vector-icons/FontAwesome');
var Actions = require('react-native-router-flux').Actions;
var FolderStore = require('../stores/FolderStore' );

import ActionButton from 'react-native-action-button';

var ListViewExample = React.createClass({
  getInitialState: function() {
    return {
      trueSwitchIsOn: true,
      falseSwitchIsOn: false,
    };
  },
  get : function(){

  },
  _onFetch: function(page = 1, callback, options) {

    FolderStore.select( function(rows){
      callback(rows);
    });
  },
  _renderRowView: function(rowData) {
    var row = rowData;

    return (
      <TouchableHighlight 
          style={styles.container} 
          underlayColor='#c8c7cc'
      >  
        <View>
          <View style={ styles.row }>
            <View style={ styles.textContainer }>
              <Text style={ styles.name } numberOfLines={ 1 }>
                { row.name }
              </Text>
              <Text style={ styles.message } numberOfLines={ 1 }>
                { row.message }
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
  _renderEmptyView: function(refreshCallback){
    return (
      <View style={styles.itemWrapper}>
        <Text style={{alignSelf: 'center'}}>
          There is no content
        </Text>
      </View>
    );
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.itemWrapper}>
            <View style={styles.itemValueWrapperR}>
              <View style={{flexDirection:'row'}}>
                <Text style={{alignSelf: 'center',padding:5,alignItems: 'center'}}>AA</Text>
                <Switch
                  onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
                  value={this.state.trueSwitchIsOn} />
                <Text style={{alignSelf: 'center',padding:5,alignItems: 'center'}}>BB</Text>
              </View>
            </View>
          </View>
          <View style={ styles.cellBorder } />
          <GiftedListView
            rowView={this._renderRowView}
            onFetch={this._onFetch}
            firstLoader={true} // display a loader for the first fetching
            pagination={true} // enable infinite scrolling using touch to load more
            refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
            withSections={false} // enable sections
            customStyles={{
              refreshableView: {
                backgroundColor: '#eee',
              },
            }}
            emptyView={this._renderEmptyView}
            PullToRefreshViewAndroidProps={{
              colors: ['#ff0000', '#00ff00', '#0000ff'],
              progressBackgroundColor: '#c8c7cc',
            }}
          />
        </View>
        <ActionButton 
           buttonColor="rgba(231,76,60,1)" 
           onPress={ Actions.modalform } 
        />
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
  message: {
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