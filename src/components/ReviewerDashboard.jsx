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
  Rating,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { 
  RateReview as ReviewIcon,
  CheckCircle as AcceptIcon,
  Cancel as DeclineIcon 
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewService } from '../services/apiService';

const ReviewerDashboard = ({ stats, onRefresh }) => {
  const queryClient = useQueryClient();
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [declineDialog, setDeclineDialog] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [reviewData, setReviewData] = useState({
    comments: '',
    confidentialComments: '',
    recommendation: '',
    overallRating: 0,
    originalityRating: 0,
    clarityRating: 0,
    significanceRating: 0,
  });

  // Fetch pending reviews
  const {
    data: pendingReviews,
    isLoading: pendingLoading,
    error: pendingError,
  } = useQuery({
    queryKey: ['my-pending-reviews'],
    queryFn: async () => {
      const response = await reviewService.getMyPendingReviews();
      return response.data;
    },
  });

  // Fetch all assignments
  const {
    data: allAssignments,
    isLoading: assignmentsLoading,
  } = useQuery({
    queryKey: ['my-assignments'],
    queryFn: async () => {
      const response = await reviewService.getMyAssignments();
      return response.data;
    },
  });

  // Accept assignment mutation
  const acceptMutation = useMutation({
    mutationFn: (assignmentId) => reviewService.acceptAssignment(assignmentId),
    onSuccess: () => {
      queryClient.invalidateQueries(['my-pending-reviews']);
      queryClient.invalidateQueries(['my-assignments']);
    },
  });

  // Decline assignment mutation
  const declineMutation = useMutation({
    mutationFn: ({ assignmentId, reason }) => reviewService.declineAssignment(assignmentId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries(['my-pending-reviews']);
      queryClient.invalidateQueries(['my-assignments']);
      setDeclineDialog(false);
      setDeclineReason('');
      setSelectedAssignment(null);
    },
  });

  // Submit review mutation
  const submitReviewMutation = useMutation({
    mutationFn: ({ assignmentId, reviewData }) => reviewService.submitReview(assignmentId, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries(['my-pending-reviews']);
      queryClient.invalidateQueries(['my-assignments']);
      setReviewDialog(false);
      setReviewData({
        comments: '',
        confidentialComments: '',
        recommendation: '',
        overallRating: 0,
        originalityRating: 0,
        clarityRating: 0,
        significanceRating: 0,
      });
      setSelectedAssignment(null);
    },
  });

  const handleAccept = (assignment) => {
    acceptMutation.mutate(assignment.id);
  };

  const handleDecline = () => {
    if (selectedAssignment && declineReason.trim()) {
      declineMutation.mutate({
        assignmentId: selectedAssignment.id,
        reason: declineReason.trim(),
      });
    }
  };

  const handleSubmitReview = () => {
    if (selectedAssignment && reviewData.recommendation && reviewData.comments.trim()) {
      submitReviewMutation.mutate({
        assignmentId: selectedAssignment.id,
        reviewData: reviewData,
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ASSIGNED':
        return 'warning';
      case 'IN_PROGRESS':
        return 'info';
      case 'COMPLETED':
        return 'success';
      case 'DECLINED':
        return 'error';
      default:
        return 'default';
    }
  };

  const pendingColumns = [
    {
      field: 'manuscript',
      headerName: 'Manuscript Title',
      width: 300,
      renderCell: (params) => (
        <Typography variant="body2" noWrap>
          {params.value?.title || 'No title'}
        </Typography>
      ),
    },
    {
      field: 'assignedAt',
      headerName: 'Assigned Date',
      width: 150,
      renderCell: (params) => (
        params.value ? new Date(params.value).toLocaleDateString() : 'N/A'
      ),
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      width: 150,
      renderCell: (params) => {
        const dueDate = new Date(params.value);
        const now = new Date();
        const isOverdue = dueDate < now;
        
        return (
          <Typography 
            variant="body2" 
            color={isOverdue ? 'error.main' : 'text.primary'}
            fontWeight={isOverdue ? 'bold' : 'normal'}
          >
            {params.value ? dueDate.toLocaleDateString() : 'No due date'}
          </Typography>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value?.replace('_', ' ') || 'Unknown'}
          size="small"
          color={getStatusColor(params.value)}
          variant="outlined"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          {params.row.status === 'ASSIGNED' && (
            <>
              <Button
                size="small"
                startIcon={<AcceptIcon />}
                onClick={() => handleAccept(params.row)}
                color="success"
              >
                Accept
              </Button>
              <Button
                size="small"
                startIcon={<DeclineIcon />}
                onClick={() => {
                  setSelectedAssignment(params.row);
                  setDeclineDialog(true);
                }}
                color="error"
              >
                Decline
              </Button>
            </>
          )}
          {(params.row.status === 'IN_PROGRESS' || params.row.status === 'ACCEPTED') && (
            <Button
              size="small"
              startIcon={<ReviewIcon />}
              onClick={() => {
                setSelectedAssignment(params.row);
                setReviewDialog(true);
              }}
              color="primary"
            >
              Submit Review
            </Button>
          )}
        </Box>
      ),
    },
  ];

  const recommendations = [
    { value: 'ACCEPT', label: 'Accept' },
    { value: 'MINOR_REVISIONS', label: 'Minor Revisions' },
    { value: 'MAJOR_REVISIONS', label: 'Major Revisions' },
    { value: 'REJECT', label: 'Reject' },
  ];

  if (pendingLoading || assignmentsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (pendingError) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading reviews: {pendingError.message}
      </Alert>
    );
  }

  const completedReviews = allAssignments?.filter(a => a.status === 'COMPLETED') || [];

  return (
    <Box>
      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="primary">
              {allAssignments?.length || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Assignments
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main">
              {pendingReviews?.length || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pending Reviews
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main">
              {completedReviews.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Completed Reviews
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="info.main">
              {allAssignments?.filter(a => a.status === 'IN_PROGRESS').length || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              In Progress
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Pending Reviews Table */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Review Assignments
        </Typography>
        
        {pendingReviews && pendingReviews.length > 0 ? (
          <DataGrid
            rows={pendingReviews}
            columns={pendingColumns}
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
              No pending review assignments
            </Typography>
            <Typography variant="body2">
              You have no manuscripts assigned for review at the moment.
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Review Submission Dialog */}
      <Dialog 
        open={reviewDialog} 
        onClose={() => setReviewDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Manuscript: {selectedAssignment?.manuscript?.title}
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Recommendation</InputLabel>
                <Select
                  value={reviewData.recommendation}
                  onChange={(e) => setReviewData(prev => ({ ...prev, recommendation: e.target.value }))}
                  label="Recommendation"
                >
                  {recommendations.map((rec) => (
                    <MenuItem key={rec.value} value={rec.value}>
                      {rec.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <Typography component="legend">Overall Rating</Typography>
              <Rating
                value={reviewData.overallRating}
                onChange={(e, value) => setReviewData(prev => ({ ...prev, overallRating: value }))}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography component="legend">Originality</Typography>
              <Rating
                value={reviewData.originalityRating}
                onChange={(e, value) => setReviewData(prev => ({ ...prev, originalityRating: value }))}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Comments for Authors"
                value={reviewData.comments}
                onChange={(e) => setReviewData(prev => ({ ...prev, comments: e.target.value }))}
                placeholder="Please provide detailed feedback for the authors..."
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Confidential Comments for Editor"
                value={reviewData.confidentialComments}
                onChange={(e) => setReviewData(prev => ({ ...prev, confidentialComments: e.target.value }))}
                placeholder="Comments that only the editor will see..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitReview}
            variant="contained"
            disabled={!reviewData.recommendation || !reviewData.comments.trim() || submitReviewMutation.isPending}
          >
            {submitReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Decline Dialog */}
      <Dialog 
        open={declineDialog} 
        onClose={() => setDeclineDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Decline Review Assignment</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Manuscript: {selectedAssignment?.manuscript?.title}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Reason for Declining"
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            placeholder="Please provide a reason for declining this review assignment..."
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeclineDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleDecline}
            variant="contained"
            color="error"
            disabled={!declineReason.trim() || declineMutation.isPending}
          >
            {declineMutation.isPending ? 'Declining...' : 'Decline'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReviewerDashboard;