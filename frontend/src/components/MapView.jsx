import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { POIS, getCrowdStatus, CROWD_LABEL } from '../data/pois.js';
import { ROUTES } from '../data/routes.js';
import { haversineDistanceMeters } from '../utils/geo.js';

const CHECK_IN_RADIUS_M = 300;
const CENTER = [-0.913, 104.465];

function crowdIcon(status) {
  const color = status === 'red' ? '#c62828' : '#2e7d32';
  return divIcon({
    className: '',
    html: `<span style="display:block;width:16px;height:16px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 0 4px rgba(0,0,0,0.4)"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
}

export default function MapView({ onVoucherEarned }) {
  const [selectedRoute, setSelectedRoute] = useState(ROUTES[0].id);
  const [checkIn, setCheckIn] = useState({ status: 'idle', message: '' });

  function handleCheckIn() {
    if (!navigator.geolocation) {
      setCheckIn({ status: 'error', message: 'Geolocation not supported on this device.' });
      return;
    }
    setCheckIn({ status: 'checking', message: 'Getting your location…' });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const mangrove = POIS.find((p) => p.id === 'mangrove');
        const distance = haversineDistanceMeters(
          position.coords.latitude,
          position.coords.longitude,
          mangrove.lat,
          mangrove.lng
        );
        if (distance <= CHECK_IN_RADIUS_M) {
          setCheckIn({ status: 'success', message: '🌸 Checked in at the Mangrove Boardwalk!' });
          onVoucherEarned(mangrove.voucher);
        } else {
          setCheckIn({
            status: 'too-far',
            message: `You're ${(distance / 1000).toFixed(1)}km away — get within ${CHECK_IN_RADIUS_M}m to check in.`
          });
        }
      },
      (error) => {
        setCheckIn({ status: 'error', message: `Location error: ${error.message}` });
      }
    );
  }

  return (
    <div className="map-view">
      <MapContainer center={CENTER} zoom={13} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {POIS.map((poi) => {
          const status = getCrowdStatus(poi);
          return (
            <Marker key={poi.id} position={[poi.lat, poi.lng]} icon={crowdIcon(status)}>
              <Popup>
                <strong>{poi.name}</strong>
                <br />
                {CROWD_LABEL[status]}
                <br />
                <span style={{ color: '#555' }}>{poi.description}</span>
              </Popup>
            </Marker>
          );
        })}
        {ROUTES.map((route) => (
          <Polyline
            key={route.id}
            positions={route.path}
            pathOptions={{
              color: route.color,
              weight: route.id === selectedRoute ? 6 : 3,
              opacity: route.id === selectedRoute ? 0.9 : 0.4
            }}
          />
        ))}
      </MapContainer>

      <div className="route-panel">
        {ROUTES.map((route) => (
          <button
            key={route.id}
            className={`route-btn ${route.id === selectedRoute ? 'active' : ''}`}
            style={{ borderColor: route.color }}
            onClick={() => setSelectedRoute(route.id)}
          >
            {route.mode} {route.label} · {route.distanceKm}km · {route.co2SavedG}g CO₂ saved
          </button>
        ))}
      </div>

      <div className="checkin-panel">
        <button className="checkin-btn" onClick={handleCheckIn} disabled={checkIn.status === 'checking'}>
          {checkIn.status === 'checking' ? 'Checking in…' : '📍 Check In at Mangrove'}
        </button>
        {checkIn.message && <p className={`checkin-message ${checkIn.status}`}>{checkIn.message}</p>}
      </div>
    </div>
  );
}
