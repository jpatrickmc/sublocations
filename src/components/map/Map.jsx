import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../map/map.css';

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

  const geoStyle = {
    fillColor: '#3388ff',
    weight: 3,
    opacity: 1,
    color: '#3388ff',
    fillOpacity: 0,
  };

  const onEachFeature = (feature, layer) => {
    const name = feature.properties.SLNAME || 'Unknown name';
    layer.bindTooltip(name, {
      permanent: true,
      direction: 'center',
      className: 'geo-label',
    });
  };

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
          {geodata && (
            <GeoJSON
              data={geodata}
              style={geoStyle}
              onEachFeature={onEachFeature}
            />
          )}
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
