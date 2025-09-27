import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { 
  Assignment as AssignIcon,
  Edit as EditIcon,
  Visibility as ViewIcon 
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { manuscriptService, reviewService } from '../services/apiService';

const EditorDashboard = ({ stats, onRefresh }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedManuscript, setSelectedManuscript] = useState(null);
  const [assignReviewerDialog, setAssignReviewerDialog] = useState(false);
  const [reviewerUsername, setReviewerUsername] = useState('');
  const [statusUpdateDialog, setStatusUpdateDialog] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  // Fetch pending manuscripts
  const {
    data: pendingManuscripts,
    isLoading: pendingLoading,
    error: pendingError,
  } = useQuery({
    queryKey: ['pending-manuscripts'],
    queryFn: async () => {
      const response = await manuscriptService.getPendingManuscripts();
      return response.data;
    },
  });

  // Fetch manuscript statistics
  const { data: manuscriptStats } = useQuery({
    queryKey: ['manuscript-stats'],
    queryFn: async () => {
      const response = await manuscriptService.getManuscriptStats();
      return response.data;
    },
  });

  // Assign reviewer mutation
  const assignReviewerMutation = useMutation({
    mutationFn: async ({ manuscriptId, reviewerUsername }) => {
      const response = await reviewService.assignReviewer(manuscriptId, reviewerUsername);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['pending-manuscripts']);
      setAssignReviewerDialog(false);
      setReviewerUsername('');
      setSelectedManuscript(null);
    },
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ manuscriptId, status }) => {
      const response = await manuscriptService.updateManuscriptStatus(manuscriptId, status);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['pending-manuscripts']);
      queryClient.invalidateQueries(['manuscript-stats']);
      setStatusUpdateDialog(false);
      setNewStatus('');
      setSelectedManuscript(null);
    },
  });

  const handleAssignReviewer = () => {
    if (selectedManuscript && reviewerUsername) {
      assignReviewerMutation.mutate({
        manuscriptId: selectedManuscript.id,
        reviewerUsername: reviewerUsername.trim(),
      });
    }
  };

  const handleStatusUpdate = () => {
    if (selectedManuscript && newStatus) {
      updateStatusMutation.mutate({
        manuscriptId: selectedManuscript.id,
        status: newStatus,
      });
    }
  };

  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      width: 300,
      renderCell: (params) => (
        <Typography variant="body2" noWrap>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'submittedBy',
      headerName: 'Author',
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value?.firstName} {params.value?.lastName}
        </Typography>
      ),
    },
    {
      field: 'submissionDate',
      headerName: 'Submission Date',
      width: 150,
      renderCell: (params) => (
        params.value ? new Date(params.value).toLocaleDateString() : 'N/A'
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
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value?.replace('_', ' ') || 'Unknown'}
          size="small"
          sx={{
            bgcolor: '#1C2833',
            color: '#F4F6F6',
            '&:hover': { bgcolor: '#2E4053' }
          }}
          variant="filled"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            startIcon={<ViewIcon />}
            onClick={() => navigate(`/manuscripts/${params.row.id}`)}
          >
            View
          </Button>
          <Button
            size="small"
            startIcon={<AssignIcon />}
            onClick={() => {
              setSelectedManuscript(params.row);
              setAssignReviewerDialog(true);
            }}
          >
            Assign
          </Button>
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={() => {
              setSelectedManuscript(params.row);
              setStatusUpdateDialog(true);
            }}
          >
            Status
          </Button>
        </Box>
      ),
    },
  ];

  const manuscriptStatuses = [
    'SUBMITTED',
    'UNDER_REVIEW',
    'UNDER_REVISION',
    'ACCEPTED',
    'REJECTED',
    'WITHDRAWN'
  ];

  if (pendingLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (pendingError) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading manuscripts: {pendingError.message}
      </Alert>
    );
  }

  return (
    <Box>
      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#F8F9F9', border: '1px solid #E5E8E8' }}>
            <Typography variant="h4" sx={{ color: '#1C2833', fontWeight: 600 }}>
              {manuscriptStats?.total || 0}
            </Typography>
            <Typography variant="body2" sx={{ color: '#566573' }}>
              Total Manuscripts
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#F8F9F9', border: '1px solid #E5E8E8' }}>
            <Typography variant="h4" sx={{ color: '#D68910', fontWeight: 600 }}>
              {manuscriptStats?.pending || 0}
            </Typography>
            <Typography variant="body2" sx={{ color: '#566573' }}>
              Pending Review
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#F8F9F9', border: '1px solid #E5E8E8' }}>
            <Typography variant="h4" sx={{ color: '#566573', fontWeight: 600 }}>
              {manuscriptStats?.underReview || 0}
            </Typography>
            <Typography variant="body2" sx={{ color: '#566573' }}>
              Under Review
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#F8F9F9', border: '1px solid #E5E8E8' }}>
            <Typography variant="h4" sx={{ color: '#27AE60', fontWeight: 600 }}>
              {manuscriptStats?.accepted || 0}
            </Typography>
            <Typography variant="body2" sx={{ color: '#566573' }}>
              Accepted
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Pending Manuscripts Table */}
      <Paper sx={{ p: 2, bgcolor: '#FFFFFF', boxShadow: '0 2px 8px rgba(28, 40, 51, 0.1)' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#1C2833', fontWeight: 600 }}>
          Pending Manuscripts
        </Typography>
        
        {pendingManuscripts && pendingManuscripts.length > 0 ? (
          <DataGrid
            rows={pendingManuscripts}
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
              No pending manuscripts
            </Typography>
            <Typography variant="body2">
              All manuscripts have been processed or no submissions yet.
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Assign Reviewer Dialog */}
      <Dialog 
        open={assignReviewerDialog} 
        onClose={() => setAssignReviewerDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Assign Reviewer</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Manuscript: {selectedManuscript?.title}
          </Typography>
          <TextField
            fullWidth
            label="Reviewer Username"
            value={reviewerUsername}
            onChange={(e) => setReviewerUsername(e.target.value)}
            placeholder="Enter the username of the reviewer"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignReviewerDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleAssignReviewer}
            variant="contained"
            disabled={!reviewerUsername.trim() || assignReviewerMutation.isPending}
          >
            {assignReviewerMutation.isPending ? 'Assigning...' : 'Assign'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Status Update Dialog */}
      <Dialog 
        open={statusUpdateDialog} 
        onClose={() => setStatusUpdateDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update Status</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Manuscript: {selectedManuscript?.title}
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>New Status</InputLabel>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              label="New Status"
            >
              {manuscriptStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status.replace('_', ' ')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusUpdateDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleStatusUpdate}
            variant="contained"
            disabled={!newStatus || updateStatusMutation.isPending}
          >
            {updateStatusMutation.isPending ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditorDashboard;