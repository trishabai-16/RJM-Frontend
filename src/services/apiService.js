import api from './api';

// Mock data for development
const MOCK_MANUSCRIPTS = [
  {
    id: 1,
    title: "Machine Learning Applications in Climate Change Prediction",
    abstract: "This paper explores the use of deep learning models for predicting climate change patterns...",
    keywords: "machine learning, climate change, deep learning, prediction models",
    status: "UNDER_REVIEW",
    submissionDate: "2024-01-15T10:30:00Z",
    authorId: 4,
    authorName: "Research Author",
    journal: "Journal of Environmental Science",
    reviewers: ["Dr. Smith", "Dr. Johnson"]
  },
  {
    id: 2,
    title: "Quantum Computing Algorithms for Cryptographic Security",
    abstract: "An analysis of quantum computing threats to current cryptographic methods...",
    keywords: "quantum computing, cryptography, security, algorithms",
    status: "ACCEPTED",
    submissionDate: "2023-12-10T14:20:00Z",
    authorId: 4,
    authorName: "Research Author",
    journal: "IEEE Security Journal",
    reviewers: ["Dr. Wilson", "Dr. Brown"]
  },
  {
    id: 3,
    title: "Biodegradable Plastics: A Sustainable Solution for Ocean Pollution",
    abstract: "Research on new biodegradable plastic compounds and their environmental impact...",
    keywords: "biodegradable plastics, sustainability, ocean pollution, environment",
    status: "SUBMITTED",
    submissionDate: "2024-02-01T09:15:00Z",
    authorId: 5,
    authorName: "Test User",
    journal: "Environmental Research Letters",
    reviewers: []
  },
  {
    id: 4,
    title: "Neural Networks in Medical Diagnosis: A Comprehensive Review",
    abstract: "A systematic review of neural network applications in medical diagnosis systems...",
    keywords: "neural networks, medical diagnosis, artificial intelligence, healthcare",
    status: "REJECTED",
    submissionDate: "2023-11-20T16:45:00Z",
    authorId: 4,
    authorName: "Research Author",
    journal: "Medical AI Journal",
    reviewers: ["Dr. Lee", "Dr. Garcia"]
  },
  {
    id: 5,
    title: "Renewable Energy Storage Systems: Current Challenges and Future Prospects",
    abstract: "An overview of current energy storage technologies and future developments...",
    keywords: "renewable energy, energy storage, batteries, sustainability",
    status: "UNDER_REVIEW",
    submissionDate: "2024-01-28T11:00:00Z",
    authorId: 5,
    authorName: "Test User",
    journal: "Energy Technology Review",
    reviewers: ["Dr. Martinez", "Dr. Chen"]
  }
];

const MOCK_REVIEWS = [
  {
    id: 1,
    manuscriptId: 1,
    manuscriptTitle: "Machine Learning Applications in Climate Change Prediction",
    reviewerId: 3,
    reviewerName: "Peer Reviewer",
    status: "PENDING",
    assignedDate: "2024-01-20T08:00:00Z",
    dueDate: "2024-02-20T23:59:59Z",
    submittedDate: null,
    recommendation: null,
    comments: null
  },
  {
    id: 2,
    manuscriptId: 5,
    manuscriptTitle: "Renewable Energy Storage Systems: Current Challenges and Future Prospects",
    reviewerId: 3,
    reviewerName: "Peer Reviewer",
    status: "PENDING",
    assignedDate: "2024-02-01T10:30:00Z",
    dueDate: "2024-03-01T23:59:59Z",
    submittedDate: null,
    recommendation: null,
    comments: null
  },
  {
    id: 3,
    manuscriptId: 2,
    manuscriptTitle: "Quantum Computing Algorithms for Cryptographic Security",
    reviewerId: 3,
    reviewerName: "Peer Reviewer",
    status: "COMPLETED",
    assignedDate: "2023-12-15T09:00:00Z",
    dueDate: "2024-01-15T23:59:59Z",
    submittedDate: "2024-01-10T14:30:00Z",
    recommendation: "ACCEPT",
    comments: "Excellent research with solid methodology and clear conclusions."
  }
];

