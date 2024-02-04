import Canvas from "./canvas"
import Navbar from "./components/Bars/Navbar"
import Customizer from "./pages/Customizer"
import Gallery from "./pages/Gallery"
import Home from "./pages/Home"
import Test from "./pages/Test"

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={
          <main className="app transition-all ease-in">
            <Home />
            <Canvas />
            <Gallery />
            <Customizer />
          </main>
        } />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/test/:id" element={<Test />} />
      </Routes>
    </Router>
  )
}

export default App
