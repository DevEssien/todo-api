import { RequestHandler} from 'express';

import { Todo } from '../models/todos';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const uniqueId = Math.random().toString();
    const text = (<{text: string}>req.body).text;
    const newTodo = new Todo(uniqueId, text);
    TODOS.push(newTodo)

    return res.status(201).json({
        status: 'success',
        message: 'Todo created',
        data: { createdTodo: newTodo }
    })
}

export const getTodos: RequestHandler = (req, res, next) => {
    return res.status(200).json({
        status: 'success',
        message: 'fetched todos',
        data: { TODOS }
    });
}

export const updateTodo: RequestHandler = (req, res, next) => {
    const todoId = (<{ todoId: string }>req.params).todoId;
    const text = (<{text: string}>req.body).text

    TODOS.find(todo => {
        if (todo?.id === todoId) {
            TODOS.map(t => {
                if (t.id === todoId) {
                    t.text = text;
                }
                return res.status(200).json({
                    status: 'success',
                    message: 'updated text successfully',
                    data: { updatedTodo: t}
                })
            })
        }
    });
}