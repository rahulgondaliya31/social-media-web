import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import $ from "jquery";
import Messages from "./Message";
import {
    NotificationContainer,
    NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';



const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [err, setErr] = useState(null);
    const [errors, setErrors] = useState(true);
    const [field, setFields] = useState({});
    const [errorClassName, setErrorClassname] = useState({});
    var EMAIL_PATTERN =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var PASSWORD_PATTERN = /(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z].{6,}/;


    const handleValidation = () => {


        //username
        if ($("#f_name").val() === "") {
            $("#username_error").html(Messages.event_username_msg);
            setErrors(true)
        } else {
            setErrors(false)
            $("#username_error").html("");
        }

        // email
        if ($("#email_1").val() === "") {
            setErrors(true)
            $("#email_error").html(Messages.event_email_msg);
        } else if (!EMAIL_PATTERN.test($("#email_1").val())) {
            setErrors(true)
            $("#email_error").html(Messages.event_email_valid_msg);
        } else {
            setErrors(false)
            $("#email_error").html("");
        }

        //password
        if ($("#pswd_1").val() === "") {
            setErrors(true)
            $("#password_error").html(Messages.event_password_msg);
        } else if ($("#pswd_1").val().match(PASSWORD_PATTERN) === null) {
            setErrors(true)
            $("#password_error").html(Messages.event_password_valid_msg);
        } else {
            setErrors(false)
            $("#password_error").html("");
        }

        //name
        if ($("#nm_1").val() === "") {
            $("#name_error").html(Messages.event_name_msg);
            setErrors(true)
        } else {
            setErrors(false)
            $("#name_error").html("");
        }

    }

    const hide = (hide) => {
        $("#" + hide).html("");
    }

    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        handleValidation();
        if (errors == false) {
            const data = {
                username: username,
                email: email,
                password: password,
                name: name
            }

            const res = await axios.post("http://localhost:4535/register", data)
            if (res.data.success == "yes") {
                localStorage.setItem('verify', '');
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('user_id', res?.data?.data?.id);
                localStorage.setItem('username', res?.data?.data?.username);
                // localStorage.setItem('last_name', res?.data?.data?.last_name);
                //document.getElementById("register_form").reset();
                NotificationManager.success('register successfully');
                setTimeout(function() {
                    window.location.reload()
                    navigate("/");
                }, 2000);
            }
            else if(res.data.message==="Email already exists"){
                $("#email_error").html(Messages.email_exist_already);
            }
            else {
                NotificationManager.error('something happend wrong');
            }
        }
    };

    console.log(err);

    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>Buckety Social.</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
                        alias totam numquam ipsa exercitationem dignissimos, error nam,
                        consequatur.
                    </p>
                    <span>Do you have an account?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            id="f_name"
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={() => { hide("username_error") }}
                            value={username}
                            required />
                        <div className="text-danger" id="username_error"> </div>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            id="email_1"
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={() => {hide("email_error") }}
                            value={email}
                            required />
                        <div className="text-danger" id="email_error">  </div>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            id="pswd_1"
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={() => {hide("password_error") }}
                            value={password}
                            required />
                        <div className="text-danger" id="password_error"></div>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            id="nm_1"
                            onKeyDown={() => { hide("name_error") }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required />
                        <div className="text-danger" id="name_error"></div>


                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
            </div>
            <NotificationContainer/>
        </div>
        // </div>
    );
};

export default Register;
