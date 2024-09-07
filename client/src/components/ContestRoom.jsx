// src/components/ContestRoom.jsx
import React, { useState } from 'react';

const ContestRoom = ({ action }) => {
  const [selectedContestType, setSelectedContestType] = useState('');
  const [roomCode, setRoomCode] = useState('');

  const handleContestTypeChange = (event) => {
    setSelectedContestType(event.target.value);
  };

  const handleJoinRoom = () => {
    console.log('Joining room with code:', roomCode, 'Contest Type:', selectedContestType);
  };

  const handleCreateRoom = () => {
    console.log('Creating room with Contest Type:', selectedContestType);
  };

  return (
    <div style={styles.room}>
      <h2>{action === 'create' ? 'Create a Room' : 'Join a Room'}</h2>
      <div style={styles.type}>
        <label>Select Contest Type:</label>
        <select value={selectedContestType} onChange={handleContestTypeChange}>
          <option value="">Select...</option>
          <option value="quiz">Quiz</option>
          <option value="problem-solving">Problem Solving</option>
          <option value="bug-finding">Bug Finding</option>
        </select>
      </div>
      {action === 'join' && (
        <div style={styles.code}>
          <label>Enter Room Code:</label>
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
        </div>
      )}
      <button onClick={action === 'create' ? handleCreateRoom : handleJoinRoom} style={styles.button}>
        {action === 'create' ? 'Create Room' : 'Join Room'}
      </button>
    </div>
  );
};

const styles = {
  room: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
  },
  type: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  code: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
};

export default ContestRoom;
