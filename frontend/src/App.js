import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar.jsx'
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Shop from "./Pages/Shop.jsx";
import Cart from './Pages/Cart.jsx';
import LoginSignup from './Pages/LoginSignup.jsx';
import About from './Pages/About.jsx';
import Contact from './Pages/Contact.jsx';
import CarBook from "./Pages/CarBook.jsx";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/car-booking' element={<CarBook/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/loginsignup' element={<LoginSignup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
