
import './App.css';
import Navbar from './Components/Navbar/Navbar.jsx'
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Shop from "./Pages/Shop.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
