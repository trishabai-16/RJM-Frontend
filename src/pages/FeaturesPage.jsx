import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  AppBar,
  Toolbar,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  LibraryBooks,
  Groups,
  Analytics,
  Security,
  Speed,
  Notifications,
  CheckCircle,
  ArrowBack,
  CloudUpload,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FeaturesPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <LibraryBooks sx={{ fontSize: 40 }} />,
      title: 'Research Management',
      description: 'Organize and manage your research journals with advanced categorization, search, and version control.',
      color: '#1C2833'
    },
    {
      icon: <Groups sx={{ fontSize: 40 }} />,
      title: 'Collaboration Tools',
      description: 'Real-time collaboration with colleagues, built-in commenting, and peer review system.',
      color: '#A93226'
    },
    {
      icon: <Analytics sx={{ fontSize: 40 }} />,
      title: 'Advanced Analytics',
      description: 'Track research impact, citation metrics, and visualize trends with interactive dashboards.',
      color: '#27AE60'
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Secure Storage',
      description: 'Enterprise-grade security with encrypted storage, access controls, and automated backups.',
      color: '#D68910'
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'Workflow Automation',
      description: 'Automated submission tracking, review assignments, and publication workflows.',
      color: '#566573'
    },
    {
      icon: <Notifications sx={{ fontSize: 40 }} />,
      title: 'Smart Notifications',
      description: 'Stay updated with real-time alerts for submissions, reviews, and deadlines.',
      color: '#A93226'
    }
  ];

  const advancedFeatures = [
    'AI-powered research recommendations',
    'Citation analysis and impact tracking',
    'Plagiarism detection integration',
    'Multi-format document support',
    'Real-time collaboration editing',
    'Advanced search with semantic analysis',
    'Automated reference formatting',
    'Integration with major research databases',
    'Version control for manuscripts',
    'Automated backup and recovery',
    'Custom workflow templates',
    'API integration capabilities'
  ];

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#F8F9F9' }}>
      {/* Navigation Bar */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ py: 1, bgcolor: '#FFFFFF', borderBottom: '1px solid #E5E8E8' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/')}
              sx={{ color: '#1C2833', '&:hover': { bgcolor: '#F8F9F9' } }}
            >
              Back to Home
            </Button>
            
            <Typography variant="h4" component="div" sx={{ 
              fontWeight: 'bold',
              background: `linear-gradient(45deg, #1C2833, #A93226)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              RJMS Features
            </Typography>

            <Stack direction="row" spacing={1}>
              <Button 
                variant="outlined" 
                sx={{ 
                  borderColor: '#1C2833',
                  color: '#1C2833',
                  '&:hover': { borderColor: '#2E4053', backgroundColor: '#F8F9F9' }
                }}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                variant="contained" 
                sx={{ 
                  bgcolor: '#1C2833',
                  '&:hover': { bgcolor: '#2E4053' }
                }}
                onClick={() => navigate('/register')}
              >
                Get Started
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ bgcolor: '#FFFFFF', py: 8, borderBottom: '1px solid #E5E8E8' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Chip 
            label="Powerful Research Tools" 
            sx={{
              bgcolor: '#FADBD8',
              color: '#A93226',
              border: '1px solid #A93226',
              mb: 3
            }}
          />
          <Typography variant="h2" gutterBottom fontWeight="bold" sx={{ color: '#1C2833', mb: 2 }}>
            Everything You Need for Research Excellence
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 800, mx: 'auto', color: '#566573', mb: 4 }}>
            Advanced tools and features designed specifically for researchers, 
            academic institutions, and publishing houses to streamline your entire research workflow.
          </Typography>
        </Container>
      </Box>

      {/* Core Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  bgcolor: '#FFFFFF',
                  border: '1px solid #E5E8E8',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 32px rgba(28, 40, 51, 0.1)'
                  }
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: `${feature.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3
                    }}
                  >
                    <Box sx={{ color: feature.color }}>
                      {feature.icon}
                    </Box>
                  </Box>
                  
                  <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ color: '#1C2833' }}>
                    {feature.title}
                  </Typography>
                  
                  <Typography variant="body1" sx={{ color: '#566573', mb: 3 }}>
                    {feature.description}
                  </Typography>
                  
                  <Button 
                    variant="outlined" 
                    size="small"
                    sx={{ 
                      borderColor: feature.color,
                      color: feature.color,
                      '&:hover': { 
                        borderColor: feature.color,
                        bgcolor: `${feature.color}10`
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Advanced Features Section */}
      <Box sx={{ bgcolor: '#FFFFFF', py: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ color: '#1C2833' }}>
                Advanced Research Capabilities
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ mb: 4, color: '#566573' }}>
                Beyond basic management - unlock powerful research tools that enhance productivity and collaboration.
              </Typography>

              <List>
                {advancedFeatures.map((item, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <CheckCircle sx={{ color: '#27AE60' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item} 
                      primaryTypographyProps={{ 
                        color: '#1C2833',
                        fontWeight: 500
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  background: `linear-gradient(135deg, #1C283315 0%, #A9322615 100%)`,
                  borderRadius: 4,
                  border: '1px solid #E5E8E8',
                  textAlign: 'center'
                }}
              >
                <DashboardIcon sx={{ fontSize: 120, color: '#566573', mb: 3 }} />
                <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ color: '#1C2833' }}>
                  Comprehensive Dashboard
                </Typography>
                <Typography variant="body1" sx={{ color: '#566573', mb: 3 }}>
                  Monitor your research progress, track submissions, and manage collaborations from a single, intuitive interface.
                </Typography>
                <Button 
                  variant="contained"
                  sx={{ 
                    bgcolor: '#A93226',
                    '&:hover': { bgcolor: '#922B21' }
                  }}
                  onClick={() => navigate('/register')}
                >
                  Try Dashboard
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: '#1C2833', color: '#F4F6F6', py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom fontWeight="bold">
            Ready to Experience These Features?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Start your free trial today and see how RJMS can transform your research workflow.
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button 
              variant="contained" 
              size="large" 
              sx={{ 
                bgcolor: '#A93226',
                color: '#FDFEFE',
                px: 4,
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#922B21'
                }
              }}
              onClick={() => navigate('/register')}
            >
              Start Free Trial
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ 
                borderColor: '#F4F6F6', 
                color: '#F4F6F6',
                px: 4,
                '&:hover': {
                  borderColor: '#F4F6F6',
                  bgcolor: 'rgba(244, 246, 246, 0.1)'
                }
              }}
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default FeaturesPage;