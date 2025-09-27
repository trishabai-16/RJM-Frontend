import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Chip,
  Button,
  Badge,
  Avatar
} from '@mui/material';
import {
  Close as CloseIcon,
  Notifications as NotificationsIcon,
  Assignment as AssignmentIcon,
  RateReview as ReviewIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  MarkAsUnread as MarkAsUnreadIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const NotificationPanel = ({ open, onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'review',
      title: 'Review Assignment',
      message: 'You have been assigned to review "AI in Healthcare"',
      time: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'submission',
      title: 'Manuscript Submitted',
      message: 'Your paper "Machine Learning Algorithms" has been submitted',
      time: '1 day ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'approval',
      title: 'Paper Approved',
      message: 'Your manuscript has been approved for publication',
      time: '2 days ago',
      read: true,
      priority: 'high'
    },
    {
      id: 4,
      type: 'info',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on Sunday 2 AM - 4 AM',
      time: '3 days ago',
      read: true,
      priority: 'low'
    }
  ]);

  const getNotificationIcon = (type) => {
    const icons = {
      review: <ReviewIcon color="primary" />,
      submission: <AssignmentIcon color="info" />,
      approval: <CheckCircleIcon color="success" />,
      warning: <WarningIcon color="warning" />,
      info: <InfoIcon color="action" />
    };
    return icons[type] || <InfoIcon />;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'error',
      medium: 'warning',
      low: 'info'
    };
    return colors[priority] || 'default';
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev =>
      prev.filter(notif => notif.id !== notificationId)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 400 }
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
            <Typography variant="h6" sx={{ ml: 1 }}>
              Notifications
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ position: 'absolute', right: 16 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark All Read
          </Button>
        </Box>

        <Divider />

        {/* Notifications List */}
        <List sx={{ p: 0 }}>
          {notifications.length === 0 ? (
            <ListItem sx={{ textAlign: 'center' }}>
              <ListItemText
                primary="No notifications"
                secondary="You're all caught up!"
              />
            </ListItem>
          ) : (
            notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  sx={{
                    bgcolor: notification.read ? 'transparent' : 'action.hover',
                    borderRadius: 1,
                    mb: 1,
                    textAlign: 'center',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <ListItemIcon sx={{ justifyContent: 'center', minWidth: 'auto', mb: 1 }}>
                    <Avatar sx={{ bgcolor: 'transparent', width: 32, height: 32 }}>
                      {getNotificationIcon(notification.type)}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    sx={{ textAlign: 'center' }}
                    primary={
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: notification.read ? 'normal' : 'bold', textAlign: 'center' }}
                        >
                          {notification.title}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                          <Chip
                            label={notification.priority}
                            color={getPriorityColor(notification.priority)}
                            size="small"
                            variant="outlined"
                          />
                          {!notification.read && (
                            <IconButton
                              size="small"
                              onClick={() => markAsRead(notification.id)}
                              title="Mark as read"
                            >
                              <MarkAsUnreadIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                          )}
                          <IconButton
                            size="small"
                            onClick={() => deleteNotification(notification.id)}
                            title="Delete"
                          >
                            <DeleteIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Box>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ textAlign: 'center', mt: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                          {notification.time}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))
          )}
        </List>

        {/* Footer */}
        {notifications.length > 0 && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button variant="text" size="small">
              View All Notifications
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default NotificationPanel;