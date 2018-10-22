const express = require('express');
var morgan = require('morgan')

const todos = require('./todos.json')

const app = express();
app.use(express.static(__dirname + '/public'))

app.set('view engine', 'pug');

// function log(req,res,next) {
//     let date = new Date(Date.now());

//     console.log(`${date} - ${req.method} - ${req.url}`);

//     next();
// }
// app.use(log);

app.use(morgan('combined'))

app.get('/', (req, res) => {
    // res.send('Express')

    res.render('index', {title: 'express todo', todos})
})

app.get('/todos', (req, res) => {

    if (req.query.completed) {
        let todos_completed = todos.filter((todo) => todo.completed.toString() === req.query.completed);

        return res.json(todos_completed)
    }
    

    res.json(todos)
})

app.get('/todos/:id', (req, res) => {
    let todo = todos.find((todo) => todo.id == req.params.id)

    if (!todo) {
        return res.sendStatus(404);
    }
    res.json(todo)
})

app.listen(3000, () => {
    console.log('server listening')
})