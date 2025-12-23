// import jwt from "jsonwebtoken";

// const veriFyToken = async (req, res, next) => {
//   let token;
//   const authHeader = req.headers.Authentication || req.headers.authentication;

//   if (authHeader && authHeader.startsWith("Token")) {
//     token = authHeader.split(" ")[1];
//     if (!token) {
//       return res.status(400).json({ message: "invalid token" });
//     }
//     try {
//       const verified = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = verified;
//       console.log(`verified user is `, req.user);
//       next();
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: "error while verifying", error: error.message });
//     }
//   } else {
//     return res
//       .status(401)
//       .json({ message: "No token provided, access denied" });
//   }
// };

// export default veriFyToken;


// using cookies 

import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  // res.send(token)
  if (!token) {
    return res.status(401).json({ message: "No token provided, access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; 
    console.log("Verified user:", req.user);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};

export default verifyToken;
