import { useState } from 'react';
import MapView from './components/MapView.jsx';
import Wallet from './components/Wallet.jsx';
import NavBar from './components/NavBar.jsx';
import { INITIAL_VOUCHERS } from './data/vouchers.js';

export default function App() {
  const [tab, setTab] = useState('map');
  const [vouchers, setVouchers] = useState(INITIAL_VOUCHERS);

  function handleVoucherEarned(voucher) {
    setVouchers((prev) => (prev.some((v) => v.code === voucher.code) ? prev : [...prev, voucher]));
  }

  return (
    <div className="app-shell">
      <div className="app-content">
        {tab === 'map' && <MapView onVoucherEarned={handleVoucherEarned} />}
        {tab === 'wallet' && <Wallet vouchers={vouchers} />}
      </div>
      <NavBar active={tab} onChange={setTab} />
    </div>
  );
}
