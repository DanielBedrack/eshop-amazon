import jwt from 'jsonwebtoken';

// Generate a JWT token for the user
export const genrateToken = (user) => {
  return jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: '15d' }
  );
};

// Middleware to check if the user is authenticated
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    // Extract the token from the Authorization header
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX

    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        // If token verification fails, send an error response
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        // If token is valid, set the decoded user data to the request object and proceed to the next middleware
        req.user = decode;
        next();
      }
    });
  } else {
    // If there is no token in the Authorization header, send an error response
    res.status(401).send({ message: 'No Token' });
  }
};
