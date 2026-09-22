// =========================
// ADMIN
// ADMIN + SUPERADMIN
// =========================

exports.isAdmin =
  (req, res, next) => {

    if (
      !req.user ||
      (
        req.user.role !== "admin" &&
        req.user.role !== "superadmin"
      )
    ) {

      return res.status(403).json({

        message:
          "Access denied. Admin privileges required."

      });

    }

    next();

  };


// =========================
// TEACHER
// TEACHER ONLY
// =========================

exports.isTeacher =
  (req, res, next) => {

    if (
      !req.user ||
      req.user.role !== "teacher"
    ) {

      return res.status(403).json({

        message:
          "Access denied. Teacher privileges required."

      });

    }

    next();

  };


// =========================
// SUPER ADMIN
// SUPERADMIN ONLY
// =========================

exports.isSuperAdmin =
  (req, res, next) => {

    if (
      !req.user ||
      req.user.role !== "superadmin"
    ) {

      return res.status(403).json({

        message:
          "Access denied. Super Admin privileges required."

      });

    }

    next();

  };


// =========================
// STAFF
// TEACHER + ADMIN + SUPERADMIN
// =========================

exports.isStaff =
  (req, res, next) => {

    if (
      !req.user ||
      ![
        "teacher",
        "admin",
        "superadmin"
      ].includes(req.user.role)
    ) {

      return res.status(403).json({

        message:
          "Access denied. Staff privileges required."

      });

    }

    next();

  };

  // =========================
// STUDENT
// STUDENT ONLY
// =========================

exports.isStudent =
  (req, res, next) => {

    if (
      !req.user ||
      req.user.role !== "student"
    ) {

      return res.status(403).json({

        message:
          "Access denied. Student privileges required."

      });

    }

    next();

  };