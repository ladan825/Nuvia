// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient'; 
import { User, Mail, LogOut, Package } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserProfile(user.id);
    }
  }, [user]);

  const fetchUserProfile = async (userId) => {
    try {
      // Assuming you have a separate 'profiles' table linked by user_id
      const { data, error } = await supabase
        .from('profiles')
        .select('display_name, avatar_url, created_at')
        .eq('user_id', userId)
        .single(); // Use .single() to get one user's profile

      if (error) throw error;
      
      setProfileData(data);
    } catch (error) {
      console.error('Error fetching profile:', error.message);
      // Even if profile fetch fails, we can still show the dashboard
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen pt-20">
        <p className="text-xl">Loading user data...</p>
      </div>
    );
  }

  // Fallback for if the user is somehow null but passed the ProtectedRoute (shouldn't happen)
  if (!user) {
      return <div className="text-center py-20 text-red-500">Access Denied. Please Sign In.</div>;
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto py-12">
        <header className="flex items-center justify-between border-b pb-4 mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
            <User size={36} className="mr-3" /> Welcome, {profileData?.display_name || user.email.split('@')[0]}
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-800 transition p-2 rounded-lg border border-red-600 hover:bg-red-50"
          >
            <LogOut size={20} className="mr-2" />
            Sign Out
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Dashboard Menu (Side Navigation) */}
          <nav className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">My Account</h2>
            <DashboardLink icon={<User />} label="Profile Details" path="/dashboard" active={true} />
            <DashboardLink icon={<Package />} label="Order History" path="/orders" />
            <DashboardLink icon={<Mail />} label="Contact Preferences" path="/preferences" />
            
            {/* You will need to create the /orders and /preferences pages */}
          </nav>

          {/* Main Content Area (Profile Details) */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Profile Details</h2>
            
            <div className="space-y-4">
              <DetailRow icon={<Mail size={20} />} label="Email Address" value={user.email} />
              
              {profileData?.display_name && (
                <DetailRow icon={<User size={20} />} label="Display Name" value={profileData.display_name} />
              )}
              
              {profileData?.created_at && (
                <DetailRow 
                  icon={<LogOut size={20} />} 
                  label="Member Since" 
                  value={new Date(profileData.created_at).toLocaleDateString()} 
                />
              )}

              {/* Add a button here to edit profile details */}
              <div className="pt-4">
                <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                    Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for menu links
const DashboardLink = ({ icon, label, path, active }) => (
  <a
    href={path}
    className={`flex items-center space-x-3 p-3 rounded-lg transition ${
      active
        ? 'bg-orange-500 text-white font-bold shadow-md'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    {icon} <span>{label}</span>
  </a>
);

// Helper component for detail rows
const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
    <div className="flex items-center space-x-3 text-gray-600">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    <span className="text-gray-800 font-semibold">{value}</span>
  </div>
);