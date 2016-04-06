var DBHelper = require( '../libs/DBHelper' );

var TABLE_NAME = "TB_POST";

var PostStore = {

	save : function(data, cb){
		DBHelper.openDB(function(db){
			
			if( data.uid == undefined || data.location == undefined ){
				cb('required');
			} else {
				var dataArr = [];

				dataArr.push( data.id );
				dataArr.push( data.folderId );
				dataArr.push( data.title != undefined ? data.title : '' );
				dataArr.push( data.tag != undefined ? data.tag : null );
				dataArr.push( data.memo != undefined ? data.memo : null );

				dataArr.push( data.thumbnail != undefined ? data.thumbnail : null );
				dataArr.push( data.url != undefined ? data.url : null );
				dataArr.push( data.mapUrl != undefined ? data.mapUrl : null );

				dataArr.push( data.location != undefined ? data.location : null );
				dataArr.push( data.lat != undefined ? data.lat : 0 );
				dataArr.push( data.lon != undefined ? data.lon : 0 );

				dataArr.push( data.created != undefined ? data.created : Date.now() );
				dataArr.push( data.updated != undefined ? data.updated : Date.now() );
				dataArr.push( data.uid  );

				var sql = "INSERT INTO "+TABLE_NAME+" (post_id, forder_id, title, tag, memo, thumbnail, url, map_url, location, lat, lon created, updated, owner_id)";
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
			db.executeSql('SELECT * FROM ' + TABLE_NAME).then((results) =>{
				
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

module.exports = PostStore;