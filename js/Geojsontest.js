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
		
	//我们自己的点
	var youliaosuo = {
	  "type": "FeatureCollection",
	  "features": [
		{
		  "type": "Feature",
		  "properties": {
			"name": "Coors Field",
			"amenity": "Baseball Stadium",
			"popupContent": "This is where the Rockies play!"
		  },
		  "geometry": {
			"type": "Point",
			"coordinates": [
			  114.33059692382812,
			  30.577336774956887
			]
		  }
		}
	  ]
	};
	
	//两条线的数据
	var myLines = {
	  "type": "FeatureCollection",
	  "features": [
		{
		  "type": "Feature",
		  "properties": {},
		  "geometry": {
			"type": "LineString",
			"coordinates": [
			  [
				114.3270993232727,
				30.58083750430189
			  ],
			  [
				114.32853698730467,
				30.57964597736766
			  ]
			]
		  }
		},
		{
		  "type": "Feature",
		  "properties": {},
		  "geometry": {
			"type": "LineString",
			"coordinates": [
			  [
				114.32880520820618,
				30.580763611584555
			  ],
			  [
				114.32796835899353,
				30.5801262845601
			  ]
			]
		  }
		}
	  ]
	}
	
	//线的样式
	var myStyle = {
	    "color": "#ffaa00",
	    "weight": 4,
	    "opacity": 0.2
	};
	
	
	
	//常规加载图层方法
	L.geoJSON(myLines,{style:myStyle}).addTo(map);
	
	
	//pointToLayer加载图层，可以设置样式
	var geojsonMarkerOptions = {
	    radius: 5,//半径
	    fillColor: "#3eff3e",//填充色
	    color: "#ff0000",//边框色
	    weight: 1,//边框宽度
	    opacity: 1,//边框透明度
	    fillOpacity: 0.8//填充透明度
	};
	
	L.geoJSON(youliaosuo, {
	    pointToLayer: function (feature, latlng) {
	        return L.circleMarker(latlng, geojsonMarkerOptions);
	    }
	}).addTo(map);

	
	var buildings = {
	  "type": "FeatureCollection",
	  "features": [
		{
		  "type": "Feature",
		  "properties": {"name": "library"},
		  "geometry": {
			"type": "Polygon",
			"coordinates": [
			  [
				[
				  114.32857990264891,
				  30.58104070898416
				],
				[
				  114.32913780212402,
				  30.580966816421704
				],
				[
				  114.32913780212402,
				  30.580449566907664
				],
				[
				  114.32974934577942,
				  30.580976052995087
				],
				[
				  114.3291699886322,
				  30.581493299700366
				],
				[
				  114.32857990264891,
				  30.58104070898416
				]
			  ]
			]
		  }
		},
		{
		  "type": "Feature",
		  "properties": {"name": "zihuan"},
		  "geometry": {
			"type": "Polygon",
			"coordinates": [
			  [
				[
				  114.32744264602661,
				  30.579821474502282
				],
				[
				  114.32785034179688,
				  30.579442769762284
				],
				[
				  114.32797908782959,
				  30.579572083742242
				],
				[
				  114.32788252830505,
				  30.57968292415924
				],
				[
				  114.32779669761658,
				  30.579655214066868
				],
				[
				  114.32752847671509,
				  30.5799046046131
				],
				[
				  114.32744264602661,
				  30.579821474502282
				]
			  ]
			]
		  }
		}
	  ]
	}
	
	// 遍历所有要素的指定属性，并绑定到弹出窗口
	function onEachFeature(feature, layer) {
	    // does this feature have a property named name?
	    if (feature.properties && feature.properties.name) {
	        layer.bindPopup(feature.properties.name);
	    }
	}
	
	
	L.geoJSON(buildings, {
	    style: function(feature) {
	        switch (feature.properties.name) {
	            case 'library': return {color: "#ffaa00"};
	            case 'zihuan':   return {color: "#b7e4ff"};
	        }
	    },
		onEachFeature: onEachFeature
	}).addTo(map);
	
	
	
	//定义一个空图层
	// var Layer_yls = L.geoJSON().addTo(map);
	// //把我们的数据放到图层中
	// Layer_yls.addData(youliaosuo);
	
	//定义一个空图层
	// var Layer_tea = L.geoJSON().addTo(map);
	// Layer_tea.addData(myLines);
	
	
	// function onEachFeature(feature, layer) {
	//     // does this feature have a property named popupContent?
	//     if (feature.properties && feature.properties.name) {
	//         layer.bindPopup(feature.properties.name);
	//     }
	// }
	// // Load data
	// var loadData = function (){
	// 	$.ajax("data/point.geojson", {
	// 		dataType: "json",
	// 		success: function(response){
	// 			geojsonFeature = response;
	
	// 			var geojsonMarkerOptions = {
	// 				radius: 8,
	// 				fillColor: "#ff7800",
	// 				color: "#000",
	// 				weight: 1,
	// 				opacity: 1,
	// 				fillOpacity: 0.8
	// 			};
	
	// 			L.geoJSON(response, {
	// 				pointToLayer: function (feature, latlng){
	// 					return L.circleMarker(latlng, geojsonMarkerOptions);
	// 				},
	// 				onEachFeature: onEachFeature
	// 			}).addTo(map);
	// 		}
	// 	});
	// }
	
	// loadData();
	
}