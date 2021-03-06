// ROUTES INDEX 

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {sql, dbSettings} = require('../../infra/db/connection');

 // +----------------------------------------------------------------------+
 //                       INDEX
router.get('/', (req, res) => {

  console.log(req.oidc.isAuthenticated());
  res.render('../../../public/html/index.html', { title: 'Index' });
    
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
          res.render('../../../public/html/employee/show.html', { title: 'Employee', data: data});
          sql.close();
      }
      
    });// </ sql.Request >
  });// </ sql.connect >
});// </ router.get >


 // +----------------------------------------------------------------------+
 //                                 CREATE
router.get('/employee/create', (req, res) => {
  res.render('../../../public/html/employee/create.html', { title: 'Employee' });
  
});

router.post('/employee/save', (req, res) => {

  var reqData = JSON.parse(JSON.stringify(req.body));
  console.log("Data Post: ", reqData);

  // Variables with browser info
  var full_name = reqData["full_name"];
  var date_birth = reqData["birth_date"];
  var telephone = reqData["telephone"];
  var email = reqData["email"];
  var salary = reqData["salary"];
  var marital_status = reqData["marital_status"];

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
          res.redirect('../../../public/html/employee/show.html');

        }); // </ sql.Request >
      }); // </ sql.Connect >
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
      res.redirect('../../../public/html/employee/show.html');
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