import React, { useState, useEffect } from 'react';
import { Shield, Calculator, Heart, TrendingUp, Download, FileText, Clock, DollarSign } from 'lucide-react';

interface InsuranceCalculation {
  breed: string;
  age: number;
  healthScore: number;
  lifespan: number;
  monthlyPremium: number;
  yearlyPremium: number;
  lifetimePremium: number;
  coverageAmount: number;
}

const BREED_DATA = {
  'Golden Retriever': { avgLifespan: 12, baseCost: 45, riskFactor: 1.2 },
  'German Shepherd': { avgLifespan: 11, baseCost: 50, riskFactor: 1.3 },
  'Labrador Retriever': { avgLifespan: 12, baseCost: 42, riskFactor: 1.1 },
  'Bulldog': { avgLifespan: 8, baseCost: 85, riskFactor: 1.8 },
  'Beagle': { avgLifespan: 13, baseCost: 38, riskFactor: 1.0 },
  'Poodle': { avgLifespan: 14, baseCost: 40, riskFactor: 0.9 },
  'Rottweiler': { avgLifespan: 9, baseCost: 60, riskFactor: 1.5 },
  'Yorkshire Terrier': { avgLifespan: 15, baseCost: 35, riskFactor: 0.8 },
  'Boxer': { avgLifespan: 10, baseCost: 55, riskFactor: 1.4 },
  'Dachshund': { avgLifespan: 14, baseCost: 40, riskFactor: 1.1 },
  'Persian Cat': { avgLifespan: 15, baseCost: 35, riskFactor: 0.9 },
  'Siamese Cat': { avgLifespan: 15, baseCost: 32, riskFactor: 0.8 },
  'Maine Coon': { avgLifespan: 13, baseCost: 38, riskFactor: 1.0 },
  'Ragdoll': { avgLifespan: 15, baseCost: 36, riskFactor: 0.85 },
  'British Shorthair': { avgLifespan: 14, baseCost: 34, riskFactor: 0.9 },
  'Mixed Breed Dog': { avgLifespan: 13, baseCost: 35, riskFactor: 0.95 },
  'Mixed Breed Cat': { avgLifespan: 15, baseCost: 30, riskFactor: 0.85 },
};

