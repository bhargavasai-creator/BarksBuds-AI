import React, { useState, useEffect } from 'react';
import { Shield, Heart, Calendar, TrendingUp, AlertCircle, Check, Download } from 'lucide-react';

interface InsurancePlan {
  breed: string;
  baseRate: number;
  lifespan: number;
  riskFactor: number;
}

// Top 100 breeds with insurance rates
const BREED_DATA: Record<string, InsurancePlan> = {
  'Labrador Retriever': { breed: 'Labrador Retriever', baseRate: 45, lifespan: 12, riskFactor: 1.0 },
  'German Shepherd': { breed: 'German Shepherd', baseRate: 55, lifespan: 11, riskFactor: 1.2 },
  'Golden Retriever': { breed: 'Golden Retriever', baseRate: 50, lifespan: 11, riskFactor: 1.1 },
  'French Bulldog': { breed: 'French Bulldog', baseRate: 85, lifespan: 10, riskFactor: 1.8 },
  'Bulldog': { breed: 'Bulldog', baseRate: 90, lifespan: 8, riskFactor: 2.0 },
  'Poodle': { breed: 'Poodle', baseRate: 40, lifespan: 14, riskFactor: 0.9 },
  'Beagle': { breed: 'Beagle', baseRate: 35, lifespan: 13, riskFactor: 0.8 },
  'Rottweiler': { breed: 'Rottweiler', baseRate: 65, lifespan: 9, riskFactor: 1.5 },
  'Yorkshire Terrier': { breed: 'Yorkshire Terrier', baseRate: 30, lifespan: 14, riskFactor: 0.7 },
  'Boxer': { breed: 'Boxer', baseRate: 60, lifespan: 10, riskFactor: 1.3 },
  'Dachshund': { breed: 'Dachshund', baseRate: 38, lifespan: 13, riskFactor: 0.9 },
  'Siberian Husky': { breed: 'Siberian Husky', baseRate: 48, lifespan: 12, riskFactor: 1.0 },
  'Australian Shepherd': { breed: 'Australian Shepherd', baseRate: 42, lifespan: 13, riskFactor: 0.9 },
  'Cavalier King Charles': { breed: 'Cavalier King Charles', baseRate: 52, lifespan: 12, riskFactor: 1.1 },
  'Shih Tzu': { breed: 'Shih Tzu', baseRate: 35, lifespan: 13, riskFactor: 0.8 },
  'Persian Cat': { breed: 'Persian Cat', baseRate: 42, lifespan: 15, riskFactor: 1.0 },
  'Maine Coon': { breed: 'Maine Coon', baseRate: 48, lifespan: 13, riskFactor: 1.1 },
  'Siamese Cat': { breed: 'Siamese Cat', baseRate: 38, lifespan: 15, riskFactor: 0.9 },
  'Ragdoll Cat': { breed: 'Ragdoll Cat', baseRate: 40, lifespan: 15, riskFactor: 0.9 },
  'British Shorthair': { breed: 'British Shorthair', baseRate: 45, lifespan: 14, riskFactor: 1.0 },
};

interface PetInsuranceProps {
  currentUser: any;
}

