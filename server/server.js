const express = require('express');
const app = express();

let todos = [
    {
        id: 0,
        todoContent: 'words',
        done: false,
        category: 'home'
    },
    {
        id: 1,
        todoContent: 'words 2',
        done: false,
        category: 'work'
    },
    {
        id: 2,
        todoContent: 'words 3',
        done: false,
        category: 'work'
    }
];

app.get('/todos', (req, res) => {
    res.send(todos);
});

app.post('/todos', (req, res) => {
    todos.push({
        id: 3,
        todoContent: req.query.todoContent,
        done: false,
        category: 'none'
    });
    res.send(todos);
});

app.put('/todos', (req, res) => {
    const { id } = req.query;
    let updatedTodos;
    todos.filter((item) => {
        updatedTodos = [];
        if (item.id === id) {
            updatedTodos.push({
                id: id,
                todoContent: req.query.todoContent,
                done: false,
                category: 'none'
            });
        }
    });

    res.status(200).send(updatedTodos);
});

app.delete('/todos', (req, res) => {
    let { id } = req.query;
    let deleted = todos.filter((item) => {
        if (item.id === id) {
            return;
        }
    });

    res.send(deleted);
});

app.get('/todos/category', (req, res) => {
    let categories = [];
    let { category } = req.query;
    todos.filter((item) => {
        if (item.category === category) {
            categories.push(item);
        }
    });
    res.send(categories);
});

app.get('/todos/category/:view', (req, res) => {
    let categories = [];
    let { category } = req.query;
    todos.filter((item) => {
        if (item.category === category) {
            categories.push(item.category);
        }
    });
    res.send(categories);
});

app.post('/todos/category', (req, res) => {
    let categories = [];
    let { newCategory } = req.query;
    categories.push(newCategory);
    res.send(categories);
});

app.put('/todos/category', (req, res) => {
    let { updatedCategory, category } = req.query;
    let categories = [];
    category = updatedCategory;
    categories.push(category);
    res.status(200).send(categories);
});

app.delete('/todos/category', (req, res) => {
    let { category } = req.query;
    let deleted = todos.filter((item) => {
        if (item.category === category) {
            return;
        }
    });

    res.send(deleted);
});

app.listen(3000, () => console.log('listening on port 3000'));
