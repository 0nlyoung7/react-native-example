var DBHelper = require( '../libs/DBHelper' );

var FolderStore = {
	save : function(cb){
		DBHelper.openDB( function(db){
			db.executeSql('INSERT INTO TB_FOLDER (forder_id, name, owner_id) values ( "1", "forder01", "user01" )').then(() =>{
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