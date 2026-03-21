const express = require('express');
const path = require('path');
const app = express();

// Use the port Render gives you, or 3000 locally
const PORT = process.env.PORT || 3000;

// Tell Express to serve your "dist" or "build" folder
// Change 'dist' to 'build' if you are using Create React App
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing (prevents 404 on refresh)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});