export function PetInsurance({ currentUser }: PetInsuranceProps) {
  const [selectedBreed, setSelectedBreed] = useState('');
  const [petAge, setPetAge] = useState(1);
  const [healthScore, setHealthScore] = useState(100);
  const [paymentType, setPaymentType] = useState<'monthly' | 'yearly' | 'lifetime'>('monthly');
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [policies, setPolicies] = useState<any[]>([]);
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    // Load existing policies
    const savedPolicies = localStorage.getItem(`insurance_${currentUser?.id}`);
    if (savedPolicies) {
      setPolicies(JSON.parse(savedPolicies));
    }
  }, [currentUser]);

  const calculateInsurance = () => {
    if (!selectedBreed) return;

    const breedData = BREED_DATA[selectedBreed];
    if (!breedData) return;

    let basePrice = breedData.baseRate;

    // Age factor: increases with age
    const ageFactor = 1 + (petAge / breedData.lifespan) * 0.5;

    // Health factor: decreases with health issues
    const healthFactor = healthScore / 100;

    // Risk factor from breed
    const riskFactor = breedData.riskFactor;

    // Calculate monthly premium
    let monthlyPremium = basePrice * ageFactor * riskFactor * (2 - healthFactor);

    // Calculate based on payment type
    let finalPrice = monthlyPremium;
    if (paymentType === 'yearly') {
      finalPrice = monthlyPremium * 12 * 0.9; // 10% discount for yearly
    } else if (paymentType === 'lifetime') {
      const remainingYears = Math.max(1, breedData.lifespan - petAge);
      finalPrice = monthlyPremium * 12 * remainingYears * 0.75; // 25% discount for lifetime
    }

    setCalculatedPrice(finalPrice);
  };

  useEffect(() => {
    if (selectedBreed) {
      calculateInsurance();
    }
  }, [selectedBreed, petAge, healthScore, paymentType]);

  const purchaseInsurance = () => {
    if (!selectedBreed || calculatedPrice === 0) return;

    const newPolicy = {
      id: Math.random().toString(36).substr(2, 9),
      breed: selectedBreed,
      age: petAge,
      healthScore,
      paymentType,
      price: calculatedPrice,
      purchaseDate: new Date().toISOString(),
      expiryDate: paymentType === 'lifetime' 
        ? 'Lifetime' 
        : new Date(Date.now() + (paymentType === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
    };

    const updatedPolicies = [...policies, newPolicy];
    setPolicies(updatedPolicies);
    localStorage.setItem(`insurance_${currentUser?.id}`, JSON.stringify(updatedPolicies));

    // Send to analytics
    const analyticsData = {
      userId: currentUser?.id,
      breed: selectedBreed,
      price: calculatedPrice,
      paymentType,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(`insurance_analytics_${Date.now()}`, JSON.stringify(analyticsData));

    alert('Insurance purchased successfully! Check your email for documents.');
  };

  const generateQRCode = () => {
    setShowQRCode(true);
    // In production, generate actual QR code with crypto payment details
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Pet Insurance Calculator</h2>
        </div>
        <p className="text-sm opacity-90">
          Protect your pet with comprehensive coverage. Calculated based on breed, age, and health.
        </p>
      </div>

      {/* Calculator */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Calculate Your Premium</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Breed</label>
            <select
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a breed...</option>
              {Object.keys(BREED_DATA).sort().map((breed) => (
                <option key={breed} value={breed}>
                  {breed} (Lifespan: {BREED_DATA[breed].lifespan} years)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pet Age: {petAge} years
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={petAge}
              onChange={(e) => setPetAge(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Health Score: {healthScore}%
            </label>
            <input
              type="range"
              min="50"
              max="100"
              value={healthScore}
              onChange={(e) => setHealthScore(parseInt(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Based on recent health checkup results from wearable devices
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Plan</label>
            <div className="grid grid-cols-3 gap-3">
              {['monthly', 'yearly', 'lifetime'].map((type) => (
                <button
                  key={type}
                  onClick={() => setPaymentType(type as any)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    paymentType === type
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium capitalize">{type}</div>
                  {type === 'yearly' && <div className="text-xs text-green-600">Save 10%</div>}
                  {type === 'lifetime' && <div className="text-xs text-green-600">Save 25%</div>}
                </button>
              ))}
            </div>
          </div>

          {calculatedPrice > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Your Premium</div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  ${calculatedPrice.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">
                  {paymentType === 'monthly' && 'per month'}
                  {paymentType === 'yearly' && 'per year'}
                  {paymentType === 'lifetime' && 'one-time payment'}
                </div>

                {selectedBreed && BREED_DATA[selectedBreed] && (
                  <div className="mt-4 p-3 bg-white rounded-lg text-xs text-gray-600">
                    <div className="grid grid-cols-2 gap-2">
                      <div>Expected Lifespan: {BREED_DATA[selectedBreed].lifespan} years</div>
                      <div>Coverage: Comprehensive</div>
                      <div>Deductible: $100</div>
                      <div>Max Coverage: $50,000/year</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={purchaseInsurance}
              disabled={!selectedBreed || calculatedPrice === 0}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-bold hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Purchase Insurance
            </button>
            <button
              onClick={generateQRCode}
              disabled={!selectedBreed || calculatedPrice === 0}
              className="px-6 bg-gradient-to-r from-orange-400 to-yellow-500 text-white py-3 rounded-lg font-bold hover:from-orange-500 hover:to-yellow-600 transition-all disabled:opacity-50"
            >
              Pay with Crypto
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRCode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Crypto Payment</h3>
            <div className="bg-gray-100 p-8 rounded-xl mb-4 text-center">
              <div className="w-64 h-64 mx-auto bg-white rounded-lg flex items-center justify-center border-2 border-gray-300">
                {/* In production, use actual QR code library */}
                <div className="text-center">
                  <div className="text-6xl mb-2">📱</div>
                  <div className="text-sm text-gray-600">Scan QR Code</div>
                  <div className="text-xs text-gray-500 mt-2">
                    Amount: ${calculatedPrice.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Accepts: BTC, ETH, USDT, USDC, BNB</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Instant confirmation after 3 blocks</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Secure & encrypted transaction</span>
              </div>
            </div>
            <button
              onClick={() => setShowQRCode(false)}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Active Policies */}
      {policies.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            Your Active Policies
          </h3>
          <div className="space-y-3">
            {policies.map((policy) => (
              <div key={policy.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-gray-900">{policy.breed}</div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {policy.status.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>Age: {policy.age} years</div>
                  <div>Health: {policy.healthScore}%</div>
                  <div>Plan: {policy.paymentType}</div>
                  <div>Price: ${policy.price.toFixed(2)}</div>
                  <div className="col-span-2">
                    Purchased: {new Date(policy.purchaseDate).toLocaleDateString()}
                  </div>
                  <div className="col-span-2">
                    Expires: {policy.expiryDate === 'Lifetime' ? 'Lifetime Coverage' : new Date(policy.expiryDate).toLocaleDateString()}
                  </div>
                </div>
                <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  Download Policy Documents
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insurance Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-bold text-blue-900 mb-2">📋 What's Covered</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Accidents & injuries (up to $50,000/year)</li>
          <li>• Illnesses & chronic conditions</li>
          <li>• Emergency care & hospitalization</li>
          <li>• Diagnostic tests & X-rays</li>
          <li>• Prescription medications</li>
          <li>• Rehabilitation & physical therapy</li>
          <li>• Hereditary & congenital conditions</li>
          <li>• 24/7 emergency vet hotline</li>
        </ul>
      </div>

      {/* Copyright Notice */}
      <div className="text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
        <p>© 2025 Critter Affinity LLC. All Rights Reserved.</p>
        <p className="mt-1">Insurance underwritten by Critter Affinity Insurance Partners</p>
        <p className="mt-1">Last updated: January 2025 - Present</p>
      </div>
    </div>
  );
}
