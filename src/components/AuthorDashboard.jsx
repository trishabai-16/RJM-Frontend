import React from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add as AddIcon } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { manuscriptService } from '../services/apiService';
import { format } from 'date-fns';

const AuthorDashboard = ({ stats, onRefresh }) => {
  const navigate = useNavigate();

  const {
    data: manuscripts,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['author-manuscripts'],
    queryFn: async () => {
      const response = await manuscriptService.getMySubmissions();
      return response.data;
    },
  });

  // Call onRefresh when data is fetched successfully
  React.useEffect(() => {
    if (manuscripts && onRefresh) {
      onRefresh();
    }
  }, [manuscripts, onRefresh]);

  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      width: 300,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            cursor: 'pointer',
            color: '#1C2833',
            fontWeight: 500,
            '&:hover': { 
              textDecoration: 'underline',
              color: '#A93226'
            }
          }}
          onClick={() => navigate(`/manuscripts/${params.row.id}`)}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'submissionDate',
      headerName: 'Submission Date',
      width: 150,
      renderCell: (params) => (
        params.value ? format(new Date(params.value), 'MMM dd, yyyy') : 'N/A'
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Box
          sx={{
            px: 2,
            py: 0.5,
            borderRadius: 1,
            backgroundColor: getStatusColor(params.value),
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 'bold',
          }}
        >
          {formatStatus(params.value)}
        </Box>
      ),
    },
    {
      field: 'keywords',
      headerName: 'Keywords',
      width: 200,
      renderCell: (params) => (
        <Typography variant="body2" noWrap>
          {params.value || 'No keywords'}
        </Typography>
      ),
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUBMITTED':
        return '#566573';
      case 'UNDER_REVIEW':
        return '#D68910';
      case 'ACCEPTED':
        return '#27AE60';
      case 'PUBLISHED':
        return '#1C2833';
      case 'REJECTED':
        return '#A93226';
      case 'WITHDRAWN':
        return '#85929E';
      default:
        return '#566573';
    }
  };

  const formatStatus = (status) => {
    return status?.replace('_', ' ') || 'Unknown';
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert 
        severity="error" 
        sx={{ 
          mb: 2,
          bgcolor: '#FADBD8',
          color: '#922B21',
          border: '1px solid #A93226',
          '& .MuiAlert-icon': {
            color: '#A93226'
          }
        }}
      >
        Error loading manuscripts: {error.message}
        <Button 
          onClick={refetch} 
          sx={{ 
            ml: 2,
            color: '#A93226',
            '&:hover': {
              bgcolor: 'rgba(169, 50, 38, 0.1)'
            }
          }}
        >
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <Box>
      {/* Action Bar */}
      <Box sx={{ 
        mb: 3, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' },
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 }
      }}>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            color: '#1C2833', 
            fontWeight: 600,
            fontSize: { xs: '1.5rem', md: '1.75rem' }
          }}
        >
          My Manuscripts
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/submit')}
          sx={{ 
            px: { xs: 2, md: 3 },
            py: { xs: 1, md: 1.2 },
            bgcolor: '#A93226',
            color: '#FDFEFE',
            fontWeight: 600,
            fontSize: { xs: '0.875rem', md: '1rem' },
            width: { xs: '100%', sm: 'auto' },
            '&:hover': {
              bgcolor: '#922B21',
              boxShadow: '0 4px 12px rgba(169, 50, 38, 0.3)'
            }
          }}
        >
          Submit New Manuscript
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={6} md={3}>
          <Paper sx={{ 
            p: { xs: 1.5, md: 2 }, 
            textAlign: 'center',
            borderRadius: 2,
            boxShadow: '0 2px 12px rgba(28, 40, 51, 0.08)',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(28, 40, 51, 0.12)',
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.3s ease'
          }}>
            <Typography variant="h4" color="primary">
              {manuscripts?.length || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Submissions
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main">
              {manuscripts?.filter(m => m.status === 'UNDER_REVIEW').length || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Under Review
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main">
              {manuscripts?.filter(m => m.status === 'ACCEPTED').length || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Accepted
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="info.main">
              {manuscripts?.filter(m => m.status === 'SUBMITTED').length || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pending Review
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Manuscripts Table */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Manuscript Submissions
        </Typography>
        
        {manuscripts && manuscripts.length > 0 ? (
          <DataGrid
            rows={manuscripts}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 25]}
            disableSelectionOnClick
            autoHeight
            sx={{
              border: 0,
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
          />
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              py: 6,
              color: 'text.secondary',
            }}
          >
            <Typography variant="h6" gutterBottom>
              No manuscripts submitted yet
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Start by submitting your first research manuscript
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/submit')}
            >
              Submit Manuscript
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AuthorDashboard;