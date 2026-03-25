import React, { useState, useEffect } from 'react';
import { complaintAPI } from '../api/axios';
import { Spinner, Alert, ConfirmModal, StatusBadge } from '../components/Common';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [statusLoading, setStatusLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, [page]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await complaintAPI.getAllComplaints(page, 10);
      setComplaints(response.data.content || response.data);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      setError('Failed to load complaints');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      setStatusLoading(true);
      await complaintAPI.updateComplaintStatus(selectedComplaint.id, {
        status: newStatus,
      });
      
      setComplaints(
        complaints.map((c) =>
          c.id === selectedComplaint.id ? { ...c, status: newStatus } : c
        )
      );
      setSelectedComplaint(null);
      setNewStatus('');
      setError('');
    } catch (err) {
      setError('Failed to update complaint status');
      console.error(err);
    } finally {
      setStatusLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      await complaintAPI.deleteAdminComplaint(deleteId);
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Complaints</h1>
          <p className="text-gray-600">Manage and review all complaints from students.</p>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        {/* Table */}
        {complaints.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">No complaints found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Student
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {complaints.map((complaint) => (
                    <tr key={complaint.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-900 font-mono">
                        {complaint.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        <div className="max-w-xs truncate">{complaint.title}</div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                          {complaint.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {complaint.studentName || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <StatusBadge status={complaint.status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm space-x-2">
                        <button
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setNewStatus(complaint.status);
                          }}
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteClick(complaint.id)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

        {/* Status Update Modal */}
        {selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Update Complaint Status</h2>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Complaint:</span> {selectedComplaint.title}
              </p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedComplaint(null)}
                  disabled={statusLoading}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateStatus}
                  disabled={statusLoading || newStatus === selectedComplaint.status}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                  {statusLoading && <span className="animate-spin mr-2">⟳</span>}
                  Update
                </button>
              </div>
            </div>
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

export default AdminComplaints;
