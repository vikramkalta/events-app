var mongoose = require("mongoose");

var raveSchema = new mongoose.Schema({
    name: String,
   image: String, 
   location: String,
   description: String,
   date: Number/String,
   contactForPass: String,
   entry: Number/String,
   lineup: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      }, 
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
      ]
});

var Rave = mongoose.model("Rave", raveSchema);

module.exports = mongoose.model("Rave", raveSchema);