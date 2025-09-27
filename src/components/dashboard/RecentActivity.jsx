import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Chip,
  Avatar
} from '@mui/material';
import {
  Assignment as SubmissionIcon,
  RateReview as ReviewIcon,
  CheckCircle as ApprovedIcon,
  Warning as CorrectionIcon,
  Schedule as PendingIcon
} from '@mui/icons-material';

const RecentActivity = () => {
  const activities = [
    {
      type: 'submission',
      title: 'New manuscript submitted',
      description: 'AI in Healthcare Research',
      time: '2 hours ago',
      icon: <SubmissionIcon sx={{ color: '#1C2833' }} />,
      status: 'pending'
    },
    {
      type: 'review',
      title: 'Review completed',
      description: 'Blockchain Security Paper',
      time: '1 day ago',
      icon: <ReviewIcon sx={{ color: '#27AE60' }} />,
      status: 'completed'
    },
    {
      type: 'correction',
      title: 'Correction requested',
      description: 'Climate Change Analysis',
      time: '2 days ago',
      icon: <CorrectionIcon sx={{ color: '#D68910' }} />,
      status: 'action-required'
    },
    {
      type: 'approval',
      title: 'Paper approved for publication',
      description: 'Machine Learning Algorithms',
      time: '3 days ago',
      icon: <ApprovedIcon sx={{ color: '#27AE60' }} />,
      status: 'completed'
    },
    {
      type: 'submission',
      title: 'Draft manuscript uploaded',
      description: 'Quantum Computing Research',
      time: '5 days ago',
      icon: <SubmissionIcon sx={{ color: '#566573' }} />,
      status: 'draft'
    }
  ];

  const getStatusChip = (status) => {
    const statusConfig = {
      pending: { label: 'Pending', color: '#D68910', bgColor: '#FEF9E7' },
      completed: { label: 'Completed', color: '#27AE60', bgColor: '#EAFAF1' },
      'action-required': { label: 'Action Required', color: '#A93226', bgColor: '#FADBD8' },
      draft: { label: 'Draft', color: '#566573', bgColor: '#F8F9F9' }
    };

    const config = statusConfig[status];
    return (
      <Chip 
        label={config.label} 
        size="small" 
        sx={{
          bgcolor: config.bgColor,
          color: config.color,
          border: `1px solid ${config.color}`,
          fontWeight: 500
        }}
      />
    );
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ color: '#1C2833', fontWeight: 600 }}>
        Recent Activity
      </Typography>
      <List>
        {activities.map((activity, index) => (
          <ListItem key={index} divider={index < activities.length - 1}>
            <ListItemIcon>
              <Avatar sx={{ bgcolor: 'transparent' }}>
                {activity.icon}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle2">{activity.title}</Typography>
                  {getStatusChip(activity.status)}
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="body2" color="text.primary">
                    {activity.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {activity.time}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RecentActivity;