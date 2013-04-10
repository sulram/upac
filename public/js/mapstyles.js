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

    base.red = 
    [
  {
    featureType: "water",
    stylers: [
      { visibility: "simplified" },
      { color: "#202020" }
    ]
  },{
    featureType: "road",
    stylers: [
      { visibility: "simplified" },
      { color: "#808080" },
      { lightness: 61 }
    ]
  },{
    featureType: "landscape",
    stylers: [
      { color: "#ff4c45" },
      { visibility: "simplified" }
    ]
  },{
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "transit",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "poi",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "administrative",
    elementType: "labels",
    stylers: [
      { visibility: "on" }
    ]
  },{
    featureType: "administrative.locality",
    stylers: [
      { visibility: "on" }
    ]
  },{
    featureType: "administrative.province",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "administrative",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "off" },
      { color: "#ffff80" }
    ]
  },{
    featureType: "road",
    stylers: [
      { color: "#ffffff" }
    ]
  },{
    featureType: "transit",
    stylers: [
      { color: "#ffe64a" }
    ]
  },{
    featureType: "transit",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "road",
    stylers: [
      { color: "#21201e" }
    ]
  },{
    featureType: "road",
    stylers: [
      { color: "#ffb81b" }
    ]
  }
];
    base.blue = 
    [
  {
    featureType: "administrative",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "poi",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "road",
    stylers: [
      { color: "#ffffff" }
    ]
  },{
    featureType: "landscape",
    stylers: [
      { visibility: "on" },
      { color: "#91c9eb" }
    ]
  },{
    featureType: "water",
    stylers: [
      { color: "#1e1e1e" }
    ]
  },{
    featureType: "transit",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "road"
  }
];
    base.green = 
                [
              {
                featureType: "administrative",
                stylers: [
                  { visibility: "off" }
                ]
              },{
                featureType: "poi",
                stylers: [
                  { visibility: "off" }
                ]
              },{
                featureType: "road",
                elementType: "labels",
                stylers: [
                  { visibility: "off" }
                ]
              },{
                featureType: "road",
                stylers: [
                  { color: "#b1ba47" }
                ]
              },{
                featureType: "landscape",
                stylers: [
                  { visibility: "on" },
                  { color: "#518a45" }
                ]
              },{
                featureType: "water",
                stylers: [
                  { color: "#1e1e1e" }
                ]
              },{
                featureType: "transit",
                stylers: [
                  { visibility: "off" }
                ]
              },{
                featureType: "road"
              }
            ];
