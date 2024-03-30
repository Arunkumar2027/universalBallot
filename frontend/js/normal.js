// Define global variables
let videoStream;
const video = document.getElementById('video');

// Function to start webcam and stream video
async function startWebcam() {
  try {
    // Get user media (webcam)
    videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = videoStream;
  } catch (error) {
    console.error('Error accessing webcam:', error);
  }
}

// Function to stop webcam
function stopWebcam() {
  if (videoStream) {
    const tracks = videoStream.getTracks();
    tracks.forEach(track => track.stop());
  }
}

// Function to take picture and send to server for authentication
async function takePicture() {
  if (!videoStream) {
    console.error('Webcam not started');
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

  // Get image data from canvas as binary
  const imageData = canvas.toDataURL('image/jpeg');

  // Send image data to the server for comparison
  try {
    const response = await fetch('/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image: imageData }) // Sending image data in JSON format
    });
    const data = await response.json();
    console.log(data); // Logging the response from the server
    // Handle the response from the server
    if (data.success) {
      // Authentication successful, navigate to the next page
      window.location.href = '../html/castvote'; // Replace '/nextpage' with the actual URL of the next page
    } else {
      // Authentication failed, display an error message to the user
      alert('Authentication failed. Please try again.');
      Window.location.href='../html/castvote';
    }
  } catch (error) {
    console.error('Error sending image data:', error);
    // Handle error, display an error message to the user
    alert('Error sending image data. Please try again later.');
  }
}

// Start the webcam when the page loads
window.onload = startWebcam;
