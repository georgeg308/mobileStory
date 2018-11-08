var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");

var view = require("ui/core/view");
//var UserViewModel = require("../shared/view-models/user-view-model");
//var user = new UserViewModel();
var page;

exports.loaded = function(args) {
    page = args.object;

    if (page.ios) {
        var navigationBar = frameModule.topmost().ios.controller.navigationBar;
        navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    }

    //page.bindingContext = user;
};

//user.init();

exports.signIn = function() {


            const navigationEntry = {
                moduleName: "home/home-page",
                context: {},
                animated: false
            };
            //console.log("hi");
            frameModule.topmost().navigate(navigationEntry);

};

