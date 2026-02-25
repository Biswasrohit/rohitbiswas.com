import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import PageRankDemo from './pages/PageRankDemo.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/pagerank" element={<PageRankDemo />} />
    </Routes>
  </BrowserRouter>
);
