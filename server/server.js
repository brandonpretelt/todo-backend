const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

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
    const { id, newContent, todoContent } = req.query;
    let updatedTodo = {
        todoContent: newContent
    };
    let updatedTodosList = todos.filter((item) => {
        if (item.id === parseInt(id)) {
            return (item.todoContent = updatedTodo.todoContent);
        }
    });
    res.status(200).send(todos);
});

app.delete('/todos', (req, res) => {
    let { id } = req.query;
    let deleted = todos.findIndex((item) => item.id === id);
    todos.splice(deleted, 1);
    res.send(todos);
});

app.get('/todos/categories', (req, res) => {
    let categoryArray = [];
    let { category } = req.query;
    todos.filter((item) => {
        console.log(typeof item.category);
        if (item.category === category) {
            if (
                Array.isArray(item.category) ||
                typeof item.category == 'object'
            ) {
                categoryArray.push(Array.from(category));
            }
            categoryArray.push(item);
        }
    });
    res.send(categoryArray);
});

app.get('/todos/categories/:view', (req, res) => {
    let categoryArray = [];
    let { category } = req.query;
    todos.filter((item) => {
        if (item.category === category) {
            categoryArray.push(item.category);
        }
    });
    res.send(categoryArray);
});

app.post('/todos/categories', (req, res) => {
    let { id, category } = req.query;
    let newCategory;
    if (category) {
        newCategory = [...category.split(',')];
    }
    let addNewCategory = todos.filter((item) => {
        if (item.id === parseInt(id)) {
            return (item.category = newCategory);
        }
    });
    res.send(todos);
    /*     let { id, newCategory, category } = req.query;
    let addedCategory = {
        category: newCategory
    };
    console.log(typeof id);
    let addNewCategory = todos.filter((item) => {
        if (item.id === parseInt(id)) {
            console.log(typeof item.id);
            return (item.category = [item.category, addedCategory.category]);
        }
    });
    console.log(todos);
    res.send(todos); */
});

app.put('/todos/categories', (req, res) => {
    let { editedCategory, category, id } = req.query;
    let updatedCategory = {
        category: editedCategory
    };
    let updatedCategories = todos.filter((item) => {
        if (item.id === parseInt(id)) {
            return (item.category = updatedCategory.category);
        }
    });
    res.status(200).send(todos);
    /*let categories = [];
    category = updatedCategory;
    categories.push({ category });
    res.status(200).send(categories);*/
});

app.delete('/todos/categories', (req, res) => {
    let { category } = req.query;
    let deleted = todos.filter((item) => {
        if (item.category === category) {
            return;
        }
    });

    res.send(deleted);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
