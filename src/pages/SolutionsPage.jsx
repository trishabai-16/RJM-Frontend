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
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  ArrowBack,
  CheckCircle,
  Close,
  Star,
  Business,
  School,
  Person,
  TrendingUp
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SolutionsPage = () => {
  const navigate = useNavigate();

  const pricingPlans = [
    {
      name: 'Academic',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for individual researchers and students',
      color: '#27AE60',
      icon: <Person sx={{ fontSize: 40 }} />,
      features: [
        'Up to 5 research projects',
        'Basic collaboration tools',
        '1GB cloud storage',
        'Community support',
        'Basic analytics',
        'Standard templates'
      ],
      limitations: [
        'Limited to 2 collaborators per project',
        'Basic export options only',
        'No priority support'
      ],
      recommended: false
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/month',
      description: 'Ideal for research teams and small institutions',
      color: '#A93226',
      icon: <Business sx={{ fontSize: 40 }} />,
      features: [
        'Unlimited research projects',
        'Advanced collaboration tools',
        '100GB cloud storage',
        'Priority email support',
        'Advanced analytics & insights',
        'Custom templates',
        'API access',
        'Integration with research databases',
        'Version control',
        'Automated backups'
      ],
      limitations: [],
      recommended: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large institutions and organizations',
      color: '#1C2833',
      icon: <School sx={{ fontSize: 40 }} />,
      features: [
        'Everything in Professional',
        'Unlimited storage',
        'Dedicated account manager',
        '24/7 phone support',
        'Custom integrations',
        'Advanced security features',
        'Single Sign-On (SSO)',
        'Custom branding',
        'Training & onboarding',
        'Service Level Agreement (SLA)'
      ],
      limitations: [],
      recommended: false
    }
  ];

  const comparisonFeatures = [
    { feature: 'Research Projects', academic: '5', professional: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'Cloud Storage', academic: '1GB', professional: '100GB', enterprise: 'Unlimited' },
    { feature: 'Collaborators per Project', academic: '2', professional: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'API Access', academic: false, professional: true, enterprise: true },
    { feature: 'Custom Integrations', academic: false, professional: false, enterprise: true },
    { feature: 'Priority Support', academic: false, professional: true, enterprise: true },
    { feature: 'Advanced Analytics', academic: false, professional: true, enterprise: true },
    { feature: 'SSO Integration', academic: false, professional: false, enterprise: true },
    { feature: 'Custom Branding', academic: false, professional: false, enterprise: true },
    { feature: 'SLA Guarantee', academic: false, professional: false, enterprise: true }
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
              RJMS Solutions
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
            label="Flexible Pricing" 
            sx={{
              bgcolor: '#FADBD8',
              color: '#A93226',
              border: '1px solid #A93226',
              mb: 3
            }}
          />
          <Typography variant="h2" gutterBottom fontWeight="bold" sx={{ color: '#1C2833', mb: 2 }}>
            Choose the Right Solution for Your Research
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 800, mx: 'auto', color: '#566573', mb: 4 }}>
            From individual researchers to large institutions, we have a plan that fits your needs and budget.
          </Typography>
        </Container>
      </Box>

      {/* Pricing Plans */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4} justifyContent="center">
          {pricingPlans.map((plan, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  position: 'relative',
                  bgcolor: '#FFFFFF',
                  border: plan.recommended ? `3px solid ${plan.color}` : '1px solid #E5E8E8',
                  borderRadius: 3,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 32px rgba(28, 40, 51, 0.1)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {plan.recommended && (
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bgcolor: plan.color,
                      color: '#FFFFFF',
                      px: 3,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: '0.875rem',
                      fontWeight: 'bold'
                    }}
                  >
                    Most Popular
                  </Box>
                )}
                
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: `${plan.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3
                    }}
                  >
                    <Box sx={{ color: plan.color }}>
                      {plan.icon}
                    </Box>
                  </Box>
                  
                  <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ color: '#1C2833' }}>
                    {plan.name}
                  </Typography>
                  
                  <Typography variant="body1" sx={{ color: '#566573', mb: 3 }}>
                    {plan.description}
                  </Typography>
                  
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h2" 
                      component="span" 
                      fontWeight="bold" 
                      sx={{ color: plan.color }}
                    >
                      {plan.price}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      component="span" 
                      sx={{ color: '#566573', ml: 1 }}
                    >
                      {plan.period}
                    </Typography>
                  </Box>

                  <List sx={{ mb: 3 }}>
                    {plan.features.map((feature, featureIndex) => (
                      <ListItem key={featureIndex} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <CheckCircle sx={{ color: '#27AE60', fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature} 
                          primaryTypographyProps={{ 
                            fontSize: '0.9rem',
                            color: '#1C2833'
                          }}
                        />
                      </ListItem>
                    ))}
                    
                    {plan.limitations.map((limitation, limitIndex) => (
                      <ListItem key={limitIndex} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <Close sx={{ color: '#E74C3C', fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={limitation} 
                          primaryTypographyProps={{ 
                            fontSize: '0.9rem',
                            color: '#566573',
                            fontStyle: 'italic'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  
                  <Button 
                    variant={plan.recommended ? "contained" : "outlined"}
                    fullWidth
                    size="large"
                    sx={{ 
                      py: 1.5,
                      fontWeight: 600,
                      ...(plan.recommended 
                        ? { 
                            bgcolor: plan.color,
                            '&:hover': { bgcolor: `${plan.color}CC` }
                          }
                        : {
                            borderColor: plan.color,
                            color: plan.color,
                            '&:hover': { 
                              borderColor: plan.color,
                              bgcolor: `${plan.color}10`
                            }
                          }
                      )
                    }}
                    onClick={() => {
                      if (plan.name === 'Enterprise') {
                        alert('Thank you for your interest! Our sales team will contact you within 24 hours to discuss custom pricing.');
                      } else {
                        navigate('/register');
                      }
                    }}
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Feature Comparison Table */}
      <Box sx={{ bgcolor: '#FFFFFF', py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ color: '#1C2833', textAlign: 'center', mb: 6 }}>
            Detailed Feature Comparison
          </Typography>
          
          <TableContainer component={Paper} sx={{ border: '1px solid #E5E8E8', borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: '#F8F9F9' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: '#1C2833' }}>Feature</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: '#27AE60' }}>Academic</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: '#A93226' }}>Professional</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: '#1C2833' }}>Enterprise</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {comparisonFeatures.map((row, index) => (
                  <TableRow key={index} sx={{ '&:nth-of-type(odd)': { bgcolor: '#FAFBFC' } }}>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 500, color: '#1C2833' }}>
                      {row.feature}
                    </TableCell>
                    <TableCell align="center">
                      {typeof row.academic === 'boolean' ? (
                        row.academic ? (
                          <CheckCircle sx={{ color: '#27AE60' }} />
                        ) : (
                          <Close sx={{ color: '#E74C3C' }} />
                        )
                      ) : (
                        <Typography sx={{ color: '#566573' }}>{row.academic}</Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {typeof row.professional === 'boolean' ? (
                        row.professional ? (
                          <CheckCircle sx={{ color: '#27AE60' }} />
                        ) : (
                          <Close sx={{ color: '#E74C3C' }} />
                        )
                      ) : (
                        <Typography sx={{ color: '#566573' }}>{row.professional}</Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? (
                          <CheckCircle sx={{ color: '#27AE60' }} />
                        ) : (
                          <Close sx={{ color: '#E74C3C' }} />
                        )
                      ) : (
                        <Typography sx={{ color: '#566573' }}>{row.enterprise}</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ bgcolor: '#F8F9F9', py: 10 }}>
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ color: '#1C2833', textAlign: 'center', mb: 6 }}>
            Frequently Asked Questions
          </Typography>
          
          <Grid container spacing={3}>
            {[
              {
                question: 'Can I upgrade or downgrade my plan?',
                answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.'
              },
              {
                question: 'Is there a free trial available?',
                answer: 'Yes, all paid plans come with a 14-day free trial. No credit card required to start.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, PayPal, and wire transfers for Enterprise customers.'
              },
              {
                question: 'How secure is my research data?',
                answer: 'We use enterprise-grade encryption, regular backups, and comply with international security standards including ISO 27001.'
              }
            ].map((faq, index) => (
              <Grid item xs={12} key={index}>
                <Paper sx={{ p: 3, border: '1px solid #E5E8E8' }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: '#1C2833' }}>
                    {faq.question}
                  </Typography>
                  <Typography sx={{ color: '#566573' }}>
                    {faq.answer}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: '#1C2833', color: '#F4F6F6', py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom fontWeight="bold">
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of researchers who trust RJMS for their research management needs.
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

export default SolutionsPage;