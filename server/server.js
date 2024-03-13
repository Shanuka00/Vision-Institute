/*
const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')


const app = express()

app.use(express.static(path.join(__dirname,"public")))
app.use(cors())
app.use(express.json())

const port = 3000

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "visionedu"
})

app.post('/add_user', (req, res)=>{
    sql = "INSERT INTO user (firstname, email, lastname, gender) VALUES (?, ?, ?, ?)";
    const values = {
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender
    }
    db.query(sql,values, (err, result)=>{
        if(err) return res.json({message: 'Something unexpected has occured' + err})
        return res.json({success: "Student added sucessfully"})
    })
})


app.listen(port, ()=>{
    console.log('listening')
})
*/



const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "visionedu"
});

app.post("/add_user", (req, res) => {
    const sql =
      "INSERT INTO user (userid, firstname, email, gender) VALUES (?, ?, ?, ?);";
    const values = [ req.body.age, req.body.name, req.body.email, req.body.gender];
    db.query(sql, values, (err, result) => {
      if (err)
        return res.json({ message: "Something unexpected has occured" + err });
      return res.json({ success: "Student added successfully" });
    });
});

app.listen(port, () => {
    console.log('Listening on port', port);
});