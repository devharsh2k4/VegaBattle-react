import jwt from "jsonwebtoken";

const jwtPass = process.env.JWTPASS

export const verifyToken = async (req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;
        
        // Check if authorization header is provided
        if (!authHeader) {
          return res.status(403).json({ message: 'Authorization header missing' });
        }
    
        // Verify the header starts with 'Bearer'
        if (authHeader.startsWith('Bearer ') === false) {
          return res.status(403).json({ message: 'Invalid token format' });
        }
    
        // Extract the token from the header
        const token = authHeader.split(' ')[1];
    
        // Check if token exists
        if (!token) {
          return res.status(403).json({ message: 'Access denied, token missing' });
        }
    
        // Verify the token
        const verified = jwt.verify(token, jwtPass);
        req.user = verified;
        next();
      } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
      }
}