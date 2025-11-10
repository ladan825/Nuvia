import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

import Nav from "./components/Nav"
import Home from "./components/Home"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import ProjectDetail from "./components/ProjectDetail"
import Dash from "./components/Dash"
import CreateProject from "./components/CreateProject"


function App() {

  return (
    <Router>
    <div className="App">
        <Nav />

      <div className="content">
    <Routes>
        <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/dash" element={<Dash />} />
            <Route path="/create" element={<CreateProject />} />
    </Routes>
   </div>
   </div>
   </Router>
  )
}

export default App
