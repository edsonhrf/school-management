const mongoose = require("mongoose");

const employeeRegistrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    enrollType: {
      type: String,
      required: true,
      enum: ["student", "employee"],
    },
    registrationNumber: {
      type: String,
      unique: true,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "employee_registration", // collection name
  }
);

const EmployeeRegistration = mongoose.model(
  "EmployeeRegistration",
  employeeRegistrationSchema
);

module.exports = EmployeeRegistration;
