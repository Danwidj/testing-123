import { QRCodeSVG } from 'qrcode.react';

export default function Wallet({ vouchers }) {
  return (
    <div className="wallet-view">
      <h1>Wallet</h1>
      {vouchers.length === 0 && <p className="wallet-empty">No vouchers yet — check in at a site to earn one.</p>}
      {vouchers.map((voucher, i) => (
        <div className="voucher-card" key={`${voucher.business}-${i}`}>
          <div className="voucher-info">
            <strong>{voucher.business}</strong>
            <p>{voucher.offer}</p>
          </div>
          <QRCodeSVG value={voucher.code} size={96} />
        </div>
      ))}
    </div>
  );
}
