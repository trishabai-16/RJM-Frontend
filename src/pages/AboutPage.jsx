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
  Avatar,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/material';
import {
  ArrowBack,
  Star,
  School,
  TrendingUp,
  Group,
  LocationOn,
  Email,
  Phone,
  LinkedIn,
  Twitter
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();

  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Professor, Stanford University',
      text: 'RJMS has revolutionized how our research team collaborates and manages publications. The platform is intuitive and powerful.',
      avatar: '/avatars/1.jpg',
      rating: 5
    },
    {
      name: 'Prof. Michael Rodriguez',
      role: 'Head of Research, MIT',
      text: 'The analytics tools provided insights we never had access to before. Our research productivity has increased by 40%.',
      avatar: '/avatars/2.jpg',
      rating: 5
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Research Director, Oxford',
      text: 'Streamlined our entire publication workflow. The time saved allows us to focus more on actual research.',
      avatar: '/avatars/3.jpg',
      rating: 5
    },
    {
      name: 'Prof. James Liu',
      role: 'Department Chair, Harvard',
      text: 'The collaboration features are exceptional. Our international research partnerships have never been smoother.',
      avatar: '/avatars/4.jpg',
      rating: 5
    },
    {
      name: 'Dr. Maria Gonzalez',
      role: 'Principal Investigator, CERN',
      text: 'Managing large-scale research projects is now effortless. The enterprise features are worth every penny.',
      avatar: '/avatars/5.jpg',
      rating: 5
    },
    {
      name: 'Prof. David Kim',
      role: 'Research Lead, Samsung AI',
      text: 'The API integration capabilities allowed us to connect with our existing research infrastructure seamlessly.',
      avatar: '/avatars/6.jpg',
      rating: 5
    }
  ];

  const milestones = [
    { year: '2020', title: 'Company Founded', description: 'Started with a vision to transform research management' },
    { year: '2021', title: 'First 1,000 Users', description: 'Reached our first milestone of active researchers' },
    { year: '2022', title: 'Enterprise Launch', description: 'Introduced enterprise solutions for large institutions' },
    { year: '2023', title: 'AI Integration', description: 'Added AI-powered research recommendations and insights' },
    { year: '2024', title: 'Global Expansion', description: 'Expanded to serve researchers in 50+ countries' },
    { year: '2025', title: 'Leading Platform', description: 'Became the #1 research management platform globally' }
  ];

  const team = [
    {
      name: 'Dr. Alex Thompson',
      role: 'CEO & Co-Founder',
      description: 'Former researcher at MIT with 15+ years in academic publishing',
      avatar: 'AT'
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO & Co-Founder',
      description: 'Ex-Google engineer specializing in research platform architecture',
      avatar: 'SJ'
    },
    {
      name: 'Dr. Robert Chen',
      role: 'Head of Product',
      description: 'PhD in Computer Science, former Stanford research coordinator',
      avatar: 'RC'
    },
    {
      name: 'Lisa Wang',
      role: 'Head of Design',
      description: 'Award-winning UX designer with focus on academic workflows',
      avatar: 'LW'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Active Researchers', icon: <Group sx={{ fontSize: 40 }} /> },
    { number: '500+', label: 'Institutions Served', icon: <School sx={{ fontSize: 40 }} /> },
    { number: '1M+', label: 'Research Papers Managed', icon: <TrendingUp sx={{ fontSize: 40 }} /> },
    { number: '99.9%', label: 'Uptime Guarantee', icon: <Star sx={{ fontSize: 40 }} /> }
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
              About RJMS
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
      <Box sx={{ bgcolor: '#FFFFFF', py: 10, borderBottom: '1px solid #E5E8E8' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Chip 
            label="Our Story" 
            sx={{
              bgcolor: '#FADBD8',
              color: '#A93226',
              border: '1px solid #A93226',
              mb: 3
            }}
          />
          <Typography variant="h2" gutterBottom fontWeight="bold" sx={{ color: '#1C2833', mb: 3 }}>
            Empowering Research Excellence Worldwide
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 800, mx: 'auto', color: '#566573', mb: 6 }}>
            We're on a mission to transform how researchers collaborate, manage, and share their groundbreaking work. 
            Since 2020, we've been building the future of academic research management.
          </Typography>
          
          {/* Stats */}
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ color: '#A93226', mb: 1 }}>{stat.icon}</Box>
                  <Typography variant="h4" fontWeight="bold" sx={{ color: '#1C2833' }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#566573' }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Mission & Vision */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ color: '#1C2833' }}>
              Our Mission
            </Typography>
            <Typography variant="h6" sx={{ color: '#566573', mb: 4, lineHeight: 1.7 }}>
              To democratize access to powerful research management tools and enable researchers worldwide to focus on what matters most - discovery and innovation.
            </Typography>
            
            <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ color: '#A93226' }}>
              Why We Started RJMS
            </Typography>
            <Typography variant="body1" sx={{ color: '#566573', lineHeight: 1.7 }}>
              As former researchers ourselves, we experienced firsthand the frustrations of juggling multiple tools, 
              losing track of collaborations, and spending more time on administrative tasks than actual research. 
              We knew there had to be a better way - so we built it.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4,
                background: `linear-gradient(135deg, #1C283315 0%, #A9322615 100%)`,
                borderRadius: 4,
                border: '1px solid #E5E8E8'
              }}
            >
              <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ color: '#1C2833' }}>
                Our Values
              </Typography>
              <Stack spacing={3}>
                {[
                  { title: 'Innovation', desc: 'Continuously pushing boundaries in research technology' },
                  { title: 'Collaboration', desc: 'Fostering meaningful connections between researchers' },
                  { title: 'Accessibility', desc: 'Making powerful tools available to researchers everywhere' },
                  { title: 'Security', desc: 'Protecting intellectual property with enterprise-grade security' }
                ].map((value, index) => (
                  <Box key={index}>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: '#A93226' }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#566573' }}>
                      {value.desc}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Timeline */}
      <Box sx={{ bgcolor: '#FFFFFF', py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ color: '#1C2833', textAlign: 'center', mb: 6 }}>
            Our Journey
          </Typography>
          
          <Timeline position="alternate">
            {milestones.map((milestone, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: '#A93226' }}>
                    {milestone.year}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot sx={{ bgcolor: '#1C2833' }} />
                  {index < milestones.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Paper sx={{ p: 3, border: '1px solid #E5E8E8' }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: '#1C2833' }}>
                      {milestone.title}
                    </Typography>
                    <Typography sx={{ color: '#566573' }}>
                      {milestone.description}
                    </Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Container>
      </Box>

      {/* Team */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ color: '#1C2833', textAlign: 'center', mb: 6 }}>
          Meet Our Team
        </Typography>
        
        <Grid container spacing={4}>
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                textAlign: 'center', 
                p: 3,
                border: '1px solid #E5E8E8',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 32px rgba(28, 40, 51, 0.15)'
                },
                transition: 'all 0.3s ease'
              }}>
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    mx: 'auto', 
                    mb: 2,
                    bgcolor: '#1C2833',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}
                >
                  {member.avatar}
                </Avatar>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#1C2833' }}>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#A93226', mb: 2 }}>
                  {member.role}
                </Typography>
                <Typography variant="body2" sx={{ color: '#566573' }}>
                  {member.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials */}
      <Box sx={{ bgcolor: '#FFFFFF', py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ color: '#1C2833', textAlign: 'center', mb: 6 }}>
            What Researchers Say About Us
          </Typography>
          
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card sx={{ 
                  height: '100%', 
                  p: 3,
                  border: '1px solid #E5E8E8',
                  position: 'relative',
                  '&:hover': {
                    boxShadow: '0 8px 32px rgba(28, 40, 51, 0.15)'
                  },
                  transition: 'all 0.3s ease'
                }}>
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
                    justifyContent: 'center'
                  }}>
                    <Typography sx={{ color: '#FFFFFF', fontSize: '10px', fontWeight: 'bold' }}>"</Typography>
                  </Box>
                  
                  <Typography variant="body1" sx={{ color: '#566573', mb: 3, fontStyle: 'italic' }}>
                    "{testimonial.text}"
                  </Typography>
                  
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} sx={{ color: '#D68910', fontSize: 18 }} />
                    ))}
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2, bgcolor: '#1C2833' }}>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#1C2833' }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#A93226' }}>
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Information */}
      <Box sx={{ bgcolor: '#F8F9F9', py: 10 }}>
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ color: '#1C2833', textAlign: 'center', mb: 6 }}>
            Get in Touch
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, textAlign: 'center', border: '1px solid #E5E8E8' }}>
                <LocationOn sx={{ fontSize: 40, color: '#A93226', mb: 2 }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#1C2833', mb: 1 }}>
                  Headquarters
                </Typography>
                <Typography sx={{ color: '#566573' }}>
                  123 Innovation Drive<br />
                  San Francisco, CA 94105<br />
                  United States
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, textAlign: 'center', border: '1px solid #E5E8E8' }}>
                <Email sx={{ fontSize: 40, color: '#A93226', mb: 2 }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#1C2833', mb: 1 }}>
                  Contact Us
                </Typography>
                <Typography sx={{ color: '#566573' }}>
                  hello@rjms.com<br />
                  support@rjms.com<br />
                  +1 (555) RJMS-HELP
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: '#1C2833', color: '#F4F6F6', py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom fontWeight="bold">
            Ready to Join Our Community?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Become part of the growing community of researchers who trust RJMS for their research management needs.
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
              Start Your Journey
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

export default AboutPage;