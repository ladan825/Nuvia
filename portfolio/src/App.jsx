import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {

  return (
    <>
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hero" element={<Hero />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
              {/* <Route path="/about" element={<About />} />
                <Route path="/skills" element={<Skills />} />
                  */}
          </Routes>
        </div>
      </div>
      </Router>
    </>
  )
}

export default App
