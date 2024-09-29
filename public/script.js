document.getElementById('send-button').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<p><strong>User:</strong> ${userInput}</p>`;

    // Send the query to the server
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: userInput }),
        });

        const data = await response.json();

        // Display the response with "Linus" as the character's name
        chatBox.innerHTML += `<p><strong>Linus:</strong> ${data.reply}</p>`;
    } catch (error) {
        console.error('Error:', error);
        chatBox.innerHTML += '<p><strong>Linus:</strong> An error occurred while fetching the response.</p>';
    }

    document.getElementById('user-input').value = '';
});