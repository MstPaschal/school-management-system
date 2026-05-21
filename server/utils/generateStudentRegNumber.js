const Student = require("../models/Student");

const generateStudentRegNumber = async () => {

  const year = new Date().getFullYear();

  // GET LAST STUDENT
  const lastStudent = await Student.findOne({

    order: [["id", "DESC"]]

  });

  let nextNumber = 1;

  // IF THERE IS A LAST STUDENT
  if (lastStudent && lastStudent.regNumber) {

    // EXTRACT LAST SERIAL NUMBER
    const parts =
      lastStudent.regNumber.split("-");

    const lastSerial =
      parseInt(parts[3]);

    nextNumber = lastSerial + 1;

  }

  // FORMAT SERIAL NUMBER
  const serialNumber =
    String(nextNumber).padStart(4, "0");

  return `GFS-STD-${year}-${serialNumber}`;

};

module.exports = generateStudentRegNumber;