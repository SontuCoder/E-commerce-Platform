import React,{useState} from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from "./Pages/Shop.jsx";
import Cart from './Pages/Cart.jsx';
import LoginSignup from './Pages/LoginSignup.jsx';
import About from './Pages/About.jsx';
import Contact from './Pages/Contact.jsx';
import CarBook from "./Pages/CarBook.jsx";
import Bulb from './Pages/Item_Render_Page/Bulb.jsx';
import ItemPage from './Components/Item_Page/Item_Page.jsx';
import Order from './Pages/Order.jsx';
import User from './Pages/User.jsx';
import { Toaster } from 'react-hot-toast';


function App() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar cartCount={cartCount} updateCartCount={updateCartCount}/>
        <Toaster reverseOrder={false} />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/car-booking' element={<CarBook />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path="/cart" element={<Cart updateCartCount={updateCartCount} />} />
          <Route path='/loginsignup' element={<LoginSignup />} />
          <Route path="/bulb/:catagori" element={<Bulb/>} /> 
          <Route path='/item_page/:id' element={<ItemPage/>} />
          <Route path='/order' element={<Order/>} />
          <Route path='/userdasboard' element={<User/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
