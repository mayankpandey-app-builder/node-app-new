var holidaysDetails=require('../../models/holidays_panel').holidaysDetails;


module.exports = function(){
var seneca = this;

seneca.add({cmd:"company_holidays.add_company_holidays"},add_company_holidays)

  function add_company_holidays(args,callback){ 
  
  
  if(args.data.id)    
  {
  
  	holidaysDetails.update({"_id":args.data.id},args.data,function(err,result) {
  		if(err)
  			return callback(err,null);
  		else
  			return callback(null,"data updated");
  	})
  }
  else{  
  			
			var holidays_Details = new holidaysDetails(args.data);
			holidays_Details.save(function(err, data){
				if(err){
					return callback(err,null);
						}
					else{	
					return callback(null,data);
				}
			});
		}
	}
}