	
var geolocation = require("nativescript-geolocation");
var mapsModule = require("nativescript-google-maps-sdk");
var permissions = require("nativescript-permissions");
var application = require("application");
var frameModule = require("ui/frame");
var view = require("ui/core/view");
const httpModule = require("http");


const LocationViewModel = require("./location-view-model");
var page;

let context;
var closeCallback;
function onShownModally(args) {
    page = args.object;
    context = args.context;
    closeCallback = args.closeCallback;
}

function onNavigatingTo(args) {
    page = args.object;
    page.bindingContext = new LocationViewModel();

}

function requestPermissions() {
    return new Promise(function(resolve, reject) {
      if (!application.android) return resolve(true);
      permissions.requestPermission([
            android.Manifest.permission.ACCESS_FINE_LOCATION,
            android.Manifest.permission.ACCESS_COARSE_LOCATION],
          "This demo will stink without these...")
          .then(function (result) {
            console.log("Permissions granted!");
            resolve(true);
          })
          .catch(function (result) {
            console.log("Permissions failed :(", result);
            resolve(false);
          });
  
    });
  }





function onMapReady(args) {

  

    var mapView = args.object;
    
  
    console.log("Setting a marker...");
    var marker = new mapsModule.Marker();
    marker.position = mapsModule.Position.positionFromLatLng(-39.86, 151.20);
    marker.title = "Sydney";
    marker.snippet = "Australia"; 
    marker.userData = { index : 1};
    marker.color = 150;
    mapView.addMarker(marker);
    
    // Disabling zoom gestures
    //mapView.settings.zoomGesturesEnabled = true;
   
    mapView.latitude = marker.position.latitude;
    mapView.longitude = marker.position.longitude;

    var marker2 = new mapsModule.Marker();
    marker2.position = mapsModule.Position.positionFromLatLng(-50.86, 151.20);
    marker2.title = "Your Location";
    marker2.userData = { index : 2};
    mapView.addMarker(marker2);

    requestPermissions().then(function(granted) {
        if(granted) {
            console.log("Enabling My Location..");
            mapView.myLocationEnabled = true;
            mapView.settings.myLocationButtonEnabled = true;
        }
    }).catch(function (error) {
        console.log(error);
    });


    if(mapsModule.myLocationEnabled)
    {
        mapView.my
    }

  }
  
  function onMarkerSelect(args) {
     console.log("Clicked on " +args.marker.title);
  }

  exports.coordTapped = function coordTapped(args){
    var mapView = args.object;
    var marker = mapView.findMarker(function (marker) {
        return marker.userData.index === 2;
    });

    marker.position = mapsModule.Position.positionFromLatLng(args.position.latitude, args.position.longitude);
    marker.title = "Your Location";
    marker.snippet = "You are here";
    marker.userData = { index : 2};

    const apiKey = "AIzaSyA41BBNi6ccDAQw84aGIdh-JJ78GklnY34";
    let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" 
    + args.position.latitude + ","+ args.position.longitude + "&key=" + apiKey;
        httpModule.getJSON(url).then((r) => {
            console.log(JSON.stringify(r));  
            if(r.status != "OK"){
                page.bindingContext.address = "No Address Found";
            }
            else
            {
                view.getViewById(page,"addr").text = r.results[0].formatted_address;
            }
        }, (e) => {
            console.log("error: " + e.toString());
        });
    

   
  }

  function confirm(args) {
    
  
    closeCallback( view.getViewById(page,"addr").text);


  }
  
  exports.onShownModally = onShownModally;
  exports.confirm = confirm;
  exports.onMapReady = onMapReady;
  exports.onMarkerSelect = onMarkerSelect;




exports.onNavigatingTo = onNavigatingTo;
