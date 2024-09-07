import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, LinearProgress } from '@mui/material';
import NavBar from '../navbar'; // Import NavBar component

const UserPathsPage = () => {
  // Static data for demonstration
  const battlesWon = 150; // Replace with dynamic data from your backend
  const [nftStatus, setNftStatus] = useState({
    common: false,
    rare: false,
    legendary: false,
  });

  useEffect(() => {
    // Determine which NFTs have been won based on battles won
    setNftStatus({
      common: battlesWon >= 100,
      rare: battlesWon >= 200,
      legendary: battlesWon >= 500,
    });
  }, [battlesWon]);

  return (
    <Box sx={{ backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <NavBar />
      <Grid container justifyContent="center" sx={{ padding: '20px' }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ marginBottom: '20px', backgroundColor: 'white' }}>
            <CardContent>
              <Typography variant="h5" color="primary">
                Your Battle Progress
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: '10px' }}>
                Battles Won: {battlesWon}
              </Typography>
              <LinearProgress variant="determinate" value={(battlesWon / 500) * 100} />
            </CardContent>
          </Card>
          
          {/* NFT Milestones */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: nftStatus.common ? '#90caf9' : '#e0e0e0' }}>
                <CardContent>
                  <Typography variant="h6">Common NFT</Typography>
                  <Typography variant="body2">Win 100 battles</Typography>
                  {nftStatus.common && <Typography color="green">Achieved!</Typography>}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: nftStatus.rare ? '#f48fb1' : '#e0e0e0' }}>
                <CardContent>
                  <Typography variant="h6">Rare NFT</Typography>
                  <Typography variant="body2">Win 200 battles</Typography>
                  {nftStatus.rare && <Typography color="green">Achieved!</Typography>}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: nftStatus.legendary ? '#ffeb3b' : '#e0e0e0' }}>
                <CardContent>
                  <Typography variant="h6">Legendary NFT</Typography>
                  <Typography variant="body2">Win 500 battles</Typography>
                  {nftStatus.legendary && <Typography color="green">Achieved!</Typography>}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserPathsPage;
