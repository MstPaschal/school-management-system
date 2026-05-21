exports.isAdmin =
  (req, res, next) => {


    console.log(
      "USER ROLE:",
      req.user
    );

    if (

      req.user.role !== "admin" &&

      req.user.role !== "superadmin"

    ) {

      return res.status(403).json({

        message:
          "You are not an Admin"

      });

    }

    next();

  };


exports.isTeacher =
  (req, res, next) => {

    if (
      req.user.role !== "teacher"
    ) {

      return res.status(403).json({

        message:
          "You are not a Teacher"

      });

    }

    next();

  };


exports.isSuperAdmin =
  (req, res, next) => {

    if (
      req.user.role !== "super_admin"
    ) {

      return res.status(403).json({

        message:
          "You are not a Super Admin"

      });

    }

    next();

  };