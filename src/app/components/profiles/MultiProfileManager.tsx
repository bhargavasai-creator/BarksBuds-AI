import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, User, Store, Truck, PawPrint, Check } from 'lucide-react';

type ProfileType = 'pet' | 'shop' | 'delivery' | 'personal';

interface Profile {
  id: string;
  type: ProfileType;
  name: string;
  avatar: string;
  bio: string;
  status: 'active' | 'pending' | 'approved' | 'rejected';
  createdAt: string;
  // Pet specific
  species?: string;
  breed?: string;
  age?: number;
  // Shop specific
  shopName?: string;
  category?: string;
  businessId?: string;
  // Delivery specific
  vehicleType?: string;
  licenseNumber?: string;
  idProof?: string;
}

interface MultiProfileManagerProps {
  currentUser: any;
}

export function MultiProfileManager({ currentUser }: MultiProfileManagerProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedType, setSelectedType] = useState<ProfileType>('pet');

  useEffect(() => {
    // Load profiles from localStorage
    const savedProfiles = localStorage.getItem(`user_${currentUser?.id}_profiles`);
    if (savedProfiles) {
      const loadedProfiles = JSON.parse(savedProfiles);
      setProfiles(loadedProfiles);
      setActiveProfile(loadedProfiles[0] || null);
    } else {
      // Create default personal profile
      const defaultProfile: Profile = {
        id: 'default',
        type: 'personal',
        name: currentUser?.name || 'User',
        avatar: '👤',
        bio: 'Pet lover and animal enthusiast',
        status: 'active',
        createdAt: new Date().toISOString(),
      };
      setProfiles([defaultProfile]);
      setActiveProfile(defaultProfile);
      saveProfiles([defaultProfile]);
    }
  }, [currentUser]);

  const saveProfiles = (updatedProfiles: Profile[]) => {
    localStorage.setItem(`user_${currentUser?.id}_profiles`, JSON.stringify(updatedProfiles));
  };

  const createProfile = (type: ProfileType, data: Partial<Profile>) => {
    const newProfile: Profile = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      name: data.name || '',
      avatar: getDefaultAvatar(type),
      bio: data.bio || '',
      status: type === 'delivery' ? 'pending' : 'active', // Delivery needs approval
      createdAt: new Date().toISOString(),
      ...data,
    };

    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    saveProfiles(updatedProfiles);
    setShowCreateModal(false);

    if (type === 'delivery') {
      alert('Delivery partner profile submitted for approval. Admin will review your documents.');
    }
  };

  const deleteProfile = (profileId: string) => {
    if (confirm('Delete this profile?')) {
      const updatedProfiles = profiles.filter((p) => p.id !== profileId);
      setProfiles(updatedProfiles);
      saveProfiles(updatedProfiles);
      if (activeProfile?.id === profileId) {
        setActiveProfile(updatedProfiles[0] || null);
      }
    }
  };

  const switchProfile = (profile: Profile) => {
    setActiveProfile(profile);
    localStorage.setItem(`user_${currentUser?.id}_activeProfile`, JSON.stringify(profile));
  };

  const getDefaultAvatar = (type: ProfileType) => {
    switch (type) {
      case 'pet': return '🐾';
      case 'shop': return '🏪';
      case 'delivery': return '🚚';
      default: return '👤';
    }
  };

  const profileTypes = [
    { id: 'pet' as ProfileType, label: 'Pet Profile', icon: PawPrint, color: 'from-pink-500 to-purple-500' },
    { id: 'shop' as ProfileType, label: 'Shop/Vendor', icon: Store, color: 'from-blue-500 to-cyan-500' },
    { id: 'delivery' as ProfileType, label: 'Delivery Partner', icon: Truck, color: 'from-green-500 to-emerald-500' },
    { id: 'personal' as ProfileType, label: 'Personal', icon: User, color: 'from-orange-500 to-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Active Profile Header */}
      {activeProfile && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl">
              {activeProfile.avatar}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{activeProfile.name}</h2>
              <p className="text-sm opacity-90">{activeProfile.bio}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                  {activeProfile.type.toUpperCase()}
                </span>
                {activeProfile.status !== 'active' && (
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    activeProfile.status === 'pending' ? 'bg-yellow-500/20' :
                    activeProfile.status === 'approved' ? 'bg-green-500/20' :
                    'bg-red-500/20'
                  }`}>
                    {activeProfile.status.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Profiles */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Your Profiles</h3>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Profile
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {profiles.map((profile) => {
            const profileType = profileTypes.find((t) => t.id === profile.type);
            const Icon = profileType?.icon || User;
            
            return (
              <div
                key={profile.id}
                className={`bg-white rounded-xl shadow-md p-4 border-2 transition-all cursor-pointer ${
                  activeProfile?.id === profile.id
                    ? 'border-purple-500 shadow-lg'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => switchProfile(profile)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-16 h-16 bg-gradient-to-br ${profileType?.color} rounded-full flex items-center justify-center text-2xl text-white`}>
                    {profile.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{profile.name}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{profile.bio}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                        {profile.type}
                      </span>
                      {activeProfile?.id === profile.id && (
                        <span className="px-2 py-1 bg-green-100 rounded text-xs text-green-700 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                  {profile.id !== 'default' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProfile(profile.id);
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Type-specific info */}
                {profile.type === 'pet' && (
                  <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-600">
                    <p>🐕 {profile.breed || 'Unknown breed'} • {profile.age || 0} years old</p>
                  </div>
                )}
                {profile.type === 'shop' && (
                  <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-600">
                    <p>🏪 {profile.shopName || 'Shop'} • {profile.category || 'General'}</p>
                  </div>
                )}
                {profile.type === 'delivery' && (
                  <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-600">
                    <p>🚚 {profile.vehicleType || 'Vehicle'} • Status: {profile.status}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Profile Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <h3 className="text-2xl font-bold text-gray-900">Create New Profile</h3>
            </div>

            <div className="p-6">
              {/* Profile Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Profile Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {profileTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedType === type.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className={`w-8 h-8 mx-auto mb-2 ${
                          selectedType === type.id ? 'text-purple-500' : 'text-gray-400'
                        }`} />
                        <div className="text-sm font-medium text-gray-900">{type.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Form based on type */}
              <ProfileForm
                type={selectedType}
                onSubmit={(data) => createProfile(selectedType, data)}
                onCancel={() => setShowCreateModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileForm({ type, onSubmit, onCancel }: { type: ProfileType; onSubmit: (data: any) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Common fields */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {type === 'pet' ? 'Pet Name' : type === 'shop' ? 'Business Name' : 'Name'}
        </label>
        <input
          type="text"
          required
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder={type === 'pet' ? 'Max' : type === 'shop' ? 'Pet Paradise Store' : 'John Doe'}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bio / Description</label>
        <textarea
          required
          value={formData.bio || ''}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows={3}
          placeholder="Tell us about yourself..."
        />
      </div>

      {/* Pet-specific fields */}
      {type === 'pet' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Species</label>
            <select
              required
              value={formData.species || ''}
              onChange={(e) => setFormData({ ...formData, species: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select species</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Breed</label>
            <input
              type="text"
              value={formData.breed || ''}
              onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Golden Retriever"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age (years)</label>
            <input
              type="number"
              value={formData.age || ''}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              min="0"
              max="50"
            />
          </div>
        </>
      )}

      {/* Shop-specific fields */}
      {type === 'shop' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Shop Name</label>
            <input
              type="text"
              required
              value={formData.shopName || ''}
              onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Pet Paradise"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              required
              value={formData.category || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              <option value="Pet Food">Pet Food</option>
              <option value="Accessories">Accessories</option>
              <option value="Toys">Toys</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Grooming">Grooming</option>
              <option value="Farmer">Farmer (Zero Fees)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business ID</label>
            <input
              type="text"
              value={formData.businessId || ''}
              onChange={(e) => setFormData({ ...formData, businessId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="TAX ID or Business Registration Number"
            />
          </div>
        </>
      )}

      {/* Delivery-specific fields */}
      {type === 'delivery' && (
        <>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              ⚠️ Delivery partner profiles require admin approval. Please upload valid ID and license documents.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
            <select
              required
              value={formData.vehicleType || ''}
              onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select vehicle</option>
              <option value="Bike">Bike</option>
              <option value="Scooter">Scooter</option>
              <option value="Car">Car</option>
              <option value="Van">Van</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
            <input
              type="text"
              required
              value={formData.licenseNumber || ''}
              onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="DL1234567890"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ID Proof (URL or simulated)</label>
            <input
              type="text"
              value={formData.idProof || ''}
              onChange={(e) => setFormData({ ...formData, idProof: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Link to ID document"
            />
          </div>
        </>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          Create Profile
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
