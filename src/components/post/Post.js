import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link,useNavigate } from "react-router-dom";
import Comments from "../comments/Comments";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios"
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Share from "../share/Share";
import Stories from "../stories/Stories";
// import HoverVideoPlayer from "react-hover-video-player";


const Post = ({post}) => {
  console.log("post",post);
  const [commentOpen, setCommentOpen] = useState(false);
  // console.log(commentOpen);
  const [menuOpen, setMenuOpen] = useState(false);
  console.log("menu",menuOpen);
  const currentUser = localStorage.getItem("user_id")
  const [islike, setIslike] = useState({})
  console.log("like", islike);
  const [postdata, setPostdata] = useState([])
  console.log("postdata",postdata);
  const [getpostdetail,setGetPostDetail] = useState({})
  console.log("getpostdetail",getpostdetail);
  const navigate = useNavigate()



  const Postlisting = async (pageNumber) => {

    const data = {
      user_id: currentUser,
      page: pageNumber ? pageNumber : "1"
    }
    const res = await axios.post("http://localhost:4535/postlisting", data)
    setPostdata(res?.data?.data)
    if (res?.data?.success === "no") {
      NotificationManager.error('Somthing happened wrong.');
    }
  }
  
  // const getPostDetail = async() =>{
  //   const data = {
  //     user_id: currentUser,
  //     post_id: post?.id
  //   }
  //   console.log("data",data);

  //   const res = await axios.post("http://localhost:6080/getposts", data)
  //   setGetPostDetail(res?.data?.data)
  //   console.log("response",res)


  // }
  const handleLike = async (post_id,e) => {
    e.preventDefault()
    const data = {
      user_id: currentUser,
      post_id: post_id
    }


    const res = await axios.post("http://localhost:4535/addlike", data)
    setIslike(res?.data?.data)
    Postlisting()

    if (res?.data?.message === "unlike post successfully") {
      NotificationManager.success('post unlike successfully');
    }
    else if (res?.data?.message === "like add to post successfully") {
      NotificationManager.success('like addes to post successfully');
    }
  }



  const handleDelete = async (post_id) => {
    const data = {
      post_id: post_id
    }

    const res = await axios.post("http://localhost:4535/removepost", data)
    if (res?.data?.success === "yes") {
      NotificationManager.success('post delete successfully');
      Postlisting()
    }
    else {
      NotificationManager.error('something happend wrong');
    }

  }

  useEffect(() => {
    Postlisting()

  }, [])

  return (
    
      <>
       {postdata.map((row,index)=>(
        <div className="post">
          <div className="container">
            <div className="user">
              <div className="userInfo">
                <img src={row.profile_picture} alt="" />
                <div className="details">
                  <Link
                    to={`/profile/${row.user_id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <span className="name">{row.username}</span>
                  </Link>
                  <span className="date">{moment(row.created_at).fromNow()}</span>
                </div>
              </div>
              <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: "pointer" }} />
              {(menuOpen && row.id && row.user_id == currentUser) && (
                <button onClick={() => handleDelete(row.id)}>delete</button>
              )}

            </div>
            <div className="content">
              <p>{row.description}</p>
              {/* <HoverVideoPlayer videoSrc="path/video-file.mp4" /> */}
              <video width="100%" height="500" loop controls
              onMouseOver={e => e.target.play()}
              onMouseOut={e => e.target.pause()}
              >
                <source src={row.video} type="video/mp4" />
              </video>
              {/* <iframe className="video" src={row.video} height="500" width="100%" /> */}
            </div>
            <div className="info">
              <div className="item1" onClick={(e) => handleLike(row.id,e)}>
                {
                  (row?.is_favourite === 1) ?
                    <FavoriteIcon style={{ color: "red" }} />
                    :
                    <FavoriteBorderOutlinedIcon />
                }
                <span>{row?.likes}</span> &nbsp; Likes
              </div>
              <div className="item" >
                <TextsmsOutlinedIcon onClick={()=>navigate(`/comments/${row.id}`)} />
                 <p className="mb-0">View all <span>{row?.comments}</span> comments</p>
              </div>
              <div className="item">
                <ShareOutlinedIcon />
                Share
              </div>
            </div>
            {/* {commentOpen && <Comments postId={row.id} />} */}
          </div>
          <NotificationContainer />
        </div>
          ))}
          </>
 
    
  );
};

export default Post;
