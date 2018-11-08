const fromObject = require("data/observable").fromObject;
var imagepicker = require("nativescript-imagepicker");
const fs = require("tns-core-modules/file-system");
const imageSourceModule = require("tns-core-modules/image-source");
const imageModule = require("tns-core-modules/ui/image");
var view = require("ui/core/view");
const labelModule = require("tns-core-modules/ui/label");
const textViewModule = require("tns-core-modules/ui/text-view");
var frameModule = require("ui/frame");
const httpModule = require("http");
var dialogs = require("ui/dialogs");
var gestures = require("ui/gestures");

var page;
var col = 1;
var row = 4;

/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

const WriteViewModel = require("./write-view-model");

function onNavigatingTo(args) {
    page = args.object;
    page.bindingContext = new WriteViewModel();
    
}

exports.addImage = function() {

    var context = imagepicker.create({ mode: "single" }); 
    var gridMain = page.getViewById("mainGrid");
    

    context
    .authorize()
    .then(function() {
        return context.present();
    })
    .then((selection)=> {
        selection.forEach(function(selected) {
            // process the selected image
            
            var image = new imageModule.Image();
            image.src = selected;
            image.height = 300;
            image.width = 300;
            image.stretch = "aspectFill";
            image.on(gestures.GestureTypes.tap, function (args) {
                dialogs.action({
                    message: "Remove this picture?",
                    cancelButtonText: "Cancel",
                    actions: ["Yes","No"]
                }).then(function (result) {
                    console.log("Dialog result: " + result);
                    if(result == "Yes"){
                        console.log("hi " + args.object);
                        args.object.parent.removeChild(args.object);
                    }else if(result == "No"){
                        console.log("No");
                    }
                });
            });

            gridMain.addChild(image);

            var textview = new textViewModule.TextView();
            textview.hint = "Write More!";
            textview.lineHeight="9";
            textview.height = "auto";

            textview.on(gestures.GestureTypes.longPress, function (args) {
                dialogs.action({
                    message: "Remove this Textbox?",
                    cancelButtonText: "Cancel",
                    actions: ["Yes","No"]
                }).then(function (result) {
                    console.log("Dialog result: " + result);
                    if(result == "Yes"){
                        console.log("hi " + args.object);
                        args.object.parent.removeChild(args.object);
                    }else if(result == "No"){
                        console.log("No");
                    }
                });
            });
            
            gridMain.addChild(textview)

           // selected.getImageAsync();
            

        });
        //list.items = selection;
    }).catch(function (e) {
        // process error
        alert(e);
    });
    
};


exports.saveChapter = function() {
    const navigationEntry = {
        moduleName: "location/location-page",
        context: {},
        animated: false
    };
    //console.log("hi");
    frameModule.topmost().navigate(navigationEntry);

};

exports.addLocation = function() {
    console.log("save button tapped");
    const modalPageModule = "./location/location-page";
    const apiKey = "AIzaSyA41BBNi6ccDAQw84aGIdh-JJ78GklnY34";
    var geoInfo;
    page.showModal(modalPageModule, "", function closeCallback(location){
        // Receive data from the modal page. e.g. username & password
        if(location == 'undefined' || location =="")
        {
            alert("No location selected");
        }
        else{

            console.log(location);
            alert(location);
            page.bindingContext.location = location
        
            /*
        console.log(location.latitude);
        console.log(location.longitude);
        //alert("latitude: " + location.latitude + "\nlongitude: " + location.longitude);
        
        page.bindingContext.latlng = location.latitude + "," +location.longitude;
        
        let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + page.bindingContext.latlng + "&key=" + apiKey;
        httpModule.getJSON(url).then((r) => {
            console.log(JSON.stringify(r));  
            //console.log(JSON.stringify(r.results[0].formatted_address)); 
            //console.log(r.results.formatted_address);
            if(r.status != "OK"){
                alert("No Address Found");
            }
            else
            alert(r.results[0].formatted_address); 
        }, (e) => {
            console.log("error: " + e.toString());
        });
        */
    }
        //
        //alert(geoInfo.formatted_address);

    }, false);

    
    
   
                
};
exports.nextPart = function() {
    alert("next button tapped");
    
};
exports.publish = function() {
    //alert("publish button tapped");

    const navigationEntry = {
        moduleName: "write/details",
        context: {
                location:page.bindingContext.location,
                title:page.bindingContext.title},
        animated: false
    };
    //console.log("hi");
    frameModule.topmost().navigate(navigationEntry);
};

exports.onNavigatingTo = onNavigatingTo;
