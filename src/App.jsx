import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./component/Navbar";
import Anime from "./component/Anime";

function App() {
  return (
    <div className="h-screen">
      <Navbar />
      <div className=" min-h-screen bg-neutral-800 flex flex-col items-center justify-center">
        <h1 className="mb-10 mt-10 text-4xl sm:text-5xl text-transparent font-title font-bold bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
          Find The Seiyuu
        </h1>
        <Anime />
      </div>
    </div>
  );
}

export default App;
