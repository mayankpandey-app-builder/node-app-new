
var q = require('q');


exports.bootstrap = function(seneca){
	
	var deferred = q.defer();

	var exportsCWD = process.cwd() + '/domains/leads/';


	
 registerSenecaCommands()
	.then(function(){

		return deferred.resolve();
	}).fail(function(err){
	
		console.log(err);
	});

	return deferred.promise;

	function registerSenecaCommands(){
		return q.fcall(function(){
			//seneca.use(exportsCWD+'add_company_holidays');
		});	
	}

		
};