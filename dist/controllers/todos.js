"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todos_1 = require("../models/todos");
const TODOS = [];
const createTodo = (req, res, next) => {
    const uniqueId = Math.random().toString();
    const text = req.body.text;
    const newTodo = new todos_1.Todo(uniqueId, text);
    TODOS.push(newTodo);
    return res.status(201).json({
        status: "success",
        message: "Todo created",
        data: { createdTodo: newTodo },
    });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    return res.status(200).json({
        status: "success",
        message: "fetched todos",
        data: { TODOS },
    });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    var _a;
    const todoId = req.params.todoId;
    const text = req.body.text;
    // TODOS.find(todo => {
    //     if (todo?.id !== todoId) throw new Error('todo with id not found!')
    //     TODOS.map(t => {
    //         if (t.id !== todoId) throw new Error('todo with id not found!');
    //         t.text = text;
    //         return res.status(200).json({
    //             status: 'success',
    //             message: 'updated text successfully',
    //             data: { updatedTodo: t, todos: TODOS}
    //         });
    //     })
    // });
    const todoIndex = TODOS.findIndex((todo) => (todo === null || todo === void 0 ? void 0 : todo.id) === todoId);
    if (todoIndex < 0)
        throw new Error("todo with id not found!");
    TODOS[todoIndex] = new todos_1.Todo((_a = TODOS[todoIndex]) === null || _a === void 0 ? void 0 : _a.id, text);
    return res.status(200).json({
        status: "success",
        message: "updated text successfully",
        data: { updatedTodo: TODOS[todoIndex], todos: TODOS },
    });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const todoId = req.params.todoId;
    const todoIndex = TODOS.findIndex((todo) => (todo === null || todo === void 0 ? void 0 : todo.id) === todoId);
    if (todoIndex < 0)
        throw new Error("todo with id not found!");
    // const remainingTodo = TODOS.filter(todo => todo?.id !== todoId);
    TODOS.splice(todoIndex, 1);
    return res.status(200).json({
        status: "success",
        message: "deleted a todo",
        data: { todos: TODOS },
    });
};
exports.deleteTodo = deleteTodo;
