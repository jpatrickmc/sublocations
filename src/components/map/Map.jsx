import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const [geodata, setGeodata] = useState(null);
  const mapRef = useRef();
  const position = [-1.2921, 36.8219]; // Nairobi coordinates

  useEffect(() => {
    fetch('/data/nairobi_sublocs.geojson')
      .then((response) => response.json())
      .then((data) => {
        setGeodata(data);
        console.log('GeoJSON data loaded:', data);
      })
      .catch((error) => {
        console.error('Error fetching GeoJSON data:', error);
      });
  }, []);

  return (
    <>
      <div style={{ height: '600px' }}>
        <h4>Sublocations</h4>
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          ref={mapRef}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {geodata && <GeoJSON data={geodata} />}
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
