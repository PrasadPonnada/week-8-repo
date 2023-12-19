import jwt from "jsonwebtoken";
import express from 'express';
import { authenticateJwt, SECRET } from "../middleware/";
// import { User } from "../db";
import { getUser, createUser, getUserByEmail_Pwd, getUserById } from '../db/User'
import { signupInput } from 'prasadponnada-common'

const router = express.Router();
router.post('/signup', async (req, res) => {
  const parsedInput = signupInput.safeParse(req.body)
  if (!parsedInput.success) {
    return res.status(411).json({ msg: parsedInput.error })
  }

  const username = parsedInput.data.username;
  const password = parsedInput.data.password;

  const user = await getUser(username);
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = await createUser({ username, password })
    const token = jwt.sign({ id: newUser.id }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await getUserByEmail_Pwd(username, password);
  if (user) {
    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

router.get('/me', authenticateJwt, async (req, res) => {
  const userId = req.headers["userId"];
  const user = await getUserById(parseInt(userId as string));
  if (user) {
    res.json({ username: user.username });
  } else {
    res.status(403).json({ message: 'User not logged in' });
  }
});

export default router
