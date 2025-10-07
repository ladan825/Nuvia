import Food from './Food'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Land from './Land'

function App() {
  return (
  <Router>
    <div className='App'>
        <Routes>
             <Route path="/food" element={<Food />} />
             <Route path="/" element={<Land />} />
        </Routes>
       </div>
  </Router>
      

  )
}

export default App
