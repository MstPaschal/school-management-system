exports.getGrade = (score) => {

  if (score >= 90) return "A+";

  if (score >= 80) return "A";

  if (score >= 60) return "B";

  if (score >= 50) return "C";

  if (score >= 40) return "D";

  if (score >= 30) return "E";

  return "F";

};



exports.getRemark = (score) => {

  if (score >= 80) return "Excellent";

  if (score >= 70) return "V.Good";

  if (score >= 50) return "Good";

  if (score >= 40) return "Fair";

  return "Fail";

};



exports.getPosition = (position) => {

  if (position === 1) return "1st";

  if (position === 2) return "2nd";

  if (position === 3) return "3rd";

  return `${position}th`;

};