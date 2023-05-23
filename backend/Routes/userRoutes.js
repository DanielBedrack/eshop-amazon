import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../Models/userModel.js';
import { genrateToken } from '../utils.js';
import bcrypt from 'bcryptjs';

const userRouter = express.Router();

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user)
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
export default userRouter;
