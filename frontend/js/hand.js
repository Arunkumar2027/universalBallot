// Define the route handler as a function
const handAuthenticationHandler = async (req, res) => {
  try {
    const { voterId, voice } = req.body;

    // Retrieve image data from the request body (assuming it's a base64 encoded string)
    const image = req.body.image;

    // Fetch image data associated with the voterId from the database
    const result = await pool.query('SELECT image FROM vote WHERE ID = $1', [voterId]);

    if (result.rows.length > 0) {
      const dbImage = result.rows[0].image;

      // Compare the fetched image data with the provided image data
      if (image === dbImage) {
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
  handAuthenticationHandler
};
