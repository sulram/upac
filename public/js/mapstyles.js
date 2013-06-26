/*
*   Separat funktion för att lagra och ändra kartstilar
*
*/
var mapstyles = (function () {

    base = {};
    base.lightblue = 
                [
                  {
                    "featureType": "water",
                    "stylers": [
                      { "color": "#f2f0f0" }
                    ]
                  },{
                    "featureType": "landscape",
                    "stylers": [
                      { "visibility": "simplified" },
                      { "color": /*"#6FC9D8" "#6fb7ac"*/ "#9fdddb" }
                    ]
                  },{
                    "featureType": "administrative",
                    "stylers": [
                      /*{ "visibility": "off" }*/
                    ]
                  },{
                    "featureType": "poi",
                    "stylers": [
                      { "color": "#808080" },
                      { "visibility": "off" }
                    ]
                  },{
                    "featureType": "road",
                    "stylers": [
                      { "visibility": "simplified" },
                      { "color": "#6dbfd3" }
                    ]
                  },{
                    "featureType": "transit",
                    "elementType": "labels.text",
                    "stylers": [
                      { "visibility": "off" }
                    ]
                  },{
                    "featureType": "transit",
                    "stylers": [
                      { "visibility": "off" }
                    ]
                  },{
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [
                      { "visibility": "off" }
                    ]
                  }
                ];  

    base.normal = [];

    return base;
})();