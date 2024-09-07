// src/components/ContestPage.jsx
import React, { useState } from 'react';
import ContestRoom from '../../components/ContestRoom';
import NavBar from '../navbar';

const ContestPage = () => {
  const [isRoomSelected, setIsRoomSelected] = useState(false);
  const [roomAction, setRoomAction] = useState('');

  const handleCreateRoom = () => {
    setRoomAction('create');
    setIsRoomSelected(true);
  };

  const handleJoinRoom = () => {
    setRoomAction('join');
    setIsRoomSelected(true);
  };

  return (
    <div style={styles.page}>
      <NavBar /> {/* Include the NavBar component here */}
      <div style={styles.container}>
        {!isRoomSelected ? (
          <div style={styles.actions}>
            <button onClick={handleCreateRoom} style={styles.button}>
              Create Room
            </button>
            <button onClick={handleJoinRoom} style={styles.button}>
              Join Room
            </button>
          </div>
        ) : (
          <ContestRoom action={roomAction} />
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    gap: '20px',
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

export default ContestPage;
