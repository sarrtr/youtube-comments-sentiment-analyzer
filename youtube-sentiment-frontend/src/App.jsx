import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import ChartsPage from "./pages/ChartsPage";
import LoadingPage from "./pages/LoadingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/charts" element={<ChartsPage />} />
        <Route path="/loading" element={<LoadingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
