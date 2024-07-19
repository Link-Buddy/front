import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AddLinkPage from '../page/AddLinkPage'; // AddLinkPage 임포트
import HomePage from '../page/HomePage';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/add-link" element={<AddLinkPage />} />
    </Routes>
  </Router>
);
