# College Complaint Management System - Frontend

A production-level React application for managing student complaints with role-based access control.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Context API** - State management

## Features

### Authentication
- User registration and login
- JWT token-based authentication
- Automatic token injection in headers
- Protected routes with role-based access

### Student Features
- Dashboard with complaint statistics
- Create new complaints
- View all personal complaints with pagination
- View complaint details
- Edit pending complaints
- Delete complaints
- Track complaint status

### Admin Features
- Admin dashboard with system statistics
- View all complaints from all students
- Update complaint status (Pending, In Progress, Resolved, Rejected)
- Delete complaints
- Pagination support

### UI Features
- Responsive design (mobile, tablet, desktop)
- Status badges with color coding
- Loading states
- Error handling and alerts
- Confirmation modals for destructive actions
- Modern dashboard layout
- Sticky navigation bar

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   cd collegecomplaintbox
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Backend URL**
   The default backend URL is `http://localhost:8080`
   You can modify it in `src/api/axios.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:8080/api';
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── api/
│   └── axios.js              # API configuration and endpoints
├── context/
│   └── AuthContext.jsx       # Authentication state management
├── components/
│   ├── ProtectedRoute.jsx    # Route protection component
│   ├── Navbar.jsx            # Top navigation bar
│   ├── ComplaintCard.jsx     # Complaint display card
│   └── Common.jsx            # Reusable UI components
├── pages/
│   ├── Login.jsx             # Login page
│   ├── Register.jsx          # Registration page
│   ├── Dashboard.jsx         # Student dashboard
│   ├── CreateComplaint.jsx   # Create complaint form
│   ├── MyComplaints.jsx      # Student complaints list
│   ├── ComplaintDetails.jsx  # Complaint details page
│   ├── EditComplaint.jsx     # Edit complaint form
│   ├── AdminDashboard.jsx    # Admin dashboard
│   ├── AdminComplaints.jsx   # Admin complaints management
│   └── Unauthorized.jsx      # Unauthorized access page
├── App.jsx                   # Main app with routing
├── App.new.jsx               # New App component (router config)
├── main.jsx                  # Entry point
├── index.css                 # Tailwind styles
└── vite.config.js            # Vite configuration

```

## API Integration

All API calls are handled through `src/api/axios.js` with automatic JWT token injection.

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Student Endpoints
- `GET /api/complaints/my` - Get user's complaints
- `GET /api/complaints/{id}` - Get complaint details
- `POST /api/complaints` - Create complaint
- `PUT /api/complaints/{id}` - Update complaint
- `DELETE /api/complaints/{id}` - Delete complaint

### Admin Endpoints
- `GET /api/admin/complaints` - Get all complaints
- `PUT /api/admin/complaints/{id}/status` - Update complaint status
- `DELETE /api/admin/complaints/{id}` - Delete complaint

## Authentication Flow

1. User registers or logs in
2. Backend returns JWT token and user data
3. Token is stored in localStorage
4. Token is automatically added to all API requests via axios interceptor
5. On token expiration (401 response), user is redirected to login

## Routing Structure

### Public Routes
- `/login` - Login page
- `/register` - Registration page

### Student Routes (requires STUDENT role)
- `/dashboard` - Student dashboard
- `/complaints/create` - Create complaint
- `/complaints/my` - My complaints list
- `/complaints/:id` - Complaint details
- `/complaints/:id/edit` - Edit complaint

### Admin Routes (requires ADMIN role)
- `/admin/dashboard` - Admin dashboard
- `/admin/complaints` - All complaints management

### Error Routes
- `/unauthorized` - Access denied page

## Status Colors

- **PENDING** - Yellow
- **IN_PROGRESS** - Blue
- **RESOLVED** - Green
- **REJECTED** - Red

## Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Environment Setup

The project uses Tailwind CSS with PostCSS. Configuration files:
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration

## Notes

1. **JWT Token Storage**: Tokens are stored in localStorage. For additional security, consider using httpOnly cookies.

2. **Role-Based Access**: The app supports two roles:
   - `STUDENT` - Can file and manage own complaints
   - `ADMIN` - Can view and manage all complaints

3. **Responsive Design**: The UI is fully responsive and works on all screen sizes.

4. **Error Handling**: All API errors are caught and displayed to the user with appropriate messages.

5. **Pagination**: Complaint lists support pagination with 10 items per page.

## Support

For issues or questions, please refer to the backend API documentation or contact the development team.
