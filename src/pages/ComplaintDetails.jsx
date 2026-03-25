import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { complaintAPI } from '../api/axios';
import { Spinner, Alert, StatusBadge } from '../components/Common';

const ComplaintDetails = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      setLoading(true);
      const response = await complaintAPI.getComplaintById(id);
      setComplaint(response.data);
    } catch (err) {
      setError('Failed to load complaint details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <Alert type="error" message={error} />;
  if (!complaint) return <Alert type="error" message="Complaint not found" />;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:text-blue-800 font-semibold flex items-center"
        >
          ← Back
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold">{complaint.title}</h1>
              <StatusBadge status={complaint.status} />
            </div>
            <p className="text-blue-100">Complaint ID: {complaint.id}</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-200">
              {/* Category */}
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Category</p>
                <p className="text-lg text-gray-900 bg-blue-50 px-3 py-1 rounded-full inline-block">
                  {complaint.category?.replace(/_/g, ' ')}
                </p>
              </div>

              {/* Status */}
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Status</p>
                <StatusBadge status={complaint.status} />
              </div>

              {/* Created Date */}
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Filed On</p>
                <p className="text-gray-900">{formatDate(complaint.createdAt)}</p>
              </div>

              {/* Last Updated */}
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Last Updated</p>
                <p className="text-gray-900">{formatDate(complaint.updatedAt)}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-gray-600 mb-3">Description</p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p className="text-gray-900 whitespace-pre-wrap">{complaint.description}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {complaint.status === 'PENDING' && (
                <button
                  onClick={() => navigate(`/complaints/${id}/edit`)}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
                >
                  Edit Complaint
                </button>
              )}
              <button
                onClick={() => navigate('/complaints/my')}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition"
              >
                Back to List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
