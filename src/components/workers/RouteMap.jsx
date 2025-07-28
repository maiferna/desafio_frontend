import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

export const RouteMap = ({ visits }) => {
  const [ruta, setRuta] = useState([]);
  const apiKeyMap = import.meta.env.VITE_API_KEY_MAP;
  const mapUrlBase = import.meta.env.VITE_MAP_API_URL_BASE;
  // Preparar las paradas a partir de visits

  const paradas = visits.map(visit => ({
    id: visit.id_visita,
    name: visit.cliente,
    coords: [parseFloat(visit.latitud), parseFloat(visit.longitud)],
    direccion: visit.direccion,
  }));

  useEffect(() => {
    const fetchRuta = async () => {
      // Extraer solo las coordenadas para dibujar la línea del recorrido
      const coords = paradas.map(p => [p.coords[1], p.coords[0]]); // OpenRoute usa [lng, lat]

      const response = await fetch(`${mapUrlBase}`, {
        method: 'POST',
        headers: {
          'Authorization': `${apiKeyMap}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coordinates: coords,
        }),
      });

      const data = await response.json();
      const coordsRuta = data.features[0].geometry.coordinates.map(p => [p[1], p[0]]); // convertir a [lat, lng]
      setRuta(coordsRuta);
    };

    fetchRuta();
  }, [visits]);

  return (
    // Centra el mapa en la primera parada
    <MapContainer className="map-container rounded shadow w-100" center={paradas[0].coords} zoom={9} >
      {/* Para cargar las imágenes de openstreetmap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      {/* Marcadores para cada punto */}
      {paradas.map((parada) => (
        /* Marker añade marcadores con iconos */
        <Marker key={parada.id} position={parada.coords}>
          {/* Popup muestra información al hacer click. Aquí meter la info de la API */}
          <Popup>{parada.name}</Popup>
        </Marker>
      ))}

      {/* Dibuja la ruta por carretera entre los puntos */}
      {ruta.length > 0 && <Polyline positions={ruta} color="blue" />}
    </MapContainer>
  );
}