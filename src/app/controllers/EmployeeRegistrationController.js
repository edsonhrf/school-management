const EmployeeRegistrationService = require("../services/EmployeeRegistrationService");
const transporter = require('../config/emailConfig');

// create
exports.createPerson = async (req, res) => {
  const { name, email, phone, address, enrollType } = req.body;

  try {
    const registrationNumber = req.registrationNumber;

    await EmployeeRegistrationService.createPerson({ name, email, phone, address, enrollType, registrationNumber });
    res.status(201).json({ message: "Employee registrated successfully!" });

    // Send email notification
    const mailOptions = {
      from: 'edsonhrf@gmail.com',
      to: email,
      subject: 'Registration confimation success',
      text: `Your registration was successfully completed.\n\nYour registration number is: ${registrationNumber}.\n\nPlease use this number to register in the school application and create your password.\n\n\nRegards,\nSchool Name.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending the email: ', error);
      } else {
        console.log('Email sent: ', info.response);
      }
    });
  } catch (error) {
    console.error('Error in createPerson:', error);
    res.status(500).json({ error: error.message });
  }
};

// read
exports.getPeople = async (req, res) => {
  try {
    const people = await EmployeeRegistrationService.getPeople();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// read by id
exports.getPersonById = async (req, res) => {
  const id = req.params.id;

  try {
    const person = await EmployeeRegistrationService.getPersonById(id);

    if (!person) {
      res.status(422).json({ message: "Employee not found!" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// update all object
exports.updatePerson = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, address, enrollType } = req.body;

  try {
    const updatedPerson = await EmployeeRegistrationService.updatePerson(id, {
      name,
      email,
      phone,
      address,
      enrollType
    });

    if (updatedPerson.matchedCount === 0) {
      res.status(404).json({ message: "Employee not found!" });
      return;
    } else {
      res.status(422).json({ message: "Employee updated successfully!" });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// delete
exports.deletePerson = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedPerson = await EmployeeRegistrationService.deletePerson(id);

    if (!deletedPerson) {
      res.status(404).json({ message: "Employee not found!" });
      return;
    }

    res.status(200).json({ message: "Employee deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
