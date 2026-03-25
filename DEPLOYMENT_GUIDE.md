## Quick Start Guide

### Prerequisites
- Node.js v16+ installed
- Backend server running on `http://localhost:8080`

### Installation & Running

1. **Navigate to project**
   ```bash
   cd collegecomplaintbox
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Test Credentials

**Student Account:**
- Email: student@example.com
- Password: password

**Admin Account:**
- Email: admin@example.com
- Password: password

---

## Project Features Summary

### 🎯 Complete Feature Set

#### Authentication System
✅ User registration with validation
✅ Secure login with JWT
✅ Automatic token management
✅ Role-based access control

#### Student Dashboard
✅ View complaint statistics
✅ Filed complaints count
✅ Pending complaints visualization
✅ Resolved complaints tracking

#### Student Complaint Management
✅ Create new complaints with categories
✅ View all personal complaints (paginated)
✅ View detailed complaint information
✅ Edit pending complaints
✅ Delete complaints
✅ Track status changes

#### Admin Dashboard
✅ System-wide statistics
✅ All complaints count
✅ Pending complaints overview
✅ In-progress tracking
✅ Resolved count
✅ Rejection rate calculation

#### Admin Complaint Management
✅ View all student complaints
✅ Filter by pagination
✅ Update complaint status
✅ Delete inappropriate complaints
✅ Student information visibility
✅ Date tracking

#### UI/UX Features
✅ Responsive design (mobile, tablet, desktop)
✅ Real-time loading states
✅ Error handling with alerts
✅ Success notifications
✅ Confirmation modals
✅ Status badges with colors
✅ Sticky navigation
✅ User profile menu

---

## File Structure

```
src/
├── api/
│   └── axios.js                    # API client with interceptors
├── context/
│   └── AuthContext.jsx             # Auth state & hooks
├── components/
│   ├── ProtectedRoute.jsx          # Route guard component
│   ├── Navbar.jsx                  # Navigation header
│   ├── ComplaintCard.jsx           # Complaint display component
│   └── Common.jsx                  # Reusable UI utilities
├── pages/                          # Page components
│   ├── Login.jsx                   # Login form
│   ├── Register.jsx                # Registration form
│   ├── Dashboard.jsx               # Student dashboard
│   ├── CreateComplaint.jsx         # Complaint form
│   ├── MyComplaints.jsx            # Student complaints list
│   ├── ComplaintDetails.jsx        # Complaint view
│   ├── EditComplaint.jsx           # Complaint editor
│   ├── AdminDashboard.jsx          # Admin overview
│   ├── AdminComplaints.jsx         # Admin management
│   └── Unauthorized.jsx            # Error page
├── App.new.jsx                     # Main router component
├── main.jsx                        # React entry point
├── index.css                       # Tailwind styles
├── vite.config.js                  # Vite config
├── tailwind.config.js              # Tailwind config
└── postcss.config.js               # PostCSS config
```

---

## API Endpoints Summary

### Authentication
```
POST /api/auth/register      → Register new user
POST /api/auth/login         → Login user
```

### Student Complaints
```
GET    /api/complaints/my          → Get user's complaints
GET    /api/complaints/{id}        → Get complaint details
POST   /api/complaints             → Create complaint
PUT    /api/complaints/{id}        → Update complaint
DELETE /api/complaints/{id}        → Delete complaint
```

### Admin Complaints
```
GET    /api/admin/complaints               → Get all complaints
PUT    /api/admin/complaints/{id}/status   → Update status
DELETE /api/admin/complaints/{id}          → Delete complaint
```

---

## Building for Production

```bash
npm run build              # Create optimized build
npm run preview           # Preview production build
```

Output will be in `dist/` folder.

---

## Deployment Options

### 1. Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### 2. Vercel
```bash
npm install -g vercel
vercel --prod
```

### 3. Traditional Server
- Build: `npm run build`
- Copy `dist/` contents to web server
- Configure server for SPA (fallback to index.html)

---

## Backend Configuration

Update `src/api/axios.js` if backend URL changes:

```javascript
const API_BASE_URL = 'http://your-backend-url/api';
```

---

## Security Notes

1. **JWT Storage**: Currently stored in localStorage
   - Recommendation: Use httpOnly cookies for better security
   
2. **API Calls**: All requests automatically include Authorization header
   
3. **Token Expiration**: User redirected to login on 401 response

4. **CORS**: Ensure backend allows frontend domain

---

## Troubleshooting

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Dependencies issues
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### API connection errors
- Verify backend is running on `http://localhost:8080`
- Check CORS headers in backend
- Verify API endpoints match backend

---

## Technologies Used

| Technology | Purpose | Version |
|------------|---------|---------|
| React | UI Framework | 19.2.0 |
| React Router | Client Routing | 6.20.0 |
| Axios | HTTP Client | 1.6.0 |
| Tailwind CSS | Styling | 3.3.6 |
| Vite | Build Tool | 7.3.1 |
| JavaScript | Language | ES6+ |

---

## Performance Optimizations

✅ Code splitting by route
✅ Lazy loading components
✅ Optimized bundle size
✅ Image optimization
✅ Minification in production

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Future Enhancements

- [ ] Comment system for complaints
- [ ] File attachments for complaints
- [ ] Email notifications
- [ ] Advanced filtering and search
- [ ] Export complaints to PDF
- [ ] Analytics dashboard
- [ ] Real-time updates with WebSocket
