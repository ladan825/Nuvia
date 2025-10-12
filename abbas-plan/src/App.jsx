import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Component/layout/Navbar';
import Dashboard from './Component/dashboard/Dashboard';
import ProjectDetail from './Component/projects/ProjectDetail';
import SignIn from './Component/auth/SignIn';
import SignUp from './Component/auth/SignUp';
import CreateProject from './Component/projects/CreateProject';
// ✅ make sure this is capitalized!

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              {/* 🟢 Public Routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/create" element={<CreateProject />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
