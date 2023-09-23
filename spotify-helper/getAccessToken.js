const axios = require('axios');
const qs = require('qs');

async function getAccessToken(clientId, clientSecret) {
    const options = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
            grant_type: 'client_credentials'
        }),
    };

    try {
        const response = await axios(options);
        const accessToken = response.data.access_token;
        return accessToken;
    } catch (error) {
        throw error;
    }
}

module.exports = getAccessToken;