import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Box
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';

const UpcomingDeadlines = () => {
  const deadlines = [
    {
      title: 'Review Due: ML Paper #234',
      date: 'Tomorrow',
      priority: 'high',
      type: 'review'
    },
    {
      title: 'Manuscript Revision',
      date: 'In 3 days',
      priority: 'medium',
      type: 'revision'
    },
    {
      title: 'Conference Submission',
      date: 'In 5 days',
      priority: 'high',
      type: 'submission'
    },
    {
      title: 'Peer Review Feedback',
      date: 'In 1 week',
      priority: 'low',
      type: 'review'
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#A93226',
      medium: '#D68910',
      low: '#566573'
    };
    return colors[priority] || '#566573';
  };

  const getPriorityBgColor = (priority) => {
    const colors = {
      high: '#FADBD8',
      medium: '#FEF9E7',
      low: '#F8F9F9'
    };
    return colors[priority] || '#F8F9F9';
  };

  const getIcon = (type) => {
    const icons = {
      review: <AssignmentIcon />,
      revision: <WarningIcon />,
      submission: <ScheduleIcon />
    };
    return icons[type] || <ScheduleIcon />;
  };

  return (
    <Paper sx={{ p: 2, bgcolor: '#FFFFFF', boxShadow: '0 2px 8px rgba(28, 40, 51, 0.1)' }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: '#1C2833', fontWeight: 600 }}>
        <ScheduleIcon sx={{ mr: 1, color: '#A93226' }} />
        Upcoming Deadlines
      </Typography>
      <List dense>
        {deadlines.map((deadline, index) => (
          <ListItem key={index} divider={index < deadlines.length - 1}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              {getIcon(deadline.type)}
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="body2" noWrap>
                    {deadline.title}
                  </Typography>
                </Box>
              }
              secondary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    {deadline.date}
                  </Typography>
                  <Chip
                    label={deadline.priority}
                    size="small"
                    sx={{
                      bgcolor: getPriorityBgColor(deadline.priority),
                      color: getPriorityColor(deadline.priority),
                      border: `1px solid ${getPriorityColor(deadline.priority)}`,
                      fontWeight: 500
                    }}
                  />
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default UpcomingDeadlines;