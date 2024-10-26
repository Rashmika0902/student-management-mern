const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT||3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/studentDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Student schema and model
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: Date, required: true },
    math: { type: Number, required: true },
    physics: { type: Number, required: true },
    chemistry: { type: Number, required: true },
    cutoffMarks: { type: Number } 
});

const Student = mongoose.model('Student', studentSchema);


// Get all students
app.get('/api/student', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

// Add a new student and send email
app.post('/api/student', async (req, res) => {
    const { name, email, dob, math, physics, chemistry } = req.body;
    const totalMarks = math + physics + chemistry;
    const averageMarks = totalMarks / 3;
    const cutoffMarks = averageMarks; 

    const student = new Student({ 
        name, 
        email, 
        dob, 
        math, 
        physics, 
        chemistry, 
        cutoffMarks 
    });
    
    try {
        await student.save();
        
        // Send an email after adding the student
        sendEmail(student, 'add', res);

        res.status(201).json(student);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

// Update a student and send email
app.put('/api/student/:id', async (req, res) => {
    const { name, email, dob, math, physics, chemistry } = req.body;
    
    // Calculate total and average marks
    const totalMarks = math + physics + chemistry;
    const averageMarks = totalMarks / 3;
    const cutoffMarks = averageMarks;

    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, { 
            name, 
            email, 
            dob, 
            math, 
            physics, 
            chemistry, 
            cutoffMarks 
        }, { new: true });

        if (!updatedStudent) {
            return res.status(404).send('Student not found');
        }

        // Send an email after updating the student
        sendEmail(updatedStudent, 'update', res);

        res.json(updatedStudent);
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).send('Internal Server Error');
    }
});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 587, // Use port 587 for TLS
    secure: false, // Use true for 465, false for 587
    auth: {
        user: 'rashmi09902@gmail.com', 
        pass: 'oqhloidmepaggpjl' 
    }
});

// Function to send email
const sendEmail = (student, action, res) => {
    const subject = action === 'add' ? 'Student Added Successfully' : 'Student Details Updated';
    const text = `Hello ${student.name},\n\nYour cutoff marks: ${student.cutoffMarks} have been ${action === 'add' ? 'added' : 'updated'} successfully.\n\nBest Regards,\nYour School`;

    const mailOptions = {
        from: 'rashmi09902@gmail.com', 
        to: student.email, 
        subject: subject,
        text: text
    };

    console.log('Sending email to:', student.email); 

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error); 
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent:', info.response);
    });
};


// Delete a student
app.delete('/api/student/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 