import React, { useState, useEffect } from 'react';
import { Calendar, Bell, Plus, Trash2, MapPin, Activity, Utensils } from 'lucide-react';

interface Reminder {
  id: string;
  type: 'feeding' | 'exercise' | 'medication' | 'grooming' | 'vet' | 'poop_bin';
  title: string;
  description: string;
  time: string;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  createdAt: string;
  location?: { lat: number; lng: number; address: string };
}

interface PetCalendarProps {
  currentUser: any;
}

export function PetCalendar({ currentUser }: PetCalendarProps) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    type: 'feeding',
    frequency: 'daily',
  });
  const [energyData, setEnergyData] = useState({
    stepsToday: 0,
    caloriesBurned: 0,
    activeMinutes: 0,
  });

  useEffect(() => {
    // Load reminders
    const savedReminders = localStorage.getItem(`reminders_${currentUser?.id}`);
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }

    // Load energy data from wearables
    const savedEnergy = localStorage.getItem(`energy_${currentUser?.id}`);
    if (savedEnergy) {
      setEnergyData(JSON.parse(savedEnergy));
    }

    // Check for due reminders every minute
    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [currentUser]);

  const checkReminders = () => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    reminders.forEach((reminder) => {
      if (reminder.time === currentTime) {
        // Show notification
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(`Critter Affinity Reminder: ${reminder.title}`, {
            body: reminder.description,
            icon: '/paw-icon.png',
          });
        } else {
          alert(`Reminder: ${reminder.title}\n${reminder.description}`);
        }
      }
    });
  };

  const addReminder = () => {
    if (!newReminder.title || !newReminder.time) {
      alert('Please fill in all required fields');
      return;
    }

    const reminder: Reminder = {
      id: Math.random().toString(36).substr(2, 9),
      type: newReminder.type as any,
      title: newReminder.title || '',
      description: newReminder.description || '',
      time: newReminder.time || '',
      frequency: newReminder.frequency as any,
      createdAt: new Date().toISOString(),
      location: newReminder.location,
    };

    const updatedReminders = [...reminders, reminder];
    setReminders(updatedReminders);
    localStorage.setItem(`reminders_${currentUser?.id}`, JSON.stringify(updatedReminders));

    setShowAddModal(false);
    setNewReminder({ type: 'feeding', frequency: 'daily' });

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const deleteReminder = (id: string) => {
    const updatedReminders = reminders.filter((r) => r.id !== id);
    setReminders(updatedReminders);
    localStorage.setItem(`reminders_${currentUser?.id}`, JSON.stringify(updatedReminders));
  };

  const addPoopBinLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          address: 'Current Location',
        };

        const poopBin = {
          id: Math.random().toString(36).substr(2, 9),
          location,
          userId: currentUser?.id,
          timestamp: new Date().toISOString(),
        };

        // Save to database
        const existingBins = JSON.parse(localStorage.getItem('poop_bins') || '[]');
        existingBins.push(poopBin);
        localStorage.setItem('poop_bins', JSON.stringify(existingBins));

        alert('Thank you! Poop bin location added to our map.');
      });
    }
  };

  const updateEnergyTracker = () => {
    // Simulate wearable data update
    const newData = {
      stepsToday: energyData.stepsToday + Math.floor(Math.random() * 500),
      caloriesBurned: energyData.caloriesBurned + Math.floor(Math.random() * 50),
      activeMinutes: energyData.activeMinutes + Math.floor(Math.random() * 15),
    };
    setEnergyData(newData);
    localStorage.setItem(`energy_${currentUser?.id}`, JSON.stringify(newData));
  };

  const reminderTypes = [
    { id: 'feeding', label: 'Feeding Time', icon: Utensils, color: 'text-orange-500' },
    { id: 'exercise', label: 'Exercise', icon: Activity, color: 'text-green-500' },
    { id: 'medication', label: 'Medication', icon: Bell, color: 'text-red-500' },
    { id: 'grooming', label: 'Grooming', icon: Calendar, color: 'text-purple-500' },
    { id: 'vet', label: 'Vet Visit', icon: Calendar, color: 'text-blue-500' },
    { id: 'poop_bin', label: 'Poop Bin Check', icon: MapPin, color: 'text-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Pet Care Calendar</h2>
            </div>
            <p className="text-sm opacity-90">
              Schedule reminders and track your pet's daily activities
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-white text-green-600 rounded-lg font-bold hover:bg-green-50 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Reminder
          </button>
        </div>
      </div>

      {/* Energy Tracker */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Activity className="w-6 h-6 text-green-500" />
            Today's Activity
          </h3>
          <button
            onClick={updateEnergyTracker}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
          >
            Sync Wearable
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="text-sm text-blue-700 mb-1">Steps</div>
            <div className="text-3xl font-bold text-blue-900">{energyData.stepsToday.toLocaleString()}</div>
            <div className="text-xs text-blue-600 mt-1">Goal: 10,000</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
            <div className="text-sm text-orange-700 mb-1">Calories</div>
            <div className="text-3xl font-bold text-orange-900">{energyData.caloriesBurned}</div>
            <div className="text-xs text-orange-600 mt-1">Goal: 300</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
            <div className="text-sm text-green-700 mb-1">Active Minutes</div>
            <div className="text-3xl font-bold text-green-900">{energyData.activeMinutes}</div>
            <div className="text-xs text-green-600 mt-1">Goal: 60</div>
          </div>
        </div>
      </div>

      {/* Reminders List */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Your Reminders</h3>
        {reminders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-16 h-16 mx-auto mb-3 opacity-50" />
            <p>No reminders yet. Add your first one!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reminders.map((reminder) => {
              const typeConfig = reminderTypes.find((t) => t.id === reminder.type);
              const Icon = typeConfig?.icon || Bell;
              return (
                <div key={reminder.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Icon className={`w-6 h-6 ${typeConfig?.color} mt-1`} />
                      <div className="flex-1">
                        <div className="font-bold text-gray-900">{reminder.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{reminder.description}</div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>⏰ {reminder.time}</span>
                          <span>🔄 {reminder.frequency}</span>
                          {reminder.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {reminder.location.address}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Poop Bin Contribution */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-2 text-yellow-900 flex items-center gap-2">
          <MapPin className="w-6 h-6" />
          Help Map Poop Bins
        </h3>
        <p className="text-sm text-yellow-700 mb-4">
          Found a new poop bin? Help other pet owners by adding it to our community map!
        </p>
        <button
          onClick={addPoopBinLocation}
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition-colors"
        >
          Add Current Location as Poop Bin
        </button>
      </div>

      {/* Add Reminder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Add New Reminder</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {reminderTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setNewReminder({ ...newReminder, type: type.id as any })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          newReminder.type === type.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mx-auto mb-1 ${type.color}`} />
                        <div className="text-xs font-medium">{type.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newReminder.title || ''}
                  onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Morning Walk"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newReminder.description || ''}
                  onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Additional details..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={newReminder.time || ''}
                  onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <select
                  value={newReminder.frequency || 'daily'}
                  onChange={(e) => setNewReminder({ ...newReminder, frequency: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="once">Once</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={addReminder}
                  className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg font-bold hover:from-green-600 hover:to-teal-600 transition-all"
                >
                  Add Reminder
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setNewReminder({ type: 'feeding', frequency: 'daily' });
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Copyright Notice */}
      <div className="text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
        <p>© 2025 Critter Affinity LLC. All Rights Reserved.</p>
        <p className="mt-1">Pet Calendar & Reminder System</p>
        <p className="mt-1">January 2025 - Present</p>
      </div>
    </div>
  );
}
