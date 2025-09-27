import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  LinearProgress,
  Card,
  CardContent
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';

const ManuscriptStatusChart = () => {
  const statusData = [
    { status: 'Under Review', count: 15, percentage: 35, color: '#D68910' },
    { status: 'Published', count: 12, percentage: 28, color: '#27AE60' },
    { status: 'Revision Required', count: 8, percentage: 19, color: '#566573' },
    { status: 'Rejected', count: 5, percentage: 12, color: '#A93226' },
    { status: 'Draft', count: 3, percentage: 6, color: '#85929E' }
  ];

  const metrics = [
    { label: 'Total Submissions', value: '43', trend: '+12%' },
    { label: 'Acceptance Rate', value: '65%', trend: '+5%' },
    { label: 'Avg Review Time', value: '14 days', trend: '-2 days' },
    { label: 'Active Reviews', value: '23', trend: '+3' }
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: '#1C2833', fontWeight: 600 }}>
        <AssessmentIcon sx={{ mr: 1, color: '#A93226' }} />
        Manuscript Analytics
      </Typography>
      
      {/* Status Distribution */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: '#FFFFFF', boxShadow: '0 2px 8px rgba(28, 40, 51, 0.1)' }}>
        <Typography variant="subtitle1" gutterBottom sx={{ color: '#1C2833', fontWeight: 600 }}>
          Status Distribution
        </Typography>
        {statusData.map((item, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">
                {item.status}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.count} ({item.percentage}%)
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={item.percentage}
              sx={{ 
                height: 8, 
                borderRadius: 4,
                bgcolor: '#E5E8E8',
                '& .MuiLinearProgress-bar': {
                  bgcolor: item.color
                }
              }}
            />
          </Box>
        ))}
      </Paper>

      {/* Key Metrics */}
      <Grid container spacing={2}>
        {metrics.map((metric, index) => (
          <Grid item xs={6} key={index}>
            <Card sx={{ textAlign: 'center', bgcolor: '#F8F9F9', border: '1px solid #E5E8E8' }}>
              <CardContent sx={{ py: 2 }}>
                <Typography variant="h6" sx={{ color: '#1C2833', fontWeight: 600 }}>
                  {metric.value}
                </Typography>
                <Typography variant="caption" sx={{ color: '#566573' }}>
                  {metric.label}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 0.5 }}>
                  <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5, color: '#27AE60' }} />
                  <Typography variant="caption" sx={{ color: '#27AE60', fontWeight: 500 }}>
                    {metric.trend}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ManuscriptStatusChart;