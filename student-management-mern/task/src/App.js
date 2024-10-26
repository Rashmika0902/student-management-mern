import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentManagement from './StudentManagement';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StudentManagement />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/editStudent/:id" element={<EditStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
