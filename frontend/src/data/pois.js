export const POIS = [
  {
    id: 'museum',
    name: 'History Museum',
    description: 'Quiet in the mornings, always worth an hour.',
    lat: -0.9019,
    lng: 104.4535,
    crowdByHour: () => 'green'
  },
  {
    id: 'mangrove',
    name: 'Mangrove Boardwalk',
    description: 'Tour buses clear out by early afternoon.',
    lat: -0.9241,
    lng: 104.4762,
    crowdByHour: (hour) => (hour >= 6 && hour < 12 ? 'red' : 'green'),
    voucher: {
      business: 'Kedai Kopi Akar',
      offer: '15% off any drink',
      code: 'MANGROVE-CHECKIN-001'
    }
  }
];

export function getCrowdStatus(poi, date = new Date()) {
  return poi.crowdByHour(date.getHours());
}

export const CROWD_LABEL = {
  green: 'Low Crowd Density (Quiet Window)',
  red: 'High Crowd Density (Peak Hours)'
};
