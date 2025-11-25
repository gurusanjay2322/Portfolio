import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cursor from "./components/Cursor";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="bg-paper dark:bg-void min-h-screen text-ink dark:text-text selection:bg-silk selection:text-white overflow-hidden perspective-1000 transition-colors duration-500">
        <Cursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
