import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';
import HomeSection from './HomeSection/HomeSection';
import AboutPage from './AboutPage/AboutPage';
import BookShelves from './BookShelves/BookShelves';
import BookDetails from './BookDetails/BookDetails';

function App() {


  return(
      <Routes>
        <Route path="/login" element={<LoginPage  />} />
        <Route path="/" element={<Navigate to="/login" replace />}/>
        <Route path="/home" element={<HomeSection/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/bookshelves" element={<BookShelves />} />
        <Route path="/bookshelves/:id" element={<BookDetails />} />
      </Routes>
  );
}

export default App;
