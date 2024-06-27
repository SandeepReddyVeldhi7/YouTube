import React, { useEffect, useState } from 'react'
import {YOUTUDE_VIDEOS_API } from"../utils/constants";
import VideoCard, {AddVedioCard} from './VideoCard';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';

const VideoContainer = () => {
const[videos,setvideos]=useState([]);


useEffect(()=>{
  getVideos();
},[])

const  getVideos=async()=>{
  const apiKey="AIzaSyBOrW85_qzdWsL0y_3Lw1itCdiirgIgovA";
  const apiUrl=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${apiKey}`;

  const data= await fetch(apiUrl);
  const json=await data.json();
  //console.log(json);
  setvideos(json.items);
}
const onlineStatus  =useOnlineStatus();

if(onlineStatus===false)
return(
    <h1> Looks like you are Offline
          </h1>
)

  return (
    <div className=' ml-24 md:flex flex-wrap '>

    {videos?.map((video)=>(
   <Link key={video.id} to={"/watch?v="+video.id} >
     <VideoCard  info={video}/>
     </Link>
   ))}
      

    </div>
  );
};

export default VideoContainer;