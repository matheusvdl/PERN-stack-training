const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

    //create todo
    app.post('/todos', async (req, res) =>{
        try {
            const {description} = req.body;
            const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
            
            res.json(newTodo.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    });

    //get all todo
    app.get('/todos', async (req, res)=>{
        try {
            const todos = await pool.query("SELECT * FROM todo");
            res.json(todos.rows);
        } catch (error) {
            console.error(err.message);
        }
    });

    //get a todo
    app.get('/todos/:id', async (req, res)=>{
        try {
            const {id} = req.params;
            const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
            

            res.json(todo.rows[0]);
        } catch (error) {
            console.error(err.message);
        }
    });
    //update todo
    app.put('/todos/:id', async (req, res)=>{
        try {
            const {id} = req.params;
            const {description} = req.body;
            const update = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
            

        res.json("UPDATOU");
        } catch (error) {
            console.error(err.message);
        }
    });
    //delete todo
    app.delete('/todos/:id', async (req, res)=>{
        try {
            const {id} = req.params;
            const deleteTodo = await pool.query("DELETE  FROM todo WHERE todo_id = $1", [id]);
            

        res.json("removed");
        } catch (error) {
            console.error(err.message);
        }
    });

app.listen(5000, ()=>{
    console.log('server is running')
})