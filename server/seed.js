require("dotenv").config();
const bcrypt = require("bcryptjs");

const sequelize = require("./config/db");
const User = require("./models/user");

async function seedSuperAdmin() {
  try {
    await sequelize.sync();

    const existing = await User.findOne({
      where: { role: "superadmin" }
    });

    if (existing) {
      console.log("Superadmin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      username: "superadmin",
      email: "mstpaschalglobsnet@gmail.com",
      password: hashedPassword,
      role: "superadmin"
    });

    console.log("Superadmin created successfully");
    process.exit();

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedSuperAdmin();