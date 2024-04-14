const {execSync} = require('child_process');
const fs = require('fs');
const Classroom = require('../models/clasroom');
const express = require('express');
const router = express.Router();
const cookie = require('cookie');
const path = require('path');
function createAssignmentDirectory(username, classroom_id, assignment) {
    const safeUsername = username.replace(/[^\w.-]/g, ''); // Sanitize username
    const safePath = path.join('.', safeUsername, classroom_id.toString(), assignment.toString());
    fs.mkdirSync(safePath, {recursive: true});
    return safePath;
}
function sanitizeCode(userCode) {
    const allowedHeaders = [
        'iostream', 'iomanip', 'fstream', 'cstdio', 'cstdlib',
        'cstring', 'cmath', 'ctime', 'cctype', 'cassert',
        'vector', 'list', 'deque', 'stack', 'queue', 'map',
        'set', 'algorithm', 'numeric', 'utility', 'bitset',
        'string', 'sstream', 'fstream', 'iostream', 'ios',
        'iomanip', 'iosfwd', 'istream', 'ostream', 'fstream',
        'stringstream', 'iostream', 'complex', 'valarray',
        'iterator', 'functional', 'locale', 'memory', 'new',
        'exception', 'typeinfo', 'type_traits', 'bitset',
        'atomic', 'future', 'chrono', 'mutex', 'thread'
    ];

    let sanitizedCode = userCode.replace(/#include\s*<([^>]+)>/g, (match, header) => {
        if (allowedHeaders.includes(header.trim())) {
            return match; 
        } else {
            return ''; 
        }
    });
    sanitizedCode = sanitizedCode.replace(/system\s*\(.+?\)/g, '');

    return sanitizedCode;
}
function trimBothEnds(str) {
    return str.replace(/^[\s\n\t]+|[\s\n\t]+$/g, '');
}
router.post('/run', async(req, res) => {
    try{
        const {classroom_id, assignment} = req.body;
        console.log(req.body);
        let {code} = req.body;
        code = sanitizeCode(code);
        /* const cookies = cookie.parse(req.headers.cookie);
        const username = cookies.username; */
        const username = 'test';
        const path = createAssignmentDirectory(username, classroom_id, assignment);
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
        const results = []
        clasa.assignments[assignment].tests.forEach(test => {
            const input = test.input;
            const output = test.output;
            let result = execSync(`${path}/main`, {
                input: input,
                encoding: 'utf-8'
            })
            result = trimBothEnds(result);
            if(result === output){
                results.push({input, output, result, status: 'AC'})
            }
            else{
                results.push({input, output, result, status: 'WA'})
            }
        });
        date = new Date();
        const submission = {
            classroom_id,
            assignment,
            date,
            results
        }
        user.submissions.push(submission);
        await clasa.save();
        await user.save();
        res.status(200).json({success: true, results})
    }catch(error){
        res.status(500).json({error: error.stderr, success: false})
    }
})
module.exports = router;