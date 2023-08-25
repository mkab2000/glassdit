import './Styles/App.css';
import PostList from './PostList';
// import data from "./Data"
import PostPage from './Components/PostPage';
import { Routes, Route, Link } from 'react-router-dom';
import NewPost from './Components/NewPost';
import UpdatePost from './Components/UpdatePost';
import React, { useState, useEffect } from "react";

// const pageById = (_id) => {
//   for (let post of data) {
//     if (post._id === _id) return post 
//   }
// }

function App() {
  
    const websocket = new WebSocket('wss://realtime.ably.io/?key=RxFdLA.yZ2-Nw%3AafEZXcBGPQNyAMy1HxRST0vIGTfUBuyetK1kRYtA9ug&format=json&heartbeats=true&v=1.2&agent=ably-js%2F1.2.17%20browser');

    websocket.onopen = () => {
        console.log('WebSocket connected');
        websocket.send(JSON.stringify({action: 10, channel: "test"}))
    };
    
    // websocket.onmessage = (event) => {
    //   console.log("App websocket")
    // }
    

    websocket.onclose = () => {
        console.log('WebSocket closed');
    };

    return (
      <div className="App">
        <div>
          <Routes>
            <Route path="/" element={<PostList websocket={websocket}/>} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/new" element={<NewPost />} /> 
            <Route path={"/posts/:id"} element={<PostPage websocket={websocket} />} />
            <Route path={"/posts/:id" + "/edit"} element={<UpdatePost  />} />
          </Routes>
        </div>
      </div>
    );
  
}

// function GetData() {
  

//   return (
//     <div>
//       <h1>api</h1>
//       {data.map((d) => (
//         <p>{d.title}</p>
//       ))}
//     </div>
//   );
// }

export default App;