const MOCK_JOURNALS = [
  {
    id: 1,
    name: "Journal of Environmental Science",
    issn: "1234-5678",
    editor: "Dr. Environmental",
    description: "Leading journal in environmental research",
    impactFactor: 4.2,
    submissionCount: 145,
    acceptanceRate: 0.32
  },
  {
    id: 2,
    name: "IEEE Security Journal",
    issn: "2345-6789",
    editor: "Dr. Security",
    description: "Premier journal for cybersecurity research",
    impactFactor: 5.8,
    submissionCount: 98,
    acceptanceRate: 0.28
  },
  {
    id: 3,
    name: "Medical AI Journal",
    issn: "3456-7890",
    editor: "Dr. Medical AI",
    description: "Cutting-edge medical AI research publication",
    impactFactor: 6.1,
    submissionCount: 203,
    acceptanceRate: 0.25
  }
];

export const manuscriptService = {
  // Get user's own manuscripts - MOCK VERSION
  getMySubmissions: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const userManuscripts = MOCK_MANUSCRIPTS.filter(m => 
          m.authorId === currentUser.id
        );
        resolve({ data: userManuscripts });
      }, 600);
    });
  },

  // Get pending manuscripts (for editors) - MOCK VERSION
  getPendingManuscripts: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pendingManuscripts = MOCK_MANUSCRIPTS.filter(m => 
          m.status === 'SUBMITTED' || m.status === 'UNDER_REVIEW'
        );
        resolve({ data: pendingManuscripts });
      }, 500);
    });
  },

  // Get all manuscripts (for editors/admin) - MOCK VERSION
  getAllManuscripts: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: MOCK_MANUSCRIPTS });
      }, 500);
    });
  },

  // Submit a new manuscript
  submitManuscript: (manuscriptData) => {
    return api.post('/manuscripts', manuscriptData);
  },

  // Submit manuscript with file upload - MOCK VERSION
  submitManuscriptWithFile: (formData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Simulate file validation
          const file = formData.get('file');
          if (file && file.size > 10 * 1024 * 1024) { // 10MB limit
            reject({ 
              response: { 
                data: { 
                  message: 'File size exceeds 10MB limit' 
                } 
              } 
            });
            return;
          }

          // Create new manuscript entry
          const newManuscript = {
            id: Date.now(),
            title: formData.get('title'),
            abstract: formData.get('abstractText'),
            keywords: formData.get('keywords'),
            journalId: formData.get('journalId'),
            status: 'SUBMITTED',
            submissionDate: new Date().toISOString(),
            authorId: JSON.parse(localStorage.getItem('userData') || '{}').id || 1,
            authorName: JSON.parse(localStorage.getItem('userData') || '{}').firstName || 'Test User',
            fileName: file ? file.name : 'manuscript.pdf',
            fileSize: file ? file.size : 0,
            reviewers: []
          };

          // Add to mock data (in real app, this would be sent to backend)
          MOCK_MANUSCRIPTS.push(newManuscript);
          
          resolve({ 
            data: { 
              id: newManuscript.id,
              message: 'Manuscript submitted successfully',
              manuscript: newManuscript
            } 
          });
        } catch (error) {
          reject({ 
            response: { 
              data: { 
                message: 'Error processing manuscript submission' 
              } 
            } 
          });
        }
      }, 1500); // Simulate network delay
    });
  },

  // Get manuscripts by status
  getManuscriptsByStatus: (status) => {
    return api.get(`/manuscripts/status/${status}`);
  },

  // Update manuscript status
  updateManuscriptStatus: (id, status) => {
    return api.put(`/manuscripts/${id}/status`, { status });
  },

  // Get manuscript by ID
  getManuscriptById: (id) => {
    return api.get(`/manuscripts/${id}`);
  },

  // Delete/withdraw manuscript
  deleteManuscript: (id) => {
    return api.delete(`/manuscripts/${id}`);
  },

  // Get manuscript statistics
  getManuscriptStats: () => {
    return api.get('/manuscripts/stats');
  },

  // Get dashboard statistics - MOCK VERSION
  getDashboardStats: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const userManuscripts = MOCK_MANUSCRIPTS.filter(m => 
          m.authorId === currentUser.id
        );
        
        const stats = {
          totalManuscripts: userManuscripts.length,
          pendingReviews: userManuscripts.filter(m => m.status === 'UNDER_REVIEW').length,
          publishedPapers: userManuscripts.filter(m => m.status === 'ACCEPTED').length,
          acceptanceRate: userManuscripts.length > 0 ? 
            Math.round((userManuscripts.filter(m => m.status === 'ACCEPTED').length / userManuscripts.length) * 100) : 0,
          activeUsers: 156,
          totalSubmissions: MOCK_MANUSCRIPTS.length,
          assignedPapers: MOCK_MANUSCRIPTS.filter(m => m.status === 'UNDER_REVIEW').length,
          pendingDecisions: MOCK_MANUSCRIPTS.filter(m => m.status === 'SUBMITTED').length,
          completedReviews: MOCK_REVIEWS.filter(r => r.status === 'COMPLETED').length,
          averageRating: '4.2',
          pendingActions: 3,
          recentSubmissions: MOCK_MANUSCRIPTS.slice(0, 5).map(m => ({
            title: m.title,
            status: m.status,
            date: m.submissionDate
          }))
        };
        
        resolve(stats);
      }, 400);
    });
  },
};

