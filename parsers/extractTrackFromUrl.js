const resolveShortLink = require('./resolveShortLink');

async function extractTrackIdFromUrl(url) {
    const pattern = /.+\/([A-Za-z0-9]+)/;
    const shortLinkPattern = /https:\/\/spotify.link\/([A-Za-z0-9]+)/;

    const shortLinkMatch = url.match(shortLinkPattern);

    if (shortLinkMatch) {
        url = await resolveShortLink(shortLinkMatch[0]);
    }

    const matches = url.match(pattern);
    if (matches && matches.length >= 2) {
        return matches[1];
    } else {
        return null;
    }

}

module.exports = extractTrackIdFromUrl;