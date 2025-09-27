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
  Fab,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ArrowForward,
  Security,
  Analytics,
  Groups,
  LibraryBooks,
  Speed,
  CloudUpload,
  Notifications,
  Dashboard,
  People,
  TrendingUp,
  School,
  Business,
  CheckCircle,
  Star,
  Download,
  PlayArrow,
  Email
} from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

// Animation for floating elements
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const SimpleLandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Scroll handler for navigation buttons
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle demo button click
  const handleWatchDemo = () => {
    alert('Demo video will be available soon!\n\nFor now, you can explore the platform by registering for a free account.');
  };

  // Handle schedule demo
  const handleScheduleDemo = () => {
    alert('Thank you for your interest!\n\nTo schedule a demo, please contact us at demo@rjms.com or call +1-555-RJMS-DEMO.');
  };

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

  const stats = [
    { number: '10,000+', label: 'Research Papers' },
    { number: '5,000+', label: 'Active Researchers' },
    { number: '200+', label: 'Institutions' },
    { number: '50+', label: 'Countries' }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Professor, Stanford University',
      text: 'This platform revolutionized how our research team collaborates and manages publications.',
      avatar: '/avatars/1.jpg'
    },
    {
      name: 'Prof. Michael Rodriguez',
      role: 'Head of Research, MIT',
      text: 'The analytics tools provided insights we never had access to before. Highly recommended!',
      avatar: '/avatars/2.jpg'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Research Director, Oxford',
      text: 'Streamlined our entire publication workflow. Saved us hundreds of hours annually.',
      avatar: '/avatars/3.jpg'
    }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navigation Bar */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ py: 1 }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'center', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 0 } }}>
            <Typography variant="h4" component="div" sx={{ 
              fontWeight: 'bold',
              background: `linear-gradient(45deg, #1C2833, #A93226)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textAlign: 'center',
              mb: { xs: 1, md: 0 }
            }}>
              RJMS
            </Typography>
            
            <Stack direction="row" spacing={2} sx={{ display: { xs: 'flex', md: 'flex' }, justifyContent: 'center', mx: { md: 4 } }}>
              <Button sx={{ color: '#1C2833', '&:hover': { bgcolor: '#F8F9F9' } }} onClick={() => navigate('/')}>Home</Button>
              <Button sx={{ color: '#1C2833', '&:hover': { bgcolor: '#F8F9F9' } }} onClick={() => navigate('/features')}>Features</Button>
              <Button sx={{ color: '#1C2833', '&:hover': { bgcolor: '#F8F9F9' } }} onClick={() => navigate('/solutions')}>Solutions</Button>
              <Button sx={{ color: '#1C2833', '&:hover': { bgcolor: '#F8F9F9' } }} onClick={() => navigate('/about')}>About</Button>
              <Button sx={{ color: '#1C2833', '&:hover': { bgcolor: '#F8F9F9' } }} onClick={() => navigate('/contact')}>Contact</Button>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
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
      <Box
        id="hero"
        sx={{
          background: `linear-gradient(135deg, #F8F9F915 0%, #E5E8E815 100%)`,
          py: 10,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Chip 
                  label="Trusted by Researchers Worldwide" 
                  sx={{
                    bgcolor: '#F8F9F9',
                    color: '#1C2833',
                    border: '1px solid #E5E8E8'
                  }}
                />
              </Box>
              
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  color: '#1C2833',
                  textAlign: 'center'
                }}
              >
                Research Journal{' '}
                <Box component="span" sx={{ color: '#A93226' }}>
                  Management System
                </Box>
              </Typography>
              
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  mb: 4, 
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  color: '#566573',
                  textAlign: 'center'
                }}
              >
                Streamline your academic research workflow with our comprehensive journal management platform. 
                Organize, collaborate, and discover insights from your research like never before.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4, justifyContent: 'center' }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  endIcon={<ArrowForward />}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    bgcolor: '#A93226',
                    '&:hover': { bgcolor: '#922B21' }
                  }}
                  onClick={() => navigate('/register')}
                >
                  Start Free Trial
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  startIcon={<PlayArrow />}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderColor: '#1C2833',
                    color: '#1C2833',
                    '&:hover': { borderColor: '#2E4053', bgcolor: '#F8F9F9' }
                  }}
                  onClick={handleWatchDemo}
                >
                  Watch Demo
                </Button>
              </Stack>

              <Stack direction="row" spacing={3} alignItems="center" sx={{ justifyContent: 'center' }}>
                {stats.map((stat, index) => (
                  <Box key={index} textAlign="center">
                    <Typography variant="h6" fontWeight="bold" sx={{ color: '#1C2833' }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#566573' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  animation: `${float} 6s ease-in-out infinite`,
                  textAlign: 'center'
                }}
              >
                <Paper
                  sx={{
                    p: 4,
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(28, 40, 51, 0.1)',
                    bgcolor: '#FFFFFF'
                  }}
                >
                  <Typography variant="h4" gutterBottom sx={{ color: '#1C2833', fontWeight: 600 }}>
                    Dashboard Preview
                  </Typography>
                  <Box sx={{ 
                    height: 200, 
                    bgcolor: '#F8F9F9', 
                    borderRadius: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '2px solid #E5E8E8'
                  }}>
                    <Dashboard sx={{ fontSize: 60, color: '#566573' }} />
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container id="features" maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Chip 
              label="Powerful Features" 
              sx={{
                bgcolor: '#FADBD8',
                color: '#A93226',
                border: '1px solid #A93226'
              }}
            />
          </Box>
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ color: '#1C2833', textAlign: 'center' }}>
            Everything You Need for Research Excellence
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 600, mx: 'auto', color: '#566573', textAlign: 'center' }}>
            Advanced tools and features designed specifically for researchers, 
            academic institutions, and publishing houses.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
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
                  
                  <Typography variant="body1" sx={{ color: '#566573' }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Advanced Features Section */}
      <Box id="pricing" sx={{ bgcolor: '#F8F9F9', py: 10, textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
              <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ color: '#1C2833', textAlign: 'center' }}>
                Advanced Research Tools
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ mb: 4, color: '#566573', textAlign: 'center' }}>
                Beyond basic management - unlock powerful research capabilities
              </Typography>

              <List sx={{ textAlign: 'center' }}>
                {[
                  'AI-powered research recommendations',
                  'Citation analysis and impact tracking',
                  'Plagiarism detection integration',
                  'Multi-format document support',
                  'Real-time collaboration editing',
                  'Advanced search with semantic analysis',
                  'Automated reference formatting',
                  'Integration with major research databases'
                ].map((item, index) => (
                  <ListItem key={index} sx={{ px: 0, justifyContent: 'center', textAlign: 'center' }}>
                    <ListItemIcon sx={{ minWidth: 40, justifyContent: 'center' }}>
                      <CheckCircle sx={{ color: '#27AE60' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item} 
                      primaryTypographyProps={{ 
                        color: '#1C2833',
                        fontWeight: 500,
                        textAlign: 'center'
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  background: `linear-gradient(135deg, #1C283310 0%, #A9322610 100%)`,
                  borderRadius: 4,
                  border: '1px solid #E5E8E8',
                  textAlign: 'center'
                }}
              >
                <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ color: '#1C2833', textAlign: 'center' }}>
                  Used by Leading Institutions
                </Typography>
                
                <Grid container spacing={3} sx={{ mt: 2, justifyContent: 'center' }}>
                  {['Stanford', 'MIT', 'Harvard', 'Oxford', 'Cambridge', 'ETH Zurich'].map((uni, index) => (
                    <Grid item xs={6} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                        <School sx={{ color: '#1C2833' }} />
                        <Typography variant="body1" fontWeight="medium" sx={{ color: '#1C2833', textAlign: 'center' }}>
                          {uni}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container id="about" maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Chip 
              label="Testimonials" 
              sx={{
                bgcolor: '#F8F9F9',
                color: '#1C2833',
                border: '1px solid #E5E8E8'
              }}
            />
          </Box>
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ color: '#1C2833', textAlign: 'center' }}>
            Trusted by Researchers Worldwide
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center" alignItems="stretch">
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
              <Paper sx={{ 
                p: { xs: 2.5, sm: 3, md: 3.5 }, 
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#FFFFFF',
                border: '1px solid #E5E8E8',
                borderRadius: 2,
                textAlign: 'center',
                position: 'relative',
                boxShadow: '0 2px 12px rgba(28, 40, 51, 0.08)',
                '&:hover': {
                  boxShadow: '0 8px 32px rgba(28, 40, 51, 0.15)',
                  transform: 'translateY(-4px)',
                  transition: 'all 0.3s ease'
                },
                transition: 'all 0.3s ease'
              }}>
                {/* Quote Icon */}
                <Box sx={{ 
                  position: 'absolute',
                  top: -8,
                  right: 16,
                  bgcolor: '#A93226',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1
                }}>
                  <Typography sx={{ color: '#FFFFFF', fontSize: '10px', fontWeight: 'bold' }}>"</Typography>
                </Box>
                
                {/* Testimonial Text */}
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#566573', 
                    fontStyle: 'italic',
                    mb: 2.5,
                    mt: 1,
                    lineHeight: 1.6,
                    fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                    flex: 1
                  }}
                >
                  "{testimonial.text}"
                </Typography>
                
                {/* Rating Stars */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2.5 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} sx={{ color: '#D68910', fontSize: 16, mx: 0.2 }} />
                  ))}
                </Box>
                
                {/* Author Info */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mt: 'auto'
                }}>
                  <Avatar 
                    sx={{ 
                      mr: 1.5, 
                      bgcolor: '#1C2833',
                      color: '#F4F6F6',
                      width: { xs: 40, sm: 44 },
                      height: { xs: 40, sm: 44 },
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      fontWeight: 'bold'
                    }}
                  >
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography 
                      variant="subtitle1"
                      fontWeight="bold" 
                      sx={{ 
                        color: '#1C2833',
                        mb: 0.2,
                        fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                        lineHeight: 1.2
                      }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#A93226',
                        fontWeight: 500,
                        fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        lineHeight: 1.2
                      }}
                    >
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, #1C2833 0%, #A93226 100%)`,
          color: '#F4F6F6',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom fontWeight="bold">
            Ready to Transform Your Research?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join researchers worldwide who trust our platform for their journal management needs.
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button 
              variant="contained" 
              size="large" 
              sx={{ 
                bgcolor: '#FDFEFE', 
                color: '#1C2833',
                px: 4,
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#F4F6F6'
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
              onClick={handleScheduleDemo}
            >
              Schedule Demo
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box id="contact" sx={{ bgcolor: '#17202A', color: '#F4F6F6', py: 6, textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ textAlign: 'center' }}>
                RJMS
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 2, textAlign: 'center' }}>
                Empowering researchers with cutting-edge journal management solutions since 2025.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
                {['T', 'L', 'G', 'Y'].map((social, index) => (
                  <Avatar key={index} sx={{ width: 32, height: 32, bgcolor: '#2E4053', cursor: 'pointer' }}>
                    <Typography variant="caption" fontWeight="bold">
                      {social}
                    </Typography>
                  </Avatar>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={6} md={2} sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>Product</Typography>
              <Stack spacing={1} sx={{ alignItems: 'center' }}>
                {['Features', 'Pricing', 'Case Studies', 'Updates'].map((item) => (
                  <Typography key={item} variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', textAlign: 'center' }}>
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={6} md={2} sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>Resources</Typography>
              <Stack spacing={1} sx={{ alignItems: 'center' }}>
                {['Documentation', 'Blog', 'Tutorials', 'Support'].map((item) => (
                  <Typography key={item} variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', textAlign: 'center' }}>
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={6} md={2} sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>Company</Typography>
              <Stack spacing={1} sx={{ alignItems: 'center' }}>
                {['About', 'Careers', 'Contact', 'Partners'].map((item) => (
                  <Typography key={item} variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', textAlign: 'center' }}>
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={6} md={2} sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>Legal</Typography>
              <Stack spacing={1} sx={{ alignItems: 'center' }}>
                {['Privacy', 'Terms', 'Security', 'Compliance'].map((item) => (
                  <Typography key={item} variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', textAlign: 'center' }}>
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, bgcolor: '#566573' }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body2" sx={{ opacity: 0.8, textAlign: 'center' }}>
              © 2025 Research Journal Management System. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={3} sx={{ justifyContent: 'center' }}>
              <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', textAlign: 'center' }}>
                Privacy Policy
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', textAlign: 'center' }}>
                Terms of Service
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', textAlign: 'center' }}>
                Cookie Policy
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Floating Action Button */}
      <Fab 
        sx={{ 
          position: 'fixed', 
          bottom: 24, 
          right: 24,
          bgcolor: '#A93226',
          color: '#FDFEFE',
          animation: `${float} 3s ease-in-out infinite`,
          '&:hover': {
            bgcolor: '#922B21'
          }
        }}
        href="mailto:support@rjms.com"
      >
        <Email />
      </Fab>
    </Box>
  );
};

export default SimpleLandingPage;