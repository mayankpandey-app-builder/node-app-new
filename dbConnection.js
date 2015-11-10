
var seneca = require('seneca')();
var mongoose = require('mongoose');
	exports.createConnection = function(callback){
	
	var db_url='mongodb://localhost:27017';
	var db_name='poc_socket';	

	var db=mongoose.connect(db_url+'/'+db_name,function(err) {
	
    if(err){
    	console.log('Connected to ' + db_url + ', failed. ' + err);
    	return callback(err, null);
	}
		console.log('Connected to ' + db_url+'/'+db_name);
	})
	return callback(null, db);
	
};

