function init(){
	var map = L.map("map").setView([30.56486,114.353622 ], 10);
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibGl6eWFncnMiLCJhIjoiY2t1M2UxNmd1NGV4ZDJwbzIzYWxoOGZlbiJ9.PYUoUFa8Twrx8GNhUq8Ydg'
	}).addTo(map);
	
	var geojsonFeature = {
		"type": "Feature",
		"properties": {
			"name": "Coors Field",
			"amenity": "Baseball Stadium",
			"popupContent": "This is where the Rockies play!"
		},
		"geometry": {
			"type": "Point",
			"coordinates": [114.39404, 30.45621]
		}
	};
	var myLayer = L.geoJSON().addTo(map);
	myLayer.addData(geojsonFeature);
	
	
	var hubu_university_JSON = {
	  "type": "FeatureCollection",
	  "features": [
		{
		  "type": "Feature",
		  "properties": {
			"marker-color": "red",
			"name": "hubu",
			"population": 12000,
			"Buildyear": 1931
		  },
		  "geometry": {
			"type": "Point",
			"coordinates": [
			  114.32793617248535,
			  30.579664450765208
			]
		  }
		},
		{
		  "type": "Feature",
		  "properties": {
			"marker-color": "red",
			"name": "hubu sport",
			"population": 1200,
			"Buildyear": 1964
		  },
		  "geometry": {
			"type": "Point",
			"coordinates": [
			  114.3308973312378,
			  30.580163231168658
			]
		  }
		}
	  ]
	}

	
	//L.geoJSON(hubu_university_JSON).addTo(map);
	
	
	var geojsonMarkerOptions = {
		radius: 8,
		fillColor: "#ff7800",
		color: "#000",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.8
	};

	var LeafIcon = L.Icon.extend({
		options: {
			shadowUrl: 'img/leaf-shadow.png',
			iconSize:     [38, 95],
			shadowSize:   [50, 64],
			iconAnchor:   [22, 94],
			shadowAnchor: [4, 62],
			popupAnchor:  [-3, -76]
		}
	});
	
	var greenIcon = new LeafIcon({iconUrl: 'img/leaf-green.png'});
	var mGreen = L.marker([30.58, 114.33], {icon: greenIcon}).addTo(map);

	// 遍历所有要素的指定属性，并绑定到弹出窗口
	function onEachFeature(feature, layer) {
	    // does this feature have a property named name?
	    if (feature.properties && feature.properties.name) {
	        layer.bindPopup(feature.properties.name);
	    }
	}
	
	L.geoJSON(hubu_university_JSON, {
		//第1个参数，遍历并弹出窗口显示指定属性
		onEachFeature: onEachFeature,
		//第2个参数：pointToLayer，要把加载的要素变成圆状的标记点显示出来，
		//并且指定它的样式geojsonMarkerOptions
		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, geojsonMarkerOptions);
		}
	}).addTo(map);
	
	
	var myLines = [{
		"type": "LineString",
		"coordinates": [[100, 30], [105, 35], [110, 35]]
	}, {
		"type": "LineString",
		"coordinates": [[105, 30], [110, 35], [115, 35]]
	}];

	var myStyle = {
		"color": "#ff7800",
		"weight": 5,
		"opacity": 0.65
	};

	L.geoJSON(myLines, {
		style: myStyle
	}).addTo(map);
}

