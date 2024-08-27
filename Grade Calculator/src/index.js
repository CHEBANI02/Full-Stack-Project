const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
function calculateGPA(subjects) {    
    const totalMarks = subjects.reduce((acc, curr) => acc + parseInt(curr), 0);
    const gpa = totalMarks / (subjects.length * 10); 
    return gpa.toFixed(2); 
}
function gradeStudents(gpa) {
    const passThreshold = 4.0; 
    return gpa >= passThreshold ? 'Pass' : 'Fail';
}
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.post('/calculate', (req, res) => {
    const semester = req.body.semester;
    const subjects = req.body.subjects;
    const registrationNumber = req.body.registrationNumber; 
    if (!semester || !subjects || !Array.isArray(subjects) || subjects.length !== 5 || !registrationNumber) {
        return res.status(400).json({ error: 'Invalid input. Please provide semester, marks for 5 subjects, and a registration number.' });
    }
    const gpa = calculateGPA(subjects);
    const grade = gradeStudents(gpa);
    const result = {
        semester: semester, 
        subjects: subjects,
        registrationNumber: registrationNumber, 
        gpa: gpa,
        grade: grade
    };
    res.json(result);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});