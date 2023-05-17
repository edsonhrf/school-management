const router = require('express').Router()

const Person = require('../models/Person');

// create
router.post('/', async (req, res) => {
    const {name, email, phone, address} = req.body

    const person = {
        name,
        email,
        phone,
        address
    }

    try {
        await Person.create(person)
        res.status(201).json({ message: 'Person created successfully!' });
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// read
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({error: error})
    }    
});

// read by id
router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {
        const person = await Person.findOne({_id: id})

        if (!person) {
            res.status(422).json({message: 'Person not found!'})
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }    
});

// update all object
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const {name, email, phone, address} = req.body

    const person = {
        name,
        email,
        phone,
        address
    }

    try {
        const updatedPerson = await Person.updateOne({_id: id}, person)

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ message: 'Person not found!' });
            return
        } else {
            res.status(422).json({ message: 'Person updated successfully!' });
            return
        }
    } catch (error) {
        res.status(500).json({error: error})
    }
});

// delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({_id: id})

    if (!person) {
        res.status(422).json({ message: 'Person not found!' });
        return
    }

    try {
        await Person.deleteOne({_id: id})
        res.status(200).json({message: 'Person deleted successfully!'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router;