// Add the missing React import here!
import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Dashboard from './Component/Home';
import ProjectDetail from './Component/ProjectDetail';
import SignIn from './Component/SignIn';
import SignUp from './Component/SignUp';
import Home from './Component/Home';
import Dash from './Component/Dash';
import CreateProject from './Component/CreateProject';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            {/* Public Routes for now */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/dash" element={<Dash/>} />
            <Route path="/create" element={<CreateProject />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;