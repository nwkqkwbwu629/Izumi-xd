const { command , isPrivate , getBuffer, getJson } = require("../lib");
const fetch = require("node-fetch");
const { CAPTION } = require("../config");
const axios = require("axios");
const X = require("../config");

command(
    {
        pattern: "isong",
        fromMe: isPrivate,
        desc: "Song Downloader",
        type: "downloader",
    },
    async (message, match) => {
        if (!match) return await message.sendMessage("*_Need Song Name Or Url_*");
var res = await axios.get(`https://api-viper-x.koyeb.app/api/song?name=${match}`)
var song = res.data
await message.client.sendMessage(message.jid, { text: `*_Downloading ${song.data.title}_*` },{ quoted: message})
const aswinsparky = await (await fetch(`${song.data.downloadUrl}`)).buffer()
await message.client.sendMessage(message.jid, { audio :aswinsparky,  mimetype:"audio/mpeg", contextInfo: { externalAdReply: {
title: " 𝗜𝗭𝗨𝗠𝗜-𝗫𝗗🧚‍♂️",
body: "𝙎𝙤𝙣𝙜 𝘿𝙤𝙬𝙣𝙡𝙤𝙖𝙙𝙚𝙙 𝙎𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮",
sourceUrl: "https://github.com/sataniceypz/Izumi-xd",
mediaUrl: "",
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: false,
thumbnailUrl: "https://i.imgur.com/2272Sx7.jpeg" }} }, {quoted: message })
    }
    );
    
// EYPZ

command(
    {
        pattern: "video",
        fromMe: isPrivate,
        desc: "Yt Video Downloader",
        type: "downloader",
    },
    async (message, match) => {
        if (!match) return await message.sendMessage("*_Need a Video Name_*");
let {result} = await getJson(`https://api-aswin-sparky.koyeb.app/api/downloader/yt_video?search=${match}`);
await message.client.sendMessage(message.jid, { text: `*_Downloading ${result.title}_*` },{ quoted: message})
return await message.sendFromUrl(result.url, {contextInfo: { externalAdReply: {
title: "𝗜𝗭𝗨𝗠𝗜-𝗫𝗗🧚‍♂️",
body: "𝙑𝙞𝙙𝙚𝙤 𝘿𝙤𝙬𝙣𝙡𝙤𝙖𝙙𝙚𝙙 𝙎𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮",
sourceUrl: "https://github.com/sataniceypz/Izumi-xd",
mediaUrl: "",
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: false,
thumbnailUrl: "https://i.imgur.com/2272Sx7.jpeg" }}, caption: `*${result.title}*`}, {quoted: message })
    });

// EYPZ

command(
    {
        pattern: "yta",
        fromMe: isPrivate,
        desc: "YouTube song Downloader",
        type: "downloader",
    },
    async (message, match) => {
        if (!match) return await message.reply("*_Need YouTube Url_*");
        let dat = `https://api-brunosobrino.onrender.com/api/v1/ytmp3?url=${match}`
await message.client.sendMessage(message.jid, { audio :{url: dat },  mimetype:"audio/mpeg", contextInfo: { externalAdReply: {
title: "𝗜𝗭𝗨𝗠𝗜-𝗫𝗗",
body: "𝙎𝙤𝙣𝙜 𝘿𝙤𝙬𝙣𝙡𝙤𝙖𝙙𝙚𝙙 𝙎𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮",
sourceUrl: "https://github.com/sataniceypz/Izumi-xd",
mediaUrl: "",
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: false,
thumbnailUrl: "hhttps://i.imgur.com/2272Sx7.jpeg" }}, }, {quoted: message })
    }
    );

// ZETA BRO //

command(
    {
        pattern: "ytv",
        fromMe: isPrivate,
        desc: "YouTube Video Downloader",
        type: "downloader",
    },
    async (message, match) => {
        if (!isUrl(match)) return await message.reply("*_aree noobde where is Youtube Video Url_*");
let Ytd = await ytmp4(match, "134");
await message.sendFromUrl(Ytd.videoUrl, { caption: (X.CAPTION) }, {quoted: message })
});

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedDuration = [];

    if (hours > 0) {
        formattedDuration.push(`${hours} hour`);
    }

    if (minutes > 0) {
        formattedDuration.push(`${minutes} minute`);
    }

    if (remainingSeconds > 0) {
        formattedDuration.push(`${remainingSeconds} second`);
    }

    return formattedDuration.join(' ');
}

