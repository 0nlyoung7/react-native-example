'use strict';

var React = require('react-native');
var Constants = require('../Constants');

var {
  AsyncStorage
} = React;

var SessionStore = {
	save : function(data, cb){
		AsyncStorage.setItem(Constants.SESSION_KEY, JSON.stringify( data ) ).then((userData) => {
			cb( userData );
		}).done();
	},
	get : function(cb){
		AsyncStorage.getItem(Constants.SESSION_KEY).then((userDataStr) => {
			if( userDataStr ){
				cb( JSON.parse(userDataStr) );
			} else {
				cb();
			}
		}).done();
	}
};

module.exports = SessionStore;