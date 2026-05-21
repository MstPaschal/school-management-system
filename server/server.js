require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// ✅ Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://school-management-system-ebon-one.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// DB
const sequelize = require("./config/db");

// Models (IMPORTANT: match file names exactly)
const User = require("./models/user");
const Class = require("./models/Class");
const Subject = require("./models/Subject");
const Session = require("./models/Session");
const Teacher = require("./models/Teacher");
const Student = require("./models/Student");
const ClassSubject = require("./models/ClassSubject");
const Score = require("./models/Score");
const CommentTemplate = require("./models/CommentTemplate");
const StudentComment = require("./models/StudentComment");
const AdminSetting = require("./models/AdminSetting");
const StudentPayment = require("./models/StudentPayment");
const UploadedDocument = require("./models/UploadedDocument");

// Routes
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const classRoutes = require("./routes/classRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const classSubjectRoutes = require("./routes/classSubjectRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const resultRoutes = require("./routes/resultRoutes");
const commentRoutes = require("./routes/commentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const promotionRoutes = require("./routes/promotionRoutes");
const studentStatusRoutes = require("./routes/studentStatusRoutes");
const documentRoutes = require("./routes/documentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const resultCheckerRoutes = require("./routes/resultCheckerRoutes");

// Routes middleware
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/class-subjects", classSubjectRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/student-status", studentStatusRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/result-checker", resultCheckerRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("School Management System API Running");
});

const PORT = process.env.PORT || 5000;

// Associations
Class.belongsToMany(Subject, {
  through: ClassSubject,
  foreignKey: "classId"
});

Subject.belongsToMany(Class, {
  through: ClassSubject,
  foreignKey: "subjectId"
});

Student.hasMany(Score, {
  foreignKey: "studentId"
});

Score.belongsTo(Student, {
  foreignKey: "studentId"
});

User.hasOne(Teacher, {
  foreignKey: "userId"
});

Teacher.belongsTo(User, {
  foreignKey: "userId"
});

// Start server
sequelize.sync()
  .then(() => {
    console.log("Database Synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });