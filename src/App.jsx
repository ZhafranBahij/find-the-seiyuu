import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./component/Navbar";
import JakartaTime from "./component/JakartaTime";

function App() {
  return (
    <div className="h-screen">
      <Navbar />
      <JakartaTime />
    </div>
  );
}

export default App;
