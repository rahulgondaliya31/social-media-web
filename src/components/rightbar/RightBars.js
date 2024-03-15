import React, { useEffect, useState } from "react";
import "./rightbar.scss";
import axios from "axios";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const RightBar = () => {
  const [user,setUser] = useState([])
  console.log("user",user)
  const [getuser,setGetUser] = useState([])
  const [follow,setFollow] = useState({})
  const user_id = localStorage.getItem("user_id")
  const [postdata,setPostData] = useState([])

  

  const GetUser = async() =>{
    const data = {
      user_id : user_id
    }
    const res = await axios.post("http://localhost:4535/userlisting",data)
    setUser(res?.data?.data)
  }

//   const getUserDetail = async() =>{
//     const data = {
//         user_id : user?.id,
//         myid : user_id
//     }
//     const res = await axios.post("http://localhost:4535/get_user_detail",data)
//     setGetUser(res?.data?.data)

// }
const Postlisting = async (pageNumber) => {

    const data = {
      user_id: user_id,
      page: pageNumber ? pageNumber : "1"
    }
    const res = await axios.post("http://localhost:4535/postlisting", data)
    setPostData(res?.data?.data)
    if (res?.data?.success === "no") {
      NotificationManager.error('Somthing happened wrong.');
    }
  }

const handleFollow = async(id) =>{
  const data = {
   followerUserId : user_id,
   followedUserId : id
  }

  const res = await axios.post("http://localhost:4535/addfollow_or_unfollow",data)
   setFollow(res?.data?.data)
   GetUser()
   Postlisting()

   if(res?.data?.message === "user follow successfully"){
     NotificationManager.success("followed successfully")
     setTimeout(() => {
        window.location.reload()
     },800);
     
   }
   else if(res?.data?.message === "user unfollow successfully"){
     NotificationManager.success("unfollow successfully")
     setTimeout(() => {
        window.location.reload()
     },800);
   }
}

  

  useEffect(()=>{
    GetUser()
    Postlisting()
  },[])
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {user.map((row,index)=>(
          <div className="user">
            <div className="userInfo">
              {row?.profile_picture ?
              <img
                src={row.profile_picture}
                alt=""
              />
              :
              <AccountCircleIcon style={{width : "40px",height:"40px",color: "#a4a4a4"}}/>
              }
              <span>{row.username}</span>
            </div>
            <div className="buttons" style={{marginRight:"5px"}}>
              <button style={{marginRight:"10px"}} onClick={()=>handleFollow(row.id)}>
              {row?.follow_detail === 1
                      ? "unfollow"
                      : "Follow"}
              </button>
              <button>dismiss</button>
            </div>
          </div>
         ))}
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Test User 3</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>TestUser4</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Test User 5</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>TestUser6</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>TestUser7</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Test User 8</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>TestUser1</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>TestUser2</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Test User 3</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>TestUser4</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>TestUser 5</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Test User 6</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Test User 7</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>TestUser8</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Test User 9</span>
            </div>
          </div>
        </div>
      </div>
      <NotificationContainer/>
    </div>
  );
};

export default RightBar;
