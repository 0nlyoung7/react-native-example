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

var List1 = React.createClass({

  _renderRowView: function(rowData) {
    var row = rowData;

    return (
      <TouchableHighlight 
        underlayColor='#c8c7cc'
        style={{margin:10}}
      >
        <View>
          <View style={ styles.row } >
            <View style={ styles.textContainer }>
              <Text style={ styles.name } numberOfLines={ 1 }>
                { row.location }
              </Text>
              <Text style={ styles.tag } numberOfLines={ 1 }>
                { row.tag }
              </Text>
            </View>
          </View>
          <View style={ styles.cellBorder } />
        </View>
      </TouchableHighlight>
    );
  },
  _onFetch: function(page = 1, callback, options) {
    var rows = [{'location':'Toyko', 'tag':'#123 #456' }];
    callback(rows);
  },

  render: function() {
    return (
      <View>
        <GiftedListView
          rowView={this._renderRowView}
          onFetch={this._onFetch}
          firstLoader={true} // display a loader for the first fetching
          pagination={false} // enable infinite scrolling using touch to load more
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
    );
  },

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

module.exports = List1;