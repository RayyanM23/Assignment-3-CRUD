var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// Telling my router that I have this model
let Student = require('../model/student');
const student = require('../model/student');
// let studentController = require('../controllers/student.js')         !!!

/* Get route for the stduent list - Read Operation */
/* GET, Post, Put */

/* Read Operation --> Get route for displaying the students*/
router.get('/',async(req,res,next)=>{
try{
    const StudentList = await Student.find();
    res.render('Student/list',{
        title:'Students List',
        StudentList:StudentList
    })}
    catch(err){
        console.error(err);
        res.render('Student/list',{
            error:'Error on the Server'
        })
    }
});

/* Create Operation --> Get route for displaying the Add Page*/
router.get('/add', async(req,res,next) => {
    try{
        res.render('Student/add',{
            title: 'Add Student'
        })
    }
    catch(err){
        console.error(err);
        res.render('Student/list',{
            error:'Error on the Server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page*/
router.post('/add', async(req,res,next) => {
    try{
        let newStudent = Student({
            "firstName":req.body.firstName,
            "lastName":req.body.lastName,
            "Program":req.body.Program,
            "Degree":req.body.Degree,
            "GPA":req.body.GPA,
            "feesDue":req.body.feesDue,
            "addComment":req.body.addComment
        });
        Student.create(newStudent).then(()=>{
            res.redirect('/students')
        })
    }
    catch(err){
        console.error(err);
        res.render('Student/list',{
            error:'Error on the Server'
        })
    }
});

module.exports = router;