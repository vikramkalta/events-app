var express = require("express");
var router = express.Router();
var Rave = require("../models/rave");
var middleware = require("../middleware");

router.get("/", function(req, res){
    Rave.find({}, function(err, allRaves){
       if(err){
           console.log(err);
       } else {
           res.render("raves/index",{raves:allRaves, currentUser: req.user});
       }
    });
});
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var location = req.body.location;
    var desc = req.body.description;
    var date = req.body.date;
    var contactForPass = req.body.contactForPass;
    var entry = req.body.entry;
    var lineup = req.body.lineup;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newRave = {name: name, image: image, location: location, description: desc, author:author,date: date,contactForPass: contactForPass, entry: entry, lineup: lineup};
    Rave.create(newRave, function(err, newlyCreated){
       if(err){
           console.log(err)
       }else{
            res.redirect("/raves");
       }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("raves/new")
});

router.get("/:id", function(req, res) {
    Rave.findById(req.params.id).populate("comments").exec(function(err, foundRave){
        if(err){
            console.log(err);
        }else {
            console.log(foundRave);
             res.render("raves/show", {rave: foundRave});
        }
    });
});

router.get("/:id/edit", middleware.checkRaveOwnership, function(req, res){
         Rave.findById(req.params.id, function(err, foundRave){
                res.render("raves/edit", {rave: foundRave});
   });
});
  
 router.put("/:id", middleware.checkRaveOwnership, function(req, res){
    Rave.findByIdAndUpdate(req.params.id, req.body.rave, function(err, updatedRave){
        if(err){
            res.redirect("/raves");
        } else {
            res.redirect("/raves/" + req.params.id);
        }
    }) 
 }); 
 
 router.delete("/:id", middleware.checkRaveOwnership, function(req, res){
    Rave.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/raves");
       } else{
           res.redirect("/raves");
       }
    }); 
 });


module.exports = router;