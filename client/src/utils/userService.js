const API_URL = 'ws://localhost:3001'; // Replace with your API base URL

/**
 * Fetch user details by user ID.
 * @param {string} userId - The ID of the user to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the user details.
 */
export const fetchUserDetailsById = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, { // Corrected with backticks
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};
