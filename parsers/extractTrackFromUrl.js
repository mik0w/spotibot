const resolveShortLink = require('./resolveShortLink');

async function extractTrackIdFromUrl(url) {
    const pattern = /.+\/([A-Za-z0-9]+)/;
    const shortLinkPattern = /spotify.link/;

    const shortLinkMatch = url.match(shortLinkPattern);

    if (shortLinkMatch) {
        url = await resolveShortLink(url);
    }

    const matches = url.match(pattern);
    if (matches && matches.length >= 2) {
        return matches[1];
    } else {
        return null;
    }

}

module.exports = extractTrackIdFromUrl;