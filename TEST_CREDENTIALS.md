# Test Credentials for Research Journal Management System

## Development Login Credentials

Use these test credentials to log in and test different user roles:

### 👤 **Administrator**
- **Username:** `admin`
- **Password:** `admin123`
- **Role:** ADMIN
- **Access:** Full system administration, user management, all manuscripts and reviews

### 📝 **Journal Editor**
- **Username:** `editor`
- **Password:** `editor123`
- **Role:** EDITOR
- **Access:** Manuscript review assignment, editorial decisions, reviewer management

### 🔍 **Peer Reviewer**
- **Username:** `reviewer`
- **Password:** `reviewer123`
- **Role:** REVIEWER
- **Access:** Assigned manuscript reviews, submit review reports

### ✍️ **Research Author**
- **Username:** `author`
- **Password:** `author123`
- **Role:** AUTHOR
- **Access:** Submit manuscripts, track submission status, respond to reviews

### 🧪 **Test User**
- **Username:** `testuser`
- **Password:** `testuser123`
- **Role:** AUTHOR
- **Access:** General testing account with author privileges

## How to Use

1. Start the frontend development server: `npm run dev`
2. Navigate to `http://localhost:5173/`
3. Click "Login" or go to `/login`
4. Use any of the credentials above to log in
5. You'll be redirected to the appropriate dashboard based on your role

## Dashboard Features by Role

### Admin Dashboard
- View all system users
- Manage journals and publications
- System-wide analytics and reports
- User role management

### Editor Dashboard
- Pending manuscript reviews
- Reviewer assignment interface
- Editorial decision workflow
- Manuscript status tracking

### Reviewer Dashboard
- Assigned manuscripts for review
- Review submission forms
- Review history and deadlines
- Expertise area management

### Author Dashboard
- Manuscript submission forms
- Submission status tracking
- Review feedback and responses
- Publication history

## Mock Data Features

- **Realistic Response Delays:** 300-800ms to simulate network requests
- **Error Simulation:** Invalid credentials return proper error messages
- **JWT Token Simulation:** Mock tokens for development authentication
- **Role-based Data:** Each user sees role-appropriate dashboard content

## Switching to Real Backend

When ready to connect to the Spring Boot backend:

1. Update `authService.login()` in `/src/services/apiService.js`
2. Replace mock implementation with: `return api.post('/auth/signin', loginData);`
3. Ensure backend is running on `http://localhost:8080`
4. Backend should return JWT tokens in the same format as mock data

## Security Note

⚠️ **These are development-only credentials.** Never use these in production!