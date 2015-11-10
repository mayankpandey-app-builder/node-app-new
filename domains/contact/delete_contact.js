var contact = require('../../models/contact').Contact;


module.exports = function(){
var seneca = this;

seneca.add({cmd:"contacts.deleteContactWithoutConflictDetection"},delete_contact)

function delete_contact(args,callback){
	console.log("IDDDDDD "+args.data.id)

	contact.remove({"_id":args.data.id},function(err,reply){
		if(err){
			callback(err,null)
		} else{
			callback(null,"Conatct Deleted")
		}
	})

}
}