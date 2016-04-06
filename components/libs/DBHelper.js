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
		name: 'TB_POST',
		columns: [
			{name: 'post_id', type: 'text'},
			{name: 'forder_id', type: 'text'},
			{name: 'title', type: 'text'},
			{name: 'tag', type: 'text'},
			{name: 'memo', type: 'text'},

			{name: 'thumbnail', type: 'text'},
			{name: 'url',  type: 'text'},
			{name: 'map_url',  type: 'text'},
			
			{name: 'location', type: 'text'},
			{name: 'lat', type: 'integer'},
			{name: 'lon', type: 'integer'},

			{name: 'created', type: 'integer'},
			{name: 'updated', type: 'integer'},
			{name: 'owner_id', type: 'text'}
		],
		table_index : [{ type : '', name : 'IDX_TB_POST', columns : [ 'post_id', 'owner_id' ] }]
	},
	{
		name: 'TB_FOLDER',
		columns: [
			{name: 'forder_id', type: 'text'},
			{name: 'location', type: 'text'},
			{name: 'tag', type: 'text'},
			{name: 'type', type: 'text'},
			{name: 'start',  type: 'text'},
			{name: 'end',  type: 'text'},
			{name: 'lat', type: 'integer'},
			{name: 'lon', type: 'integer'},
			{name: 'created', type: 'integer'},
			{name: 'updated', type: 'integer'},
			{name: 'owner_id', type: 'text'}
		],
		table_index : [{ type : '', name : 'IDX_TB_FOLDER', columns : [ 'forder_id', 'owner_id' ] }]
	}
];


var initDB = function(resetFlag){
	//resetFlag = true;

	SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then((DB) => {
		db = DB;

		if(resetFlag){
			db.transaction(dropTables).then((result) => {
				console.log(" dropDatabase (success) : ");
				console.log(result);

				create();
			}).catch((error) =>{
				console.log(" dropDatabase (error) : ");
				console.log(error);
			});
		} else {
			create();
		}
	}).catch((error) => {
		console.log("===== this is db error");
		console.log(error);
	});

	console.log("===== trying to init database");

	var create = function(){
		db.transaction(createTables).then((result) => {
			console.log(" initDatabase (success) : ");
			console.log(result);
		}).catch((error) =>{
			console.log(" initDatabase (error) : ");
			console.log(error);
		});
	}
}

var openDB = function(cb){

	if( !db ){
		SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then((DB) => {
			db = DB;
			cb(db);
		}).catch((error) => {
			console.log("===== this is db error");
			console.log(error);
		});
	} else {
		cb(db);
	}
}


var createTables= function(tx){

	console.log( "create Tables;");
	
	for( var inx = 0 ; inx < tables.length ; inx++ ){
		var query;
		var table = tables[inx];
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

		// TABLE info에 index정보가 있다면, index를 생성
		if( table.table_index != undefined ){
			for( var key in table.table_index ){
				var tableInx = table.table_index[key];
				var query2 = 'CREATE '+ tableInx.type +' INDEX IF NOT EXISTS ' + tableInx.name +' ON ' +table.name + ' (' + tableInx.columns.join(',') + ')';
				tx.executeSql(query2).catch((error) => {
					console.log(" createDatabase (error) : ");
					console.log(error);
				});
			}
		}
	}
}

var dropTables= function(tx){

	console.log( "drop Tables;");
	
	for( var inx = 0 ; inx < tables.length ; inx++ ){
		var query;
		var table = tables[inx];
		query = 'DROP TABLE IF EXISTS ' + table.name;

		console.log( query );

		tx.executeSql(query).catch((error) => {
			console.log(" dropDatabase (error) : ");
			console.log(error);
		});
	}

}

module.exports = {
	initDB : initDB,
	createTables : createTables,
	openDB : openDB
}
