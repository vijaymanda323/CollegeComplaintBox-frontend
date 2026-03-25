import React from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from './Common';

const ComplaintCard = ({ complaint, onEdit, onDelete, isAdmin = false }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{complaint.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="bg-blue-50 px-3 py-1 rounded-full text-blue-700 font-medium">
              {complaint.category}
            </span>
            <StatusBadge status={complaint.status} />
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{complaint.description}</p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          {isAdmin && complaint.studentName && (
            <p className="mb-1">
              <span className="font-semibold">Student:</span> {complaint.studentName}
            </p>
          )}
          <p>
            <span className="font-semibold">Created:</span> {formatDate(complaint.createdAt)}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to={`/complaints/${complaint.id}`}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-medium transition"
          >
            View
          </Link>
          {!isAdmin && complaint.status === 'PENDING' && (
            <button
              onClick={() => onEdit(complaint.id)}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-medium transition"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => onDelete(complaint.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;
