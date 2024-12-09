const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const pp = express();
const PORT = 5000;
pp.use(cors()); 
// Middleware
pp.use(bodyParser.json()); // Parse JSON request bodies

// Endpoint to generate content
pp.post('/generate_content', async (req, res) => {
    console.log("Received request body:", req.body);
    
    // Destructure the necessary fields from the request body
    const { description, keywords, tone, length } = req.body;

    try {
        // Make sure the variables are being sent correctly
        const response = await axios.post("http://127.0.0.1:5001/generate-content", {  // Adjust URL for Gradio
            description,
            keywords,
            tone,
            length,
        });

        console.log("Generated content:", response.data);
        
        // Send the generated content back to the client
        res.status(200).json({
            content: response.data.content // Adjust according to the structure of the response from your Python service
        });
    } catch (error) {
        console.error("Error generating content:", error);
    
        // Send a user-friendly error message back to the client
        if (error.response) {
            // Received a response from the Python server with an error
            res.status(error.response.status).json({
                error: `Backend error: ${error.response.statusText}`
            });
        } else if (error.request) {
            // The request was made, but no response was received
            res.status(500).json({
                error: "No response from the content generator. Ensure it is running on the specified port."
            });
        } else {
            // Something happened while setting up the request
            res.status(500).json({
                error: "An error occurred while processing the request."
            });
        }
    }
});

// Start the server
pp.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
