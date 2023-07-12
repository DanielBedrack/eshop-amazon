import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../Models/userModel.js';
import { genrateToken, isAuth } from '../utils.js';
import bcrypt from 'bcryptjs';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: genrateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid password/user' });
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).send({ message: 'User already exists' });
      return;
    }

    // Create a new user
    const user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    try {
      // Save the user to the database
      const newUser = await user.save();

      // Send a response with user details and token
      res.send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: genrateToken(newUser),
      });
    } catch (error) {
      res
        .status(500)
        .send({
          message: 'Error occurred while creating the user' + error.message,
        });
    }
  })
);

userRouter.put(
  '/update',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log('before');
    console.log(req.user._id);
    const userId = req.user._id;
    console.log('after');

    // Find the user by ID
    const user = await User.findById(userId);

    if (user) {
      // Update the user's details
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      console.log(req.body.name);

      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 10);
      }

      // Save the updated user to the database
      const updatedUser = await user.save();

      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: genrateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

export default userRouter;
