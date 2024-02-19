import React, { useEffect, useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUDE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";


const Head = () => {
 const[searchQuery,setSearchQuery]=useState("")
const[suggestions,setSuggestions]=useState([]);
const[showSuggestions,setShowSuggestions]=useState(false);

const searchCache= useSelector((store)=>store.search);
const dispatch=useDispatch();


useEffect(()=>{
  
//make an api call after every key press
//but if the difference b/w 2 api call is <200ms
//decline the api calls


const timer=setTimeout(()=>{
if (searchCache &&  searchCache[searchQuery]){
   setSuggestions(searchCache[searchQuery]);
}
 else{
  getSearchSuggestions();
 }
},200) ;

return ()=>{
  clearTimeout(timer);
};
},[searchQuery]);
 

const getSearchSuggestions=async ()=>{
  //console.log("api call-"+searchQuery)
  const data=await fetch(YOUTUDE_SEARCH_API+searchQuery)
  const json=await data.json();
 // console.log(json[1]);
 setSuggestions(json[1])

 dispatch(cacheResults({
  [searchQuery]:json[1]
 }));
}


const toggleMenuHandler=()=>{
  dispatch(toggleMenu());
};
  return (
    <div className="grid grid-flow-col p-4 shadow-lg relative">
<div className="flex col-span-1">
<img
 onClick={toggleMenuHandler}
 className="h-9  cursor-pointer"
src="https://static.vecteezy.com/system/resources/previews/021/190/402/non_2x/hamburger-menu-filled-icon-in-transparent-background-basic-app-and-web-ui-bold-line-icon-eps10-free-vector.jpg">
</img>
<a href="/">
<img className="h-10 "
src="https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6-1200-80.jpg"></img>
</a>
</div>

<div className="col-span-10 px-10">
<div>
  <input
   className="  w-1/2  border border-gray-400  p-2 rounded-l-full" 
   type="text"
   value={searchQuery}
   onChange={(e)=> setSearchQuery(e.target.value)}
    onFocus={()=>setShowSuggestions(true)}
    onBlur={()=> setShowSuggestions(false)}

   />

  <button
   className=" border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100">🔍
   </button>
</div>
{showSuggestions&&(
<div className="fixed m-auto bg-white py-1   px-2 w-[44rem] shadow-lg rounded-lg border border-gray-100  ">
<ul>
  {suggestions.map((s)=>(
<li  key={s} className="py-2 shadow-sm">🔍{s}</li>))}

</ul>
</div>
)}
</div>
<div className="col-span-1 ">
  <img className="h-10 rounded-r-full"
   src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"></img>
</div>
    </div>
  )
};

export default Head;