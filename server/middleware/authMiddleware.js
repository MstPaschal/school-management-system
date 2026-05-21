const jwt = require("jsonwebtoken");

exports.verifyToken =
  (req, res, next) => {

    try {

      const authHeader =
        req.headers.authorization;


      if (!authHeader) {

        return res.status(401).json({
          message: "No token provided"
        });

      }


      // EXTRACT TOKEN
      const token =
        authHeader.split(" ")[1];


      if (!token) {

        return res.status(401).json({
          message: "Invalid token format"
        });

      }


      // VERIFY TOKEN
      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );


      req.user = decoded;

      next();

    } catch (error) {

      console.log(error);

      return res.status(401).json({
        message: "Invalid token"
      });

    }

  };


  // VERIFY SUPER ADMIN
exports.verifySuperAdmin =
  (req, res, next) => {

    try {

      if (
        req.user.role !== "superadmin"
      ) {

        return res.status(403).json({
          message:
            "Access denied. Super Admin only."
        });

      }

      next();

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message: "Server Error"
      });

    }

  };