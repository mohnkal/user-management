// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import UsersList from './components/UsersList';
// import TeamForm from './components/TeamForm';
// import TeamDetails from './components/TeamDetails';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<UsersList />} />
//           <Route path="/team/new" element={<TeamForm />} />
//           <Route path="/team/:id" element={<TeamDetails />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import UsersList from './components/UsersList';
import TeamForm from './components/TeamForm';

function App() {
  return (
    <div className="App">
      <h1>User Management System</h1>
      <UsersList />
      <TeamForm />
    </div>
  );
}

export default App;
