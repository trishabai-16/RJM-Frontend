#  Research Journal Management System - Frontend

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-purple.svg)](https://vitejs.dev/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.14+-blue.svg)](https://mui.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, responsive frontend application for the Research Journal Management System. Built with React 18, Material-UI, and Vite for optimal performance and developer experience.

##  Features

###  **Modern User Interface**
- Clean, professional Material-UI design
- Responsive layout for all devices
- Dark/Light theme support
- Intuitive navigation and user experience
- Professional landing page with feature highlights

###  **Authentication & Authorization**
- JWT-based authentication system
- Role-based access control (Author, Editor, Reviewer, Admin)
- Secure login and registration
- Protected routes and components
- Session management

###  **Manuscript Management**
- Intuitive manuscript submission form
- Document upload with validation
- Manuscript tracking and status updates
- Version control interface
- Author collaboration tools

###  **Role-Based Dashboards**
- **Author Dashboard**: Submit and track manuscripts
- **Reviewer Dashboard**: Review assignments and submissions
- **Editor Dashboard**: Manage reviews and editorial decisions
- **Admin Dashboard**: System oversight and user management

##  Getting Started

### Prerequisites
- **Node.js 18+** (LTS recommended)
- **npm 9+** or **yarn 1.22+**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/trishabai-16/RJM-Frontend.git
   cd RJM-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy the environment template:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:8081/api
   VITE_APP_TITLE=Research Journal Management System
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to: http://localhost:5173

##  Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

##  User Roles & Features

###  **Author**
- Submit new manuscripts
- Track submission status
- View review feedback
- Manage author profile

###  **Reviewer**
- View assigned reviews
- Submit review reports
- Access manuscript details
- Manage review deadlines

###  **Editor**
- Manage manuscript assignments
- Review and approve submissions
- Assign reviewers
- Make editorial decisions

###  **Admin**
- User management
- System configuration
- Analytics and reports
- Journal management

##  Configuration

### Environment Variables
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8081/api

# Application Settings
VITE_APP_TITLE=Research Journal Management System
VITE_UPLOAD_MAX_SIZE=10485760  # 10MB
```

##  Build & Deployment

### Production Build
```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Docker Deployment
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Authors

- **trishabai-16** - *Initial work* - [GitHub](https://github.com/trishabai-16)

##  Support

For support and questions:
- **Email**: keerthisinghnandeti@gmail.com
- **GitHub Issues**: [Create an issue](https://github.com/trishabai-16/RJM-Frontend/issues)

##  Related Repositories

- **Backend API**: [RJM-Backend](https://github.com/trishabai-16/RJM-Backend)

---

**Built with  for researchers worldwide** 
