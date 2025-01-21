const express = require('express');
const mysql = require('mysql2');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',  
  user: 'root',       
  password: 'chandu@2706', 
  database: 'practice'   
});


connection.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connected to database');
});


app.get('/', (req, res) => {
  res.send('Successful!');
});

app.listen(3001, () => {
  console.log(`Server is running `);
});
