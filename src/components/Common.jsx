import React from 'react';

export const Alert = ({ type = 'info', message, onClose }) => {
  const bgColor = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-yellow-50 border-yellow-200',
  }[type];

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800',
    warning: 'text-yellow-800',
  }[type];

  const iconColor = {
    success: 'text-green-500',
    error: 'text-red-500',
    info: 'text-blue-500',
    warning: 'text-yellow-500',
  }[type];

  return (
    <div className={`border rounded-lg p-4 mb-4 ${bgColor} ${textColor}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className={`text-2xl mr-3 ${iconColor}`}>
            {type === 'success' && '✓'}
            {type === 'error' && '✕'}
            {type === 'info' && 'ℹ'}
            {type === 'warning' && '⚠'}
          </span>
          <span>{message}</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto text-lg font-bold hover:opacity-70"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export const ConfirmModal = ({ title, message, onConfirm, onCancel, isLoading = false }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 flex items-center"
          >
            {isLoading && <span className="animate-spin mr-2">⟳</span>}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export const Spinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

export const getStatusBadgeColor = (status) => {
  const colors = {
    PENDING: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    IN_PROGRESS: 'bg-blue-100 text-blue-800 border border-blue-300',
    RESOLVED: 'bg-green-100 text-green-800 border border-green-300',
    REJECTED: 'bg-red-100 text-red-800 border border-red-300',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const StatusBadge = ({ status }) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(status)}`}>
    {status}
  </span>
);
