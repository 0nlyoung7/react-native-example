var React = require('react-native');
var {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Switch,
  StyleSheet,
  Platform,
  DatePickerIOS,
  ScrollView
} = React;

var HashTagInput = require( '../libs/HashTagInput' );

var FormExample2 = React.createClass({
  getDefaultProps: function () {
    return {
      startDate: new Date(),
      endDate: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
      location: '',
      tag: '',
      showDateStart : false,
      showDateEnd : false
    };
  },
  getInitialState: function() {
    return {
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      startDateStr: yyyymmdd(this.props.startDate),
      endDateStr: yyyymmdd(this.props.endDate),
      timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
      location: '',
      tag: ''
    };
  },
  onPressStartDate: function(date) {
    if( this.state.showDateStart ){
      this.setState({showDateStart: false});
    } else {
      this.setState({showDateStart: true});
    }
  },
  onChangeStartDate: function(date) {
    this.setState({startDate: date, startDateStr: yyyymmdd(date)});
  },
  onPressEndDate: function(date) {
    if( this.state.showDateEnd ){
      this.setState({showDateEnd: false});
    } else {
      this.setState({showDateEnd: true});
    }
  },
  onChangeEndDate: function(date) {
    this.setState({endDate:date, endDateStr: yyyymmdd(date)});
  },
  render: function() {
    return (
      <View style={{marginTop:64}}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.itemWrapper}>
              <Text style={styles.itemLabel}>LOCATION</Text>
              <View style={styles.itemValueWrapperR}>
                <TextInput
                  style={styles.inputWithNoBorder}
                  value={this.state.userId}
                  onChangeText={(text) => this.setState({location: text})}
                  multiline={false}
                  />
              </View>
            </View>
            <View style={styles.itemWrapper}>
              <Text style={styles.itemLabel}>START</Text>
              <View style={styles.itemValueWrapperR}>
                <TouchableHighlight style={styles.container} underlayColor='#c8c7cc' onPress={this.onPressStartDate}>  
                  <Text>{this.state.startDateStr}</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View>
              {this._renderStartDatePicker()}
            </View>
            <View style={styles.itemWrapper}>
              <Text style={styles.itemLabel}>END</Text>
              <View style={styles.itemValueWrapperR}>
                <TouchableHighlight style={styles.container} underlayColor='#c8c7cc' onPress={this.onPressStartDate}> 
                  <Text>{this.state.endDateStr}</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View>
              {this._renderEndDatePicker()}
            </View>
            <HashTagInput />
          </View>
        </View>
      </View>
    );
  },
  _renderStartDatePicker: function() {
    if( !this.state.showDateStart ){
      return null;
    }

    return (
      <DatePickerIOS
        ref="dateStart"
        date={this.state.startDate}
        mode="date"
        timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
        onDateChange={this.onChangeStartDate}
      />
    );
  },
  _renderEndDatePicker: function() {
    if( !this.state.showDateEnd ){
      return null;
    }

    return (
      <DatePickerIOS
        ref="dateEnd"
        date={this.state.endDate}
        mode="date"
        style={{margin:10}}
        timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
        onDateChange={this.onChangeEndDate}
      />
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
  formContainer: {
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
    width: 150,
    alignSelf: 'center',
    padding: 5,
    fontSize:12  
  },
  item: {
    flex: 8,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10
  },
  itemValueWrapperR: {
    flex: 8,
    alignSelf: 'stretch',
    alignItems: 'flex-start'
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
  inputWithNoBorder: {
    width: 250,
    color: '#555555',
    padding: 10,
    height: 48,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#4a8ec2'
  }
});

var yyyymmdd = function(d) {
  var yyyy = d.getFullYear().toString();
  var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based
  var dd  = d.getDate().toString();
  return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
};

module.exports = FormExample2;