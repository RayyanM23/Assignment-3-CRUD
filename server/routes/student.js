var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// Telling my router that I have this model
let Student = require('../model/student');
const student = require('../model/student');

/* Get route for the student list - Read Operation */
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

/* Read Operation --> Get route for displaying the studentExtras Page*/
router.get('/viewmore/:id', async(req,res,next) => {
    try{
        const id = req.params.id;
        const studentToFind = await Student.findById(id);
        res.render('Student/studentExtras',{
            title: `${studentToFind.firstName} ${studentToFind.lastName}`,
            Student: studentToFind
        })
    }
    catch(err){
        console.error(err);
        res.render('Student/list',{
            error:'Error on the Server'
        })
    }
});

/* Update Operation --> Get route for displaying the Edit Page*/
router.get('/edit/:id', async(req,res,next) => {
    try{
        const id = req.params.id;
        const studentToEdit = await Student.findById(id);
        res.render('Student/edit',{
            title: 'Edit Student Profile',
            Student: studentToEdit
        })
    }
    catch(err){
        console.error(err);
        res.render('Student/list',{
            error:'Error on the Server'
        })
    }
});
/* Update Operation --> Post route for processing the Edit Page*/
router.post('/edit/:id', async(req,res,next) => {
    try{
        let id = req.params.id;
        let updateStudent = Student({
            "_id":id,
            "firstName":req.body.firstName,
            "lastName":req.body.lastName,
            "Program":req.body.Program,
            "Degree":req.body.Degree,
            "GPA":req.body.GPA,
            "feesDue":req.body.feesDue,
            "addComment":req.body.addComment
        });
        Student.findByIdAndUpdate(id,updateStudent).then(()=>{
            res.redirect(`/students/viewmore/${id}`)
        })
    }
    catch(err){
        console.error(err);
        res.render('Student/list',{
            error:'Error on the Server'
        })
    }
});

/* Delete Operation --> Get route to perform Delete Operation*/
router.get('/delete/:id', async(req,res,next) => {
    try{
        let id = req.params.id;
        Student.deleteOne({_id:id}).then(()=>{
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