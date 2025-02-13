import { Routes, Route } from "react-router-dom";
import Collection from "./pages/Collection";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProductList from "./components/ProductList";

export default function App() {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      
      <Navbar />

      <Routes>
        <Route path="/" element={<Collection />}/>
        <Route path="/admin" element={<ProductList />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/place-order" element={<PlaceOrder />}/>
        <Route path="/orders" element={<Orders />}/>
      </Routes>
    </div>
  )
}