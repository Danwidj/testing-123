const TABS = [
  { id: 'map', label: 'Map', icon: '🗺️' },
  { id: 'wallet', label: 'Wallet', icon: '🎟️' }
];

export default function NavBar({ active, onChange }) {
  return (
    <nav className="nav-bar">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`nav-tab ${active === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          <span>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
