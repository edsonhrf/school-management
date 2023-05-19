const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Student = require("../models/Student");
const Person = require("../models/Person");

//checkToken Middleware
function checkToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Access denied!'})
  }

  try {
    const secret = process.env.SECRET

    jwt.verify(token, secret)

    next()
  } catch (error) {
    res.status(400).json({ message: 'Invalid token!' })
  }
}

// login
router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    //check if person exists
    const personExists = await Person.findOne({ email: email });

    if (!personExists) {
      return res
        .status(400)
        .json({ message: "Invalid email or person not found. Please check." });
    }

    // check if student exists
    const studentExists = await Student.findOne({ person: personExists._id });

    if (!studentExists) {
      return res
        .status(404)
        .json({ message: "Student not found. Please check." });
    }

    //check if password match
    const checkPassword = await bcrypt.compare(
      password,
      studentExists.password
    );

    if (!checkPassword) {
      return res
        .status(401)
        .json({ message: "Invalid password. Please check." });
    }

    //jwt token
    const secret = process.env.SECRET;

    const token = jwt.sign({ id: studentExists._id }, secret,);

    res.status(200).json({ message: "Authentication successful.", token })

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message.message });
  }
});

// create
router.post("/", async (req, res) => {
  const { personId, grade, password, confirmPassword } = req.body;

  try {
    const existingPerson = await Person.findById(personId);
    if (!existingPerson) {
      return res
        .status(400)
        .json({ message: "Invalid person ID. Person not found." });
    }

    const existingStudent = await Student.findOne({ person: personId });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists." });
    }

    if (password !== confirmPassword) {
      return res.status(422).json({ message: "Passwords do not match." });
    }

    //create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const student = {
      person: personId,
      grade,
      password: passwordHash,
    };

    await Student.create(student);
    res.status(201).json({ message: "Student created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// read
router.get("/", checkToken, async (req, res) => {
  try {
    const students = await Student.find().select("-password"); // "select("-password")" hide password
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// read by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const student = await Student.findOne({ _id: id }, "-password");

    if (!student) {
      res.status(422).json({ message: "Student not found!" });
      return;
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update all object
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { grade } = req.body;

  const student = {
    grade,
  };

  try {
    const updatedStudent = await Student.updateOne({ _id: id }, student);

    if (updatedStudent.matchedCount === 0) {
      res.status(422).json({ message: "Student not found!" });
      return;
    } else {
      res.status(422).json({ message: "Student updated successfully!" });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const student = await Student.findOne({ _id: id });

  if (!student) {
    res.status(422).json({ message: "Student not found!" });
    return;
  }

  try {
    await Student.deleteOne({ _id: id });
    res.status(200).json({ message: "Student deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update password
router.patch('/updatePassword/:id', async (req, res) => {
  const id = req.params.id;
  const { password, confirmPassword } = req.body;

  try {
      if (password !== confirmPassword) {
        return res.status(422).json({ message: "Passwords do not match." });
      }

      //create password
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);
      
      const updatedStudent = await Student.updateOne({ _id: id }, { password: passwordHash });
      
      if (updatedStudent.matchedCount === 0) {
        res.status(404).json({ message: "Student not found!" });
      } else {
        res.status(200).json({ message: "Password updated successfully!" });
      }
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
});

module.exports = router;
