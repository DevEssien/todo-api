import { RequestHandler } from "express";

import { Todo } from "../models/todos";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const uniqueId = Math.random().toString();
  const text = (<{ text: string }>req.body).text;
  const newTodo = new Todo(uniqueId, text);
  TODOS.push(newTodo);

  return res.status(201).json({
    status: "success",
    message: "Todo created",
    data: { createdTodo: newTodo },
  });
};

export const getTodos: RequestHandler = (req, res, next) => {
  return res.status(200).json({
    status: "success",
    message: "fetched todos",
    data: { TODOS },
  });
};

export const updateTodo: RequestHandler<{ todoId: string }> = (
  req,
  res,
  next
) => {
  const todoId = req.params.todoId;
  const text = (<{ text: string }>req.body).text;

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

  const todoIndex = TODOS.findIndex((todo) => todo?.id === todoId);
  if (todoIndex < 0) throw new Error("todo with id not found!");

  TODOS[todoIndex] = new Todo(TODOS[todoIndex]?.id, text);

  return res.status(200).json({
    status: "success",
    message: "updated text successfully",
    data: { updatedTodo: TODOS[todoIndex], todos: TODOS },
  });
};

export const deleteTodo: RequestHandler<{ todoId: string }> = (
  req,
  res,
  next
) => {
  const todoId = req.params.todoId;

  const todoIndex = TODOS.findIndex((todo) => todo?.id === todoId);
  if (todoIndex < 0) throw new Error("todo with id not found!");

  // const remainingTodo = TODOS.filter(todo => todo?.id !== todoId);

  TODOS.splice(todoIndex, 1);

  return res.status(200).json({
    status: "success",
    message: "deleted a todo",
    data: { todos: TODOS },
  });
};
