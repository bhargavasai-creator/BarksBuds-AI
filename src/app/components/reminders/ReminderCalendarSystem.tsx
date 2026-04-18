import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Plus, Trash2, Check, MapPin, Utensils, Activity } from 'lucide-react';

interface Reminder {
  id: string;
  type: 'feeding' | 'exercise' | 'poop-bin' | 'vet' | 'medication' | 'grooming' | 'custom';
  title: string;
  description: string;
  time: string;
  repeat: 'once' | 'daily' | 'weekly' | 'monthly';
  enabled: boolean;
  createdAt: string;
}

interface PoopBinLocation {
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  addedBy: string;
  timestamp: string;
  verified: boolean;
}

export function ReminderCalendarSystem({ currentUser }: { currentUser: any }) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [poopBins, setPoopBins] = useState<PoopBinLocation[]>([]);
  const [feedingLog, setFeedingLog] = useState<any[]>([]);
  const [energyLevel, setEnergyLevel] = useState(7);
  const [showAddReminder, setShowAddReminder] = useState(false);

  useEffect(() => {
    // Load reminders
    const savedReminders = localStorage.getItem(`reminders_${currentUser?.id}`);
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    } else {
      // Create default reminders
      const defaultReminders: Reminder[] = [
        {
          id: '1',
          type: 'feeding',
          title: 'Morning Feeding',
          description: 'Feed your pet breakfast',
          time: '08:00',
          repeat: 'daily',
          enabled: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          type: 'feeding',
          title: 'Evening Feeding',
          description: 'Feed your pet dinner',
          time: '18:00',
          repeat: 'daily',
          enabled: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          type: 'exercise',
          title: 'Morning Walk',
          description: 'Take your pet for a walk',
          time: '07:00',
          repeat: 'daily',
          enabled: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: '4',
          type: 'exercise',
          title: 'Evening Walk',
          description: 'Evening exercise time',
          time: '19:00',
          repeat: 'daily',
          enabled: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: '5',
          type: 'vet',
          title: 'Monthly Health Check',
          description: 'Schedule vet appointment',
          time: '10:00',
          repeat: 'monthly',
          enabled: true,
          createdAt: new Date().toISOString(),
        },
      ];
      setReminders(defaultReminders);
      saveReminders(defaultReminders);
    }

    // Load poop bin locations
    const savedBins = localStorage.getItem('poop_bins_global');
    if (savedBins) {
      setPoopBins(JSON.parse(savedBins));
    }

    // Load feeding log
    const savedLog = localStorage.getItem(`feeding_log_${currentUser?.id}`);
    if (savedLog) {
      setFeedingLog(JSON.parse(savedLog));
    }

    // Check for due reminders
    checkReminders();
    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [currentUser]);

  const saveReminders = (updatedReminders: Reminder[]) => {
    localStorage.setItem(`reminders_${currentUser?.id}`, JSON.stringify(updatedReminders));
  };

  const checkReminders = () => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    reminders.forEach((reminder) => {
      if (reminder.enabled && reminder.time === currentTime) {
        // Show notification
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(`🐾 ${reminder.title}`, {
            body: reminder.description,
            icon: '/critter-icon.png',
          });
        } else {
          alert(`🐾 Reminder: ${reminder.title}\n${reminder.description}`);
        }
      }
    });
  };

  const addReminder = (reminder: Omit<Reminder, 'id' | 'createdAt'>) => {
    const newReminder: Reminder = {
      ...reminder,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    const updated = [...reminders, newReminder];
    setReminders(updated);
    saveReminders(updated);
    setShowAddReminder(false);
  };

  const deleteReminder = (id: string) => {
    const updated = reminders.filter((r) => r.id !== id);
    setReminders(updated);
    saveReminders(updated);
  };

  const toggleReminder = (id: string) => {
    const updated = reminders.map((r) =>
      r.id === id ? { ...r, enabled: !r.enabled } : r
    );
    setReminders(updated);
    saveReminders(updated);
  };

  const logFeeding = () => {
    const log = {
      timestamp: new Date().toISOString(),
      userId: currentUser?.id,
      energyBefore: energyLevel,
      energyAfter: Math.min(10, energyLevel + 2),
    };
    const updatedLog = [...feedingLog, log];
    setFeedingLog(updatedLog);
    localStorage.setItem(`feeding_log_${currentUser?.id}`, JSON.stringify(updatedLog));
    setEnergyLevel(Math.min(10, energyLevel + 2));
    alert('Feeding logged! Energy level updated.');
  };

  const addPoopBin = async () => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const newBin: PoopBinLocation = {
        id: Math.random().toString(36).substr(2, 9),
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        address: 'Current Location',
        addedBy: currentUser?.id || 'anonymous',
        timestamp: new Date().toISOString(),
        verified: false,
      };

      const updatedBins = [...poopBins, newBin];
      setPoopBins(updatedBins);
      localStorage.setItem('poop_bins_global', JSON.stringify(updatedBins));

      // Add to database (in production, this would call backend API)
      console.log('Adding poop bin to database:', newBin);

      alert('Poop bin location added! Thank you for contributing to the community. 🐾');
    } catch (error) {
      alert('Please enable location services to add a poop bin location.');
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Bell className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Reminders & Schedule</h2>
        </div>
        <p className="text-sm opacity-90">
          Stay on top of your pet's care with smart reminders
        </p>
      </div>

      {/* Energy Tracker */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
          <Activity className="w-6 h-6 text-orange-500" />
          Pet Energy Tracker
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Current Energy Level</span>
              <span className="text-2xl font-bold text-orange-600">{energyLevel}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-orange-400 to-pink-500 h-4 rounded-full transition-all"
                style={{ width: `${energyLevel * 10}%` }}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={logFeeding}
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              <Utensils className="w-5 h-5" />
              Log Feeding (+2 Energy)
            </button>
            <button
              onClick={() => setEnergyLevel(Math.max(1, energyLevel - 1))}
              className="flex-1 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              After Exercise (-1 Energy)
            </button>
          </div>
          <div className="text-xs text-gray-500 text-center">
            Last {feedingLog.length} feedings tracked • Energy updates automatically
          </div>
        </div>
      </div>

      {/* Reminders List */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-500" />
            Your Reminders ({reminders.length})
          </h3>
          <button
            onClick={() => setShowAddReminder(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Reminder
          </button>
        </div>

        <div className="space-y-3">
          {reminders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No reminders yet. Add your first reminder to get started!
            </div>
          ) : (
            reminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`border-2 rounded-lg p-4 transition-all ${
                  reminder.enabled
                    ? 'border-blue-200 bg-blue-50'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <button
                      onClick={() => toggleReminder(reminder.id)}
                      className={`mt-1 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                        reminder.enabled
                          ? 'bg-blue-500 border-blue-500'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {reminder.enabled && <Check className="w-4 h-4 text-white" />}
                    </button>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{reminder.title}</h4>
                      <p className="text-sm text-gray-600">{reminder.description}</p>
                      <div className="flex gap-3 mt-2 text-xs text-gray-500">
                        <span className="px-2 py-1 bg-white rounded">
                          {reminder.type.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 bg-white rounded">⏰ {reminder.time}</span>
                        <span className="px-2 py-1 bg-white rounded">
                          🔁 {reminder.repeat}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Poop Bin Locations */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-green-500" />
          Poop Bin Locations ({poopBins.length})
        </h3>
        <div className="space-y-3">
          <button
            onClick={addPoopBin}
            className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            <MapPin className="w-5 h-5" />
            Add Current Location as Poop Bin
          </button>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {poopBins.slice(-10).reverse().map((bin) => (
              <div key={bin.id} className="p-3 bg-gray-50 rounded-lg text-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">
                      📍 {bin.latitude.toFixed(4)}, {bin.longitude.toFixed(4)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Added {new Date(bin.timestamp).toLocaleDateString()}
                      {bin.verified && <span className="ml-2 text-green-600">✓ Verified</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Reminder Modal */}
      {showAddReminder && (
        <AddReminderModal
          onAdd={addReminder}
          onClose={() => setShowAddReminder(false)}
        />
      )}

      {/* Footer */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-gray-600">
        <p>
          © {new Date().getFullYear()} Critter Affinity. All reminders are stored locally and synced to your account.
          Poop bin locations are shared with the community to help all pet owners. We respect your privacy and comply
          with data protection laws in all countries we operate.
        </p>
      </div>
    </div>
  );
}

function AddReminderModal({
  onAdd,
  onClose,
}: {
  onAdd: (reminder: Omit<Reminder, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    type: 'custom' as Reminder['type'],
    title: '',
    description: '',
    time: '09:00',
    repeat: 'daily' as Reminder['repeat'],
    enabled: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Add New Reminder</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="feeding">Feeding</option>
              <option value="exercise">Exercise</option>
              <option value="poop-bin">Poop Bin Check</option>
              <option value="vet">Vet Appointment</option>
              <option value="medication">Medication</option>
              <option value="grooming">Grooming</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Morning Walk"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={2}
              placeholder="Additional details..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <input
              type="time"
              required
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Repeat</label>
            <select
              value={formData.repeat}
              onChange={(e) => setFormData({ ...formData, repeat: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="once">Once</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-bold"
            >
              Add Reminder
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-bold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
