import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Phone, MapPin, Mic, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';

interface EnhancedAuthProps {
  onLogin: (userData: any) => void;
}

type AuthMode = 'login' | 'signup' | 'forgot' | 'otp';

export function EnhancedAuth({ onLogin }: EnhancedAuthProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [hasMicPermission, setHasMicPermission] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Request location permission
  const requestLocationPermission = async () => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setHasLocationPermission(true);
      localStorage.setItem('userLocation', JSON.stringify({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        timestamp: Date.now(),
      }));
    } catch (err) {
      setError('Location permission is required to use Critter Affinity');
    }
  };

  // Request microphone permission
  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop immediately after permission
      setHasMicPermission(true);
      localStorage.setItem('hasMicPermission', 'true');
    } catch (err) {
      setError('Microphone permission is required for voice features');
    }
  };

  // Check permissions on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    const savedMicPermission = localStorage.getItem('hasMicPermission');
    
    if (savedLocation) {
      setHasLocationPermission(true);
      setLocation(JSON.parse(savedLocation));
    }
    if (savedMicPermission) {
      setHasMicPermission(true);
    }
  }, []);

  // Send OTP
  const handleSendOTP = async () => {
    if (!email || !phone) {
      setError('Please enter email and phone number');
      return;
    }

    if (!hasLocationPermission || !hasMicPermission) {
      setError('Please grant location and microphone permissions');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // In production, call backend API to send OTP via SMS/Email
      console.log('OTP sent to:', email, phone);
      setMode('otp');
      setLoading(false);
      // For demo, show OTP in console
      console.log('Demo OTP: 123456');
    }, 1500);
  };

  // Verify OTP and complete signup
  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError('Please enter 6-digit OTP');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // In production, verify OTP with backend
      if (otp === '123456') {
        const userData = {
          id: Math.random().toString(36).substr(2, 9),
          name: name || 'User',
          email,
          phone,
          location,
          createdAt: new Date().toISOString(),
          credits: 1, // 1 free prompt
          isAdmin: email.includes('admin'), // Demo: make admins
        };
        
        // Store in localStorage (in production, use database)
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        onLogin(userData);
      } else {
        setError('Invalid OTP. Demo OTP is: 123456');
        setLoading(false);
      }
    }, 1000);
  };

  // Handle regular login
  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // In production, authenticate with backend
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        onLogin(JSON.parse(storedUser));
      } else {
        // Demo login
        const userData = {
          id: Math.random().toString(36).substr(2, 9),
          name: 'Demo User',
          email,
          location,
          credits: 1,
          isAdmin: email.includes('admin'),
        };
        onLogin(userData);
      }
    }, 1000);
  };

  // Handle forgot password
  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setError('');
      alert(`Password reset link sent to ${email}`);
      setMode('login');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🐾</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {mode === 'login' && 'Welcome Back!'}
            {mode === 'signup' && 'Join Critter Affinity'}
            {mode === 'forgot' && 'Reset Password'}
            {mode === 'otp' && 'Verify OTP'}
          </h1>
          <p className="text-gray-600 mt-2">
            {mode === 'login' && 'Log in to continue your pet journey'}
            {mode === 'signup' && 'Create your account to get started'}
            {mode === 'forgot' && "We'll send you a reset link"}
            {mode === 'otp' && `OTP sent to ${phone}`}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Permissions Check */}
        {mode === 'signup' && !hasLocationPermission && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location Permission Required
            </h3>
            <p className="text-sm text-blue-700 mb-3">
              We need your location for local content, dating matches, and safety features.
            </p>
            <button
              onClick={requestLocationPermission}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Grant Location Access
            </button>
          </div>
        )}

        {mode === 'signup' && hasLocationPermission && !hasMicPermission && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
            <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
              <Mic className="w-5 h-5" />
              Microphone Permission Required
            </h3>
            <p className="text-sm text-purple-700 mb-3">
              Enable voice commands and pet sound recognition features.
            </p>
            <button
              onClick={requestMicPermission}
              className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Grant Microphone Access
            </button>
          </div>
        )}

        {/* Forms */}
        <div className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          {mode !== 'otp' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>
          )}

          {(mode === 'login' || mode === 'signup') && mode !== 'otp' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {mode === 'otp' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                Enter 6-Digit OTP
              </label>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                Demo OTP: 123456
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {mode === 'login' && (
            <>
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
              <button
                onClick={() => setMode('forgot')}
                className="w-full text-sm text-purple-600 hover:text-purple-700 transition-colors"
              >
                Forgot Password?
              </button>
            </>
          )}

          {mode === 'signup' && hasLocationPermission && hasMicPermission && (
            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          )}

          {mode === 'forgot' && (
            <>
              <button
                onClick={handleForgotPassword}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <button
                onClick={() => setMode('login')}
                className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </button>
            </>
          )}

          {mode === 'otp' && (
            <>
              <button
                onClick={handleVerifyOTP}
                disabled={loading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify & Sign Up'}
              </button>
              <button
                onClick={handleSendOTP}
                className="w-full text-sm text-purple-600 hover:text-purple-700 transition-colors"
              >
                Resend OTP
              </button>
            </>
          )}

          {/* Mode Toggle */}
          {mode === 'login' && (
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setMode('signup')}
                className="text-purple-600 font-medium hover:text-purple-700 transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}

          {mode === 'signup' && (
            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-purple-600 font-medium hover:text-purple-700 transition-colors"
              >
                Log In
              </button>
            </div>
          )}
        </div>

        {/* Permissions Info */}
        {hasLocationPermission && (
          <div className="mt-6 text-xs text-gray-500 text-center">
            <p>✓ Location: {location?.lat.toFixed(4)}, {location?.lng.toFixed(4)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
