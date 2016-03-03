var React = require('react-native');
var {
  View,
  Text,
  Image,
  Switch,
  PixelRatio,
  StyleSheet
} = React;

var ProfileExample = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar} />
        <View>
          <View style={ styles.profileWrap }>
            <Image
              source={ { uri: 'https://scontent.xx.fbcdn.net/hprofile-xat1/v/t1.0-1/p320x320/12027641_10156169780310372_5819557272906950779_n.jpg?oh=832fb4926c959819d9a75df88d6fe5e3&oe=57609F35' } }
              style={ styles.cellImage } />
            <View style={ styles.textContainer }>
              <Text style={ styles.name } numberOfLines={ 1 }>
                Name
              </Text>
              <View style={ styles.countWrapT } >
                <Text stlye={ styles.labelW }>
                  Folder
                </Text>
                <Text style={ styles.countT} numberOfLines={ 1 }>
                  100
                </Text>
              </View>
              <Text style={ styles.message } numberOfLines={ 1 }>
                Messages
              </Text>
              <View style={ styles.countWrapB } >
                <Text stlye={ styles.labelWrap }>
                  Scrap
                </Text>
                <Text style={ styles.countB} numberOfLines={ 1 }>
                  2
                </Text>
              </View>
            </View>
          </View>
          <View style={ styles.cellBorder } />
        </View>
      </View>
    );
  },
  onPress: function() {
    console.log(this.state.userId);
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
  profileWrap: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10
  },
  cellImage: {
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    width: 60
  },
  textContainer: {
    flex: 1
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2
  },
  countWrapT: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row'
  },
  countWrapB: {
    position: 'absolute',
    top: 30,
    right: 0,
    flexDirection: 'row'
  },
  message: {
    color: '#999999',
    fontSize: 12,
  },
  labelWrap: {
    color: '#999999',
    fontSize: 12,
  },
  countT: {
    color: 'red',
    fontSize: 12,
    width: 50,
    textAlign : 'right',
  },
  countB: {
    color: 'green',
    fontSize: 12,
    width: 50,
    textAlign : 'right',
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(),
    marginLeft: 4
  }
});

module.exports = ProfileExample;