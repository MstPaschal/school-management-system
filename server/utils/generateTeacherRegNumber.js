const Teacher = require("../models/Teacher");

const generateTeacherRegNumber = async () => {

  const year = new Date().getFullYear();

  // GET LAST TEACHER
  const lastTeacher = await Teacher.findOne({

    order: [["id", "DESC"]]

  });

  let nextNumber = 1;

  // IF THERE IS A LAST TEACHER
  if (lastTeacher && lastTeacher.regNumber) {

    // EXTRACT LAST NUMBER
    const parts =
      lastTeacher.regNumber.split("-");

    const lastSerial =
      parseInt(parts[3]);

    nextNumber = lastSerial + 1;

  }

  // FORMAT NUMBER
  const serialNumber =
    String(nextNumber).padStart(4, "0");

  return `GFS-STF-${year}-${serialNumber}`;

};

module.exports = generateTeacherRegNumber;