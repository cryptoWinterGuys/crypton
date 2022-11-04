const map = L.map("map").setView([51.505, -0.09], 2);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

async function getMapData() {
	try {
		const results = await fetch(
			"https://cors-anywhere.herokuapp.com/https://coinmap.org/api/v1/venues/?limit=300"
		);
		console.log(results);
		const data = await results.json();
		console.log(data);
		data.venues.forEach((venue) => {
			const marker = L.marker([venue.lat, venue.lon]).addTo(map);
			marker.bindPopup(venue.name + ": " + venue.category);
		});
	} catch (error) {
		console.log(error);
	}
}
getMapData();
// loadMaps.onclick = getMapData;
