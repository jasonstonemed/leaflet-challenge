// obtain GeoJSON data from USGS
let queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {  
  createFeatures(data.features);

  let earthquakes = L.geoJSON(data, {
  
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng);
      },
      style: function (feature) {
          return {
              fillColor: chooseColor(feature.geometry.coordinates[2]),
              fillOpacity: 0.5,
              weight: 0,
              radius: feature.properties.mag * 10
          }} ,
    onEachFeature:onEachFeature
     }).addTo(myMap);

  });

  // define choose color function
  function chooseColor(depth) {
    if (depth < 10) {
        return "blue";
    } else if (depth < 30) {
        return "green";
    } else if (depth < 50) {
        return "yellow";
    } else if (depth < 70) {
        return "orange";
    } else if (depth < 90) {
        return "red";
    } else {
        return
    }
  }
// Create a GeoJSON layer that contains the features array on the earthquakeData object.
function createFeatures(earthquakeData) {
  console.log(earthquakeData)
}

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the size and depth of the earthquake.
function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}, ${feature.geometry.coordinates}</h3><hr><p>${(feature.properties.mag)}</p>`);

}

// Create earthquake layer
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

 // Create a layer control using baseMaps and overlayMaps.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Define the createMap function
function createMap(earthquakes) {
  // Code for creating the map and adding layers goes here
}

// Create a legend to display map information
var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Earthquake Depth (Km- relative to sea level)</h4>";
  div.innerHTML += '<i style="background: blue"></i><span>  -10 to 10 </span><br>';
  div.innerHTML += '<i style="background: green"></i><span> 11 to 30 </span><br>';
  div.innerHTML += '<i style="background: yellow"></i><span> 31 to 50</span><br>';
  div.innerHTML += '<i style="background: orange"></i><span> 51 to 70 </span><br>';
  div.innerHTML += '<i style="background: red"></i><span> 71 to 90 </span><br>';
  div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i></span><br>';

  return div;
};

legend.addTo(myMap);

  





