import React from "react";
import TeamForm from "./components/TeamForm";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TeamDetails from "./components/TeamDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TeamForm />} />
          <Route path="/team" element={<TeamDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
