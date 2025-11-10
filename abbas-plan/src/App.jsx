// Add the missing React import here!
import React from 'react'; 
import {  Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './Component/Navbar';
import ProjectDetail from './Component/ProjectDetail';
import SignIn from './Component/SignIn';
import SignUp from './Component/SignUp';
import Home from './Component/Home';
import Dash from './Component/Dash';
import CreateProject from './Component/CreateProject';

function App() {
  return (
    <BrowserRouter>
      <div className="w-full min-h-screen">
        <Navbar />
        <div className="border">
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
    </BrowserRouter>
  );
}

export default App;