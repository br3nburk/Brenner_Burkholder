    <!-- Your Leaflet Heatmap Script -->
    <script>
        var map = L.map('map').setView([42.2626, -71.8023], 10); 
        // Set initial coordinates and zoom level
        
        // Changed map tile to separate variable
        var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

        // Load your GeoJSON data
    
        // fetch('https://raw.githubusercontent.com/br3nburk/Brenner_Burkholder/main/Clark_smol.geojson')
            // .then(response => response.json())
            // .then(data => {

                // var heatLayer = L.heatLayer(data.features.map(feature => feature.geometry.coordinates), {
                   // radius: 1,
                   // blur: 15,
                   // maxZoom: 17,
               // }).addTo(map);
                
          //  }); 
    

        var geojsonLayer = new L.GeoJSON.AJAX('https://raw.githubusercontent.com/br3nburk/Brenner_Burkholder/main/Clark_smol.geojson', {
                onEachFeature: function (feature, layer) {
        // Optionally, do something with each feature
            }
        });

// When the AJAX request is complete
        geojsonLayer.on('data:loaded', function () {
            // Create an array to hold heatmap data points
            var heatmapData = [];

            // Process the GeoJSON data to extract coordinates for the heatmap
            geojsonLayer.eachLayer(function (layer) {
                if (layer.feature.geometry.type === 'Point') {
                    heatmapData.push(layer.getLatLng().toArray());
                }
            });

            // Create the heatmap layer using Leaflet.heat
            var heatLayer = new L.heatLayer(heatmapData, {
                radius: 10,
                blur: 15,
                maxZoom: 17,
            }).addTo(map);

            
        });
        //markers.clearLayer()
        var map = new L.Map('map', {

            layers: [map, heatLayer.setData(heatmapData)]
        });    
        
        //heatLayer.setData(heatmapData);
        // Add GeoJSON layer to the map
        //geojsonLayer.addTo(map);


    </script>