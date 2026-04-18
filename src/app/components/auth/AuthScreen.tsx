import React, { useState } from 'react';
import { Phone, MapPin, Mic, User, Calendar, Users as GenderIcon } from 'lucide-react';

// Authentication Screen Component
// Handles OTP-based phone authentication with location and microphone permissions
interface AuthScreenProps {
  onLogin: (userData: any) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [step, setStep] = useState<'phone' | 'otp' | 'details' | 'permissions'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [otpCode, setOtpCode] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [permissions, setPermissions] = useState({
    location: false,
    microphone: false,
  });
  const [error, setError] = useState('');

  // Request user location (CRITICAL - First rule)
  const requestLocation = async () => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });
      
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setPermissions((prev) => ({ ...prev, location: true }));
      return true;
    } catch (err) {
      setError('Location access is required to use this app');
      return false;
    }
  };

  // Request microphone access (CRITICAL - Second rule)
  const requestMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop()); // Stop immediately
      setPermissions((prev) => ({ ...prev, microphone: true }));
      return true;
    } catch (err) {
      setError('Microphone access is required for safety features');
      return false;
    }
  };

  // Send OTP (mock)
  const sendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    
    // Mock OTP send
    setError('');
    setStep('otp');
    // In production: Send actual OTP via SMS
    console.log(`Sending OTP to ${countryCode}${phoneNumber}`);
  };

  // Verify OTP (mock)
  const verifyOTP = async () => {
    if (otpCode.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    
    // Mock OTP verification (accept any 6 digits for demo)
    setError('');
    setStep('details');
  };

  // Complete registration
  const completeRegistration = async () => {
    if (!name || !gender || !dateOfBirth) {
      setError('Please fill in all details');
      return;
    }

    setError('');
    setStep('permissions');
  };

  // Request all permissions and login
  const requestPermissionsAndLogin = async () => {
    // Request location (RULE 1)
    const locationGranted = await requestLocation();
    if (!locationGranted) return;

    // Request microphone (RULE 2)
    const micGranted = await requestMicrophone();
    if (!micGranted) return;

    // Get IP address (mock)
    const ipAddress = '192.168.1.1'; // In production: Get from server

    // Create user data
    const userData = {
      userId: `user_${Date.now()}`,
      phoneNumber: `${countryCode}${phoneNumber}`,
      name,
      gender,
      dateOfBirth,
      location,
      ipAddress,
      permissions,
      deviceId: navigator.userAgent,
      createdAt: new Date().toISOString(),
      isAdmin: phoneNumber.includes('999'), // Demo: phone with 999 is admin
    };

    // Login
    onLogin(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-2xl mb-4">
            <span className="text-4xl">🐾</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Critter Affinity</h1>
          <p className="text-white/90">Where Pets Connect & Thrive</p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Phone Number */}
          {step === 'phone' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign in with Phone</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country Code
                </label>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="+1">🇺🇸 +1 (USA)</option>
                  <option value="+44">🇬🇧 +44 (UK)</option>
                  <option value="+91">🇮🇳 +91 (India)</option>
                  <option value="+86">🇨🇳 +86 (China)</option>
                  <option value="+81">🇯🇵 +81 (Japan)</option>
                  <option value="+61">🇦🇺 +61 (Australia)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="1234567890"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={sendOTP}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Send OTP
              </button>

              <p className="text-xs text-gray-500 text-center">
                By continuing, you agree to our Terms & Privacy Policy
              </p>
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {step === 'otp' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter OTP</h2>
              <p className="text-sm text-gray-600 mb-4">
                We sent a code to {countryCode} {phoneNumber}
              </p>

              <div>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-2xl tracking-widest"
                  maxLength={6}
                />
              </div>

              <button
                onClick={verifyOTP}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Verify OTP
              </button>

              <button
                onClick={() => setStep('phone')}
                className="w-full text-gray-600 py-2 text-sm hover:text-gray-800"
              >
                Change phone number
              </button>
            </div>
          )}

          {/* Step 3: User Details */}
          {step === 'details' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Tell us about yourself</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                  <GenderIcon className="w-4 h-4 inline mr-1" />
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={completeRegistration}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 4: Permissions */}
          {step === 'permissions' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">App Permissions</h2>
              <p className="text-sm text-gray-600 mb-4">
                We need these permissions for core features:
              </p>

              <div className="space-y-3">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <div className="font-medium text-gray-800">Location Access (Required)</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Find nearby pets, walking routes, poop bins, and pet-friendly places
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Mic className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <div className="font-medium text-gray-800">Microphone Access (Required)</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Safety features and emergency alerts for your pet's wellbeing
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={requestPermissionsAndLogin}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Grant Permissions & Continue
              </button>

              <p className="text-xs text-gray-500 text-center">
                Your privacy is important. We only use these for app functionality.
              </p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-6 text-white/80 text-sm">
          <p>🌍 For Pets, Animals, Nature & Conservation</p>
          <p className="mt-1">Celebrating 4.1 billion years of life on Earth</p>
        </div>
      </div>
    </div>
  );
}
