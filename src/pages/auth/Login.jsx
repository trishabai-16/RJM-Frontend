import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  Divider,
  CircularProgress,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Person, Lock } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const validationSchema = yup.object({
  username: yup
    .string('Enter your username')
    .required('Username is required'),
  password: yup
    .string('Enter your password')
    .min(3, 'Password should be at least 3 characters long')
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError('');
      
      try {
        await login(values);
        navigate('/dashboard');
      } catch (err) {
        setError(err.message || 'Login failed. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box textAlign="center" sx={{ mb: 4 }}>
            <Person sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign in to your Research Journal Management account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <Person sx={{ color: 'action.active', mr: 1 }} />
                ),
              }}
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <Lock sx={{ color: 'action.active', mr: 1 }} />
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mb: 3, py: 1.5 }}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/register')}
                sx={{ cursor: 'pointer' }}
              >
                Create an account
              </Link>
            </Typography>
          </Box>

          <Box textAlign="center" sx={{ mt: 2 }}>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/')}
              sx={{ cursor: 'pointer' }}
            >
              Back to Home
            </Link>
          </Box>

          {/* Development Test Credentials */}
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 1, fontWeight: 'bold' }}>
              🧪 Development Test Credentials
            </Typography>
            <Typography variant="caption" color="primary" align="center" sx={{ display: 'block', mb: 2, fontWeight: 'bold' }}>
              ✅ Working Login Credentials (click to auto-fill):
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
              {[
                { label: 'Admin', user: 'admin', pass: 'admin123' },
                { label: 'Author', user: 'author', pass: 'author123' },
                { label: 'Editor', user: 'editor', pass: 'editor123' },
                { label: 'Reviewer', user: 'reviewer', pass: 'reviewer123' },
                { label: 'Test User', user: 'testuser', pass: 'testuser123' }
              ].map((cred) => (
                <Button
                  key={cred.user}
                  size="small"
                  variant="contained"
                  color="primary"
                  sx={{ 
                    fontSize: '0.75rem', 
                    px: 2, 
                    py: 1,
                    minWidth: 'auto',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                  onClick={() => {
                    formik.setFieldValue('username', cred.user);
                    formik.setFieldValue('password', cred.pass);
                  }}
                >
                  {cred.label}
                </Button>
              ))}
            </Box>
            <Typography variant="caption" color="text.secondary" align="center" sx={{ display: 'block', mt: 2 }}>
              💡 All passwords follow the pattern: username + "123"<br/>
              Example: admin/admin123, author/author123, etc.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;