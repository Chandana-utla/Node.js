const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());


const connection = mysql.createConnection({
  host: 'localhost',     
  user: 'root',            
  password: 'chandu@2706', 
  database: 'nodedb'   
});


app.get('/', (req, res) => {
  res.send('Hello!');
});

app.delete('/users/delete/:id', (req, res) => {
    const { id } = req.params; 
  
    const query = 'delete from users where id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.log( err); 
         res.send('Error in  deleting  the user');
      }
      
      res.send('User deleted successfully');
    });
  });
  

  app.get('/users', (req, res) => {
    const query = 'select * from  users';
    connection.query(query, (err, results) => {
      if (err) {
        console.log(err); 
        res.send('Error');
      }
      res.send(JSON.stringify(results));  
  
    });
  });
  
app.post('/users/add', (req, res) => {
  const { name, id,email } = req.body;


  const query = 'insert   into  users (name,id, email) values (?,?, ?)';
  connection.query(query, [name,id, email], (err, results) => {
    if (err) {
      console.log(err); 
      res.send('Error adding user');
    }
    res.send('User added into the table');
  });
});



app.put('/users/update/:id', (req, res) => {
  const { id } = req.params;  
  const { name, email } = req.body;  

 const query = 'update users set name = ?, email = ? WHERE id = ?';
  connection.query(query, [name, email, id], (err, results) => {
    if (err) {
      console.log(err); 
      res.send('Error in  updating the  user');
    }
    
    res.send('User updated successfully');
  });
});



app.listen(3021, () => {
  console.log('Server running');
});
