var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId

 var AdminUserSchema = new Schema({
 	user: {
 		type: ObjectId,
 		ref: "User"
 	},
 })

 mongoose.model('AdminUser',AdminUserSchema);