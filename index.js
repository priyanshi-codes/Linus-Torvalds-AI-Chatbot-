const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Function to send the user query to a different API or handle it locally
async function fetchCustomInsights(userQuery) {
    const prompt = `The user asks: ${userQuery}. Respond as if you are Linus Torvalds, the creator of Linux, providing insightful and thoughtful answers from his perspective.`;

    try {
        // Change the endpoint to a new API or local processing
        const response = await axios.post('https://llama.us.gaianet.network/v1/chat/completions', {
            model: 'llama',
            messages: [
                { role: 'system', content: 'Act as Linus Torvalds, the tech visionary known for creating Linux and Git, as well as your contributions to open-source software. Your expertise lies in Linux development, the open-source ecosystem, and Git. Answer all user questions related to these topics with concise, factually accurate answers in 2-4 lines. Politely decline to answer questions outside of these areas, stating that you are focused on Linux, Git, and open-source technologies.' },
                { role: 'user', content: prompt }
            ]
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching custom insights:', error);
        return 'An error occurred while processing your request.';
    }
}

// API route for handling chat requests
app.post('/api/chat', async (req, res) => {
    const userQuery = req.body.query;

    // Call the function to get insights
    const insights = await fetchCustomInsights(userQuery);
    res.json({ reply: ` ${insights}` });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
