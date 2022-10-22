import { Register, Login, Home } from "./pages";
import { Routes, Route } from "react-router-dom";

import "./styles/global.scss";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
