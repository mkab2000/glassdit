import logo from './logo.svg';
import './Styles/App.css';
import PostList from './PostList';
// import data from "./Data"
import PostPage from './Components/PostPage';
import { Routes, Route, Link } from 'react-router-dom';
import NewPost from './Components/NewPost';
import UpdatePost from './Components/UpdatePost';
import { useState, useEffect } from "react";

// const pageById = (_id) => {
//   for (let post of data) {
//     if (post._id === _id) return post 
//   }
// }

function App() {

  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/new" element={<NewPost />} /> 
          <Route path={"/posts/:id"} element={<PostPage />} />
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
