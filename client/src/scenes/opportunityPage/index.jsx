// src/components/OpportunitiesPage.jsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Button, CircularProgress, styled } from '@mui/material';
import NavBar from '../navbar'; // Import NavBar component

// Styled component for animated loader
const AnimatedLoader = styled(CircularProgress)({
  animation: 'spin 1.5s linear infinite',
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
});

const OpportunitiesPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch job opportunities from an external API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://remoteok.com/api'); // Replace with a valid API endpoint
        const data = await response.json();
        setJobs(data.slice(1)); // Remove the first entry if using Remote OK API, which contains metadata
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job data:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#f4f4f4', minHeight: '100vh' }}> {/* Directly applying styles */}
      <NavBar /> {/* Include NavBar component */}
      <Grid container justifyContent="center" sx={{ padding: '20px' }}>
        <Grid item xs={12} md={8}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
              <AnimatedLoader />
            </Box>
          ) : (
            jobs.map((job, index) => (
              <Card key={index} sx={{ marginBottom: '20px', backgroundColor: 'white' }}>
                <CardContent>
                  <Typography variant="h5" sx={{ color: '#90caf9' }}> {/* Direct color styling */}
                    {job.position || job.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {job.company} - {job.location}
                  </Typography>
                    
                  <Button
                    href={job.url || job.apply_url}
                    target="_blank"
                    variant="contained"
                    sx={{ marginTop: '10px', backgroundColor: '#90caf9', '&:hover': { backgroundColor: '#64b5f6' } }} // Custom hover effect
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default OpportunitiesPage;
