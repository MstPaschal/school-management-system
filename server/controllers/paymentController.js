const AdminSetting = require(
  "../models/AdminSetting"
);

const StudentPayment = require(
  "../models/StudentPayment"
);

const Student = require("../models/Student");


// =========================
// SAVE ADMIN SETTINGS
// =========================
exports.saveAdminSetting =
  async (req, res) => {

    try {

      const {

        classId,

        sessionId,

        term,

        nextTermResumes,

        tuitionFee,

        saturdayLesson,

        scratchCard,

        termlyActivities,

        books

      } = req.body;


      const existing =
        await AdminSetting.findOne({

          where: {
            classId,
            sessionId,
            term
          }

        });


      // UPDATE
      if (existing) {

        existing.nextTermResumes =
          nextTermResumes;

        existing.tuitionFee =
          tuitionFee;

        existing.saturdayLesson =
          saturdayLesson;

        existing.scratchCard =
          scratchCard;

        existing.termlyActivities =
          termlyActivities;

        existing.books =
          books;

        await existing.save();

        return res.status(200).json({
          message:
            "Admin setting updated successfully"
        });

      }


      // CREATE
      await AdminSetting.create({

        classId,

        sessionId,

        term,

        nextTermResumes,

        tuitionFee,

        saturdayLesson,

        scratchCard,

        termlyActivities,

        books

      });


      res.status(201).json({
        message:
          "Admin setting saved successfully"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  };



// =========================
// LOAD PAYMENT PAGE
// =========================
exports.loadPaymentPage =
  async (req, res) => {

    try {

      const {
        classId,
        sessionId,
        term
      } = req.query;


      // ADMIN SETTING
      const adminSetting =
        await AdminSetting.findOne({

          where: {
            classId,
            sessionId,
            term
          }

        });


      // STUDENTS
      const students =
        await Student.findAll({

          where: {
            currentClass: classId,
            status: "ACTIVE"
          },

          order: [["fullName", "ASC"]]

        });


      const result = [];


      for (const student of students) {

        const existingPayment =
          await StudentPayment.findOne({

            where: {
              studentId: student.id,
              classId,
              sessionId,
              term
            }

          });


        result.push({

          student,

          adminSetting,

          payment:
            existingPayment || null

        });

      }


      res.status(200).json(result);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  };



// =========================
// SAVE STUDENT PAYMENT
// =========================
exports.saveStudentPayment =
  async (req, res) => {

    try {

      const {

        studentId,

        classId,

        sessionId,

        term,

        tuitionFee,

        saturdayLesson,

        scratchCard,

        termlyActivities,

        books,

        schoolBus,

        outstanding,

        graduation,

        excursion,

        practicals

      } = req.body;


      const existing =
  await StudentPayment.findOne({

    where: {
      studentId,
      classId,
      sessionId,
      term
    }

  });


// UPDATE
if (existing) {

  existing.tuitionFee =
    tuitionFee;

  existing.saturdayLesson =
    saturdayLesson;

  existing.scratchCard =
    scratchCard;

  existing.termlyActivities =
    termlyActivities;

  existing.books =
    books;

  existing.schoolBus =
    schoolBus;

  existing.outstanding =
    outstanding;

  existing.graduation =
    graduation;

  existing.excursion =
    excursion;

  existing.practicals =
    practicals;

  await existing.save();

  return res.status(200).json({
    message:
      "Payment updated successfully"
  });

}


// CREATE
await StudentPayment.create({

  studentId,

  classId,

  sessionId,

  term,

  tuitionFee,

  saturdayLesson,

  scratchCard,

  termlyActivities,

  books,

  schoolBus,

  outstanding,

  graduation,

  excursion,

  practicals

});


res.status(201).json({
  message:
    "Payment saved successfully"
});

} catch (error) {

  console.log(error);

  res.status(500).json({
    message: error.message
  });

}

};


// =========================
// GET ADMIN SETTING
// =========================
exports.getAdminSetting =
  async (req, res) => {

    try {

      const {
        classId,
        sessionId,
        term
      } = req.query;


      const setting =
        await AdminSetting.findOne({

          where: {
            classId,
            sessionId,
            term
          }

        });


      if (!setting) {

        return res.status(200).json(null);

      }


      res.status(200).json(setting);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  };


// =========================
// VIEW PAYMENT REPORT
// =========================
exports.viewPaymentReport =
async (req, res) => {

try {

  const {
    studentId,
    classId,
    sessionId,
    term
  } = req.query;


  // STUDENT
  const student =
    await Student.findByPk(studentId);

  if (!student) {

    return res.status(404).json({
      message: "Student not found"
    });

  }


  // PAYMENT
  const payment =
    await StudentPayment.findOne({

      where: {
        studentId,
        classId,
        sessionId,
        term
      }

    });


  if (!payment) {

    return res.status(404).json({
      message:
        "Payment schedule not found"
    });

  }


  // TOTAL
  const total =

    Number(payment.tuitionFee) +

    Number(payment.saturdayLesson) +

    Number(payment.scratchCard) +

    Number(payment.termlyActivities) +

    Number(payment.books) +

    Number(payment.schoolBus) +

    Number(payment.outstanding) +

    Number(payment.graduation) +

    Number(payment.excursion) +

    Number(payment.practicals);


  // RESPONSE
  res.status(200).json({

    student,

    payment,

    total,

    schoolFeesAccount: {

      accountNumber:
        "0169657876",

      accountName:
        "Grisfield Schools",

      bank:
        "Union Bank"

    },

    booksAccount: {

      accountNumber:
        "0000000000",

      accountName:
        "Grisfield Schools",

      bank:
        "Union Bank"

    }

  });

} catch (error) {

  console.log(error);

  res.status(500).json({
    message: error.message
  });

}

};