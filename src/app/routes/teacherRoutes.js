const router = require('express').Router()

const Teacher = require('../models/Teacher');
const Person = require('../models/Person');

// create
router.post('/', async (req, res) => {
    const { personId, subject } = req.body

    try {
        const existingPerson = await Person.findById(personId);
        if (!existingPerson) {
            return res.status(400).json({ message: 'Invalid person ID. Person not found.' });
        }
        
        const existingTeacher = await Teacher.findOne({person: personId});
        if (existingTeacher) {
            return res.status(400).json({ message: 'Teacher already exists.' });
        }

        const teacher = {
            person: personId,
            subject
        };

        await Teacher.create(teacher)
        res.status(201).json({ message: 'Teacher created successfully!' });
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// read
router.get('/', async (req, res) => {
    try {
        const teachers = await Teacher.find()
        res.status(200).json(teachers)
    } catch (error) {
        res.status(500).json({error: error})
    }    
});

// read by id
router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {
        const teacher = await Teacher.findOne({_id: id})

        if (!teacher) {
            res.status(422).json({message: 'Teacher not found!'})
            return
        }

        res.status(200).json(teacher)
    } catch (error) {
        res.status(500).json({error: error})
    }    
});

// update all object
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const {subject} = req.body

    const student = {
        subject
    }

    try {
        const updatedTeacher = await Teacher.updateOne({_id: id}, teacher)

        if (updatedTeacher.matchedCount === 0) {
            res.status(422).json({ message: 'Teacher not found!' });
            return
        } else {
            res.status(422).json({ message: 'Teacher updated successfully!' });
            return
        }
    } catch (error) {
        res.status(500).json({error: error})
    }
});

// delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const teacher = await Teacher.findOne({_id: id})

    if (!teacher) {
        res.status(422).json({ message: 'Person not found!' });
        return
    }

    try {
        await Teacher.deleteOne({_id: id})
        res.status(200).json({message: 'Teacher deleted successfully!'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router;