export const reviewService = {
  // Get reviewer's assignments - MOCK VERSION
  getMyAssignments: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const userReviews = MOCK_REVIEWS.filter(r => 
          r.reviewerId === currentUser.id
        );
        resolve({ data: userReviews });
      }, 500);
    });
  },

  // Get pending reviews for reviewer - MOCK VERSION
  getMyPendingReviews: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const pendingReviews = MOCK_REVIEWS.filter(r => 
          r.reviewerId === currentUser.id && r.status === 'PENDING'
        );
        resolve({ data: pendingReviews });
      }, 400);
    });
  },

  // Get reviews for a manuscript - MOCK VERSION
  getReviewsForManuscript: (manuscriptId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const manuscriptReviews = MOCK_REVIEWS.filter(r => 
          r.manuscriptId === parseInt(manuscriptId)
        );
        resolve({ data: manuscriptReviews });
      }, 300);
    });
  },

  // Assign reviewer to manuscript
  assignReviewer: (manuscriptId, reviewerUsername, dueDate = null) => {
    const params = new URLSearchParams({
      manuscriptId: manuscriptId.toString(),
      reviewerUsername,
    });
    if (dueDate) {
      params.append('dueDate', dueDate.toISOString());
    }
    return api.post(`/reviews/assignments?${params}`);
  },

  // Submit a review
  submitReview: (assignmentId, reviewData) => {
    return api.post(`/reviews/assignments/${assignmentId}/submit`, reviewData);
  },

  // Accept review assignment
  acceptAssignment: (assignmentId) => {
    return api.put(`/reviews/assignments/${assignmentId}/accept`);
  },

  // Decline review assignment
  declineAssignment: (assignmentId, reason) => {
    return api.put(`/reviews/assignments/${assignmentId}/decline`, { reason });
  },

  // Get assignments managed by editor
  getMyManagedAssignments: () => {
    return api.get('/reviews/assignments/my-managed');
  },

  // Update assignment status
  updateAssignmentStatus: (assignmentId, status) => {
    return api.put(`/reviews/assignments/${assignmentId}/status`, { status });
  },

  // Get overdue assignments
  getOverdueAssignments: () => {
    return api.get('/reviews/assignments/overdue');
  },
};

