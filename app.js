const express = require('express');
const axios = require('axios');
const app = express();

// Parse JSON Bodies (to read the request body)
app.use(express.json())

// n8n instance URL
const N8N_BASE_URL = 'http://localhost:5678'; //Local n8n instance

// POST route to trigger n8n workflow
app.post('/trigger-workflow', async (req, res) => {
    try {
        const { workflowId, data } = req.body; // Expect workflowId and custom data

        // Trigger the n8n workflow
        const response = await axios.post(
            `${N8N_BASE_URL}/webhook/${workflowId}`,
            data
        )

        // Respond with Sucesss
        res.status(200).json({
            message: 'Workflow triggered successfully',
            n8nResponse: response.data
        })
    } catch (error) {
        console.error('Error triggering n8n workflow:', error)
        res.status(500).json({
            message: 'Error triggering workflow',
            error: error.message
        })        
    }
})

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server is running...')
})