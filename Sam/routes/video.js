// const express = require('express');
// const router = express.Router();
// const axios = require('axios');

// // Define routes
// router.post('/', async (req, res) => {
//     const { videoLink } = req.body;
//     // Fetch video data from YouTube API
//     try {
//         const videoData = await fetchVideoData(videoLink);
//         // Calculate Earning Potential
//         const earningPotential = calculateEarningPotential(videoData);
//         res.json({ videoData, earningPotential });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Fetch video data from YouTube API
// async function fetchVideoData(videoLink) {
//     // Use YouTube API to fetch video details
//     // Replace 'YOUR_API_KEY' with your actual API key
//     const apiKey = 'AIzaSyA8oslnCvlcbqepRRxhFd16S1qvVZLxXtk';
//     // const videoId = extractVideoId(videoLink);
//     const apiUrl = `https://youtube.googleapis.com/youtube/v3/playlists?channelId=UCQHLxxBFrbfdrk1jF0moTpw&key=${apiKey}`;
//     const response = await axios.get(apiUrl);
//     return response.data.items[0];
// }


// // Calculate Earning Potential
// function calculateEarningPotential(videoData) {
//     // Logic to calculate Earning Potential
// }

// module.exports = router;

const express = require('express');
const router = express.Router();
const axios = require('axios');


router.post('/', async (req, res) => {
    const { videoLink } = req.body;
    console.log(videoLink,"rrr");
    
    try {
        const { videoId } = extractVideoAndChannelIds(videoLink);
        const videoData = await  fetchVideoData(videoId)
        console.log(videoData,"hahahaah");
             let channelData=   await fetchChannelData( videoData.snippet.channelId)

        //    await  fetchChannelData(videoData)
      
        const earningPotential = calculateEarningPotential(videoData, channelData);
        res.json({ videoData, channelData, earningPotential });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


async function fetchVideoData(videoId,channelId) {

    try {
        const apiKey = 'AIzaSyA8oslnCvlcbqepRRxhFd16S1qvVZLxXtk';
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,statistics`;
       
        //   const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&maxResults=50`;
        const response = await axios.get(apiUrl);
        return response.data.items[0];
    } catch (error) {
        console.error('Error fetching video data:', error);
        throw error;
    }
}


async function fetchChannelData(channelId) {
    // console.log(a.snippet.channelId,'sanajajaj');
    // let channelId=a.snippet.channelId
    // channelId='UC37cflt9I_ER6Z0YQUdJGBw'
    try {
        const apiKey = 'AIzaSyA8oslnCvlcbqepRRxhFd16S1qvVZLxXtk';
        const apiUrl = `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&key=${apiKey}&part=statistics`;
       
        //   const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&maxResults=50`;

        const response = await axios.get(apiUrl);
        console.log(response.data.items,"kamm ki chezz");
        return response.data.items[0].statistics;
    } catch (error) {
        console.error('Error fetching channel data:', error);
        throw error;
    }
}


function extractVideoAndChannelIds(videoLink) {
    
   
    const videoIdRegExp = /(?:\/|%3D|v=|vi=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/;
    const channelIdRegExp = /channel\/([^/]+)/;
    
    // Match video ID
    const videoIdMatch = videoLink.match(videoIdRegExp);
    console.log(videoIdMatch,"kp");
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    // Match channel ID
    const channelIdMatch = videoLink.match(channelIdRegExp);
    console.log(channelIdMatch,"neha");
    const channelId = channelIdMatch ? channelIdMatch[1] : null;
  

    return { videoId, channelId };
}


function calculateEarningPotential(videoData, channelData) {
    const subscriberCount = channelData.subscriberCount || 0;
    const likes = videoData.statistics.likeCount || 0;
    const views = videoData.statistics.viewCount || 0;
    const comments = videoData.statistics.commentCount || 0;
    
    // Calculate Earning Potential based on your formula
    const earningPotential = Math.min(subscriberCount, views) + (10 * comments) + (5 * likes);
    console.log(earningPotential,"surajjj");
    return earningPotential;
}

module.exports = router;
