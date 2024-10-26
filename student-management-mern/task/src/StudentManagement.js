import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../src/styles/StudentManagement.css';
import NavBar from './NavBar';
import SearchBar from './SearchBar'; // Import the SearchBar component
import { IconButton } from '@mui/material';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/student')
      .then((response) => {
        const sortedStudents = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setStudents(sortedStudents);
        setFilteredStudents(sortedStudents);
      })
      .catch((error) => console.error('Error fetching students:', error));
  }, []);

  const handleDelete = (studentId) => {
    axios.delete(`http://localhost:3000/api/student/${studentId}`)
      .then(() => {
        const updatedStudents = students.filter((student) => student._id !== studentId);
        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents);
      })
      .catch((error) => console.error('Error deleting student:', error));
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    setFilteredStudents(() => {
      if (!isNaN(term) && term) {
        const indexNumber = parseInt(term, 10);
        return students.filter((_, index) => index === indexNumber - 1);
      }
      return students.filter((student) =>
        student.name.toLowerCase().includes(term)
      );
    });
  };

  return (
    <>
      <NavBar />
      <div className="table-container">
        <div className="header" >
          <Link to="/addStudent" className="add-btn" style={{ fontSize: "17px", fontWeight: "bold" }}>
            ADD NEW STUDENT +
          </Link>
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Mathematics</th>
              <th>Physics</th>
              <th>Chemistry</th>
              <th>Cutoff</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="10" className="no-students">No students available</td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td>{students.indexOf(student) + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{new Date(student.dob).toLocaleDateString()}</td>
                  <td>{student.math}</td>
                  <td>{student.physics}</td>
                  <td>{student.chemistry}</td>
                  <td>{student.cutoffMarks ? student.cutoffMarks.toFixed(2) : 'N/A'}</td>
                  <td>
                    <Link to={`/editStudent/${student._id}`} className="edit">
                      <ModeEditIcon style={{ color: 'green' }} />
                    </Link>
                  </td>
                  <td>
                    <IconButton onClick={() => handleDelete(student._id)}>
                      <DeleteIcon style={{ color: 'red' }} />
                    </IconButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentManagement;
