import React, { useEffect, useState } from "react";
import "./rightbar.scss";
import axios from "axios";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import RightBars from "./RightBars"

const RightBar = () => {
  return(
    <>
     <RightBars/>
    </> 
  );
};

export default RightBar;
