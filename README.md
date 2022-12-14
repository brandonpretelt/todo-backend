# API Endpoints

## GET /todos
This endpoint simply returns all todos and displays them.

## POST /todos
This endpoint both creates a new entry and returns and displays the todos with the new entry.

## PUT /todos
This endpoint takes in the query.id parameter of the request object, and when the id of the todos matches, will edit the content of the todo. 

## DELETE /todos
This endpoint takes an id, and if matched, returns the id and then splices it out the item that matches the id. 
