import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import CommentsContainer from './CommentsContainer';
import LiveChat from './LiveChat';


const WatchPage = () => {

const [searchParams]=useSearchParams();
//console.log(searchParams.get("v"))



    const dispatch=useDispatch();
useEffect(()=>{
    dispatch(closeMenu())
},[])


  return (
   
   <div className='flex flex-col '  >
     <div className='px-5 flex  '> 
     <div className=' '>
      <iframe 
      className='w-[500px] md:w-[1200px] h-[400px] md:h-[700px]'
  src={"https://www.youtube.com/embed/"+ searchParams.get("v")}
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowFullScreen
></iframe>  
</div>
<div className="hidden md:inline-block w-full"><LiveChat/></div>

</div>
    
    <CommentsContainer/>
</div>


  )
}

export default WatchPage