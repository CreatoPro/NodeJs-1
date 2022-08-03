const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const db = require("../config/db");

router.post("create", (req, res)=>
{
    const{name} = req.body;
    console.log(name);
    if(!name) return res.status(404).json({msg: "Please enter a course name."});

    let sqlCheck = `Select * from courses where slug = ?`;
    let sql = `INSERT INTO courses SET ?`;
    const slug = sligify(name).toLowerCase();

    db.query(sqlCheck, slug,(err, course) =>
    {
        if(course.length > 0) 
        return res.status(400).json({msg: "Course Exits"});
        

        const data ={
            course_name: name.toLowerCase(),
            slug: slugify(name).toLowerCase()
        };
    
        db.query(sql, data, (err, result) => {
            if (err) return res.status(400).json({msg: "Unable to insert course"});

            return res.status(200).json({data});
        })
    
    })
})


module.exports = router;