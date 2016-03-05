'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var GridView = require('react-native-grid-view');
var PER_ROW = 2;

var Trip = React.createClass({
  render: function() {
      return (
        <View style={styles.trip} >
          <Text 
            style={styles.title}
            numberOfLines={3}>{this.props.trip.title}</Text>
          <Image
            source={{uri: this.props.trip.thumbnail}}
            style={styles.thumbnail}
          />
          <View style={styles.descrition}>
            <Text style={styles.tag}>{this.props.trip.tag}</Text>
            <Text style={styles.url}>{this.props.trip.url}</Text>
          </View>
        </View>
      )
  },
});

var GridViewExample = React.createClass({
  getInitialState: function() {
    return {
      dataSource: null,
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    var items = [];

    items.push(
      {'thumbnail':'http://shopping.phinf.naver.net/main_9111369/9111369543.1.jpg?type=f140', 'title':'Seoul', 'url':'http://google.com', 'tag':'#1 #2 #3 #4'},
      {'thumbnail':'http://shopping.phinf.naver.net/main_9480598/9480598191.jpg?type=f140', 'title':'Osaka', 'url':'http://google.com', 'tag':'#4 #5' },
      {'thumbnail':'http://shopping.phinf.naver.net/main_9379765/9379765756.jpg?type=f140', 'title':'Tokyo', 'url':'http://google.com', 'tag':'#6 #8' }
    );

    this.setState({
      dataSource: items,
      loaded: true,
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar} />
        <View>
          {this.renderView()}
        </View>
      </View>
    );
  },

  renderView: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <GridView
        items={this.state.dataSource}
        itemsPerRow={PER_ROW}
        renderItem={this.renderItem}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View>
        <Text>
          Loading trips...
        </Text>
      </View>
    );
  },

  renderItem: function(item, i) {
      return <Trip key={i} trip={item} />
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  navBar: {
    height: 64,
    backgroundColor: '#f8f8f8'
  },
  trip: {
    height: 200,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 10,
    marginBottom: 8,
    width: 90,
    textAlign: 'center',
  },
  descrition: {
    flexDirection:'column',
    marginTop: 10
  },
  tag: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 12
  },
  url: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 12
  },
  thumbnail: {
    width: 120,
    height: 120,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = GridViewExample;