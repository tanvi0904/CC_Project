const express = require('express');
const cors=require('cors');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const db=mysql.createPool({
    host: 'ccdatabase.c95irdynjpct.us-west-2.rds.amazonaws.com',
    user: 'admin',
    password: 'database',
    database: 'todocc'
})

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());
app.post("/api/insert",(req,res)=>{
    const sqlinsert="INSERT INTO todolist (listname,completion) VALUES (?,0)";
    db.query(sqlinsert,[req.body.listname],(err,result)=>{
        console.log(result);
    });
});
app.post("/api/update",(req,res)=>{
    const sqlupd="UPDATE todolist SET completion=1 WHERE listname=?";
    db.query(sqlupd,[req.body.listname],(err,result)=>{
        console.log(result);
    });
});
app.post("/api/remove",(req,res)=>{
    const sqlupd="DELETE from todolist WHERE listname=?";
    db.query(sqlupd,[req.body.listname],(err,result)=>{
        console.log(result);
    });
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
