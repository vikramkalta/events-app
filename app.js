var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Rave = require("./models/rave"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds")
    
var commentRoutes = require("./routes/comments"),
    raveRoutes = require("./routes/raves"),
    indexRoutes = require("./routes/index")

//seedDB();
mongoose.connect("mongodb://vikram:kalta@ds119738.mlab.com:19738/psychedelic");
//mongodb://vikram:kalta@ds119738.mlab.com:19738/psychedelic
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "Rusty ki maa ka bhosada",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/raves", raveRoutes);
app.use("/raves/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Rave has started");
});