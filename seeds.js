var mongoose = require("mongoose");
var Rave = require("./models/rave");
var Comment = require("./models/comment")

var data = [
    {
        name: "Dream Bubble 5.0",
    image: "https://s-media-cache-ak0.pinimg.com/736x/68/14/29/681429412e916ab6a8b217adb20684ed.jpg",
    description: "blah blah blah"
        },
        {
        name: "Spirit Gust 4.0",
    image: "https://s-media-cache-ak0.pinimg.com/564x/6f/12/36/6f12369f600e264ba63aac5631d5d2c1.jpg",
    description: "blah blah blah"
        },
        {
        name: "Kundalini 5.0",
    image: "https://s-media-cache-ak0.pinimg.com/originals/0c/5b/7e/0c5b7e02a01b15afa76c3cfba6221865.jpg",
    description: "blah blah blah"
        }
    ]

function seedDB(){
    Rave.remove({}, function(err){
//    if(err){
//        console.log(err);
//    }
//   console.log("removed raves"); 
//    data.forEach(function(seed){
//      Rave.create(seed, function(err, rave){
//         if(err){
//             console.log(err)
//         } else {
//             console.log("added a rave");
//             Comment.create(
//                 {
//                 text: "This is great Hi-tech Event, get ready to lose yourselves in the depth of sounds",
//                 author: "Vikram"
//                 }, function(err, comment){
//                     if(err){
//                         console.log(err)
//                     }else{
//                     rave.comments.push(comment);
//                     rave.save();
//                     console.log("Created new comment")
//                     }
//                 });
//         }
//      });
//   });
  });
}
 module.exports = seedDB;