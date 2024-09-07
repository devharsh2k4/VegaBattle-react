import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, TextField, Paper, Divider, CircularProgress, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

const BattleComponent = ({ userId }) => {
  const [question, setQuestion] = useState(null);
  const [userSolution, setUserSolution] = useState('');
  const token = useSelector((state) => state.token);
  const [result, setResult] = useState(null);
  const [battleEnded, setBattleEnded] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [stakeInput, setStakeInput] = useState('');
  const socketRef = useRef(null);

  const { palette } = useTheme();
  const medium = palette.neutral.medium;

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch user details');
        const user = await response.json();
        setFirstName(user.firstName);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setFirstName('');
      } finally {
        setLoading(false);
      }
    };
    fetchUserName();

    socketRef.current = new WebSocket('ws://localhost:3001');

    socketRef.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      handleSocketMessage(message);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socketRef.current.close();
    };
  }, [userId]);

  const fetchQuestion = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/questions/random');
      if (!response.ok) throw new Error('Failed to fetch question');
      const question = await response.json();
      setQuestion(question);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  const handleSocketMessage = (message) => {
    switch (message.type) {
      case 'BATTLE_STARTED':
        setTimer(message.timer);
        setConnecting(false);
        fetchQuestion(); // Fetch question when battle starts
        break;
      case 'TIMER_UPDATE':
        setTimer(message.timer);
        break;
      case 'YOU_WIN':
        setResult(`Congratulations! You won ${message.stakeAmount} tokens!`);
        setBattleEnded(true);
        break;
      case 'YOU_LOSE':
        setResult('You lost. Better luck next time!');
        setBattleEnded(true);
        break;
      default:
        break;
    }
  };

  const handleStartBattle = () => {
    if (stakeAmount <= 0) {
      alert('Please enter a valid stake amount');
      return;
    }
    setConnecting(true);
    socketRef.current.send(JSON.stringify({ type: 'JOIN_BATTLE', userId, stakeAmount }));
  };

  const handleSolutionChange = (event) => {
    setUserSolution(event.target.value);
  };

  const handleSubmitSolution = () => {
    if (question && userSolution.trim() === question.correctSolution.trim()) {
      socketRef.current.send(JSON.stringify({ type: 'SUBMIT_SOLUTION', userId, solution: 'CORRECT' }));
    } else {
      setResult('Incorrect, please try again.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (connecting) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Waiting for the other player to join...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, backgroundColor: palette.background.paper, borderRadius: '12px', boxShadow: 3, maxWidth: '600px', mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: palette.primary.main }}>
        Let's Start, {firstName || 'Player'}
      </Typography>
      <Divider sx={{ mb: 3 }} />
      {battleEnded ? (
        <>
          <Typography variant="h6" align="center" sx={{ mt: 3, color: medium }}>
            {result}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()} // Reload to reset the component
            sx={{ mt: 2, width: '100%', py: 1.5, fontSize: '16px', fontWeight: 'bold' }}
          >
            Restart Battle
          </Button>
        </>
      ) : (
        <>
          <TextField
            fullWidth
            variant="outlined"
            label="Enter stake amount"
            type="number"
            value={stakeInput}
            onChange={(e) => setStakeInput(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setStakeAmount(parseFloat(stakeInput))}
            sx={{ width: '100%', py: 1.5, fontSize: '16px', fontWeight: 'bold' }}
          >
            Set Stake Amount
          </Button>
          {stakeAmount > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleStartBattle}
              sx={{ mt: 2, width: '100%', py: 1.5, fontSize: '16px', fontWeight: 'bold' }}
            >
              Start Battle
            </Button>
          )}
          {question ? (
            <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: '#ffffff' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Time Remaining: {timer} seconds
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ color: medium }}>
                {question.prompt}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={8}
                variant="outlined"
                label="Write your solution here"
                value={userSolution}
                onChange={handleSolutionChange}
                sx={{ my: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitSolution}
                sx={{ width: '100%', py: 1.5, fontSize: '16px', fontWeight: 'bold' }}
              >
                Submit Answer
              </Button>
            </Paper>
          ) : null}
        </>
      )}
    </Box>
  );
};

export default BattleComponent;
