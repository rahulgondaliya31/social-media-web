import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useEffect, useState } from "react";
import axios from "axios"
import {
    NotificationContainer,
    NotificationManager
  } from 'react-notifications';
  import 'react-notifications/lib/notifications.css';


const Share = () => {
const [desc,setDesc] = useState("")
const [file,setFile] = useState("")
console.log(file);
const [user,setUser] = useState([])
const user_id = localStorage.getItem("user_id")
const [postdata,setPostdata] = useState([])


const getUser = async() =>{
    const data = {
        user_id : user_id,
        myid : user_id
    }
   const res = await axios.post("http://localhost:4535/get_user_detail",data)
   setUser(res?.data?.data)
}

const Postlisting = async (pageNumber) => {

  const data = {
    user_id: user_id,
    page: pageNumber ? pageNumber : "1"
  }
  const res = await axios.post("http://localhost:4535/postlisting", data)
  setPostdata(res?.data?.data)

  if (res?.data?.success === "no") {
    NotificationManager.error('Somthing happened wrong.');
  }
}

const handleClick = async() =>{
    
   const formdata = new FormData();
   formdata.append("user_id",user_id)
   formdata.append("description",desc)
   formdata.append("video",file)
    
    const res  = await axios.post("http://localhost:4535/postvideo",formdata)
    console.log(res);
    if(res?.data?.success === "yes"){
        NotificationManager.success('post added successfully');
        Postlisting()
        setDesc('')
    }
    else{
        NotificationManager.error('something happend wrong');
    }
}



useEffect(()=>{
    getUser()
    Postlisting()
},[])

  return (
    <>
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={user.profile_picture} alt="" />
            <input
              type="text"
              name="description"
              placeholder={`What's on your mind ${user.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          {/* <div className="right">
            {file && 
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            }
          </div> */}
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              name="video"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
              <div style={{display : "flex"}}>
              <div className="item ml-2">
            <label htmlFor="file" style={{marginBottom :"0px !important"}}>
                <img src={Image} alt="" />
                <span className="ml-2">Add Image</span>
            </label>
              </div>
            <div className="item  ml-2">
              <img src={Map} alt="" />
              <span className="ml-2">Add Place</span>
            </div>
            <div className="item  ml-2">
              <img src={Friend} alt="" />
              <span className="ml-2">Tag Friends</span>
            </div>
            </div>
          </div>
          <div className="right">
            <button onClick={() => handleClick()}>Share</button>
          </div>
        </div>
      </div>
      <NotificationContainer />
    </div>
    </>
  );
};

export default Share;
