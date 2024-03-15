import { useContext, useEffect, useState } from "react";
import "./comment.scss";
import moment from "moment";
import axios from "axios";
import {
    NotificationContainer,
    NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useParams } from "react-router-dom";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const user_id = localStorage.getItem('user_id')
  // const [user,setUser] = useState([])
  const [comment,setComment] = useState([])
  const [enteredText, setEnteredText] = useState('');
  const id = useParams()

  

  const Getcomments = async(pageNumber) =>{
     const data = {
        post_id : id?.id,
        page : pageNumber ? pageNumber : "1"
     }

     const res = await axios.post("http://localhost:4535/getcomment",data)
     console.log("res",res);
     setComment(res?.data?.data)
     

  }

  useEffect(()=>{
    Getcomments()
  },[])

  const handleComment = async (e) => {
    e.preventDefault()
    const data = {
        user_id : user_id,
        post_id : id?.id,
        content : enteredText
    }
    const res = await axios.post("http://localhost:4535/addcomment",data)
     if(res?.data?.success === "yes"){
        NotificationManager.success('comment add successfully'); 
        Getcomments()
        setEnteredText('')

     }
     else{
        NotificationManager.error('something happend wrong'); 
     }
  };

  return (
    <div className="comments">
     
      <div className="commentpart">
        { comment.map((comment) => (
            <div className="comment" key={comment.id}>
              <div style={{display:"flex"}}>
              <img src={comment.profile_picture} alt="" />
              <div className="info">
                <span>{comment.username}</span>
                <p className="mb-0" style={{fontSize:"15px"}}>{comment.content}</p>
              </div>
              </div>
              <div>
              <span className="date">
                {moment(comment.created_at).fromNow()}
              </span>
              </div>
            </div>
          ))}
          </div>
           <div className="write">
       
       {/* <img src={user.profile_picture} alt="" /> */}
       <input
         
         id="comment"
         type="text"
         placeholder="write a comment"
         value={enteredText}
         onChange={(e) => setEnteredText(e.target.value)}
       />
       <button onClick={(e) => handleComment(e)}>Send</button>
      
     </div>
          <NotificationContainer/>
    </div>
  );
};

export default Comments;
