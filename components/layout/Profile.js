var React = require('react-native');
var {
  View,
  Text,
  Image,
  Switch,
  PixelRatio,
  StyleSheet
} = React;

var Profile = React.createClass({
  getDefaultProps() {
    return {
      customStyles: {},
      name: 'User Name',
      image: 'http://www.aba.805stats.com/img/default.jpg',
      message: 'User Message'
    };
  },
  propTypes: {
    customStyles: React.PropTypes.object,
    name: React.PropTypes.string,
    image: React.PropTypes.string,
    message: React.PropTypes.string,
    onRefresh: React.PropTypes.func
  },
  getInitialState() {
    var simage = this.props.image != undefined? this.props.image:this.getDefaultProps().image;
    var sname = this.props.name != undefined? this.props.name:this.getDefaultProps().name;
    var smessage = this.props.message != undefined? this.props.message:this.getDefaultProps().message;

    return {
      name: sname,
      image: simage,
      message: smessage
    }
  },
  refresh: function() {
    var simage = this.props.image != undefined? this.props.image:this.state.image;
    var sname = this.props.name != undefined? this.props.name:this.state.name;
    var smessage = this.props.message != undefined? this.props.message:this.state.message;
    this.setState({
      name: sname,
      message: smessage,
      image: simage
    });
  },
  render() {
    return (
      <View>
        <View>
          <View style={ styles.profileWrap }>
            <Image
              defaultSource={require('../images/default_user.jpg')}
              source={ { uri: this.state.image } }
              style={ styles.cellImage } />
            <View style={ styles.textContainer }>
              <Text style={ styles.name } numberOfLines={ 1 }>
                {this.state.name}
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
                {this.state.message}
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

module.exports = Profile;