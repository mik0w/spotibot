const axios = require('axios');

async function resolveShortLink(url) {
    const res = await axios.get(url);
    const redirectedUrl = res.request.res.responseUrl;
    const appSpotifyUrl = await axios.get(redirectedUrl);
    const pattern = /(https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+)/;
    const matches = (appSpotifyUrl.data).match(pattern);

    if (matches && matches.length >= 2) {
        return matches[1];
    } else {
        return null;
    }
}

module.exports = resolveShortLink;