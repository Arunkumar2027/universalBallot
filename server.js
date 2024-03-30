const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path'); // Import the path module

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'voter',
  password: '1234',
  port: 5432 // Default PostgreSQL port
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.post('/authenticate', async (req, res) => {
  try {
    const { image } = req.body;

    // Fetch image data associated with the voterId from the database
    const queryResult = await pool.query('SELECT image FROM vote WHERE image = $1', [image]);

    if (queryResult.rows.length > 0) {
      // Authentication successful
      res.status(200).json({ success: true, message: 'Authentication successful' });
    } else {
      // Authentication failed
      res.status(401).json({ success: false, message: 'Authentication failed' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
app.post('/login', async (req, res) => {
  try {
    const voterID = req.body.voter-id; // Assuming the voter ID is submitted via a form field named 'voterID'

    // Query the database to verify the voter ID
    const { rows } = await pool.query('SELECT * FROM vote WHERE ID = $1', [voter-id]);

    if (rows.length === 1) {
      // Voter ID exists in the database, login successful
      res.send('Login successful');
    } else {
      // Voter ID does not exist in the database, login failed
      res.send('Invalid voter ID');
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});
// Serve static files from the 'public' directory
app.use(express.static('public'));


// Route for serving the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'frontend', 'html', 'login.html'));
});

app.get('/ec', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'frontend', 'html', 'ec.html'));
});

app.get('/addcandidate', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'frontend', 'html', 'addcandidate.html'));
});

app.get('/ec2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'frontend', 'html', 'ec2.html'));
});


app.get('/castvote', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'frontend', 'html', 'castvote.html'));
});

app.get('/hand', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'frontend', 'html', 'hand.html'));
});

app.get('/normal', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'frontend', 'html', 'normal.html'));
});

app.get('/results.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'frontend', 'html', 'results.html'));
});
app.get('/auth', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'frontend', 'html', 'auth.html'));
});

// Route for serving the normal authentication JavaScript file
app.get('/js/normal.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'frontend', 'js', 'normal.js'));
});

// Route for serving the blind authentication JavaScript file
app.get('/js/blind.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'frontend', 'js', 'blind.js'));
});

// Route for serving the hand disable authentication JavaScript file
app.get('/js/hand.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'frontend', 'js', 'hand.js'));
});

// Route for serving the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the voting application!'); // Or serve an HTML file or redirect to another route
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
