// import { useEffect, useState } from "react";
// import Post from "../post/Post";
// import "./posts.scss";
// import axios from "axios";


// const Posts = () => {

//     const [postdata,setPostdata] = useState([])
//   const user_id = localStorage.getItem("user_id")
//     const Postlisting = async (pageNumber) => {

//         const data = {
//           user_id: user_id,
//           page: pageNumber ? pageNumber : "1"
//         }
//         const res = await axios.post("http://localhost:2050/postlisting", data)
//         setPostdata(res?.data?.data)
      
//       }
  
//      useEffect(()=>{
//         Postlisting()
//      },[])  
//   return (
//     <>
//     <div className="posts">
      
//         {postdata.map((post) => <Post post={post} key={post.id} />)}
//     </div>
//     </>
//   );
// };

// export default Posts;
