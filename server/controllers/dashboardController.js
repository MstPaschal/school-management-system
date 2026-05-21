const Student =
  require("../models/Student");

const Teacher =
  require("../models/Teacher");

const Class =
  require("../models/Class");

const Subject =
  require("../models/Subject");

const User =
  require("../models/user");



// ======================================
// ADMIN DASHBOARD
// ======================================
exports.getDashboardStats =
  async (req, res) => {

    try {

      // TOTAL STUDENTS
      const totalStudents =
        await Student.count();

      // ACTIVE STUDENTS
      const activeStudents =
        await Student.count({

          where: {
            status: "ACTIVE"
          }

        });

      // INACTIVE STUDENTS
      const inactiveStudents =
        await Student.count({

          where: {
            status: "INACTIVE"
          }

        });

      // GRADUATED STUDENTS
      const graduatedStudents =
        await Student.count({

          where: {
            status: "GRADUATED"
          }

        });

      // TOTAL TEACHERS
      const totalTeachers =
        await Teacher.count();

      // TOTAL CLASSES
      const totalClasses =
        await Class.count();

      // TOTAL SUBJECTS
      const totalSubjects =
        await Subject.count();

      res.status(200).json({

        totalStudents,

        activeStudents,

        inactiveStudents,

        graduatedStudents,

        totalTeachers,

        totalClasses,

        totalSubjects

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  };



// ======================================
// TEACHER DASHBOARD
// ======================================
exports.getTeacherDashboard =
  async (req, res) => {

    try {

      // GET LOGGED-IN USER
      const userId =
        req.user.id;

      // FIND TEACHER
      const teacher =
        await Teacher.findOne({

          where: {
            userId
          }

        });

      if (!teacher) {

        return res.status(404).json({
          message: "Teacher not found"
        });

      }

      // FIND CLASS
      const assignedClass =
        await Class.findByPk(
          teacher.assignedClass
        );

      // COUNT STUDENTS
      const studentCount =
        await Student.count({

          where: {
            currentClass:
              teacher.assignedClass
          }

        });

      res.status(200).json({

        teacher,

        assignedClass,

        studentCount

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error"
      });

    }

  };