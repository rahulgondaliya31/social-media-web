import { useEffect, useState } from "react";
import "./update.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios"
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


const Update = ({ setOpenUpdate, user }) => {
  // const [cover, setCover] = useState(null);
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [file,setFile] = useState('')
  console.log("file",file);
  const [bio,setBio] = useState('')
  const [userdetail,setUserDetail] = useState([])
  const user_id = localStorage.getItem('user_id')
  

  const getUser = async() =>{
    const data = {
      user_id : user_id,
      myid : user_id
    }

    const res = await axios.post("http://localhost:4535/get_user_detail",data)
    if(res?.data?.success === "yes"){
       setUserDetail(res?.data?.data)
    }
    else{
      NotificationManager.error("something happend wrong")
    }
  }
  const handleClick = async (e) => {
    e.preventDefault()
     const Name = name === "" ? userdetail.name : name
     const Email = email === "" ? userdetail.email : email
     const profile = file === "" ? userdetail.profile_picture : file
     const Bio = bio === "" ? userdetail.bio : bio
     const formdata = new FormData()
     formdata.append("name",Name)
     formdata.append("email",Email)
     formdata.append("profile_picture",profile)
     formdata.append("bio",Bio)
     formdata.append("user_id",user_id)


     const res = await axios.post("http://localhost:4535/updateprofile",formdata)
    console.log("res",res);
     if(res?.data?.success === "yes"){
      NotificationManager.success('profile updated successfully');
       setTimeout(() => {
        window.location.reload()
       },1000);
     }
     else{
       NotificationManager.error("something happend wrong")
     }
  };

  useEffect(()=>{
    getUser()
  },[])

  return (
    <div className="update">
      <div className="wrapper">
        <div className="updateprofile" style={{display : "flex",alignItems : "center",justifyContent : "space-between"}} >
          
        <h1>Update Your Profile</h1>
       
       
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
        
        </div>
        <form>
          <div className="files">
            {/* <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : "/upload/" + user.coverPic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            /> */}
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                       : user.profile_picture
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
            
          <div style={{marginTop: "20px"}}>
          <label>Email</label>
          <input
            type="text"
            defaultValue={user.email}
            name="email"
            onChange={(e)=>setEmail(e.target.value)}
          />
          </div>
          {/* <label>Password</label>
          <input
            type="text"
            value={password}
            name="password"
            onChange={handleChange}
          /> */}
          <div>
          <label>Name</label>
          <input
            type="text"
            defaultValue={user.name}
            name="name"
            onChange={(e)=>setName(e.target.value)}
          />
          </div>
          <div>
          <label>bio</label>
          <input
            type="text"
            name="bio"
            defaultValue={user.bio}
            onChange={(e)=>setBio(e.target.value)}
          />
          </div>
          <div style={{display : "flex",alignItems : "center",justifyContent : "center"}}>
          <button onClick={(e)=>handleClick(e)}>Update</button>
          </div>
        </form>
      
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Update;
