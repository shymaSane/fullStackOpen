import express from 'express'
const router = express.Router()
import Person from '../models/persons.js'

//Question 1
router.get('/', (req, res) => {
  Person.find({}).then((persons) => res.json(persons))
})

//Question 3
router.get('/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then((result) => {
      if (result) {
        res.json(result)
      } else {
        //if not found
        res.status(404).end()
      }
    })
    .catch((err) => {
      //important when promise is reject 404 ll be returned so server error 500 for the rejected promise
      //we catch the error from rejected promise
      next(err)
    })
})

router.post('/', (req, res, next) => {
  const personData = req.body

  Person.findOne({ name: personData.name })
    .then((result) => {
      if (result) {
        return res.status(400).send({
          error: 'name must be unique',
        })
      }
      const newPerson = new Person({
        name: personData.name,
        number: personData.number,
      })
      newPerson
        .save()
        .then((savedPerson) => res.json(savedPerson))
        .catch((err) => next(err))
    })
    .catch((err) => next(err))
})

router.put('/:id', (req, res, next) => {
  const { name, number } = req.body

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    //because put wont validate if we didnt add this
    { new: true, runValidators: true, context: 'query' }
  )
    .then((result) => {
      if (!result) {
        return res.status(404).end()
      }
      res.json(result)
    })
    .catch((err) => next(err))
})

router.delete('/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).end()
      }
      res.status(204).end()
    })
    .catch((err) => next(err))
})
export default router
