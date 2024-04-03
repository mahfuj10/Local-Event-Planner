import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet';

export default function Map({location}) {
  const position = [location.lat, location.long];

  return (
    <MapContainer style={{ height: '400px', width:'100%' }}
      center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          {location.location}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
