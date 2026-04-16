import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Step1 from "./page/Step1";
import App from './page/app';
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='*' element={<App /> } />
        <Route path='/go/:slug' element={<Step1 /> } />
      </Routes>
    </Router>
  </StrictMode>,
)
