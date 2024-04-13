const {execSync} = require('child_process');
const fs = require('fs');
const Classroom = require('../models/classroom');
const express = require('express');
const router = express.Router();
const cookie = require('cookie');
router.post('/run', async(req, res) => {
    const {code, classroom_id, assignment} = req.body;
    const cookies = cookie.parse(req.headers.cookie);
    const username = cookies.username;
    const path = `./${username}/${classroom_id}/${assignment}`;
    fs.mkdirSync(path, {recursive: true});
    const clasa = await Classroom.findOne({_id: classroom_id});
    if(!clasa){
        return res.status(400).json({success: false, error: 'Invalid classroom'})
    }
    const user = clasa.students.find(student => student.username === username);
    if(!user){
        return res.status(401).json({success: false, error: 'Unauthorized'})
    }
    fs.writeFileSync(`${path}/main.cpp`, code);
    const compile = execSync(`g++ ${path}/main.cpp -o ${path}/main`, {
        encoding: 'utf-8'
    });
    if(compile){
        return res.status(400).json({success: false, error: {
            message: compile,
            type: 'compile_error'
        }})
    }
    clasa.assignments[assignment].forEach(test => {
        
    });
})