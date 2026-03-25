import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { complaintAPI } from '../api/axios';
import { Spinner, Alert, ConfirmModal } from '../components/Common';
import ComplaintCard from '../components/ComplaintCard';

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, [page]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await complaintAPI.getMyComplaints(page, 10);
      setComplaints(response.data.content || response.data);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      setError('Failed to load complaints');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/complaints/${id}/edit`);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      await complaintAPI.deleteComplaint(deleteId);
      setComplaints(complaints.filter((c) => c.id !== deleteId));
      setDeleteId(null);
      setError('');
    } catch (err) {
      setError('Failed to delete complaint');
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  if (loading && complaints.length === 0) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Complaints</h1>
          <p className="text-gray-600">Track and manage all your filed complaints.</p>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        {/* Complaints List */}
        {complaints.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">You haven't filed any complaints yet.</p>
            <button
              onClick={() => navigate('/complaints/create')}
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              File Your First Complaint
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {complaints.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700 font-semibold">
              Page {page + 1} of {totalPages || 1}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= (totalPages - 1 || 0)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <ConfirmModal
            title="Delete Complaint"
            message="Are you sure you want to delete this complaint? This action cannot be undone."
            onConfirm={handleConfirmDelete}
            onCancel={() => setDeleteId(null)}
            isLoading={deleting}
          />
        )}
      </div>
    </div>
  );
};

export default MyComplaints;
