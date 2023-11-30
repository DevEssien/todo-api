"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todos_1 = require("../models/todos");
const TODOS = [];
const createTodo = (req, res, next) => {
    const uniqueId = Math.random().toString();
    const text = req.body.text;
    const newTodo = new todos_1.Todo(uniqueId, text);
    TODOS.push(newTodo);
    return res.status(201).json({
        status: 'success',
        message: 'Todo created',
        data: { createdTodo: newTodo }
    });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    return res.status(200).json({
        status: 'success',
        message: 'fetched todos',
        data: { TODOS }
    });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const todoId = req.params.todoId;
    const text = req.body.text;
    TODOS.find(todo => {
        if ((todo === null || todo === void 0 ? void 0 : todo.id) === todoId) {
            TODOS.map(t => {
                if (t.id === todoId) {
                    t.text = text;
                    return res.status(200).json({
                        status: 'success',
                        message: 'updated text successfully',
                        data: { updatedTodo: t, todos: TODOS }
                    });
                }
            });
        }
    });
};
exports.updateTodo = updateTodo;
