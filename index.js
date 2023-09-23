require('dotenv').config()
const spotifyHelper = require('./spotify-helper');
const parsers = require('./parsers')

const { Telegraf, Markup } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN);
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

bot.hears("/spotibot help", async ctx => {
    await ctx.reply('This is Spotibot. Once you post a song to this group, Spotibot will recommend another songs that you may like.')
});


bot.hears([
    /(https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+)/,
    /\.link\/([A-Za-z0-9]+)/],
    async ctx => {

        const spotifyUrl = ctx.message.text;

        try {
            const trackId = await parsers.extractTrackIdFromUrl(spotifyUrl);
            const accessToken = await spotifyHelper.getAccessToken(clientId, clientSecret);
            const recommendations = await spotifyHelper.getRecommendations(trackId, accessToken);
            tracks = recommendations.map(recommendations => ({
                artist: recommendations.artists[0].name, // Only the 1st artists name is displayed, so it doesn't trash the message if there's like 10 artists involved in a song
                name: recommendations.name,
                url: recommendations.external_urls.spotify,
            }));

            let markdownMessage = "Howdy, " + ctx.from.username + "! Check those recommendations based on the song you uploaded:\n\n";

            markdownMessage += tracks
                .map(track => (`[${track.artist} - ${track.name}](${track.url})`))
                .join("\n\n");

            await ctx.replyWithMarkdown(markdownMessage, {
                disable_web_page_preview: true
            });
        } catch (error) {
            console.error('Error:', error);
        }
    });

bot.launch();
