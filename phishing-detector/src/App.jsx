import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PhishingDetector from './PhishingDetector'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PhishingDetector />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App