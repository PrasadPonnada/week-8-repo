import express from 'express';
import { authenticateJwt, SECRET } from "../middleware/index";
// import { Todo } from "../db";
import { getTodos, createToDo, updateTodo } from '../db/ToDo';
const router = express.Router();

interface CreateTodoInput {
  title: string;
  description: string;
}

router.post('/todos', authenticateJwt, async (req, res) => {
  const { title, description } = req.body;
  const done = false;
  const userId = req.headers["userId"];

  const newTodo = createToDo(title, description, done, parseInt(userId as string));
  newTodo
    .then((savedTodo) => {
      res.status(201).json(savedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to create a new todo' });
    });
});


router.get('/todos', authenticateJwt, (req, res) => {
  const userId = req.headers["userId"];

  getTodos(parseInt(userId as string))
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});

router.patch('/todos/:todoId/done', authenticateJwt, (req, res) => {
  const { todoId } = req.params;
  const userId = req.headers["userId"];

  updateTodo(parseInt(todoId))
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(updatedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to update todo' });
    });
});

export default router;
