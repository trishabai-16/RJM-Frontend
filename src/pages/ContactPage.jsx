import React, { useState } from 'react';
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  ArrowBack,
  Email,
  Phone,
  LocationOn,
  Send,
  ExpandMore,
  CheckCircle,
  Schedule,
  Support,
  Business
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    subject: '',
    message: '',
    inquiryType: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! We've received your message and will respond within 24 hours.`);
    setFormData({
      name: '',
      email: '',
      institution: '',
      subject: '',
      message: '',
      inquiryType: ''
    });
  };

  const contactMethods = [
    {
      icon: <Email sx={{ fontSize: 40 }} />,
      title: 'Email Support',
      description: 'Get help from our support team',
      contact: 'support@rjms.com',
      responseTime: 'Within 24 hours',
      color: '#A93226'
    },
    {
      icon: <Phone sx={{ fontSize: 40 }} />,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      contact: '+1 (555) RJMS-HELP',
      responseTime: 'Mon-Fri, 9AM-5PM PST',
      color: '#1C2833'
    },
    {
      icon: <Business sx={{ fontSize: 40 }} />,
      title: 'Enterprise Sales',
      description: 'Custom solutions for institutions',
      contact: 'sales@rjms.com',
      responseTime: 'Same day response',
      color: '#27AE60'
    },
    {
      icon: <LocationOn sx={{ fontSize: 40 }} />,
      title: 'Visit Our Office',
      description: 'Schedule an in-person meeting',
      contact: '123 Innovation Drive, San Francisco',
      responseTime: 'By appointment only',
      color: '#D68910'
    }
  ];

  const faqs = [
    {
      question: 'How do I get started with RJMS?',
      answer: 'Simply click "Get Started" to create your free account. You can begin using our Academic plan immediately, or start a 14-day free trial of our Professional plan.'
    },
    {
      question: 'What file formats does RJMS support?',
      answer: 'We support all major document formats including PDF, DOC, DOCX, LaTeX, and various image formats. Our platform also integrates with popular reference managers like Zotero and Mendeley.'
    },
    {
      question: 'Is my research data secure?',
      answer: 'Absolutely. We use enterprise-grade encryption (AES-256), regular backups, and comply with international security standards including ISO 27001 and SOC 2 Type II.'
    },
    {
      question: 'Can I collaborate with researchers from other institutions?',
      answer: 'Yes! RJMS is designed for seamless collaboration across institutions. You can invite collaborators via email, set permissions, and work together in real-time.'
    },
    {
      question: 'Do you offer training and onboarding?',
      answer: 'Yes, we provide comprehensive onboarding for all new users, plus advanced training sessions for Professional and Enterprise customers. We also have extensive documentation and video tutorials.'
    },
    {
      question: 'What integrations are available?',
      answer: 'We integrate with popular tools like Slack, Microsoft Teams, Google Workspace, reference managers, and major research databases. Enterprise customers can also use our API for custom integrations.'
    },
    {
      question: 'How does billing work?',
      answer: 'All paid plans are billed monthly or annually. You can upgrade, downgrade, or cancel at any time. We offer prorated billing and accept all major payment methods.'
    },
    {
      question: 'What support is included?',
      answer: 'Academic plan users get community support, Professional plan users get priority email support, and Enterprise customers get dedicated account management and 24/7 phone support.'
    }
  ];

  const offices = [
    {
      city: 'San Francisco',
      address: '123 Innovation Drive\nSan Francisco, CA 94105\nUnited States',
      type: 'Headquarters'
    },
    {
      city: 'London',
      address: '45 Research Avenue\nLondon EC2A 3QR\nUnited Kingdom',
      type: 'European Office'
    },
    {
      city: 'Singapore',
      address: '88 Innovation Hub\nSingapore 018956',
      type: 'Asia Pacific Office'
    }
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
              Contact RJMS
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
            label="We're Here to Help" 
            sx={{
              bgcolor: '#FADBD8',
              color: '#A93226',
              border: '1px solid #A93226',
              mb: 3
            }}
          />
          <Typography variant="h2" gutterBottom fontWeight="bold" sx={{ color: '#1C2833', mb: 2 }}>
            Get in Touch with Our Team
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 800, mx: 'auto', color: '#566573', mb: 4 }}>
            Have questions about RJMS? Need help getting started? Want to discuss enterprise solutions? 
            We're here to support your research journey.
          </Typography>
        </Container>
      </Box>

      {/* Contact Methods */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {contactMethods.map((method, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                height: '100%',
                textAlign: 'center',
                p: 3,
                border: '1px solid #E5E8E8',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 32px rgba(28, 40, 51, 0.15)'
                },
                transition: 'all 0.3s ease'
              }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: `${method.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3
                  }}
                >
                  <Box sx={{ color: method.color }}>
                    {method.icon}
                  </Box>
                </Box>
                
                <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: '#1C2833' }}>
                  {method.title}
                </Typography>
                
                <Typography variant="body2" sx={{ color: '#566573', mb: 2 }}>
                  {method.description}
                </Typography>
                
                <Typography variant="body1" fontWeight="bold" sx={{ color: method.color, mb: 1 }}>
                  {method.contact}
                </Typography>
                
                <Typography variant="caption" sx={{ color: '#566573' }}>
                  {method.responseTime}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Form */}
      <Box sx={{ bgcolor: '#FFFFFF', py: 10 }}>
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ color: '#1C2833', textAlign: 'center', mb: 6 }}>
            Send Us a Message
          </Typography>
          
          <Paper sx={{ p: 4, border: '1px solid #E5E8E8', borderRadius: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Institution/Organization"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Inquiry Type</InputLabel>
                    <Select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      required
                      label="Inquiry Type"
                    >
                      <MenuItem value="general">General Question</MenuItem>
                      <MenuItem value="technical">Technical Support</MenuItem>
                      <MenuItem value="billing">Billing & Pricing</MenuItem>
                      <MenuItem value="enterprise">Enterprise Sales</MenuItem>
                      <MenuItem value="partnership">Partnership</MenuItem>
                      <MenuItem value="feedback">Feature Request/Feedback</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    multiline
                    rows={6}
                    variant="outlined"
                    placeholder="Please describe your question or how we can help you..."
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<Send />}
                    sx={{
                      bgcolor: '#A93226',
                      py: 1.5,
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: '#922B21'
                      }
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ color: '#1C2833', textAlign: 'center', mb: 6 }}>
          Frequently Asked Questions
        </Typography>
        
        <Grid container spacing={2}>
          {faqs.map((faq, index) => (
            <Grid item xs={12} key={index}>
              <Accordion sx={{ border: '1px solid #E5E8E8', '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: '#1C2833' }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: '#566573', lineHeight: 1.7 }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Office Locations */}
      <Box sx={{ bgcolor: '#FFFFFF', py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ color: '#1C2833', textAlign: 'center', mb: 6 }}>
            Our Global Offices
          </Typography>
          
          <Grid container spacing={4}>
            {offices.map((office, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  border: '1px solid #E5E8E8',
                  '&:hover': {
                    boxShadow: '0 8px 32px rgba(28, 40, 51, 0.15)'
                  },
                  transition: 'all 0.3s ease'
                }}>
                  <LocationOn sx={{ fontSize: 40, color: '#A93226', mb: 2 }} />
                  <Typography variant="h5" fontWeight="bold" sx={{ color: '#1C2833', mb: 1 }}>
                    {office.city}
                  </Typography>
                  <Chip 
                    label={office.type} 
                    size="small"
                    sx={{ 
                      mb: 2,
                      bgcolor: '#F8F9F9',
                      color: '#566573'
                    }}
                  />
                  <Typography sx={{ color: '#566573', whiteSpace: 'pre-line' }}>
                    {office.address}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Support Resources */}
      <Box sx={{ bgcolor: '#F8F9F9', py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ color: '#1C2833', textAlign: 'center', mb: 6 }}>
            Additional Support Resources
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, textAlign: 'center', border: '1px solid #E5E8E8' }}>
                <Support sx={{ fontSize: 40, color: '#27AE60', mb: 2 }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#1C2833', mb: 2 }}>
                  Help Center
                </Typography>
                <Typography sx={{ color: '#566573', mb: 3 }}>
                  Browse our comprehensive documentation, tutorials, and user guides.
                </Typography>
                <Button 
                  variant="outlined"
                  sx={{ 
                    borderColor: '#27AE60',
                    color: '#27AE60',
                    '&:hover': { 
                      borderColor: '#27AE60',
                      bgcolor: '#27AE6010'
                    }
                  }}
                >
                  Visit Help Center
                </Button>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, textAlign: 'center', border: '1px solid #E5E8E8' }}>
                <Schedule sx={{ fontSize: 40, color: '#D68910', mb: 2 }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#1C2833', mb: 2 }}>
                  Schedule Demo
                </Typography>
                <Typography sx={{ color: '#566573', mb: 3 }}>
                  Book a personalized demo to see how RJMS can work for your research.
                </Typography>
                <Button 
                  variant="outlined"
                  sx={{ 
                    borderColor: '#D68910',
                    color: '#D68910',
                    '&:hover': { 
                      borderColor: '#D68910',
                      bgcolor: '#D6891010'
                    }
                  }}
                >
                  Book Demo
                </Button>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, textAlign: 'center', border: '1px solid #E5E8E8' }}>
                <Business sx={{ fontSize: 40, color: '#A93226', mb: 2 }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#1C2833', mb: 2 }}>
                  Community Forum
                </Typography>
                <Typography sx={{ color: '#566573', mb: 3 }}>
                  Connect with other researchers and share best practices.
                </Typography>
                <Button 
                  variant="outlined"
                  sx={{ 
                    borderColor: '#A93226',
                    color: '#A93226',
                    '&:hover': { 
                      borderColor: '#A93226',
                      bgcolor: '#A9322610'
                    }
                  }}
                >
                  Join Community
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
            Ready to Transform Your Research?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Don't wait - start your research management journey today with our free trial.
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

export default ContactPage;