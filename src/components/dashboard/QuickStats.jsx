import React from 'react';
import { Grid, Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { 
  Assignment, 
  RateReview, 
  PublishedWithChanges, 
  People,
  Schedule,
  CheckCircle
} from '@mui/icons-material';

const StatCard = ({ title, value, subtitle, icon, color, progress }) => (
  <Card sx={{ 
    height: '100%', 
    position: 'relative', 
    overflow: 'visible',
    bgcolor: '#FFFFFF',
    borderRadius: 2,
    boxShadow: '0 2px 12px rgba(28, 40, 51, 0.08)',
    border: '1px solid #E5E8E8',
    '&:hover': {
      boxShadow: '0 4px 20px rgba(28, 40, 51, 0.15)',
      transform: 'translateY(-4px)',
      transition: 'all 0.3s ease-in-out'
    },
    transition: 'all 0.3s ease-in-out'
  }}>
    <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography 
            color="#566573" 
            gutterBottom 
            variant="overline"
            sx={{ fontWeight: 600 }}
          >
            {title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: '#1C2833' }}>
            {value}
          </Typography>
          <Typography variant="body2" sx={{ color: '#566573' }}>
            {subtitle}
          </Typography>
        </Box>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: color === 'primary' ? '#1C2833' : 
                    color === 'secondary' ? '#A93226' :
                    color === 'success' ? '#27AE60' :
                    color === 'warning' ? '#D68910' :
                    color === 'info' ? '#566573' : '#85929E',
            color: '#F4F6F6',
          }}
        >
          {icon}
        </Box>
      </Box>
      {progress !== undefined && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 6, 
              borderRadius: 3,
              bgcolor: '#E5E8E8',
              '& .MuiLinearProgress-bar': {
                bgcolor: color === 'primary' ? '#1C2833' : 
                        color === 'secondary' ? '#A93226' :
                        color === 'success' ? '#27AE60' :
                        color === 'warning' ? '#D68910' :
                        color === 'info' ? '#566573' : '#85929E'
              }
            }}
          />
        </Box>
      )}
    </CardContent>
  </Card>
);

const QuickStats = ({ stats, role }) => {
  const getRoleSpecificStats = () => {
    const baseStats = [
      {
        title: 'Total Manuscripts',
        value: stats.totalManuscripts || 0,
        subtitle: 'Your submissions',
        icon: <Assignment />,
        color: 'primary'
      },
      {
        title: 'Pending Reviews',
        value: stats.pendingReviews || 0,
        subtitle: 'Awaiting your action',
        icon: <RateReview />,
        color: 'warning'
      }
    ];

    const roleStats = {
      AUTHOR: [
        ...baseStats,
        {
          title: 'Published Papers',
          value: stats.publishedPapers || 0,
          subtitle: 'Successfully published',
          icon: <PublishedWithChanges />,
          color: 'success'
        },
        {
          title: 'Acceptance Rate',
          value: `${stats.acceptanceRate || 0}%`,
          subtitle: 'Publication success',
          icon: <CheckCircle />,
          color: 'info',
          progress: stats.acceptanceRate || 0
        }
      ],
      EDITOR: [
        ...baseStats,
        {
          title: 'Assigned Papers',
          value: stats.assignedPapers || 0,
          subtitle: 'Under your supervision',
          icon: <Assignment />,
          color: 'info'
        },
        {
          title: 'Decision Pending',
          value: stats.pendingDecisions || 0,
          subtitle: 'Awaiting final decision',
          icon: <Schedule />,
          color: 'warning'
        }
      ],
      REVIEWER: [
        ...baseStats,
        {
          title: 'Completed Reviews',
          value: stats.completedReviews || 0,
          subtitle: 'Reviews submitted',
          icon: <CheckCircle />,
          color: 'success'
        },
        {
          title: 'Average Rating',
          value: stats.averageRating || '4.2',
          subtitle: 'Review quality score',
          icon: <RateReview />,
          color: 'info'
        }
      ],
      ADMIN: [
        {
          title: 'Active Users',
          value: stats.activeUsers || 0,
          subtitle: 'Platform engagement',
          icon: <People />,
          color: 'primary'
        },
        {
          title: 'Total Submissions',
          value: stats.totalSubmissions || 0,
          subtitle: 'All-time submissions',
          icon: <Assignment />,
          color: 'info'
        },
        {
          title: 'System Health',
          value: '100%',
          subtitle: 'All services operational',
          icon: <CheckCircle />,
          color: 'success'
        },
        {
          title: 'Pending Actions',
          value: stats.pendingActions || 0,
          subtitle: 'Require attention',
          icon: <Schedule />,
          color: 'warning'
        }
      ]
    };

    return roleStats[role] || baseStats;
  };

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {getRoleSpecificStats().map((stat, index) => (
        <Grid item xs={6} sm={6} md={3} key={index}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default QuickStats;