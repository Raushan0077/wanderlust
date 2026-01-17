(function() {
  mapboxgl.accessToken = mapToken;

  // Check if geometry coordinates exist
  if (!listing.geometry || !listing.geometry.coordinates || listing.geometry.coordinates.length !== 2) {
    // Hide map or show message if no coordinates
    document.getElementById('map').style.display = 'none';
    const noMapMsg = document.createElement('p');
    noMapMsg.textContent = `Map not available for ${listing.location}. Location coordinates need to be added.`;
    noMapMsg.style.textAlign = 'center';
    noMapMsg.style.padding = '20px';
    noMapMsg.style.color = '#666';
    document.getElementById('map').parentNode.appendChild(noMapMsg);
    return;
  }

    const map = new mapboxgl.Map({

      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12',
      center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });
     const marker = new mapboxgl.Marker({ color: "red"})
        .setLngLat( listing.geometry.coordinates)  //Listing.geometry.coordinates
        .setPopup(new mapboxgl.Popup({offset:25})
       .setHTML(
        `<h4>${listing.location}</h4> <p> Exact location will be provided after Booking!</p>`
    )
)

        .addTo(map);
})();
