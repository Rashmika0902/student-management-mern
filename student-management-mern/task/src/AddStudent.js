import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Container, Typography, Button,Box } from '@mui/material';
import NavBar from './NavBar';
const AddStudent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [math, setMath] = useState('');
  const [physics, setPhysics] = useState('');
  const [chemistry, setChemistry] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare student data to be sent to the backend
    const studentData = {
      name,
      email,
      dob,
      math: Number(math),       // Convert input values to numbers
      physics: Number(physics),
      chemistry: Number(chemistry),
    };

    try {
      // Send a POST request to add the student
      await axios.post('http://localhost:3000/api/student', studentData);
      navigate('/'); // Redirect to StudentManagement after adding the student
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleBackClick = () => {
    navigate('/'); // Navigate to the StudentManagement screen
  };

  return (
    <>
      <NavBar />
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box 
        sx={{ 
          backgroundColor: '#f9f9f9', // Set background color for the overall box
          border: '1px solid #ccc', // Border around the box
          borderRadius: '8px', // Rounded corners
          padding: '20px', // Padding inside the border
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Shadow for depth
          display: 'flex', // Use flexbox
          flexDirection: 'column', // Stack items vertically
          alignItems: 'center', // Center items horizontally
          width: '500px', // Adjust width
          margin: '0 auto' // Center the box
        }}
      >
        <Typography variant="h4" component="h3" align="center" sx={{ mb: 1, fontWeight: 'bold' }}>
          Add Student
        </Typography>
        
        <Box sx={{ width: '100%', borderBottom: '1px solid #ccc', mb: 2 }} />

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ width: '100%' }}
        >
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{
              mb: 2,
              backgroundColor: 'white', // Make input field white
              borderRadius: '4px' // Round corners for the field
            }}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              mb: 2,
              backgroundColor: 'white', // Make input field white
              borderRadius: '4px'
            }}
          />
          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            sx={{
              mb: 2,
              backgroundColor: 'white', // Make input field white
              borderRadius: '4px'
            }}
          />
          <TextField
            label="Mathematics"
            type="number"
            fullWidth
            value={math}
            onChange={(e) => setMath(e.target.value)}
            required
            sx={{
              mb: 2,
              backgroundColor: 'white', // Make input field white
              borderRadius: '4px'
            }}
          />
          <TextField
            label="Physics"
            type="number"
            fullWidth
            value={physics}
            onChange={(e) => setPhysics(e.target.value)}
            required
            sx={{
              mb: 2,
              backgroundColor: 'white', // Make input field white
              borderRadius: '4px'
            }}
          />
          <TextField
            label="Chemistry"
            type="number"
            fullWidth
            value={chemistry}
            onChange={(e) => setChemistry(e.target.value)}
            required
            sx={{
              mb: 2,
              backgroundColor: 'white', // Make input field white
              borderRadius: '4px'
            }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                sx={{ 
                                    backgroundColor: '#6cd0b0', 
                                    color: '#fff', 
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: '#4ab59b',  // Darker shade for hover effect
                                    },
                                }}
                            >
                                Add Student
                            </Button>

                            <Button
                                variant="outlined"
                                onClick={handleBackClick}
                                sx={{
                                    padding: '10px 20px',
                                    backgroundColor: '#ccc',
                                    border: 'none',
                                    borderRadius: '4px',
                                    color: '#000',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: '#999',  // Darker shade for hover effect
                                    },
                                }}
                            >
                                Back
                            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
    </>
  );
};

export default AddStudent;
