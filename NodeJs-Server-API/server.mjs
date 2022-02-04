// Import All Libraries 
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Express Function
const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan('short'));

// Create Port 
const port = process.env.PORT || 3000;

// Create a Users Array
let users = [];

app.use((req, res, next) => {
    console.log("req come", req.body);
    next();
})

//Now Create Method get, post, put, delete

//Get all Records Get Method
app.get('/users', (req, res) => {
    res.send(users);
})

//Get Only One User 
app.get('/user/:id', (req, res) => {
    if (users[req.params.id]) {
        res.send(users[req.params.id])
    } else {
        res.send('user not found')
    }
})
//Add Post Record Post Method
app.post('/user', (req, res) => {
    if (!req.body.student_name || !req.body.father_name || !req.body.roll_no || !req.body.age) {
        res.status(400).send('invalid code');
    } else {
        users.push({
            student_name: req.body.student_name,
            father_name: req.body.father_name,
            roll_no: req.body.roll_no,
            age: req.body.age,
        })
        res.send("user created");
    }
})
//Add update Record put method
app.put('/users/:id', (req, res) => {
    if (users[req.params.id]) {
        if (req.body.student_name) {
            users[req.params.id].student_name = req.body.student_name
        }
        if (req.body.father_name) {
            users[req.params.id].father_name = req.body.father_name
        }
        if (req.body.roll_no) {
            users[req.params.id].roll_no = req.body.roll_no
        }
        if (req.body.age) {
            users[req.params.id].age = req.body.age
        }
        res.send(users[req.params.id])
    } else {
        res.send('user not found')
    }
})
//Delete Records
app.delete('/user', (req, res) => {
    if (users[req.params.id]) {
        users[req.params.id] = {};
        res.send('user deleted');
    } else {
        res.send('user not found');
    }
})
// Server Running Status
app.listen(port, () => {
    console.log('server is running');
})