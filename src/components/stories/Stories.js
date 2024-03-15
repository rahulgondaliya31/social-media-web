import { useContext,useEffect,useState } from "react";
import "./stories.scss";
import axios from "axios";
import Carousel_slider from 'react-multi-carousel';


const Stories = () => {
 const [currentuser,setCurrentUser] = useState([])
 const [story,setStory] = useState([])
 const user_id = localStorage.getItem('user_id')

 const getUser = async() =>{

    const data = {
        user_id : user_id,
        myid : user_id
    }
    const res = await axios.post("http://localhost:4535/get_user_detail",data)
    setCurrentUser(res?.data?.data)
 }

 const getStories = async(pageNumber) =>{
    const data = {
        followed_id : user_id,
        page : pageNumber ? pageNumber : "1"
    }

    const res = await axios.post("http://localhost:4535/getstory",data)
    setStory(res?.data?.data)
 }

 useEffect(()=>{
    getUser()
    getStories()
 },[])


 
  
  //TODO Add story using react-query mutations and use upload function.

  return (
    
    <div className="stories">
      <div className="story">
        <img src={currentuser.profile_picture} alt="" />
        <h6 className="name">{currentuser.username}</h6>
        <button><span>+</span></button>
      </div>
        {story.map((story) => (
            <div className="story" key={story.id}>
              <video width="100%" height="250" loop autoPlay style={{background:"black"}}>
                <source src={story.video} type="video/mp4" />
              </video>
              <h6>{story.username}</h6>
            </div>
          ))}
    </div>
         
  );
};

export default Stories;
