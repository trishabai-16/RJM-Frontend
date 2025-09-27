import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Alert,
  Tabs,
  Tab,
  CircularProgress,
  IconButton,
  Tooltip,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  FileUpload as FileUploadIcon,
  RateReview as ReviewIcon,
  People as PeopleIcon,
  Analytics as AnalyticsIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Warning as WarningIcon,
  Download as DownloadIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthorDashboard from '../components/AuthorDashboard';
import EditorDashboard from '../components/EditorDashboard';
import ReviewerDashboard from '../components/ReviewerDashboard';
import AdminDashboard from '../components/AdminDashboard';
import NotificationPanel from '../components/notifications/NotificationPanel';
import QuickStats from '../components/dashboard/QuickStats';
import RecentActivity from '../components/dashboard/RecentActivity';
import ManuscriptStatusChart from '../components/dashboard/ManuscriptStatusChart';
import UpcomingDeadlines from '../components/dashboard/UpcomingDeadlines';
import { manuscriptService } from '../services/apiService';
import { formatDate } from '../utils/helpers';

const Dashboard = () => {
  const { user, hasRole, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({
    totalManuscripts: 0,
    pendingReviews: 0,
    publishedPapers: 0,
    activeUsers: 0,
    recentSubmissions: [],
    acceptanceRate: 0,
    assignedPapers: 0,
    pendingDecisions: 0,
    completedReviews: 0,
    averageRating: 0,
    totalSubmissions: 0,
    pendingActions: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Simulate API call with mock data
      const mockStats = {
        totalManuscripts: user.role === 'AUTHOR' ? 12 : 45,
        pendingReviews: user.role === 'REVIEWER' ? 3 : 8,
        publishedPapers: user.role === 'AUTHOR' ? 5 : 23,
        activeUsers: 156,
        recentSubmissions: [
          { id: 1, title: 'AI in Healthcare Research', status: 'UNDER_REVIEW' },
          { id: 2, title: 'Blockchain Security Framework', status: 'PUBLISHED' },
          { id: 3, title: 'Climate Change Analysis', status: 'SUBMITTED' },
          { id: 4, title: 'Quantum Computing Advances', status: 'ACCEPTED' },
          { id: 5, title: 'Machine Learning Optimization', status: 'REJECTED' }
        ],
        acceptanceRate: user.role === 'AUTHOR' ? 65 : 42,
        assignedPapers: user.role === 'EDITOR' ? 15 : 0,
        pendingDecisions: user.role === 'EDITOR' ? 7 : 0,
        completedReviews: user.role === 'REVIEWER' ? 12 : 0,
        averageRating: user.role === 'REVIEWER' ? 4.2 : 0,
        totalSubmissions: user.role === 'ADMIN' ? 234 : 0,
        pendingActions: user.role === 'ADMIN' ? 18 : 0
      };
      
      setDashboardStats(mockStats);
      
      // Uncomment for real API call:
      // const stats = await manuscriptService.getDashboardStats();
      // setDashboardStats(stats);
      
    } catch (err) {
      setError('Failed to load dashboard data. Using demo data.');
      console.error('Dashboard data error:', err);
      
      // Fallback to demo data
      const demoStats = {
        totalManuscripts: 25,
        pendingReviews: 5,
        publishedPapers: 10,
        activeUsers: 89,
        recentSubmissions: [
          { id: 1, title: 'Demo Research Paper', status: 'UNDER_REVIEW' },
          { id: 2, title: 'Sample Manuscript', status: 'PUBLISHED' }
        ],
        acceptanceRate: 40,
        assignedPapers: 8,
        pendingDecisions: 3,
        completedReviews: 15,
        averageRating: 4.0,
        totalSubmissions: 125,
        pendingActions: 5
      };
      setDashboardStats(demoStats);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    logout();
  };

  const handleQuickAction = (action) => {
    if (action.onClick) {
      action.onClick();
    } else if (action.path) {
      navigate(action.path);
    }
  };

  const getRoleBasedGreeting = () => {
    const hours = new Date().getHours();
    let greeting = 'Welcome';
    
    if (hours < 12) greeting = 'Good morning';
    else if (hours < 18) greeting = 'Good afternoon';
    else greeting = 'Good evening';

    const roleTitles = {
      AUTHOR: 'Researcher',
      EDITOR: 'Editor',
      REVIEWER: 'Reviewer',
      ADMIN: 'Administrator'
    };

    return `${greeting}, ${user?.name || user?.username}!`;
  };

  const getRoleDescription = () => {
    const descriptions = {
      AUTHOR: 'Manage your research submissions, track review progress, and submit new manuscripts.',
      EDITOR: 'Oversee manuscript workflow, assign reviewers, and make publication decisions.',
      REVIEWER: 'Review assigned manuscripts and provide constructive feedback to authors.',
      ADMIN: 'Manage system users, configure settings, and monitor platform performance.'
    };
    return descriptions[user?.role] || 'Manage your research activities.';
  };

  const getDashboardComponent = () => {
    const roleComponents = {
      AUTHOR: <AuthorDashboard stats={dashboardStats} onRefresh={fetchDashboardData} />,
      EDITOR: <EditorDashboard stats={dashboardStats} onRefresh={fetchDashboardData} />,
      REVIEWER: <ReviewerDashboard stats={dashboardStats} onRefresh={fetchDashboardData} />,
      ADMIN: <AdminDashboard stats={dashboardStats} onRefresh={fetchDashboardData} />
    };

    return roleComponents[user?.role] || (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No dashboard available for your role: {user?.role || 'Unknown'}
        </Typography>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={logout}>
          Switch Account
        </Button>
      </Paper>
    );
  };

  const getQuickActions = () => {
    const actions = {
      AUTHOR: [
        { 
          label: 'Submit New Manuscript', 
          icon: <AddIcon />, 
          path: '/manuscript-submission',
          onClick: () => navigate('/manuscript-submission')
        },
        { 
          label: 'My Submissions', 
          icon: <AssignmentIcon />, 
          onClick: () => {
            // Focus on the overview tab which shows submissions
            setActiveTab(0);
          }
        },
        { 
          label: 'Track Reviews', 
          icon: <ReviewIcon />, 
          onClick: () => {
            setActiveTab(1); // Activities tab
          }
        }
      ],
      EDITOR: [
        { 
          label: 'Manage Submissions', 
          icon: <AssignmentIcon />, 
          onClick: () => setActiveTab(0)
        },
        { 
          label: 'Assign Reviewers', 
          icon: <PeopleIcon />, 
          onClick: () => {
            alert('Reviewer assignment feature coming soon!');
          }
        },
        { 
          label: 'Publication Queue', 
          icon: <FileUploadIcon />, 
          onClick: () => setActiveTab(2)
        }
      ],
      REVIEWER: [
        { 
          label: 'Pending Reviews', 
          icon: <PendingIcon />, 
          onClick: () => setActiveTab(0)
        },
        { 
          label: 'Review History', 
          icon: <CheckCircleIcon />, 
          onClick: () => setActiveTab(1)
        },
        { 
          label: 'Guidelines', 
          icon: <AssignmentIcon />, 
          onClick: () => {
            alert('Review guidelines:\n\n• Be objective and constructive\n• Provide detailed feedback\n• Meet review deadlines\n• Maintain confidentiality');
          }
        }
      ],
      ADMIN: [
        { 
          label: 'User Management', 
          icon: <PeopleIcon />, 
          onClick: () => {
            alert('User management feature coming soon!');
          }
        },
        { 
          label: 'System Analytics', 
          icon: <AnalyticsIcon />, 
          onClick: () => setActiveTab(2)
        },
        { 
          label: 'Platform Settings', 
          icon: <AssignmentIcon />, 
          onClick: () => {
            alert('Platform settings feature coming soon!');
          }
        }
      ]
    };

    return actions[user?.role] || [];
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Box textAlign="center">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>Loading your dashboard...</Typography>
        </Box>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Please log in to access your dashboard
        </Alert>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom color="primary">
            Research Journal Management System
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Access your personalized dashboard to manage manuscripts, reviews, and research activities.
          </Typography>
          <Button variant="contained" size="large" href="/login">
            Sign In to Continue
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 }, px: { xs: 1, md: 3 } }}>
      {/* Header Section */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: { xs: 'center', md: 'flex-start' },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, md: 0 },
          mb: 2
        }}>
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 700, 
                color: '#1C2833',
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
              }}
            >
              {getRoleBasedGreeting()}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 1, 
                color: '#566573',
                fontSize: { xs: '1rem', md: '1.125rem' }
              }}
            >
              {getRoleDescription()}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2, 
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', sm: 'flex-start' }
            }}>
              <Chip 
                label={user.role} 
                sx={{ 
                  bgcolor: '#1C2833', 
                  color: '#F4F6F6',
                  borderColor: '#1C2833',
                  '&:hover': { bgcolor: '#2E4053' }
                }}
                variant="outlined"
                size="small"
              />
              <Typography variant="body2" sx={{ color: '#566573' }}>
                Last login: {formatDate(user.lastLogin || new Date())}
              </Typography>
              <Typography variant="body2" sx={{ color: '#566573' }}>
                Member since: {formatDate(user.createdAt || new Date())}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            alignItems: 'center',
            mt: { xs: 2, sm: 0 }
          }}>
            <Tooltip title="Refresh Dashboard">
              <IconButton onClick={fetchDashboardData} disabled={loading}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton onClick={() => setNotificationsOpen(true)}>
                <Badge badgeContent={user.unreadNotifications || 0} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Account">
              <IconButton onClick={handleUserMenuOpen}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#1C2833' }}>
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={handleUserMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleUserMenuClose} disabled>
                <AccountCircleIcon sx={{ mr: 1 }} />
                {user.firstName} {user.lastName}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Quick Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <QuickStats stats={dashboardStats} role={user.role} />
        </Grid>
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {/* Left Sidebar - Quick Actions */}
        <Grid item xs={12} lg={3} sx={{ order: { xs: 2, lg: 1 } }}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            <Paper sx={{ 
              p: { xs: 2, md: 2.5 }, 
              mb: 3, 
              bgcolor: '#FFFFFF', 
              boxShadow: '0 2px 12px rgba(28, 40, 51, 0.08)',
              borderRadius: 2
            }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: '#1C2833' }}>
              <AssignmentIcon sx={{ mr: 1, color: '#A93226' }} />
              Quick Actions
            </Typography>
            <List dense>
              {getQuickActions().map((action, index) => (
                <ListItem 
                  key={index}
                  button 
                  onClick={() => handleQuickAction(action)}
                  sx={{ 
                    borderRadius: 1, 
                    mb: 0.5,
                    '&:hover': {
                      backgroundColor: 'rgba(28, 40, 51, 0.04)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {action.icon}
                  </ListItemIcon>
                  <ListItemText primary={action.label} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Upcoming Deadlines */}
          <UpcomingDeadlines />
          </Box>
        </Grid>

        {/* Main Dashboard Content */}
        <Grid item xs={12} lg={6} sx={{ order: { xs: 1, lg: 2 } }}>
          <Paper sx={{ 
            overflow: 'hidden', 
            bgcolor: '#FFFFFF', 
            boxShadow: '0 2px 12px rgba(28, 40, 51, 0.08)',
            borderRadius: 2
          }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ 
                borderBottom: 1, 
                borderColor: '#E5E8E8',
                '& .MuiTab-root': {
                  color: '#566573',
                  '&.Mui-selected': {
                    color: '#1C2833',
                    fontWeight: 600
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#A93226'
                }
              }}
            >
              <Tab label="Overview" />
              <Tab label="Activities" />
              <Tab label="Analytics" />
            </Tabs>
            
            <Box sx={{ p: 3 }}>
              {activeTab === 0 && getDashboardComponent()}
              {activeTab === 1 && <RecentActivity />}
              {activeTab === 2 && <ManuscriptStatusChart />}
            </Box>
          </Paper>
        </Grid>

        {/* Right Sidebar - Recent Activity & Notifications */}
        <Grid item xs={12} lg={3} sx={{ order: { xs: 3, lg: 3 } }}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            {/* System Status */}
            <Paper sx={{ 
              p: 2.5, 
              mb: 3, 
              bgcolor: '#1C2833', 
              color: '#F4F6F6',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(28, 40, 51, 0.15)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon sx={{ mr: 1, color: '#F4F6F6' }} />
                <Typography variant="subtitle2" sx={{ color: '#F4F6F6' }}>System Operational</Typography>
              </Box>
              <Typography variant="caption" sx={{ color: '#F4F6F6', opacity: 0.8 }}>All services running normally</Typography>
            </Paper>

            {/* Recent Submissions */}
            <Paper sx={{ 
              p: 2.5, 
              mb: 3,
              borderRadius: 2,
              boxShadow: '0 2px 12px rgba(28, 40, 51, 0.08)'
            }}>
            <Typography variant="h6" gutterBottom>
              Recent Submissions
            </Typography>
            <List dense>
              {dashboardStats.recentSubmissions.slice(0, 5).map((submission, index) => (
                <ListItem key={index} divider={index < 4}>
                  <ListItemText
                    primary={submission.title}
                    secondary={`Status: ${submission.status}`}
                  />
                  <Chip 
                    label={submission.status} 
                    size="small"
                    color={
                      submission.status === 'PUBLISHED' ? 'success' :
                      submission.status === 'UNDER_REVIEW' ? 'warning' :
                      submission.status === 'REJECTED' ? 'error' : 'default'
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

            {/* Support Section */}
            <Paper sx={{ 
              p: 2.5,
              borderRadius: 2,
              boxShadow: '0 2px 12px rgba(28, 40, 51, 0.08)'
            }}>
              <Typography variant="h6" gutterBottom>
                Need Help?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Contact support or check our documentation
              </Typography>
              <Button 
                variant="outlined" 
                size="small" 
                fullWidth 
                sx={{ mb: 1 }}
                onClick={() => {
                  alert('User Guide\\n\\nWelcome to RJMS! Here are some quick tips:\\n\\n• Use Quick Actions to navigate easily\\n• Check the Overview tab for your dashboard\\n• View Activities for recent updates\\n• Access Analytics for performance metrics\\n\\nFor detailed documentation, visit our website.');
                }}
              >
                User Guide
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                fullWidth
                onClick={() => {
                  alert('Contact Support\\n\\nNeed help? Reach out to us:\\n\\n• Email: support@rjms.com\\n• Phone: +1-555-RJMS-HELP\\n• Live Chat: Available 24/7\\n\\nWe are here to help!');
                }}
              >
                Contact Support
              </Button>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* Notification Panel */}
      <NotificationPanel 
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </Container>
  );
};

export default Dashboard;