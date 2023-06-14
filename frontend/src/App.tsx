import React from "react";
import "./App.css";

function App() {
  return (
    <div className="main-content">
      <h1 className="text-6xl mb-10">Explore these brands:</h1>
      <div className="cards-container">
        <div className="brand1">
          <div className="card">
            All three of these cards have the same class
          </div>
        </div>
        <div className="brand2">
          <div className=" card">
            Observe how they look different from each other despite having the
            same class
          </div>
        </div>
        <div className="brand3">
          <div className="card">
            This is from specific custom variables in each brand
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
