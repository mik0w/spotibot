const fetchWebApi = require('./fetchWebApi');

async function getRecommendations(trackId, accessToken) {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
    return (await fetchWebApi(
        `v1/recommendations?limit=5&seed_tracks=${trackId}`, 'GET', null, accessToken
    )).tracks;
}

module.exports = getRecommendations;