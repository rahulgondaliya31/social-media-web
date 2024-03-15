import { useContext, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import "./login.scss";
import Messages from "../register/Message";
import $ from "jquery";
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import axios from "axios";

const Login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [err, setErr] = useState(null);
  const [errors, setErrors] = useState(false);
  var EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var PASSWORD_PATTERN = /(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z].{6,}/;
  const navigate = useNavigate();
  //const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleValidation = () =>{

    if ($("#email").val() === "") {
      setErrors(true)
      $("#email_error").html(Messages.event_email_msg);
  } else if (!EMAIL_PATTERN.test($("#email").val())) {
      setErrors(true)
      $("#email_error").html(Messages.event_email_valid_msg);
  } else {
      setErrors(false)
      $("#email_error").html("");
  }

  if ($("#password").val() === "") {
    setErrors(true)
    $("#password_error").html(Messages.event_password_msg);
} else if ($("#password").val().match(PASSWORD_PATTERN) === null) {
    setErrors(true)
    $("#password_error").html(Messages.event_password_valid_msg);
} else {
    setErrors(false)
    $("#password_error").html("");
}
  }


  const hide = (hide) => {
    $("#" + hide).html("");
  }



  const handleLogin = async (e) => {
    e.preventDefault();
     handleValidation()
     if(errors == false){
        const inputs = {
            email : email,
            password : password
        }
      const res = await axios.post("http://localhost:4535/login",inputs);
      console.log("res",res)
      if(res?.data?.success === "yes"){
      localStorage.setItem('user_id', res?.data?.data?.id);
      localStorage.setItem('username', res?.data?.data?.username);
      NotificationManager.success('Login successfully');
      setTimeout(function() {
        window.location.reload()
        navigate("/");
    }, 2000);
     
      }
     }
     else {
      NotificationManager.error('email and password icorrect');
     }
  }


  // if (currentUser) {
  //   return <Navigate to="/" />;
  // }
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Buckety Login.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="email"
              placeholder="email"
              name="email"
              id="email"
              onChange={(e)=>setEmail(e.target.value)}
              onKeyDown={() => {hide("email_error") }}
              value={email}
            />
             <div className="text-danger" id="email_error">  </div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              onChange={(e)=>setPassword(e.target.value)}
              onKeyDown={() => { hide("password_error") }}
              value={password}

            />
             <div className="text-danger" id="password_error"></div>
            {err && err}
            <div style={{width : "60%"}}>
            <button onClick={handleLogin}>Login</button>
            </div>
          </form>
        </div>
      </div>
      <NotificationContainer/>
    </div>
  );
};

export default Login;
