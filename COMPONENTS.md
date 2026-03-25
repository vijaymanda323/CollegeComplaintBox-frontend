# Component & Hook Documentation

## 🪝 useAuth() Hook

**File**: `src/context/AuthContext.jsx`

Returns authentication state and methods.

### Properties

```javascript
const {
  user,              // string - User's name
  token,             // string - JWT token
  role,              // string - 'STUDENT' or 'ADMIN'
  userId,            // string - User's ID
  loading,           // boolean - Auth check in progress
  isAuthenticated,   // boolean - User logged in
  login,             // function - Set auth state
  logout             // function - Clear auth state
} = useAuth();
```

### Usage Example

```javascript
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user, role, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user}!</h1>
      <p>Role: {role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## 🛡️ ProtectedRoute Component

**File**: `src/components/ProtectedRoute.jsx`

Guards routes and enforces role-based access.

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | ReactNode | Yes | - | Component to render if authorized |
| `allowedRoles` | string[] | No | [] | Allowed roles (empty = all authenticated) |

### Usage Example

```javascript
<ProtectedRoute allowedRoles={['STUDENT']}>
  <StudentDashboard />
</ProtectedRoute>

<ProtectedRoute allowedRoles={['ADMIN']}>
  <AdminPanel />
</ProtectedRoute>

<ProtectedRoute>
  <PublicArea /> {/* Any authenticated user */}
</ProtectedRoute>
```

---

## 📱 Navbar Component

**File**: `src/components/Navbar.jsx`

Top navigation bar with role-based menu.

### Features

- Logo with branding
- Role-specific navigation links
- User profile dropdown
- Logout button
- Mobile responsive menu
- Sticky positioning

### Usage Example

```javascript
import Navbar from '../components/Navbar';

function Layout() {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
```

---

## 🎫 ComplaintCard Component

**File**: `src/components/ComplaintCard.jsx`

Card component for displaying complaint summary.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `complaint` | object | Complaint data |
| `onEdit` | function | Edit button callback |
| `onDelete` | function | Delete button callback |
| `isAdmin` | boolean | Show admin features |

### Complaint Object Structure

```javascript
{
  id: string,
  title: string,
  description: string,
  category: string,
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED',
  createdAt: ISO8601,
  updatedAt: ISO8601,
  studentName?: string  // For admin view
}
```

### Usage Example

```javascript
import ComplaintCard from '../components/ComplaintCard';

function ComplaintList() {
  const handleEdit = (id) => navigate(`/complaints/${id}/edit`);
  const handleDelete = (id) => setDeleteId(id);

  return (
    <div>
      {complaints.map(complaint => (
        <ComplaintCard
          key={complaint.id}
          complaint={complaint}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isAdmin={false}
        />
      ))}
    </div>
  );
}
```

---

## ⚠️ Alert Component

**File**: `src/components/Common.jsx`

Displays notification messages.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `type` | 'success' \| 'error' \| 'info' \| 'warning' | Alert type |
| `message` | string | Alert message |
| `onClose` | function | Close button callback |

### Usage Example

```javascript
import { Alert } from '../components/Common';

function Form() {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  return (
    <>
      {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
    </>
  );
}
```

---

## 🗑️ ConfirmModal Component

**File**: `src/components/Common.jsx`

Confirmation dialog for destructive actions.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | string | Modal title |
| `message` | string | Confirmation message |
| `onConfirm` | function | Confirm button callback |
| `onCancel` | function | Cancel button callback |
| `isLoading` | boolean | Loading state |

### Usage Example

```javascript
import { ConfirmModal } from '../components/Common';

function DeleteButton({ id }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteComplaint(id);
    setLoading(false);
    setShowConfirm(false);
  };

  return (
    <>
      <button onClick={() => setShowConfirm(true)}>Delete</button>
      {showConfirm && (
        <ConfirmModal
          title="Delete?"
          message="This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
          isLoading={loading}
        />
      )}
    </>
  );
}
```

---

## 🔄 Spinner Component

**File**: `src/components/Common.jsx`

Loading spinner animation.

### Usage Example

```javascript
import { Spinner } from '../components/Common';

function DataFetch() {
  const [loading, setLoading] = useState(true);

  if (loading) return <Spinner />;

  return <div>Content loaded!</div>;
}
```

---

## 🏷️ StatusBadge Component

**File**: `src/components/Common.jsx`

Color-coded status badge.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `status` | string | Status value |

### Supported Status Values

- `PENDING` → Yellow badge
- `IN_PROGRESS` → Blue badge
- `RESOLVED` → Green badge
- `REJECTED` → Red badge

### Usage Example

```javascript
import { StatusBadge } from '../components/Common';

function ComplaintRow({ complaint }) {
  return (
    <tr>
      <td>{complaint.title}</td>
      <td><StatusBadge status={complaint.status} /></td>
    </tr>
  );
}
```

---

## 🎨 Utility Functions

### getStatusBadgeColor

**File**: `src/components/Common.jsx`

Returns Tailwind CSS classes for status color.

```javascript
import { getStatusBadgeColor } from '../components/Common';

const classes = getStatusBadgeColor('PENDING');
// Returns: 'bg-yellow-100 text-yellow-800 border border-yellow-300'
```

---

## 🔌 API Functions

**File**: `src/api/axios.js`

All API endpoints wrapped in functions.

### Authentication

```javascript
import { authAPI } from '../api/axios';

// Register
await authAPI.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password'
});

