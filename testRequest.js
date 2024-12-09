const axios = require('axios');

async function testPostRequest() {
    try {
        const response = await axios.post('http://localhost:5000/generate_content', {
            description: 'A sunny day',
            keywords: 'sun, day, happiness',
            tone: 'descriptive',
            length: 150,
        });
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error making POST request:', error);
    }
}

testPostRequest();
