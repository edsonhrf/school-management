const PersonService = require("../services/PersonService");

// create
exports.createPerson = async (req, res) => {
  const { name, email, phone, address } = req.body;

  try {
    await PersonService.createPerson({ name, email, phone, address });
    res.status(201).json({ message: "Person created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// read
exports.getPeople = async (req, res) => {
  try {
    const people = await PersonService.getPeople();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// read by id
exports.getPersonById = async (req, res) => {
  const id = req.params.id;

  try {
    const person = await PersonService.getPersonById(id);

    if (!person) {
      res.status(422).json({ message: "Person not found!" });
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
  const { name, email, phone, address } = req.body;

  try {
    const updatedPerson = await PersonService.updatePerson(id, {
      name,
      email,
      phone,
      address,
    });

    if (updatedPerson.matchedCount === 0) {
      res.status(404).json({ message: "Person not found!" });
      return;
    } else {
      res.status(422).json({ message: "Person updated successfully!" });
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
    const deletedPerson = await PersonService.deletePerson(id);

    if (!deletedPerson) {
      res.status(404).json({ message: "Person not found!" });
      return;
    }

    res.status(200).json({ message: "Person deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
