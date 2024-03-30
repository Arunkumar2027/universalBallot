// Define the route handler as a function
const blindAuthenticationHandler = async (req, res) => {
  try {
    const { voterId, thumb } = req.body;

    // Retrieve voice data from the request body (assuming it's a base64 encoded string)
    const voice = req.body.voice;

    // Fetch voice data associated with the voterId from the database
    const result = await pool.query('SELECT voice FROM voters WHERE voter_id = $1', [voterId]);

    if (result.rows.length > 0) {
      const dbVoice = result.rows[0].voice;

      // Compare the fetched voice data with the provided voice data
      if (voice === dbVoice) {
        // Authentication successful
        res.status(200).json({ success: true, message: 'Authentication successful' });
      } else {
        // Authentication failed
        res.status(401).json({ success: false, message: 'Authentication failed' });
      }
    } else {
      // Voter ID not found in the database
      res.status(404).json({ success: false, message: 'Voter ID not found' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Export the route handler function
module.exports = {
  blindAuthenticationHandler
};
