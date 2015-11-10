var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({

                "username":{ type:String, default:''},
                "password":{ type:String, default:''},
                "token":{ type:String, default:''},
                "usertype":[{
                	"type":{type:String, default:''},
                	"value":{type:Number, default:''}
            	   }]

})
mongoose.model('user', userSchema);

exports.user = mongoose.model('user');
