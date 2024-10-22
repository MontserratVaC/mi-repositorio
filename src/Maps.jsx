import React, { useEffect } from 'react';

function Maps() {
  useEffect(() => {
    // Comprobar si la API ya está cargada
    if (!window.google) {
      const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.async = true;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      };

      loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyBjELQaL6gIzd8hiA3pWcRxY0ow68MKZB0&libraries=places`)
        .then(() => {
          initMap(); // Llamar a initMap directamente
        })
        .catch((error) => console.error("Error loading Google Maps script", error));
    } else {
      initMap(); // Si ya está cargado, simplemente llama a initMap
    }

    const initMap = () => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 19.403837203979492, lng: -98.98571014404297 },
        zoom: 14,
      });

      const marker = new google.maps.Marker({
        position: { lat: 19.403837203979492, lng: -98.98571014404297 },
        map: map,
        title: "BoozeBot",
      });
    };

  }, []);

  return (
    <div>
      <h2>Localización de BoozeBot</h2>
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
    </div>
  );
}

export default Maps;
