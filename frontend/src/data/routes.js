import { POIS } from './pois.js';

const museum = POIS.find((p) => p.id === 'museum');
const mangrove = POIS.find((p) => p.id === 'mangrove');

export const ROUTES = [
  {
    id: 'bike',
    label: 'Bicycle path',
    mode: '🚲',
    color: '#2e7d32',
    co2SavedG: 480,
    distanceKm: 3.1,
    path: [
      [museum.lat, museum.lng],
      [-0.9105, 104.462],
      [-0.918, 104.469],
      [mangrove.lat, mangrove.lng]
    ]
  },
  {
    id: 'car',
    label: 'Car / taxi',
    mode: '🚗',
    color: '#c62828',
    co2SavedG: 0,
    distanceKm: 2.6,
    path: [
      [museum.lat, museum.lng],
      [-0.909, 104.458],
      [-0.916, 104.4705],
      [mangrove.lat, mangrove.lng]
    ]
  }
];
