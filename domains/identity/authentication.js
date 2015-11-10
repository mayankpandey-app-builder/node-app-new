var User = require('../../models/user').user;
var async=require('async')
var crypto=require('crypto')

module.exports = function(){

var seneca = this;
seneca.add({cmd:'identity.authenticateUser'},checkUserIdentity)

	
  function checkUserIdentity(args,done){
console.log("GGGGGGGGGGGGGGGGGGGGGgggg "+JSON.stringify(args))
  	var email = args.data.email;
  	console.log("EEEEEEEEEEEEEE "+email)
	var password = args.data.password;

	if(!email){
		return done('yooo',null);
	}

		  async.waterfall([
				findIdentity,
				checkAuthenticity,
				getUserToken
				],function(err, results){
			if(err){
				return done(err, null);
			}
			return done(null, results);
		});
	function findIdentity(callback){
		User
		.find({"username":email},function(err, foundIdentity){
			console.log("HHHHHHHHHHHHHHHHHHHHHHHHH " +JSON.stringify(foundIdentity))
			if(err){
				return done(err, null);
			}
			if(!(foundIdentity[0].username)){
				return done('yooo',null);
			}
			return callback(null, foundIdentity);
		});
	}


	function checkAuthenticity(identity, callback){

		var identitySalt = identity[0].password;
		var pass = identitySalt.toString();
		var hashedCredentials = password;

		if(pass !== hashedCredentials){
				return callback('YOOOO ', null);
	}
	return callback(null,identity);
}


function getUserToken(identity, callback){
	var TOKEN_LENGTH = 64;

	crypto.randomBytes(TOKEN_LENGTH, function(err, token) {
		if(err){
				return done(err, null);
			}
		
		var tok=token.toString('hex');
		User
		.update({"_id":"563846a173cd7b708f76742d"},{$set:{token:tok}},function(err,result) {
			 var data = {payload:{token:tok,reply:identity}};
			if(err){
				return done(err, null);
			}
			 callback(null,data);
		
		});

});
}
function returnResult(err, results){
			if(err){
				return done(err, null);
			}
			console.log("VVVVVVVVVVVV "+results)
			return done(null, results);
		}
}
}