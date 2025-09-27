import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { 
  People as UsersIcon,
  Description as ManuscriptsIcon,
  RateReview as ReviewsIcon,
  MenuBook as JournalsIcon,
  TrendingUp as StatsIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { manuscriptService, journalService } from '../services/apiService';
import { format } from 'date-fns';

const AdminDashboard = ({ stats, onRefresh }) => {
  // Fetch all manuscripts for admin overview
  const {
    data: manuscripts,
    isLoading: manuscriptsLoading,
    error: manuscriptsError,
  } = useQuery({
    queryKey: ['admin-all-manuscripts'],
    queryFn: async () => {
      const response = await manuscriptService.getAllManuscripts();
      return response.data;
    },
  });

  // Fetch all journals
  const {
    data: journals,
    isLoading: journalsLoading,
  } = useQuery({
    queryKey: ['admin-all-journals'],
    queryFn: async () => {
      const response = await journalService.getAllJournals();
      return response.data;
    },
  });

  const manuscriptColumns = [
    {
      field: 'title',
      headerName: 'Manuscript Title',
      width: 250,
      renderCell: (params) => (
        <Typography variant="body2" noWrap>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'authorName',
      headerName: 'Author',
      width: 150,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            backgroundColor: getStatusColor(params.value),
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 'bold',
          }}
        >
          {params.value?.replace('_', ' ') || 'Unknown'}
        </Box>
      ),
    },
    {
      field: 'journal',
      headerName: 'Journal',
      width: 180,
    },
    {
      field: 'submissionDate',
      headerName: 'Submission Date',
      width: 140,
      renderCell: (params) => (
        params.value ? format(new Date(params.value), 'MMM dd, yyyy') : 'N/A'
      ),
    },
  ];

  const journalColumns = [
    {
      field: 'name',
      headerName: 'Journal Name',
      width: 250,
    },
    {
      field: 'issn',
      headerName: 'ISSN',
      width: 120,
    },
    {
      field: 'editor',
      headerName: 'Editor',
      width: 150,
    },
    {
      field: 'impactFactor',
      headerName: 'Impact Factor',
      width: 120,
      type: 'number',
    },
    {
      field: 'submissionCount',
      headerName: 'Submissions',
      width: 120,
      type: 'number',
    },
    {
      field: 'acceptanceRate',
      headerName: 'Acceptance Rate',
      width: 140,
      renderCell: (params) => (
        `${(params.value * 100).toFixed(1)}%`
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

  const getStatusCount = (status) => {
    return manuscripts?.filter(m => m.status === status).length || 0;
  };

  if (manuscriptsLoading || journalsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (manuscriptsError) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading data: {manuscriptsError.message}
      </Alert>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#1C2833', fontWeight: 600 }}>
          System Administration
        </Typography>
        <Typography variant="body1" sx={{ color: '#566573' }}>
          Comprehensive overview of the Research Journal Management System
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#F8F9F9', border: '1px solid #E5E8E8' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <ManuscriptsIcon sx={{ fontSize: 40, color: '#1C2833', mb: 1 }} />
              <Typography variant="h4" sx={{ color: '#1C2833', fontWeight: 600 }}>
                {manuscripts?.length || 0}
              </Typography>
              <Typography variant="body2" sx={{ color: '#566573' }}>
                Total Manuscripts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#F8F9F9', border: '1px solid #E5E8E8' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <ReviewsIcon sx={{ fontSize: 40, color: '#D68910', mb: 1 }} />
              <Typography variant="h4" sx={{ color: '#D68910', fontWeight: 600 }}>
                {getStatusCount('UNDER_REVIEW')}
              </Typography>
              <Typography variant="body2" sx={{ color: '#566573' }}>
                Under Review
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#F8F9F9', border: '1px solid #E5E8E8' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <JournalsIcon sx={{ fontSize: 40, color: '#27AE60', mb: 1 }} />
              <Typography variant="h4" sx={{ color: '#27AE60', fontWeight: 600 }}>
                {journals?.length || 0}
              </Typography>
              <Typography variant="body2" sx={{ color: '#566573' }}>
                Active Journals
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#F8F9F9', border: '1px solid #E5E8E8' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <StatsIcon sx={{ fontSize: 40, color: '#A93226', mb: 1 }} />
              <Typography variant="h4" sx={{ color: '#A93226', fontWeight: 600 }}>
                {getStatusCount('ACCEPTED')}
              </Typography>
              <Typography variant="body2" sx={{ color: '#566573' }}>
                Published Papers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Status Breakdown */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, bgcolor: '#FFFFFF', boxShadow: '0 2px 8px rgba(28, 40, 51, 0.1)' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1C2833', fontWeight: 600 }}>
              Manuscript Status Distribution
            </Typography>
            <Grid container spacing={2}>
              {['SUBMITTED', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED'].map((status) => (
                <Grid item xs={6} key={status}>
                  <Box textAlign="center">
                    <Typography variant="h5" sx={{ color: getStatusColor(status) }}>
                      {getStatusCount(status)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {status.replace('_', ' ')}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Journal Performance
            </Typography>
            <Box>
              {journals?.map((journal) => (
                <Box key={journal.id} sx={{ mb: 2 }}>
                  <Typography variant="body1" fontWeight="bold">
                    {journal.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Impact Factor: {journal.impactFactor} • 
                    Submissions: {journal.submissionCount} • 
                    Acceptance: {(journal.acceptanceRate * 100).toFixed(1)}%
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Manuscripts Table */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          All Manuscripts
        </Typography>
        {manuscripts && manuscripts.length > 0 ? (
          <DataGrid
            rows={manuscripts}
            columns={manuscriptColumns}
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
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No manuscripts found
          </Typography>
        )}
      </Paper>

      {/* Journals Table */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Journal Management
        </Typography>
        {journals && journals.length > 0 ? (
          <DataGrid
            rows={journals}
            columns={journalColumns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
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
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No journals found
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default AdminDashboard;