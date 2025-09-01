import { BrowserRouter, Routes, Route } from "react-router-dom";
import Commerce from "../commerce";
import { HomePage } from "../HomePage";
import NotFound from "../NotFound";
import { ToastContainer } from "react-toastify";
import Cart from "../Cart";

export function AppRouter() {
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/commerce" element={<Commerce />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="*" element={<NotFound/>} />
        
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}
