import React, { useState } from 'react';
import { Activity, Heart, Footprints, Flame, Moon, ThermometerSun, Watch, TrendingUp, AlertCircle } from 'lucide-react';

// Health Tracking Screen
// Live health monitoring from wearable devices (belts, chips, collars)
// Real-time metrics: heart rate, steps, calories, sleep, temperature
interface HealthTrackingScreenProps {
  currentUser: any;
}

export function HealthTrackingScreen({ currentUser }: HealthTrackingScreenProps) {
  const [selectedPet, setSelectedPet] = useState('max');
  const [selectedDevice, setSelectedDevice] = useState('collar_001');

  // Mock pet health data from devices
  const healthData = {
    max: {
      petName: 'Max',
      species: 'Dog',
      emoji: '🐕',
      devices: [
        {
          deviceId: 'collar_001',
          type: 'Smart Collar',
          manufacturer: 'PetTech Pro',
          batteryLevel: 78,
          lastSync: '2 mins ago',
          isActive: true,
        },
      ],
      metrics: {
        heartRate: { value: 85, unit: 'bpm', status: 'normal', trend: 'stable' },
        steps: { value: 8543, unit: 'steps', goal: 10000, trend: 'up' },
        calories: { value: 342, unit: 'kcal', goal: 450, trend: 'up' },
        sleep: { value: 7.5, unit: 'hours', goal: 8, trend: 'stable' },
        temperature: { value: 38.2, unit: '°C', status: 'normal', trend: 'stable' },
        activityLevel: { value: 68, unit: '%', status: 'active', trend: 'up' },
      },
      alerts: [
        {
          id: '1',
          type: 'info',
          message: 'Max has been more active today! Great job!',
          time: '10 mins ago',
        },
      ],
      weeklyData: {
        steps: [8200, 9100, 7800, 10200, 8900, 9500, 8543],
        heartRate: [82, 85, 80, 88, 83, 86, 85],
        sleep: [8, 7.5, 9, 7, 8.5, 7.5, 7.5],
      },
    },
  };

  const petData = healthData[selectedPet as keyof typeof healthData];
  const device = petData.devices.find((d) => d.deviceId === selectedDevice);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-2xl">
              {petData.emoji}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{petData.petName}'s Health</h2>
              <p className="text-sm text-gray-600">Live health monitoring & tracking</p>
            </div>
          </div>
          {device && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">Device Active</span>
            </div>
          )}
        </div>
      </div>

      {/* Device Info */}
      {device && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-md p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Watch className="w-8 h-8" />
              <div>
                <div className="font-bold text-lg">{device.type}</div>
                <div className="text-sm opacity-90">
                  {device.manufacturer} • Last sync: {device.lastSync}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{device.batteryLevel}%</div>
              <div className="text-xs opacity-90">Battery</div>
            </div>
          </div>
        </div>
      )}

      {/* Health Alerts */}
      {petData.alerts.length > 0 && (
        <div className="space-y-2">
          {petData.alerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-xl p-4 flex items-start gap-3 ${
                alert.type === 'warning'
                  ? 'bg-yellow-50 border border-yellow-200'
                  : alert.type === 'error'
                  ? 'bg-red-50 border border-red-200'
                  : 'bg-blue-50 border border-blue-200'
              }`}
            >
              <AlertCircle
                className={`w-5 h-5 mt-0.5 ${
                  alert.type === 'warning'
                    ? 'text-yellow-600'
                    : alert.type === 'error'
                    ? 'text-red-600'
                    : 'text-blue-600'
                }`}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Real-time Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Heart Rate */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-500" />
              </div>
              <span className="text-sm font-medium text-gray-700">Heart Rate</span>
            </div>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <div className="mb-2">
            <span className="text-3xl font-bold text-gray-900">
              {petData.metrics.heartRate.value}
            </span>
            <span className="text-sm text-gray-500 ml-2">{petData.metrics.heartRate.unit}</span>
          </div>
          <div className="text-xs text-green-600 font-medium">
            {petData.metrics.heartRate.status.toUpperCase()}
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Footprints className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-sm font-medium text-gray-700">Steps</span>
            </div>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <div className="mb-2">
            <span className="text-3xl font-bold text-gray-900">
              {petData.metrics.steps.value.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${(petData.metrics.steps.value / petData.metrics.steps.goal) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Goal: {petData.metrics.steps.goal.toLocaleString()}
          </div>
        </div>

        {/* Calories */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-sm font-medium text-gray-700">Calories</span>
            </div>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <div className="mb-2">
            <span className="text-3xl font-bold text-gray-900">
              {petData.metrics.calories.value}
            </span>
            <span className="text-sm text-gray-500 ml-2">{petData.metrics.calories.unit}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: `${(petData.metrics.calories.value / petData.metrics.calories.goal) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Goal: {petData.metrics.calories.goal} kcal
          </div>
        </div>

        {/* Sleep */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Moon className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-sm font-medium text-gray-700">Sleep</span>
            </div>
          </div>
          <div className="mb-2">
            <span className="text-3xl font-bold text-gray-900">
              {petData.metrics.sleep.value}
            </span>
            <span className="text-sm text-gray-500 ml-2">{petData.metrics.sleep.unit}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: `${(petData.metrics.sleep.value / petData.metrics.sleep.goal) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Goal: {petData.metrics.sleep.goal} hours
          </div>
        </div>

        {/* Temperature */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <ThermometerSun className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Temperature</span>
            </div>
          </div>
          <div className="mb-2">
            <span className="text-3xl font-bold text-gray-900">
              {petData.metrics.temperature.value}
            </span>
            <span className="text-sm text-gray-500 ml-2">{petData.metrics.temperature.unit}</span>
          </div>
          <div className="text-xs text-green-600 font-medium">
            {petData.metrics.temperature.status.toUpperCase()}
          </div>
        </div>

        {/* Activity Level */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-sm font-medium text-gray-700">Activity</span>
            </div>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <div className="mb-2">
            <span className="text-3xl font-bold text-gray-900">
              {petData.metrics.activityLevel.value}
            </span>
            <span className="text-sm text-gray-500 ml-2">{petData.metrics.activityLevel.unit}</span>
          </div>
          <div className="text-xs text-green-600 font-medium">
            {petData.metrics.activityLevel.status.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Weekly Trends */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="font-bold text-lg mb-4 text-gray-900">Weekly Trends</h3>
        <div className="grid grid-cols-3 gap-6">
          {/* Steps Chart */}
          <div>
            <div className="text-sm font-medium text-gray-700 mb-3">Steps (Last 7 Days)</div>
            <div className="flex items-end gap-1 h-32">
              {petData.weeklyData.steps.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-blue-500 rounded-t"
                    style={{ height: `${(value / 12000) * 100}%` }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-1">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Heart Rate Chart */}
          <div>
            <div className="text-sm font-medium text-gray-700 mb-3">Heart Rate (Last 7 Days)</div>
            <div className="flex items-end gap-1 h-32">
              {petData.weeklyData.heartRate.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-red-500 rounded-t"
                    style={{ height: `${(value / 100) * 100}%` }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-1">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sleep Chart */}
          <div>
            <div className="text-sm font-medium text-gray-700 mb-3">Sleep (Last 7 Days)</div>
            <div className="flex items-end gap-1 h-32">
              {petData.weeklyData.sleep.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-purple-500 rounded-t"
                    style={{ height: `${(value / 10) * 100}%` }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-1">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