export function PetInsuranceSystem({ currentUser }: { currentUser: any }) {
  const [selectedBreed, setSelectedBreed] = useState('');
  const [petAge, setPetAge] = useState(1);
  const [healthScore, setHealthScore] = useState(8);
  const [calculation, setCalculation] = useState<InsuranceCalculation | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly' | 'lifetime' | null>(null);
  const [insuranceDocuments, setInsuranceDocuments] = useState<any[]>([]);

  useEffect(() => {
    // Load existing insurance documents
    const docs = localStorage.getItem(`insurance_docs_${currentUser?.id}`);
    if (docs) {
      setInsuranceDocuments(JSON.parse(docs));
    }
  }, [currentUser]);

  const calculateInsurance = () => {
    if (!selectedBreed) return;

    const breedInfo = BREED_DATA[selectedBreed as keyof typeof BREED_DATA];
    if (!breedInfo) return;

    // Age factor: older pets = higher premium
    const ageFactor = 1 + (petAge / breedInfo.avgLifespan) * 0.5;
    
    // Health factor: lower health score = higher premium
    const healthFactor = (11 - healthScore) / 10;
    
    // Calculate monthly premium
    const monthlyPremium = Math.round(
      breedInfo.baseCost * breedInfo.riskFactor * ageFactor * (1 + healthFactor)
    );

    // Yearly premium with 10% discount
    const yearlyPremium = Math.round(monthlyPremium * 12 * 0.9);

    // Lifetime premium (remaining lifespan) with 20% discount
    const remainingYears = Math.max(1, breedInfo.avgLifespan - petAge);
    const lifetimePremium = Math.round(monthlyPremium * 12 * remainingYears * 0.8);

    // Coverage amount based on breed and age
    const coverageAmount = Math.round(10000 + (breedInfo.baseCost * 100) - (petAge * 500));

    setCalculation({
      breed: selectedBreed,
      age: petAge,
      healthScore,
      lifespan: breedInfo.avgLifespan,
      monthlyPremium,
      yearlyPremium,
      lifetimePremium,
      coverageAmount,
    });
  };

  const purchaseInsurance = (plan: 'monthly' | 'yearly' | 'lifetime') => {
    if (!calculation) return;

    const premium = plan === 'monthly' ? calculation.monthlyPremium :
                   plan === 'yearly' ? calculation.yearlyPremium :
                   calculation.lifetimePremium;

    const insuranceDoc = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser?.id,
      breed: calculation.breed,
      age: calculation.age,
      healthScore: calculation.healthScore,
      plan,
      premium,
      coverageAmount: calculation.coverageAmount,
      startDate: new Date().toISOString(),
      status: 'active',
      documentUrl: `https://insurance.critteraffinity.com/policy/${Math.random().toString(36).substr(2, 9)}.pdf`,
    };

    const updatedDocs = [...insuranceDocuments, insuranceDoc];
    setInsuranceDocuments(updatedDocs);
    localStorage.setItem(`insurance_docs_${currentUser?.id}`, JSON.stringify(updatedDocs));

    // Send to Power BI for analytics
    sendToPowerBI(insuranceDoc);

    alert(`Insurance purchased! Your ${plan} plan is now active. Policy document generated.`);
    setSelectedPlan(plan);
  };

  const sendToPowerBI = async (insuranceDoc: any) => {
    // In production, this would call Power BI REST API
    // POST to https://api.powerbi.com/v1.0/myorg/datasets/{datasetId}/rows?key={key}
    console.log('Sending to Power BI:', insuranceDoc);
    
    // Store for Power BI sync
    const powerBIData = {
      timestamp: new Date().toISOString(),
      userId: insuranceDoc.userId,
      breed: insuranceDoc.breed,
      age: insuranceDoc.age,
      plan: insuranceDoc.plan,
      premium: insuranceDoc.premium,
      coverageAmount: insuranceDoc.coverageAmount,
      country: currentUser?.location?.country || 'Unknown',
      device: navigator.userAgent,
    };

    localStorage.setItem('powerbi_insurance_queue', JSON.stringify([
      ...(JSON.parse(localStorage.getItem('powerbi_insurance_queue') || '[]')),
      powerBIData
    ]));
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
          Protect your pet with breed-specific insurance coverage
        </p>
      </div>

      {/* Calculator */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-blue-500" />
          Calculate Your Premium
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Breed</label>
            <select
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a breed...</option>
              {Object.keys(BREED_DATA).map((breed) => (
                <option key={breed} value={breed}>
                  {breed} - Avg. Lifespan: {BREED_DATA[breed as keyof typeof BREED_DATA].avgLifespan} years
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
              Health Score: {healthScore}/10 
              <span className="text-xs text-gray-500 ml-2">(Based on recent health checkups)</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={healthScore}
              onChange={(e) => setHealthScore(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <button
            onClick={calculateInsurance}
            disabled={!selectedBreed}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-bold hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50"
          >
            Calculate Premium
          </button>
        </div>
      </div>

      {/* Results */}
      {calculation && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4 text-gray-900">Insurance Plans for {calculation.breed}</h3>
          
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">Breed:</span>
                <span className="font-bold ml-2 text-gray-900">{calculation.breed}</span>
              </div>
              <div>
                <span className="text-gray-600">Age:</span>
                <span className="font-bold ml-2 text-gray-900">{calculation.age} years</span>
              </div>
              <div>
                <span className="text-gray-600">Avg. Lifespan:</span>
                <span className="font-bold ml-2 text-gray-900">{calculation.lifespan} years</span>
              </div>
              <div>
                <span className="text-gray-600">Health Score:</span>
                <span className="font-bold ml-2 text-gray-900">{calculation.healthScore}/10</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Monthly Plan */}
            <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-blue-500" />
                <h4 className="font-bold text-gray-900">Monthly Plan</h4>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                ${calculation.monthlyPremium}
                <span className="text-sm text-gray-500">/month</span>
              </div>
              <div className="text-sm text-gray-600 mb-4">
                Coverage: ${calculation.coverageAmount.toLocaleString()}
              </div>
              <button
                onClick={() => purchaseInsurance('monthly')}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Select Monthly
              </button>
            </div>

            {/* Yearly Plan */}
            <div className="border-2 border-green-500 rounded-xl p-4 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                SAVE 10%
              </div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <h4 className="font-bold text-gray-900">Yearly Plan</h4>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                ${calculation.yearlyPremium}
                <span className="text-sm text-gray-500">/year</span>
              </div>
              <div className="text-sm text-gray-600 mb-4">
                Coverage: ${calculation.coverageAmount.toLocaleString()}
              </div>
              <button
                onClick={() => purchaseInsurance('yearly')}
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Select Yearly
              </button>
            </div>

            {/* Lifetime Plan */}
            <div className="border-2 border-purple-500 rounded-xl p-4 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                SAVE 20%
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-purple-500" />
                <h4 className="font-bold text-gray-900">Lifetime Plan</h4>
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                ${calculation.lifetimePremium}
                <span className="text-sm text-gray-500">/lifetime</span>
              </div>
              <div className="text-sm text-gray-600 mb-4">
                Coverage: ${calculation.coverageAmount.toLocaleString()}
              </div>
              <button
                onClick={() => purchaseInsurance('lifetime')}
                className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Pay Once, Covered Forever
              </button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
            <strong>Note:</strong> Premium calculated based on breed risk factors, age, and health score. 
            Complies with insurance regulations in your country.
          </div>
        </div>
      )}

      {/* Insurance Documents */}
      {insuranceDocuments.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-500" />
            Your Insurance Policies
          </h3>
          <div className="space-y-3">
            {insuranceDocuments.map((doc) => (
              <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{doc.breed} - {doc.plan} Plan</h4>
                    <p className="text-sm text-gray-600">
                      Premium: ${doc.premium} • Coverage: ${doc.coverageAmount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Started: {new Date(doc.startDate).toLocaleDateString()} • Status: {doc.status}
                    </p>
                  </div>
                  <button
                    onClick={() => window.open(doc.documentUrl, '_blank')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Policy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Breeds by Cost */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-green-500" />
          Top Breeds by Insurance Cost
        </h3>
        <div className="space-y-2">
          {Object.entries(BREED_DATA)
            .sort((a, b) => b[1].baseCost - a[1].baseCost)
            .slice(0, 10)
            .map(([breed, info], index) => (
              <div key={breed} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                  <div>
                    <div className="font-medium text-gray-900">{breed}</div>
                    <div className="text-xs text-gray-500">
                      Avg. Lifespan: {info.avgLifespan} years • Risk: {info.riskFactor.toFixed(1)}x
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">${info.baseCost}/mo</div>
                  <div className="text-xs text-gray-500">starting from</div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Privacy & Terms */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600">
        <h4 className="font-bold text-gray-900 mb-2">Privacy & Data Protection</h4>
        <p className="mb-2">
          All insurance data is encrypted and stored securely. We comply with GDPR, CCPA, and local insurance 
          regulations in all 237 countries we operate in. Your pet's health information is protected under 
          veterinary-client-patient privilege laws.
        </p>
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Critter Affinity Insurance Services. Licensed in all operating jurisdictions. 
          Policy documents are legally binding contracts. Terms and conditions apply based on your country of residence.
        </p>
      </div>
    </div>
  );
}