base.greenie =
                [
              {
                  featureType: "administrative",
                  stylers: [
                  { visibility: "off" }
                ]
              }, {
                  featureType: "poi",
                  stylers: [
                  { visibility: "off" }
                ]
              }, {
                  featureType: "road",
                  elementType: "labels",
                  stylers: [
                  { visibility: "off" }
                ]
              }, {
                  featureType: "road",
                  stylers: [
                  { color: "#b1ba47" }
                ]
              }, {
                  featureType: "landscape",
                  stylers: [
                  { visibility: "on" },
                  { color: "#518a45" }
                ]
              }, {
                  featureType: "water",
                  stylers: [
                  { color: "#0c0c0c" }
                ]
              }, {
                  featureType: "transit",
                  stylers: [
                  { visibility: "off" }
                ]
              }, {
                  featureType: "road"
              }
            ];
    base.twocolor =
            [
          {
              featureType: "road",
              stylers: [
              { visibility: "off" }
            ]
          }, {
              elementType: "labels",
              stylers: [
              { visibility: "off" }
            ]
          }, {
              featureType: "water",
              stylers: [
              { visibility: "simplified" },
              { color: "#879eae" }
            ]
          }, {
              featureType: "landscape",
              stylers: [
              { visibility: "simplified" },
              { color: "#cfc9bf" }
            ]
          }, {
              featureType: "poi",
              stylers: [
              { visibility: "simplified" },
              { color: "#cfc9bf" }
            ]
          }, {
              featureType: "administrative",
              stylers: [
              { visibility: "off" }
            ]
          }, {
              featureType: "transit",
              stylers: [
              { visibility: "off" }
            ]
          }, {
              featureType: "road.highway",
              stylers: [
              { visibility: "on" },
              { color: "#b5b5b5" }
            ]
          }, {
              featureType: "road.highway",
              elementType: "labels",
              stylers: [
              { visibility: "off" }
            ]
          }, {
          }
        ];
    base.dark =
        [
            {
                featureType: 'all',
                stylers: [{ invert_lightness: 'true'}]
            }
          ];
    base.bw =
        [
            {
                featureType: 'all',
                stylers: [
                { saturation: -100 },
                { gamma: 0.50 }
              ]
            }
          ];

    base.storm =
		[
		  {
		      featureType: "road",
		      elementType: "all",
		      stylers: [
			  { gamma: 2.64 },
			  { lightness: 20 },
			  { saturation: -60 },
			  { hue: "#ff00bb" },
			  { visibility: "simplified" }
			]
		  }, {
		      featureType: "transit.station",
		      elementType: "all",
		      stylers: [
			  { visibility: "off" }
			]
		  }, {
		      featureType: "all",
		      elementType: "all",
		      stylers: [

			]
		  }, {
		      featureType: "transit.station",
		      elementType: "all",
		      stylers: [

			]
		  }, {
		      featureType: "poi",
		      elementType: "all",
		      stylers: [
			  { visibility: "off" }
			]
		  }, {
		      featureType: "road.local",
		      elementType: "all",
		      stylers: [
			  { visibility: "on" }
			]
		  }, {
		      featureType: "road.highway",
		      elementType: "all",
		      stylers: [
			  { visibility: "on" }
			]
		  }, {
		      featureType: "all",
		      elementType: "all",
		      stylers: [
			  { lightness: 21 },
			  { hue: "#ff6e00" }
			]
		  }, {
		      featureType: "transit.station",
		      elementType: "all",
		      stylers: [
			  { visibility: "off" }
			]
		  }, {
		      featureType: "transit.line",
		      elementType: "all",
		      stylers: [
			  { visibility: "off" }
			]
		  }, {
		      featureType: "administrative.locality",
		      elementType: "all",
		      stylers: [
			  { visibility: "off" }
			]
		  }, {
		      featureType: "road",
		      elementType: "all",
		      stylers: [

			]
		  }, {
		      featureType: "all",
		      elementType: "all",
		      stylers: [
			  { visibility: "simplified" },
			  { gamma: 1.23 },
			  { hue: "#ffcc00" }
			]
		  }, {
		      featureType: "all",
		      elementType: "all",
		      stylers: [

			]
		  }
		];
    base.ice =
    [
		                {
		                    featureType: "poi.park",
		                    stylers: [
		                      { hue: "#00d4ff" },
		                      { visibility: "simplified" },
		                      { lightness: 22 }
		                    ]
		                }, {
		                    featureType: "administrative.country",
		                    stylers: [
		                      { visibility: "simplified" }
		                    ]
		                }, {
		                    featureType: "administrative.province",
		                    stylers: [
		                      { visibility: "simplified" }
		                    ]
		                }, {
		                    featureType: "administrative.locality",
		                    stylers: [
		                      { visibility: "off" }
		                    ]
		                }, {
		                    featureType: "water",
		                    stylers: [
		                      { saturation: 43 },
		                      { hue: "#00e5ff" },
		                      { lightness: 84 }
		                    ]
		                }, {
		                }, {
		                    featureType: "landscape",
		                    elementType: "geometry",
		                    stylers: [
		                      { hue: "#00d4ff" },
		                      { lightness: -2 },
		                      { saturation: 36 }
		                    ]
		                }, {
		                    featureType: "road",
		                    stylers: [
		                      { hue: "#00c3ff" },
		                      { lightness: 34 },
		                      { saturation: -41 }
		                    ]
		                }, {
		                    featureType: "administrative.country",
		                    stylers: [
		                      { hue: "#00aaff" },
		                      { saturation: 18 },
		                      { lightness: 30 }
		                    ]
		                }, {
		                    featureType: "poi.attraction",
		                    stylers: [
		                      { hue: "#00bbff" }
		                    ]
		                }, {
		                    featureType: "administrative.province",
		                    stylers: [
		                      { visibility: "off" }
		                    ]
		                }, {
		                    featureType: "road",
		                    elementType: "labels",
		                    stylers: [
		                      { visibility: "off" }
		                    ]
		                }, {
		                    featureType: "road",
		                    elementType: "geometry",
		                    stylers: [
		                      { visibility: "simplified" }
		                    ]
		                }, {
		                    featureType: "transit.station.airport",
		                    stylers: [
		                      { hue: "#00c3ff" },
		                      { saturation: 31 },
		                      { lightness: 39 }
		                    ]
		                }, {
		                    featureType: "poi",
		                    stylers: [
		                      { hue: "#00bbff" },
		                      { saturation: 9 },
		                      { visibility: "on" },
		                      { lightness: 55 }
		                    ]
		                }, {
		                    featureType: "landscape.man_made",
		                    stylers: [
		                      { lightness: 32 }
		                    ]
		                }, {
		                    featureType: "road",
		                    stylers: [
		                      { lightness: 13 }
		                    ]
		                }, {
		                    featureType: "transit.line",
		                    stylers: [
		                      { visibility: "off" }
		                    ]
		                }, {
		                    featureType: "transit.station",
		                    stylers: [
		                      { visibility: "off" }
		                    ]
		                }, {
		                    featureType: "administrative.neighborhood",
		                    stylers: [
		                      { saturation: 17 },
		                      { lightness: 26 },
		                      { hue: "#00b2ff" }
		                    ]
		                }, {
		                    featureType: "landscape.natural",
		                    elementType: "labels",
		                    stylers: [
		                      { visibility: "off" }
		                    ]
		                }, {
		                }
		                ];

    base.normal = [];

    return base;
})();