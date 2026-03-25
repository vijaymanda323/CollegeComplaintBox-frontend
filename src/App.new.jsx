import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateComplaint from './pages/CreateComplaint';
import MyComplaints from './pages/MyComplaints';
import ComplaintDetails from './pages/ComplaintDetails';
import EditComplaint from './pages/EditComplaint';
import AdminDashboard from './pages/AdminDashboard';
import AdminComplaints from './pages/AdminComplaints';
import Unauthorized from './pages/Unauthorized';

const AppLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    {children}
  </div>
);

const AppRoutes = () => {
  const { isAuthenticated, role } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to={role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'} /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to={role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'} /> : <Register />}
      />

      {/* Student Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/complaints/create"
        element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <AppLayout>
              <CreateComplaint />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/complaints/my"
        element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <AppLayout>
              <MyComplaints />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/complaints/:id"
        element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <AppLayout>
              <ComplaintDetails />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/complaints/:id/edit"
        element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <AppLayout>
              <EditComplaint />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AppLayout>
              <AdminDashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/complaints"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AppLayout>
              <AdminComplaints />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Error Routes */}
      <Route
        path="/unauthorized"
        element={
          <AppLayout>
            <Unauthorized />
          </AppLayout>
        }
      />

      {/* Redirect root to dashboard or login */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to={role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
