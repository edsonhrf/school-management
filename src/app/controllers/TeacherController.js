const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TeacherService = require("../services/TeacherService");
const EmployeeRegistrationService = require("../services/EmployeeRegistrationService");

// login
exports.teacherLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //check if person exists
    const personExists = await EmployeeRegistrationService.findOne({ email: email });

    if (!personExists) {
      return res
        .status(400)
        .json({ message: "Invalid email or person not found. Please check." });
    }

    // check if teacher exists
    const teacherExists = await TeacherService.findOne({ person: personExists._id });

    if (!teacherExists) {
      return res
        .status(404)
        .json({ message: "Teacher not found. Please check." });
    }

    //check if password match
    const checkPassword = await bcrypt.compare(
      password,
      teacherExists.password
    );

    if (!checkPassword) {
      return res
        .status(401)
        .json({ message: "Invalid password. Please check." });
    }

    //jwt token
    const secret = process.env.SECRET;

    const token = jwt.sign({ id: teacherExists._id }, secret);

    res.status(200).json({ message: "Authentication successful.", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message.message.message });
  }
};

// create
exports.createTeacher = async (req, res) => {
  const { personId, subject, password, confirmPassword } = req.body;

  try {
    const existingPerson = await EmployeeRegistrationService.getPersonById(personId);
    if (!existingPerson) {
      return res
        .status(400)
        .json({ message: "Invalid person ID. Person not found." });
    }

    const existingTeacher = await TeacherService.findOne({ person: personId });
    if (existingTeacher) {
      return res.status(400).json({ message: "Teacher already exists." });
    }

    if (password !== confirmPassword) {
      return res.status(422).json({ message: "Passwords do not match." });
    }

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const teacher = {
      person: personId,
      subject,
      password: passwordHash,
    };

    await TeacherService.createTeacher(teacher);
    res.status(201).json({ message: "Teacher created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// read
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await TeacherService.getTeachers();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// read by id
exports.getTeacher = async (req, res) => {
  const id = req.params.id;

  try {
    const teacher = await TeacherService.getTeacherById({ _id: id });

    if (!teacher) {
      res.status(422).json({ message: "Teacher not found!" });
      return;
    }

    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update all object
exports.updateTeacher = async (req, res) => {
  const id = req.params.id;
  const { subject } = req.body;

  const teacher = {
    subject,
  };

  try {
    const updatedTeacher = await TeacherService.updateTeacher({ _id: id }, teacher);

    if (updatedTeacher.matchedCount === 0) {
      res.status(422).json({ message: "Teacher not found!" });
      return;
    } else {
      res.status(422).json({ message: "Teacher updated successfully!" });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete
exports.deleteTeacher = async (req, res) => {
  const id = req.params.id;

  const teacher = await TeacherService.findOne({ _id: id });

  if (!teacher) {
    res.status(422).json({ message: "Person not found!" });
    return;
  }

  try {
    await TeacherService.deleteTeacher({ _id: id });
    res.status(200).json({ message: "Teacher deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update password
exports.updatePassword = async (req, res) => {
  const id = req.params.id;
  const { password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(422).json({ message: "Passwords do not match." });
    }

    //create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const updatedTeacher = await TeacherService.updateTeacher(
      { _id: id },
      { password: passwordHash }
    );

    if (updatedTeacher.matchedCount === 0) {
      res.status(404).json({ message: "Teacher not found!" });
    } else {
      res.status(200).json({ message: "Password updated successfully!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
