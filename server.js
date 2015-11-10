var q = require('q');
var fs = require('fs');
var _ = require('lodash');
var async = require('async');
var seneca = require('seneca')()
var ws = require("nodejs-websocket")
var dbConnectionManager = require('./dbConnection');	
var WebSocketServer = require('websocket').server;
var http = require('http');
var webSockets = require('./webSockets/webSocket');

				

connectToDatabase()
.then(function(){
	bootstrapApplicationDomains()
	.then(function(){
		//console.log('hiii');
		startServer();

	})
	.fail(function(err){

		seneca.log.info(err);
	});
})
.fail(function(err){
	
	process.exit(); 
});


function startServer(callback){

	var server = http.createServer(function(request, response) {
				// process HTTP request. Since we're writing just WebSockets server
				// we don't have to implement anything.
				});
				var webSocketsServerPort = 1337;
				server.listen(webSocketsServerPort, function() { 
				console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
				});

				// create the server
				wsServer = new WebSocketServer({
				httpServer: server
				});

				// WebSocket server
				wsServer.on('request', function(request) {
				var connection = request.accept(null, request.origin);

				// This is the most important callback for us, we'll handle
				// all messages from users here.
				connection.on('message', function(message) {
				if (message.type === 'utf8') {
				// process WebSocket message
				console.log('hiii'+JSON.stringify(message));
				var data = JSON.parse(message.utf8Data);
				console.log("GGGGGGGGGGGGGG   "+JSON.stringify(data))
				var clients = {};
				clients = connection;
					
	 async.waterfall([
		handleRequest
		],function(err, results){
			if(err){
				 //callback(err,null);
				console.log(err)
			}
			else{
			clients.sendUTF(JSON.stringify(results));
			 //callback(null,results);
			console.log("RESULT "+JSON.stringify(results))
		}
	});


					function handleRequest(callback){
					var cmd=data.domain+"."+data.event
						console.log("FFFFFFFFFFFFFf "+cmd)
					var actPattern = {cmd:cmd, data:data.payload};

					seneca.act(actPattern,function(err,out){
			
					if(err) {
						callback(err,null);
					}else{
					// assumes an express app
						 callback(null,out);
					}
				})
			}
		}
	});

					connection.on('close', function(connection) {
					// close user connection
							});
						});

	}


function connectToDatabase(){

	var deferred = q.defer();

	dbConnectionManager.createConnection(function(err, connection){
	if(err)
		throw err;
	else
		var domainsConnection = connection;

		return deferred.resolve();
	});

	return deferred.promise;
}

function bootstrapApplicationDomains(){

	var deferred = q.defer();

	var domainsCwd = process.cwd() + '/domains/';
	console.log(domainsCwd);
	var appDomains = ['contact','identity','leads','organization'];
	var boostrappingFunctions = _.map(appDomains, function(appDomain){
		
		return function(done){
			require(domainsCwd + appDomain + '/bootstrapper').bootstrap(seneca).then(function(){

				seneca.log.info('Bootstraped domain: ' + appDomain);
				done();
			}).fail(function(err){
				process.exit();
			});
		};
	});
	async.series(boostrappingFunctions, function(err){
		return deferred.resolve();
	});
	
	return deferred.promise;
}

				