// Login
const response = await authAPI.login({
  email: 'john@example.com',
  password: 'password'
});
// Returns: { token: string, user: { id, name, email, role } }
```

### Student Complaints

```javascript
import { complaintAPI } from '../api/axios';

// Get my complaints (paginated)
await complaintAPI.getMyComplaints(page, size);

// Get single complaint
await complaintAPI.getComplaintById(id);

// Create complaint
await complaintAPI.createComplaint({
  title: string,
  description: string,
  category: string
});

// Update complaint
await complaintAPI.updateComplaint(id, {
  title?: string,
  description?: string,
  category?: string
});

// Delete complaint
await complaintAPI.deleteComplaint(id);
```

### Admin Complaints

```javascript
import { complaintAPI } from '../api/axios';

// Get all complaints
await complaintAPI.getAllComplaints(page, size);

// Update status
await complaintAPI.updateComplaintStatus(id, {
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED'
});

// Delete complaint
await complaintAPI.deleteAdminComplaint(id);
```

---

## 📋 Common Patterns

### Fetching Data on Mount

```javascript
import { useEffect, useState } from 'react';
import { complaintAPI } from '../api/axios';

function ComplaintsList() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await complaintAPI.getMyComplaints(0, 10);
      setComplaints(response.data);
    } catch (err) {
      setError('Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <Alert type="error" message={error} />;

  return <ComplaintCard complaint={complaints[0]} />;
}
```

### Form with Validation

```javascript
function CreateForm() {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await complaintAPI.createComplaint(formData);
      navigate('/complaints/my');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert type="error" message={error} />}
      <input value={formData.title} onChange={handleChange} required />
      <button disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
    </form>
  );
}
```

### Protected Route with Role

```javascript
import ProtectedRoute from '../components/ProtectedRoute';
import AdminDashboard from '../pages/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
```

---

## 🎯 Best Practices

1. **Always use `useAuth()`** for authentication
2. **Always wrap protected pages** with `ProtectedRoute`
3. **Always handle loading states** during API calls
4. **Always show error messages** to users
5. **Always use try-catch** for API calls
6. **Always confirm before delete** with ConfirmModal
7. **Always clean up** event listeners and timeouts
8. **Always use proper TypeScript types** (if using TypeScript)

---

## 🆘 Common Issues & Solutions

### "useAuth must be used within an AuthProvider"
→ Make sure `<AuthProvider>` wraps your entire app

### Token is missing from requests
→ Check localStorage has token: `console.log(localStorage.getItem('token'))`

### 401 errors on API calls
→ Verify backend running on port 8080
→ Check JWT token not expired
→ Review CORS settings

### Styles not applying
→ Clear browser cache
→ Verify Tailwind classes are correct
→ Check PostCSS is processing CSS

---

**For more details, see the main documentation files or check the source code comments.**
