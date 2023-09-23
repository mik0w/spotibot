const axios = require('axios');

async function fetchWebApi(endpoint, method, body, accessToken) {
    const res = await axios(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        method,
        body: JSON.stringify(body)
    });


    return await res.data;
}

module.exports = fetchWebApi;

