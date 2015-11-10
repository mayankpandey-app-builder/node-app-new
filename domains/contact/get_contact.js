var contact = require('../../models/contact').Contact;
var _ = require('lodash');

module.exports = function(){
var seneca = this;

seneca.add({cmd:"contacts.getContacts"},get_contact)

function get_contact(args,callback) { 
		var limits=args.data.limit;
		var skips=(args.data.skip*limits)
		if(args.data.id) {
		contact.find({"_id":args.data.id},function(err,reply) {
			if(err) {
		callback(err,null)
			} else {
		callback(null,reply)
		}
			})
			} else {
		contact.find({}).skip(skips).limit(limits).exec(function(err,data) {
		if(err) {
		callback(err,null)
			} else {
     			var t = _.uniq(data),
dataMap = {
firstName:'firstName',
lastName:"lastName",
company: 'company',
position: 'position',
contactInformation:"contactInformation"
};


var finalT = t.map(function (topic) {
var t = {};
for (var key in dataMap) {
t[dataMap[key]] = topic[key];
};
return t;
});

console.log(finalT);
return callback(null,data);
  			  }
  		})
  	}
  }
}
