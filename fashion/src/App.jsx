import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import Home from "./components/Home";
import Campaign from "./components/Campaign";
import ProductDetail from "./components/ProductDetail";
import Men from "./components/Men";
import Women from "./components/Women";
import { CartProvider } from "./context/CartContext";
import Footer from "./components/Footer";
import CartDrawer from "./components/Cart";
import About from "./components/About";
import Collections from "./components/Collections";


function App() {

  return (
    <CartProvider>
  <BrowserRouter>

  <Nav />
  <CartDrawer />
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaign" element={<Campaign />} />
           <Route path="/collections" element={<Collections />} />
               <Route path="/men" element={<Men />} />
                    <Route path="/women" element={<Women />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/collections" element={<Collections />} />

<Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      <Footer />
      
  </BrowserRouter>
      
    </CartProvider>
  )
}

export default App
