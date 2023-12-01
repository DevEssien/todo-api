import { Router } from 'express';

import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todos';

const router = Router();

router.get('/', getTodos);

router.post('/', createTodo);

router.put('/:todoId', updateTodo);

router.delete('/:todoId', deleteTodo);

 export default router;