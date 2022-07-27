const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const db = require("../config/db");

router.post("create", (req, res)=>
{
    const{name} = req.body;
    console.log(name);
    if(!name) return res.status(404).json({msg: "Please enter a course name."});

    let sqlCheck = `Select * from courses where slug = ?`
    let sql = `INSERT INTO courses SET ?`
})


module.exports = router;