export const journalService = {
  // Get all journals - MOCK VERSION
  getAllJournals: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: MOCK_JOURNALS });
      }, 400);
    });
  },

  // Get active journals - MOCK VERSION
  getActiveJournals: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: MOCK_JOURNALS });
      }, 350);
    });
  },

  // Get journal statistics - MOCK VERSION
  getJournalStats: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const journal = MOCK_JOURNALS.find(j => j.id === parseInt(id));
        if (journal) {
          resolve({ data: journal });
        } else {
          resolve({ data: MOCK_JOURNALS[0] });
        }
      }, 300);
    });
  },

  // Create a new journal
  createJournal: (journalData, editorInChiefUsername = null) => {
    const params = editorInChiefUsername 
      ? `?editorInChiefUsername=${editorInChiefUsername}` 
      : '';
    return api.post(`/journals${params}`, journalData);
  },

  // Get journal by ID
  getJournalById: (id) => {
    return api.get(`/journals/${id}`);
  },

  // Get journal by code
  getJournalByCode: (code) => {
    return api.get(`/journals/code/${code}`);
  },

  // Update journal
  updateJournal: (id, journalData) => {
    return api.put(`/journals/${id}`, journalData);
  },

  // Assign editor-in-chief
  assignEditorInChief: (id, editorUsername) => {
    return api.put(`/journals/${id}/editor-in-chief`, { editorUsername });
  },

  // Set journal active status
  setJournalStatus: (id, active) => {
    return api.put(`/journals/${id}/status`, { active });
  },

  // Search journals
  searchJournals: (name) => {
    return api.get(`/journals/search?name=${encodeURIComponent(name)}`);
  },

  // Get journals managed by current editor
  getMyJournals: () => {
    return api.get('/journals/my-journals');
  },

  // Delete journal
  deleteJournal: (id) => {
    return api.delete(`/journals/${id}`);
  },

  // Check journal code availability
  checkJournalCode: (code) => {
    return api.get(`/journals/check-code/${code}`);
  },
};

// Test credentials for development
const TEST_USERS = {
  'admin': {
    username: 'admin',
    password: 'admin123',
    role: 'ADMIN',
    name: 'System Administrator',
    email: 'admin@rjm.com',
    accessToken: 'mock-admin-token',
    id: 1,
    createdAt: '2023-01-01T00:00:00Z',
    lastLogin: new Date().toISOString(),
    unreadNotifications: 5
  },
  'editor': {
    username: 'editor',
    password: 'editor123',
    role: 'EDITOR',
    name: 'Journal Editor',
    email: 'editor@rjm.com',
    accessToken: 'mock-editor-token',
    id: 2,
    createdAt: '2023-02-15T00:00:00Z',
    lastLogin: new Date().toISOString(),
    unreadNotifications: 3
  },
  'reviewer': {
    username: 'reviewer',
    password: 'reviewer123',
    role: 'REVIEWER',
    name: 'Peer Reviewer',
    email: 'reviewer@rjm.com',
    accessToken: 'mock-reviewer-token',
    id: 3,
    createdAt: '2023-03-10T00:00:00Z',
    lastLogin: new Date().toISOString(),
    unreadNotifications: 2
  },
  'author': {
    username: 'author',
    password: 'author123',
    role: 'AUTHOR',
    name: 'Research Author',
    email: 'author@rjm.com',
    accessToken: 'mock-author-token',
    id: 4,
    createdAt: '2023-04-20T00:00:00Z',
    lastLogin: new Date().toISOString(),
    unreadNotifications: 1
  },
  'testuser': {
    username: 'testuser',
    password: 'testuser123',
    role: 'AUTHOR',
    name: 'Test User',
    email: 'testuser@rjm.com',
    accessToken: 'mock-testuser-token',
    id: 5,
    createdAt: '2023-05-05T00:00:00Z',
    lastLogin: new Date().toISOString(),
    unreadNotifications: 0
  }
};

export const authService = {
  // Mock Login for development testing
  login: (loginData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = TEST_USERS[loginData.username];
        
        if (user && user.password === loginData.password) {
          // Return successful response matching backend format
          resolve({
            data: {
              id: user.id,
              username: user.username,
              email: user.email,
              name: user.name,
              role: user.role,
              accessToken: user.accessToken,
              tokenType: 'Bearer',
              createdAt: user.createdAt,
              lastLogin: user.lastLogin,
              unreadNotifications: user.unreadNotifications
            }
          });
        } else {
          reject({
            response: {
              data: {
                message: 'Invalid username or password'
              }
            }
          });
        }
      }, 800); // Simulate network delay
    });
  },

  // Register
  register: (userData) => {
    return api.post('/auth/signup', userData);
  },

  // Logout
  logout: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: 'Logged out successfully' } });
      }, 300);
    });
  },
};