var SQLite = require('react-native-sqlite-storage');

SQLite.DEBUG(true);
SQLite.enablePromise(true);

var database_name = "rnexample.db";
var database_version = "1.0";
var database_displayname = "SQLite Test Database";
var database_size = 200000;
var db;

var tables = [
{
	name: 'TB_MESSAGE',
	columns: [
		{name: 'channel_id', type: 'text'},
		{name: 'sender_id', type: 'text'},
		{name: 'sender_name', type: 'text'},
		{name: 'sender_image', type: 'text'},
		{name: 'message',  type: 'text'},
		{name: 'type', type: 'text'},
		{name: 'time', type: 'integer'},
		{name: 'bookmark_flag', type: 'text DEFAULT "N" '},
		{name: 'owner_id', type: 'text'}
	],
	table_index : [{ type : '', name : 'IDX_TB_MESSAGE', columns : [ 'channel_id', 'owner_id' ] }]
},
{
	name: 'TB_CHANNEL',
	columns: [
		{name: 'channel_id', type: 'text'},
		{name: 'channel_name', type: 'text'},	  
		{name: 'channel_users',  type: 'text'},
		{name: 'channel_image', type: 'text DEFAULT "" '},
  		{name: 'unread_count', type: 'integer'},
 		{name: 'latest_message', type: 'text'},
  		{name: 'channel_updated', type: 'integer'},
  		{name: 'owner_id', type: 'text'}
	],
	table_index : [{ type : 'UNIQUE', name : 'IDX_U_TB_CHANNEL', columns : [ 'channel_id', 'owner_id' ] }, { type : '', name : 'IDX_TB_CHANNEL', columns : [ 'owner_id' ] }]
}
];

SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then((DB) => {
	db = DB;
	console.log("===== this is db success");
	//that.state.progress.push("Database OPEN");
	//that.setState(that.state);
	initDatabase(DB);
}).catch((error) => {
	console.log("===== this is db error");
	console.log(error);
});


var initDatabase = function(db){

	console.log("===== trying to init database");

	db.transaction(createTables).then((result) => {
		console.log(" initDatabase (success) : ");
		console.log(result);
	}).catch((error) =>{
		console.log(" initDatabase (error) : ");
		console.log(error);
	});
}

var createTables= function(tx){

	console.log( "create Tables;");
	
	for( var inx = 0 ; inx < tables.length ; inx++ ){
		var query;
		var table = tables[0];
 		var columns = [];

      	for( var key in table.columns) {
      		var column = table.columns[key];
        	columns.push(column.name + ' ' + column.type);
      	}
		query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';


		console.log( query );

		tx.executeSql(query).catch((error) => {
			console.log(" createDatabase (error) : ");
			console.log(error);
		});
	}

}

module.exports = {
	initDatabase : initDatabase,
	createTables : createTables
}
