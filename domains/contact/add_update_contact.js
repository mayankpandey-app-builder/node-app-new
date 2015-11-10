var contact = require('../../models/contact').Contact;


module.exports = function(){
var seneca = this;

seneca.add({cmd:"contacts.createContactWithoutConflictDetection"},add_update_contact)
  function add_update_contact(args,callback) { 
     var contactData = {
    "firstName": {
        "displayValue": args.data.contactData.firstName,
        "lowerCaseValue": args.data.contactData.firstName
    },
    "lastName": {
        "displayValue": args.data.contactData.lastName,
        "lowerCaseValue": args.data.contactData.lastName
    },
    "gender": "male",
    "company": args.data.contactData.company,
    "position": args.data.contactData.position,
    "contactType": {
        "comments": "test",
        "selectedValue": "test1",
        "explanatoryText": "test2",
        "possibleValues": [
            "test",
            "web",
            "seneca"
        ]
    },
    "department": "javascript",
    "country": "India",
    "contactInformation": args.data.contactData.contactInformation,
    "socialNetworks": [
        {
            "name": "LinkedIn",
            "URL": "www.LinkedIn.com"
        }
    ],
    "about": {
        "defaultText": "heelllo",
        "text": "abctest"
    },
    "openForCommunication": true,
    "positionType": "junior"
}
  console.log('hellooooooooooooooooooooooooooooooo'+JSON.stringify(args.data));
  console.log("IDDDDDDDDd "+args.data.id)
   if(args.data.id)    
  {
  	contact.update({"_id":args.data.id},args.data,function(err,result) {
  		if(err) {
  			return callback(err,null);
  		} else {
  			return callback(null,"data updated");
  		}
  	})
  }else{
  	var contacts = new contact(contactData);
			contacts.save(function(err, data){
				if(err){
					 return callback(err,null);
					} else {	
						console.log("ADDDDDDDDd "+JSON.stringify(data))
					return callback(null,data);
				}
			});
  
	}
}
}

