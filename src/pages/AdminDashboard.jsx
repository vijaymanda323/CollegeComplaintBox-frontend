import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { complaintAPI } from '../api/axios';
import { Spinner, Alert } from '../components/Common';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await complaintAPI.getAllComplaints(0, 1000);
      const complaints = response.data.content || response.data;

      const total = complaints.length;
      const pending = complaints.filter((c) => c.status === 'PENDING').length;
      const inProgress = complaints.filter((c) => c.status === 'IN_PROGRESS').length;
      const resolved = complaints.filter((c) => c.status === 'RESOLVED').length;
      const rejected = complaints.filter((c) => c.status === 'REJECTED').length;

      setStats({
        total,
        pending,
        inProgress,
        resolved,
        rejected,
      });
    } catch (err) {
      setError('Failed to load dashboard statistics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  const StatCard = ({ label, value, color, icon }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 border-${color}-500`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center text-${color}-600 text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">System overview and complaint management statistics.</p>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard label="Total Complaints" value={stats.total} color="blue" icon="📋" />
          <StatCard label="Pending" value={stats.pending} color="yellow" icon="⏳" />
          <StatCard label="In Progress" value={stats.inProgress} color="blue" icon="⚙️" />
          <StatCard label="Resolved" value={stats.resolved} color="green" icon="✓" />
          <StatCard label="Rejected" value={stats.rejected} color="red" icon="✕" />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <Link
            to="/admin/complaints"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Manage All Complaints
          </Link>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">System Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-gray-600 text-sm">Total Complaints Filed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-500 mt-1">All time complaints in the system</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <p className="text-gray-600 text-sm">Pending Resolution</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-xs text-gray-500 mt-1">Awaiting action from admin</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-gray-600 text-sm">Successfully Resolved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
              <p className="text-xs text-gray-500 mt-1">Complaints resolved so far</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <p className="text-gray-600 text-sm">Rejection Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.total > 0 ? Math.round((stats.rejected / stats.total) * 100) : 0}%
              </p>
              <p className="text-xs text-gray-500 mt-1">Percentage of rejected complaints</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
