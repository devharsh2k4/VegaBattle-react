// src/components/UserPage.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Needed for Chart.js
import NavBar from '../navbar'; // Import NavBar component

const UserPage = () => {
  // Static data for demonstration
  const questionsAttempted = 120;
  const battlesWon = 35;
  const languagesData = {
    labels: ['JavaScript', 'Python', 'Java', 'C++', 'Ruby'],
    datasets: [
      {
        data: [40, 30, 15, 10, 5],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  // Static data for user activity
  const daysInMonth = 30;
  const activeDays = [1, 5, 9, 12, 15, 19, 22, 25, 28]; // Days when the user was active

  return (
    <div style={styles.page}>
      <NavBar /> {/* Include NavBar component */}
      <div style={styles.container}>
        <div style={styles.statsContainer}>
          <div style={styles.statBox}>
            <h3>Questions Attempted</h3>
            <p>{questionsAttempted}</p>
          </div>
          <div style={styles.statBox}>
            <h3>Battles Won</h3>
            <p>{battlesWon}</p>
          </div>
        </div>
        <div style={styles.chartContainer}>
          <h3>Programming Languages Used</h3>
          <Pie data={languagesData} />
        </div>
        <div style={styles.activityContainer}>
          <h3>Activity Overview</h3>
          <div style={styles.calendar}>
            {[...Array(daysInMonth)].map((_, index) => {
              const day = index + 1;
              const isActive = activeDays.includes(day);
              return (
                <div
                  key={day}
                  style={{
                    ...styles.day,
                    backgroundColor: isActive ? '#4CAF50' : '#E0E0E0',
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    height: '100vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    width: '80%',
    maxWidth: '800px',
    marginTop: '20px',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '30px',
    gap: '20px',
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '200px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '30px',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  activityContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  calendar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '10px',
    marginTop: '10px',
  },
  day: {
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    color: 'white',
    fontSize: '14px',
  },
};

export default UserPage;
