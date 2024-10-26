import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Container, Typography, Button, Box } from '@mui/material';
import NavBar from './NavBar';

const EditStudent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [math, setMath] = useState('');
  const [physics, setPhysics] = useState('');
  const [chemistry, setChemistry] = useState('');
  const navigate = useNavigate(); 
  const { id } = useParams(); 

  useEffect(() => {
    // Fetch the student data to edit
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/student/${id}`);
        const student = response.data;
        
        // Pre-fill the form fields with the fetched data
        setName(student.name);
        setEmail(student.email);
        setDob(student.dob.split('T')[0]); 
        setMath(student.math);
        setPhysics(student.physics);
        setChemistry(student.chemistry);
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare updated student data to be sent to the backend
    const studentData = {
      name,
      email,
      dob,
      math: Number(math),       
      physics: Number(physics),
      chemistry: Number(chemistry),
    };

    try {
      // Send a PUT request to update the student
      await axios.put(`http://localhost:3000/api/student/${id}`, studentData);
      navigate('/'); 
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleBackClick = () => {
    navigate('/'); 
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Box 
          sx={{ 
            backgroundColor: '#f9f9f9', 
            border: '1px solid #ccc', 
            borderRadius: '8px', 
            padding: '20px', 
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '500px', 
            margin: '0 auto'
          }}
        >
          <Typography variant="h4" component="h3" align="center" sx={{ mb: 1, fontWeight: 'bold' }}>
            Edit Student
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
                backgroundColor: 'white', 
                borderRadius: '4px' 
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
                backgroundColor: 'white', 
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
                backgroundColor: 'white', 
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
                backgroundColor: 'white', 
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
                backgroundColor: 'white', 
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
                backgroundColor: 'white', 
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
                    backgroundColor: '#4ab59b',  
                  },
                }}
              >
                Update Student
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
                    backgroundColor: '#999',  
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

export default EditStudent;
