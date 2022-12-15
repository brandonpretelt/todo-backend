const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let todos = [
    {
        id: 0,
        todoContent: 'words',
        done: false,
        category: 'none'
    },
    {
        id: 1,
        todoContent: 'words 2',
        done: false,
        category: 'none'
    },
    {
        id: 2,
        todoContent: 'words 3',
        done: false,
        category: 'none'
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
    let { searchCat } = req.query;

    todos = todos.filter((item) => {
        if (item.category === searchCat) {
            return item;
        } else if (Array.isArray(item.category)) {
            return item;
        }
    });

    res.send(todos);
});

app.get('/todos/categories/view-categories', (req, res) => {
    let categoryArray = [];
    let { category } = req.query;
    categoryArray = todos.filter((item) => {
        if (item.category === category) {
            return item.category;
        } else if (Array.isArray(item.category)) {
            return item.category;
        }
    });

    res.send(categoryArray[0].category);
});

app.post('/todos/categories', (req, res) => {
    let { id, newCategory, category } = req.query;
    let addedCategory = {
        category: newCategory.split(',')
    };

    let addNewCategory = todos.filter((item) => {
        if (item.id === parseInt(id)) {
            return (item.category = [
                item.category,
                addedCategory.category
            ].flat(1));
        }
    });
    res.send(todos);
});

app.put('/todos/categories', (req, res) => {
    let { editedCategory, category, id } = req.query;
    let updatedCategory = {
        category: editedCategory
    };

    let editedCategories = todos.filter((item) => {
        if (item.id === parseInt(id) && Array.isArray(item.category)) {
            return item.category.splice(
                item.category.indexOf(category),
                1,
                updatedCategory.category
            );
        }
        if (item.id === parseInt(id) && !Array.isArray(item.category)) {
            return (item.category = updatedCategory.category);
        }
    });

    res.status(200).send(todos);
});

app.delete('/todos/categories', (req, res) => {
    let { category } = req.query;
    todos = todos.filter((item) => {
        if (Array.isArray(item.category)) {
            return item.category.splice(
                item.category.indexOf(category),
                1,
                'none'
            );
        }
        if (item.category === category && !Array.isArray(item.category)) {
            return (item.category = 'none');
        }
    });

    res.send(todos);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
