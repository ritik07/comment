import React from 'react';
import Comment from '../page/comment/comment';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Layout = () => {
  return <div>
    <Routes>
      <Route exact path='/' element={<Comment />}></Route>
    </Routes>
  </div>
};

export default Layout;
