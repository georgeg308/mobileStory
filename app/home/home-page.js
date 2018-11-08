/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
var dialogsModule = require("ui/dialogs");
var viewModule = require("ui/core/view");

var view = require("ui/core/view");
var frameModule = require("ui/frame");
const HomeViewModel = require("./home-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new HomeViewModel();
}


exports.explore = function() {


    const navigationEntry = {
        moduleName: "explore/explore-page",
        context: { },
        animated: false
    };
    //console.log("hi");
    frameModule.topmost().navigate(navigationEntry);

};

exports.search = function() {


    const navigationEntry = {
        moduleName: "search/search-page",
        context: { },
        animated: false
    };
    //console.log("hi");
    frameModule.topmost().navigate(navigationEntry);

};

exports.write = function() {


    const navigationEntry = {
        moduleName: "write/write-page",
        context: {},
        animated: false
    };
    //console.log("hi");
    frameModule.topmost().navigate(navigationEntry);

};



exports.onNavigatingTo = onNavigatingTo;
