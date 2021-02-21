const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        const tasks = await task.save()
        res.status(200).send(tasks)
    } catch (e) {
        res.status(400).send(e)
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

router.get('/tasks', async (req,res) => {
    
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
    
    // ! promise chaining solution
    // Task.find({}).then((result) => {
    //     res.send(result)
    // }).catch((error) => {
    //     res.status(500).send()
    // })
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const tasks = await Task.findById({_id})

        if (!tasks) {
            return res.status(404).send()
        }

        res.status(200).send(tasks)

    } catch (e) {
        res.status(500).send(e)
    }


    // Task.findById({_id}).then((task) => {
    //     if (!task) {
    //         return res.status(404).send()
    //     }

    //     res.send(task)
    // }).catch((error) => {
    //     res.status(500).send()
    // })
})

router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const isValid = ['description', 'completed']
    const validationOperation = updates.every((keys) => isValid.includes(keys))

    if (!validationOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }
    try {
        const tasks = await Task.findById(_id)
        updates.forEach((updates) => tasks[updates] = req.body[updates])
        await tasks.save()
        // const tasks = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})

        if (!tasks) {
            return res.send(404).send()
        }

        res.send(tasks)

    } catch (e) {
        res.status(400).send(e)
    }


})

router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findByIdAndDelete({_id})

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router