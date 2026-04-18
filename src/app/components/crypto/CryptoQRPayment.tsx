import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Wallet, Copy, Check, Bitcoin } from 'lucide-react';

interface CryptoQRPaymentProps {
  amount: number;
  description: string;
  onPaymentComplete: () => void;
}

const CRYPTO_ADDRESSES = {
  BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  ETH: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  USDT: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  USDC: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
};

export function CryptoQRPayment({ amount, description, onPaymentComplete }: CryptoQRPaymentProps) {
  const [selectedCrypto, setSelectedCrypto] = useState<keyof typeof CRYPTO_ADDRESSES>('BTC');
  const [copied, setCopied] = useState(false);

  const address = CRYPTO_ADDRESSES[selectedCrypto];
  const paymentUri = `${selectedCrypto.toLowerCase()}:${address}?amount=${amount}&label=${encodeURIComponent(description)}`;

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bitcoin className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Pay with Crypto</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="text-3xl font-bold text-orange-600 mt-3">
          ${amount.toFixed(2)}
        </div>
      </div>

      {/* Crypto Selection */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {(Object.keys(CRYPTO_ADDRESSES) as Array<keyof typeof CRYPTO_ADDRESSES>).map((crypto) => (
          <button
            key={crypto}
            onClick={() => setSelectedCrypto(crypto)}
            className={`py-3 rounded-lg font-bold transition-all ${
              selectedCrypto === crypto
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {crypto}
          </button>
        ))}
      </div>

      {/* QR Code */}
      <div className="bg-white p-6 rounded-xl border-4 border-gray-200 mb-6">
        <div className="flex justify-center">
          <QRCodeSVG
            value={paymentUri}
            size={200}
            level="H"
            includeMargin={true}
            fgColor="#000000"
            bgColor="#ffffff"
          />
        </div>
      </div>

      {/* Address */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {selectedCrypto} Address
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={address}
            readOnly
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm font-mono"
          />
          <button
            onClick={copyAddress}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-bold text-blue-900 mb-2">Payment Instructions</h3>
        <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
          <li>Scan the QR code with your crypto wallet app</li>
          <li>Or copy the address and send ${amount.toFixed(2)} worth of {selectedCrypto}</li>
          <li>Payment will be confirmed automatically</li>
        </ol>
      </div>

      {/* Simulate Payment Button (Demo Only) */}
      <button
        onClick={() => {
          alert('Payment confirmed! (Demo Mode)');
          onPaymentComplete();
        }}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-lg font-bold hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2"
      >
        <Wallet className="w-5 h-5" />
        I've Sent the Payment (Demo)
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Payments are processed securely. No refunds after confirmation.
      </p>
    </div>
  );
}
