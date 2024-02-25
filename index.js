

let   apiKey ='AIzaSyA8oslnCvlcbqepRRxhFd16S1qvVZLxXtk'
let videoId='1ZnPY1c3u_0'
let channelId='UC6vd-JCD7Z_FuF8N5LTydPA'

fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&maxResults=50`).then((data)=>{
    // console.log(data);
    

    return data.json()

}).then((res)=>{
    console.log(res,'resdata');

}).catch((err)=>{
    console.log(err);
})


