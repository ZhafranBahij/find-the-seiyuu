import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./component/Navbar";
import Anime from "./component/Anime";

function App() {
  return (
    <div className="h-screen">
      <Navbar />
      <Anime />
    </div>
  );
}

export default App;
