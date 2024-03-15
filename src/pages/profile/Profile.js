import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Post from "../../components/post/Post";
import TransgenderIcon from '@mui/icons-material/Transgender';
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import { useContext, useEffect } from "react";
// import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { useState } from "react";
import axios from "axios"
import {
    NotificationContainer,
    NotificationManager
  } from 'react-notifications';
  import 'react-notifications/lib/notifications.css';
  import ProfilePost from "./ProfilePost";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [getuser,setGetUser] = useState([])
  const [follow,setFollow] = useState({})
  const user_id = localStorage.getItem("user_id")
 
const id = useParams();

const getUser = async() =>{
    const data = {
        user_id : id?.id,
        myid : user_id
    }
    const res = await axios.post("http://localhost:4535/get_user_detail",data)
    setGetUser(res?.data?.data)

    if(res?.data?.success === "no"){
      NotificationManager.error("something happend wrong")
    }
}

const handleFollow = async() =>{
   const data = {
    followerUserId : user_id,
    followedUserId : id?.id
   }

   const res = await axios.post("http://localhost:4535/addfollow_or_unfollow",data)
    setFollow(res?.data?.data)
    getUser()

    if(res?.data?.message === "user follow successfully"){
      NotificationManager.success("followed successfully")
    }
    else if(res?.data?.message === "user unfollow successfully"){
      NotificationManager.success("unfollow successfully")
    }
}

useEffect(()=>{
   getUser()
  //  handleFollow()
},[])
  
  return (
    <div className="profile">
     
        <>
          <div className="profileContainer">
          <div className="images">
            <img src={getuser.profile_picture} alt="" className="profilePic" />
          </div>
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{getuser.name}</span>
                <div className="info">
                  <div className="item">
                    {/* <PlaceIcon /> */}
                    <span>{getuser.bio}</span>
                  </div>
                  {/* <div className="item">
                  <TransgenderIcon/>
                    <span>{getuser.gender}</span>
                  </div> */}
                </div>
                { (user_id === id?.id) ? 
                  <button onClick={() => setOpenUpdate(true)}>update</button>
                 : 
                  <button onClick={()=>handleFollow()}>
                    {getuser?.follow_detail === 1
                      ? "Following"
                      : "Follow"}
                  </button>
                }
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <ProfilePost userId={id} />
          </div>
          <NotificationContainer/>
        </>
     
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={getuser} />}
    </div>
  );
};

export default Profile;