function formatBytes(bytes) {
    if (bytes === 0) {
        return '0 B';
    }
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}

async function ytmp4(query, quality = 134) {
    try {
        const videoInfo = await ytdl.getInfo(query, {
            lang: 'id'
        });
        const format = ytdl.chooseFormat(videoInfo.formats, {
            format: quality,
            filter: 'videoandaudio'
        })
        let response = await fetch(format.url, {
            method: 'HEAD'
        });
        let contentLength = response.headers.get('content-length');
        let fileSizeInBytes = parseInt(contentLength);
        return {
            title: videoInfo.videoDetails.title,
            thumb: videoInfo.videoDetails.thumbnails.slice(-1)[0],
            date: videoInfo.videoDetails.publishDate,
            duration: formatDuration(videoInfo.videoDetails.lengthSeconds),
            channel: videoInfo.videoDetails.ownerChannelName,
            quality: format.qualityLabel,
            contentLength: formatBytes(fileSizeInBytes),
            description: videoInfo.videoDetails.description,
            videoUrl: format.url
        }
    } catch (error) {
        throw error
    }
}

// Zeta-XD 

command(
    {
        pattern: "spotify",
        fromMe: isPrivate,
        desc: "Spotify Song Downloader",
        type: "downloader",
    },
    async (message, match, m) => {
match = match || message.reply_message.text;
	if(!match) return await message.reply("*_Bruh send with spotify Url_*");
let buff = (await getJson(`https://api.maher-zubair.tech/download/spotify?url=${match}`)).result.url
await message.sendFromUrl(buff, {quoted: message})
})

// Zeta Kunda // */
/*command(
  {
    pattern: "2insta",
    fromMe: isPrivate,
    desc: "Instagram Reel/Post Downloader",
    type: "downloader",
  },
  async (message, match) => {
    match = match || message.reply_message.text
   if (!match)return message.reply(`*_Need instagram Link_*`)
      var { data } = await getJson(`https://api.vihangayt.asia/downloader/ig?url=${match}`);
        
        for (let i = 0; i < data.data.length; i++) {
            await message.sendFromUrl(data.data[i].url, { caption: (X.CAPTION)})
            }
});*/

command(
  {
    pattern: "insta",
    fromMe: isPrivate,
    desc: "Instagram Reel/Post Downloader",
    type: "downloader",
  },
  async (message, match) => {
    match = match || message.reply_message.text
   if (!match)return message.reply(`*_Send With Instagram Url_*`)
let {data} = await getJson(`https://api-aswin-sparky.koyeb.app/api/downloader/igdl?url=${match}`)
await message.sendFromUrl(`${data[0].url}`, {caption: "*Izumi🧚‍♂️*"})
});
// Zeta-XD

/*command(
  {
    pattern: "story",
    fromMe: isPrivate,
    desc: "Instagram Story Downloader",
    type: "downloader",
  },
  async (message, match) => {
    match = match || message.reply_message.text
   if (!match)return message.reply(`*_Need Story Link_*`)
      var { data } = await getJson(`https://api.vihangayt.asia/downloader/ig?url=${match}`);
        
        for (let i = 0; i < data.data.length; i++) {
            await message.sendFromUrl(data.data[i].url, { caption: (X.CAPTION)})
            }
});*/



// Andi ///


command(
    {
        pattern: "pinterest",
        fromMe: isPrivate,
        desc: "Pinterest Downloader",
        type: "downloader",
    },
    async (message, match) => {
        if (!isUrl(match)) return await message.sendMessage("*_Bruh where is Pinterest Url_*");
var {result} = await getJson(`https://api.lokiser.xyz/api/pinterestdl?link=${match}`)
await message.sendFromUrl(result.LokiXer.url,{ caption: (X.CAPTION) }, {quoted: message})
    }
    );

command(
    {
        pattern: "gitdl",
        fromMe: isPrivate,
        desc: "Repository Downloader",
        type: "downloader",
    },
    async (message, match, client) => {
if (!isUrl(match)) return await message.reply("*_Need A Repo Url_*")
let user = match.split("/")[3];
let repo = match.split("/")[4];
let url = `https://api.github.com/repos/${user}/${repo}/zipball`;
await message.reply("*_Downloading_*")

await message.client.sendMessage(message.jid,{ document :{ url: url }, fileName: repo , mimetype: "application/zip"}, {quoted: message });
})


