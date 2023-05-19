const router = require('express').Router()

const Student = require('../models/Student');
const Person = require('../models/Person');

// create
router.post('/', async (req, res) => {
    const { personId, grade } = req.body

    try {
        const existingPerson = await Person.findById(personId);
        if (!existingPerson) {
            return res.status(400).json({ message: 'Invalid person ID. Person not found.' });
        }
        
        const existingStudent = await Student.findOne({person: personId});
        if (existingStudent) {
            return res.status(400).json({ message: 'Student already exists.' });
        }

        const student = {
            person: personId,
            grade
        };

        await Student.create(student)
        res.status(201).json({ message: 'Student created successfully!' });
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// read
router.get('/', async (req, res) => {
    try {
        const students = await Student.find()
        res.status(200).json(students)
    } catch (error) {
        res.status(500).json({error: error})
    }    
});

// read by id
router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {
        const student = await Student.findOne({_id: id})

        if (!student) {
            res.status(422).json({message: 'Student not found!'})
            return
        }

        res.status(200).json(student)
    } catch (error) {
        res.status(500).json({error: error})
    }    
});

// update all object
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const {grade} = req.body

    const student = {
        grade
    }

    try {
        const updatedStudent = await Student.updateOne({_id: id}, student)

        if (updatedStudent.matchedCount === 0) {
            res.status(422).json({ message: 'Student not found!' });
            return
        } else {
            res.status(422).json({ message: 'Student updated successfully!' });
            return
        }
    } catch (error) {
        res.status(500).json({error: error})
    }
});

// delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const student = await Student.findOne({_id: id})

    if (!student) {
        res.status(422).json({ message: 'Student not found!' });
        return
    }

    try {
        await Student.deleteOne({_id: id})
        res.status(200).json({message: 'Student deleted successfully!'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router;