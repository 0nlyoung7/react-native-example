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

var rows = [];

rows.push(
  { 
    id: 'id',
    picture: "https://scontent.xx.fbcdn.net/hprofile-xat1/v/t1.0-1/p320x320/12027641_10156169780310372_5819557272906950779_n.jpg?oh=832fb4926c959819d9a75df88d6fe5e3&oe=57609F35",
    name: '#Seoul #Chicken #Hamburger #Stake',
    text: 'message',
    date: '123'
  }
);

var ListViewExample = React.createClass({
  getInitialState: function() {
    return {
      trueSwitchIsOn: true,
      falseSwitchIsOn: false,
    };
  },
  _onFetch: function(page = 1, callback, options) {
    setTimeout(() => {
      callback(rows);
    }, 1000); // simulating network fetching
  },
  _renderRowView: function(rowData) {
    var person = rowData;

      return (
      <TouchableHighlight 
          style={styles.container} 
          underlayColor='#c8c7cc'
      >  
        <View>
          <View style={ styles.row }>
            <View style={ styles.textContainer }>
              <Text style={ styles.name } numberOfLines={ 1 }>
                { person.name }
              </Text>
              <Text style={ styles.message } numberOfLines={ 1 }>
                { person.text }
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
        <View style={styles.navBar} />
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

            PullToRefreshViewAndroidProps={{
              colors: ['#ff0000', '#00ff00', '#0000ff'],
              progressBackgroundColor: '#c8c7cc',
            }}
          />
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
});

module.exports = ListViewExample;