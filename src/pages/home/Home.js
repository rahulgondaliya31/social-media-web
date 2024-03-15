import React from "react";
import './home.scss'
import Post from "../../components/post/Post"
import Stories from "../../components/stories/Stories";
import Share from "../../components/share/Share";
const Home = () =>{
    return(
        <>
           <Stories/>
          <Share/>
           <div className="Home">
           <Post/>
         
         </div>
       
        </>
    )
}

export default Home