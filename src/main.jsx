import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Step1 from "./page/Step1";
import Step2 from "./page/Step2";
import Step3 from "./page/Step3";
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/go/:slug' element={<Step1 /> } />
        <Route path="/go/:slug/open/:token" element={<Step2 />} />
        <Route path="/go/:slug/unlock/:token" element={<Step3 />} />
      </Routes>
    </Router>
  </StrictMode>,
)
