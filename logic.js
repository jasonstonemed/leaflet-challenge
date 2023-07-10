// obtain GeoJSON data from USGS
let queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {  
  createFeatures(data.features);

  var earthquakes = L.geoJSON(data, {
    onEachFeature:onEachFeature
     });
     console.log(earthquakes);

  });

// Create a GeoJSON layer that contains the features array on the earthquakeData object.
function createFeatures(earthquakeData) {
  console.log(earthquakeData)
}

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the size and depth of the earthquake.
// function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${geometry.coordinates}</h3><hr><p>${(feature.properties.mag)}</p>`);

    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`)
  }

// Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
// var earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature:onEachFeature
//      });
//      console.log(earthquakes);

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);


// Create the base layers.
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

 // Create a baseMaps object.
let baseMaps = {
  "Street Map": street,
  "Topographic Map": topo
};

// Create the earthquake layer for our map.
var earthquakes = new L.LayerGroup();

// Create an overlay object to hold our overlay.
let overlayMaps = {
  earthquakes: earthquakes
};

// Create our map, giving it the streetmap and earthquakes layers to display on load.
let myMap = L.map("map", {
      center: [37.77, -122.42],
      zoom: 5,
      layers: [street, earthquakes]
    }); 

 // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Define the createMap function
function createMap(earthquakes) {
  // Code for creating the map and adding layers goes here
}


  





