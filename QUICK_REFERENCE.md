# Quick Reference Guide

## 🚀 Getting Started (30 seconds)

```bash
cd collegecomplaintbox
npm install
npm run dev
```

Open: `http://localhost:5173`

---

## 📋 File Directory Overview

```
src/
├── api/
│   └── axios.js                    # API client & endpoints
├── context/
│   └── AuthContext.jsx             # Authentication state management
├── components/
│   ├── ProtectedRoute.jsx          # Route protection
│   ├── Navbar.jsx                  # Navigation header
│   ├── ComplaintCard.jsx           # Complaint display
│   └── Common.jsx                  # Reusable UI components
├── pages/
│   ├── Login.jsx                   # Auth pages
│   ├── Register.jsx
│   ├── Dashboard.jsx               # Student pages
│   ├── CreateComplaint.jsx
│   ├── MyComplaints.jsx
│   ├── ComplaintDetails.jsx
│   ├── EditComplaint.jsx
│   ├── AdminDashboard.jsx          # Admin pages
│   ├── AdminComplaints.jsx
│   └── Unauthorized.jsx
├── App.new.jsx                     # Main router
├── main.jsx                        # Entry point
└── index.css                       # Tailwind styles
```

---

## 🔧 Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (port 5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🧭 Routing Map

### Public Routes
| Route | Page | Purpose |
|-------|------|---------|
| `/login` | Login | User authentication |
| `/register` | Register | Create new account |

### Student Routes (Protected)
| Route | Page | Purpose |
|-------|------|---------|
| `/dashboard` | Dashboard | Student overview stats |
| `/complaints/create` | CreateComplaint | File new complaint |
| `/complaints/my` | MyComplaints | View all personal complaints |
| `/complaints/:id` | ComplaintDetails | View complaint details |
| `/complaints/:id/edit` | EditComplaint | Edit pending complaint |

### Admin Routes (Protected)
| Route | Page | Purpose |
|-------|------|---------|
| `/admin/dashboard` | AdminDashboard | System statistics |
| `/admin/complaints` | AdminComplaints | Manage all complaints |

---

## 🔐 Authentication Flow

```
1. Register → POST /api/auth/register
2. Login → POST /api/auth/login
3. Receive JWT token + user data
4. Store in localStorage
5. Token auto-injected in all requests
6. Access protected routes
```

---

## 👥 Role-Based Access

### STUDENT Role
- Can create complaints
- Can view/edit own complaints
- Can delete own complaints
- Access: `/dashboard`, `/complaints/*`

### ADMIN Role
- Can view all complaints
- Can update complaint status
- Can delete any complaint
- Access: `/admin/*`

---

## 📊 State Management

### useAuth() Hook
```javascript
const { user, token, role, userId, isAuthenticated, login, logout } = useAuth();
```

**Usage in components:**
```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  // Use auth state...
}
```

---

## 🌐 API Integration

### Configuration
**File:** `src/api/axios.js`
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

### Using API
```javascript
import { complaintAPI, authAPI } from '../api/axios';

// Get complaints
const response = await complaintAPI.getMyComplaints(0, 10);

// Create complaint
await complaintAPI.createComplaint({ title, description, category });

// Update status (admin)
await complaintAPI.updateComplaintStatus(id, { status: 'RESOLVED' });
```

---

## 🎨 Styling with Tailwind

### Color Classes
- Blue: `bg-blue-500`, `text-blue-600`
- Yellow: `bg-yellow-100`, `text-yellow-800`
- Green: `bg-green-500`, `text-green-600`
- Red: `bg-red-500`, `text-red-600`
- Gray: `bg-gray-50`, `text-gray-900`

### Common Patterns
```jsx
// Button
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
  Action
</button>

// Card
<div className="bg-white rounded-lg shadow-md p-6">
  Content
</div>

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>
```

---

## 🛠️ Component Props & Usage

### ProtectedRoute
```jsx
<ProtectedRoute allowedRoles={['STUDENT']}>
  <YourComponent />
</ProtectedRoute>
```

### StatusBadge
```jsx
<StatusBadge status="PENDING" /> // Yellow
<StatusBadge status="IN_PROGRESS" /> // Blue
<StatusBadge status="RESOLVED" /> // Green
<StatusBadge status="REJECTED" /> // Red
```

### Alert
```jsx
<Alert type="success" message="Saved!" onClose={() => {}} />
<Alert type="error" message="Failed!" onClose={() => {}} />
```

### ComplaintCard
```jsx
<ComplaintCard 
  complaint={complaint}
  onEdit={handleEdit}
  onDelete={handleDelete}
  isAdmin={false}
/>
```

---

## 🐛 Debugging Tips

### Check Auth State
```javascript
console.log(localStorage.getItem('token'));
console.log(localStorage.getItem('userRole'));
```

### API Errors
- Check backend is running on port 8080
- Verify CORS is enabled
- Check request/response in Network tab

### Styling Issues
- Clear browser cache
- Check Tailwind config (tailwind.config.js)
- Verify PostCSS config (postcss.config.js)

---

## 📦 Dependencies

### Core
- react: UI library
- react-router-dom: Routing
- axios: HTTP client

### Styling
- tailwindcss: Utility CSS
- autoprefixer: CSS prefixing
- postcss: CSS processing

### Build
- vite: Development & build
- @vitejs/plugin-react: React support

---

## 🚢 Deployment

### Build
```bash
npm run build
```

### Output
```bash
dist/
├── index.html
├── assets/
│   ├── index-xxxx.css  (~5KB)
│   └── index-xxxx.js   (~91KB)
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

---

## 📝 Common Tasks

### Add New Page
1. Create file in `src/pages/`
2. Add route in `App.new.jsx`
3. Add to Navbar if needed
4. Use `useAuth()` for auth state

### Create Reusable Component
1. Create file in `src/components/`
2. Export as default
3. Use in pages as needed

### Add API Endpoint
1. Add function in `src/api/axios.js`
2. Use via `import { complaintAPI } from '../api/axios'`
3. Handle errors in try-catch

---

## ⚡ Performance Tips

- Lazy load routes: Use React.lazy()
- Optimize images
- Minify CSS/JS (automatic in build)
- Use pagination for large lists
- Cache API responses if needed

---

## 🔗 Important Links

- **Backend API Base**: `http://localhost:8080/api`
- **Dev Server**: `http://localhost:5173`
- **Documentation**:
  - `README_SETUP.md` - Setup instructions
  - `DEPLOYMENT_GUIDE.md` - Deployment guide
  - `PROJECT_SUMMARY.md` - Complete feature list

---

## 💡 Pro Tips

1. **Always use `useAuth()`** for accessing user state
2. **Use `ProtectedRoute`** to guard sensitive pages
3. **Handle loading states** for better UX
4. **Show error messages** from API responses
5. **Use confirmation modals** before delete operations
6. **Check localStorage** during debugging
7. **Use browser DevTools** for network/console debugging
8. **Run `npm run build`** before deployment to catch errors

---

## ✅ Pre-Deployment Checklist

- [ ] Backend running on port 8080
- [ ] API base URL correct in axios.js
- [ ] npm run build completes without errors
- [ ] Test with demo credentials
- [ ] Test all routes work
- [ ] Test API integration
- [ ] Check responsive design on mobile
- [ ] Verify error handling
- [ ] Check all buttons functional

---

**Happy coding! 🎉**
