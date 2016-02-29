var React = require('react-native');
var {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Switch,
  StyleSheet
} = React;

var HashTagInput = require( '../libs/HashTagInput' );

var FormExample2 = React.createClass({
  getInitialState: function() {
    return {
      trueSwitchIsOn: true,
      falseSwitchIsOn: false,
    };
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.input}
            value={this.state.userId}
            onChangeText={(text) => this.setState({userId: text})}
            placeholder={'Enter User ID'}
            maxLength={12}
            multiline={false}
            />

          <TextInput
            style={styles.input}
            value={this.state.password}
            onChangeText={(text) => this.setState({password: text})}
            placeholder={'Enter Password'}
            secureTextEntry={true}
            maxLength={12}
            multiline={false}
            />

          <View style={styles.itemWrapper}>
            <Text style={styles.itemLabel}>LOGIN</Text>
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

          <HashTagInput />
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
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemWrapper: {
    height: 50,
    margin: 10,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderColor: '#dadada',
    borderWidth: 1,
    borderRadius: 4
  },
  itemLabel: {
    flex: 2,
    width:100,
    alignSelf: 'center',
    padding: 10
  },
  item: {
    flex: 8,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10
  },
  itemValueWrapperR: {
    flex: 8,
    alignSelf: 'center',
    alignItems: 'flex-end',
    padding: 10
  },
  input: {
    width: 250,
    color: '#555555',
    padding: 10,
    height: 50,
    borderColor: '#dadada',
    borderWidth: 1,
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor: '#ffffff'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#4a8ec2'
  },
  label: {
    width: 230,
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff'
  }
});

module.exports = FormExample2;