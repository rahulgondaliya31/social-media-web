import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import axios from "axios";


const Navbar = (props) => {
  const  {toggle} = useContext(DarkModeContext);
  const  {darkMode}  = useContext(DarkModeContext);
  console.log("dark",darkMode);
  const [currentuser,setCurrentUser] = useState([])

  const navigate = useNavigate();

  const getUser = async (e) => {
    const data = {
      user_id : localStorage.getItem("user_id"),
      myid : localStorage.getItem("user_id")
    }

    const res = await axios.post("http://localhost:4535/get_user_detail",data)
     setCurrentUser(res?.data?.data)
  };

  useEffect(()=>{
    getUser()
  },[])

  const hanleClick = () =>{
    localStorage.removeItem("user_id")
    localStorage.removeItem("username")
    navigate("/login")
    window.location.reload()
  }

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>social</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        {/* <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon /> */}
        <div className="user">
          <img src={currentuser.profile_picture} alt="" />
          <span style={{marginLeft : "5px"}}>{currentuser.username}</span>
        </div>
        <LogoutIcon onClick={()=>hanleClick()} style={{marginLeft:"10px"}}/>
      </div>
    </div>
  );
};

export default Navbar;
