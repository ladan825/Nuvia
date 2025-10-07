import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Update from "./components/Update";
import Create from "./components/Create";
import Nav from './Nav';
import Cart from './components/Cart';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
// import ProtectedRoute from './components/ProtectedRoute'; // 🔴 remove for now
import { useAuth } from './context/AuthContext';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import Shop from './components/Shop';
import Contact from './components/Contact';
import About from './components/About';
import Dashboard from './components/Dashboard';
import SuccessPage from './components/Success';

function App() {
  const { user } = useAuth();

  return (
    <div className='App'>
      <Nav />


      <div className='content'>
        <Routes>
          {/* Show Home (always accessible now) */}
          <Route path="/" element={<Home />} />

          {/* Previously protected routes — now open */}
          <Route path="/create" element={<Create />} />
          <Route path="/:id" element={<Update />} />
          <Route path="/cart" element={<Cart />} /> 

          {/* Public routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/success" element={<SuccessPage/>} />

          
        </Routes>
      </div>
    </div>
  );
}

export default App;
