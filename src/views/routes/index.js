// ROUTES INDEX 

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
import {dbSettings, sql} from "../../database/connection";
import { body, CustomValidator, validationResult } from "express-validator";

 // +----------------------------------------------------------------------+
 //                       INDEX
router.get('/', (req, res) => {

  res.render('index.html', { title: 'Index' });
    
});


 //  ********************   EMPLOYEE   ***************************
 // +----------------------------------------------------------------------+
 //                         SHOW
router.get('/employee/show', (req, res) => {
  sql.connect(dbSettings, function(err){
    if(err){
      console.log("ERROR CONNECT: ", err);
    }

    let sqlRequest = new sql.Request();
    let sqlShowTable = 'SELECT * FROM dbo.employee ORDER BY id_employee';

    sqlRequest.query(sqlShowTable, function(err, data){
      if(err){
        console.log("ERROR SQL SHOW: ", err);
      } else {
          res.render('show.html', { title: 'Employee', data: data});
          sql.close();
      }
      
    });// </ sql.Request >
  });// </ sql.connect >
});// </ router.get >


 // +----------------------------------------------------------------------+
 //                                 CREATE
router.get('/employee/create', (req, res) => {
  res.render('create.html', { title: 'Employee' });
});

router.post('/employee/save', [

    // Validaciones de variables
    body('full_name', 'Add your full Name').exists().isLength({min:8}).isAlpha(),
    body('date_birth', 'Add a Date of birth').exists().toDate(),
    body('telephone', 'Add a Telephone').exists().isInt(),
    body('email', 'Add an E-mail').exists().isEmail(),
    body('salary', 'Enter your Salary').exists().isInt().isNumeric(),
    body('marital_status', 'Select your Marital status').exists()
  ], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){

      console.log(req.body);
      console.log(errors);
      const valores = req.body;
      const validaciones = errors.array();

      res.render('create.html', {validaciones: validaciones, valores: valores, title: 'Employee'});

    } else {
      // Variables with browser info
      var full_name = req.body.full_name;
      var date_birth = req.body.date_birth;
      var telephone = req.body.telephone;
      var email = req.body.email;
      var salary = req.body.salary;
      var marital_status = req.body.marital_status;

      // Connection and query
      sql.connect(dbSettings, function(err){
        if(err){
          console.log("ERROR CONNECTION: ", err);
        }
        let sqlRequest = new sql.Request();
        let sqlInsertInto = `INSERT INTO dbo.employee(full_name, date_birth, telephone, email, salary, marital_status) VALUES ('${full_name}','${date_birth}', '${telephone}','${email}', '${salary}','${marital_status}')`;

        sqlRequest.query(sqlInsertInto, function(err, data){
          if(err){
            console.log("ERROR SQL INSERT: ",err)
          }
          sql.close();
          res.redirect('/employee/show');

        }); // </ sql.Request >
      }); // </ sql.Connect >
    } // </ if errors >
  }); // </ routes.post >


 // +-------------------------------------------------------------------+
 //                           DELETE
router.get('/employee/delete:id', (req, res) => {

  sql.connect(dbSettings, function(err){
    
    if(err){
      console.log("ERROR CONNECTION: ", err);
    }

    let sqlRequest = new sql.Request();
    const EmpId = req.params.id;
    const id_employee = EmpId.toString();
    let sqlDelete = `DELETE FROM dbo.employee WHERE id_employee = '${id_employee}'`;

    sqlRequest.query(sqlDelete, function(err, data){
      if(err){
        console.log("ERROR QUERY DELETE: ", err);
      }
      sql.close();
      res.redirect('/employee/show');
    }); // </ sql.Request >
  }); // </ sql.Connect >
}); // </ router.get >

/*
 // Update
router.put('/employee/update', (req, res) => {
    res.render('update.html', { title: 'Employee' });
});
*/
module.exports = router;