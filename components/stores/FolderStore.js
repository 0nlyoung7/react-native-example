var DBHelper = require( '../libs/DBHelper' );

var FolderStore = {
	save : function(data, cb){
		DBHelper.openDB(function(db){
			
			if( data.uid == undefined || data.location == undefined ){
				cb('required');
			} else {
				var dataArr = [];
				dataArr.push( data.id );
				dataArr.push( data.location != undefined ? data.location : '' );
				dataArr.push( data.tag != undefined ? data.tag : null );
				dataArr.push( data.type != undefined ? data.type : null );
				dataArr.push( data.start != undefined ? data.start : null );
				dataArr.push( data.end != undefined ? data.end : null );
				dataArr.push( data.created != undefined ? data.created : Date.now() );
				dataArr.push( data.updated != undefined ? data.updated : Date.now() );
				dataArr.push( data.uid  );

				var sql = "INSERT INTO TB_FOLDER (forder_id, location, tag, type, start, end, created, updated, owner_id)";
				sql += " values ( ?, ?, ?, ?, ?, ?, ?, ?, ? )";

				db.executeSql(sql, dataArr).then(() =>{
					cb({});
				}).catch((error) =>{
					console.log("Received insert error: ", error);
					cb(null);
				});
			}
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