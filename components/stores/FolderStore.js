var DBHelper = require( '../libs/DBHelper' );

var FolderStore = {
	save : function(data, cb){
		DBHelper.openDB(function(db){
			var dataArr = [];
			dataArr.push( data.id );
			dataArr.push( data.name );
			dataArr.push( data.message );
			dataArr.push( data.userId );
			db.executeSql('INSERT INTO TB_FOLDER (forder_id, name, message, owner_id) values ( ?, ?, ?, ? )', dataArr).then(() =>{
				console.log({});
				cb({});
			}).catch((error) =>{
				console.log("Received insert error: ", error);
				cb(null);
			});
    	});
	},
	select : function(cb){
		DBHelper.openDB( function(db){
			db.executeSql('SELECT * FROM TB_FOLDER').then((results) =>{
				console.log( results );
				if(results && results.length > 0 ) {
					var folders = [];
					var len = results[0].rows.length;
					for (let i = 0; i < len; i++) {
						let row = results[0].rows.item(i);
						folders.push( row );
					}
					cb(folders);

				} else {
					cb([]);		
				}
			}).catch((error) =>{
				console.log("Received select error: ", error);
				cb(null);
			});
    	});
	}
};

module.exports = FolderStore;