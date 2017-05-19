var express = require("express");
var router = express.Router({mergeParams: true});
var Rave = require("../models/rave");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/new", middleware.isLoggedIn, function(req, res){
    Rave.findById(req.params.id, function(err, rave){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new", {rave: rave}); 
        }
    });
   });
   
router.post("/", middleware.isLoggedIn, function(req, res){
  Rave.findById(req.params.id, function(err, rave){
      if(err){
          console.log(err);
          res.redirect("/raves");
      }else{
          Comment.create(req.body.comment, function(err, comment){
             if(err){
                 req.flash("error", "Something went wrong!");
                 console.log(err);
             } else {
                 comment.author.id = req.user._id;
                 comment.author.username = req.user.username;
                 comment.save();
                 rave.comments.push(comment);
                 rave.save();
                 req.flash("success", "Successfully added comment!")
                 res.redirect("/raves/" + rave._id);
             }
          });
      }
  });
});  
// comment edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {rave_id: req.params.id, comment: foundComment});
        }
    });
});

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       }else{
           res.redirect("/raves/" + req.params.id);
       }
   }); 
});

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Comment deleted!")
           res.redirect("/raves/" + req.params.id);
       }
    });
});


module.exports = router;