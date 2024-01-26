import express from "express";
const router = express.Router();
import Person from "../models/persons.js";

//Question 1
router.get("/", (req, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

//Question 3
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        //if not found
        res.status(404).end();
      }
    })
    .catch((err) => {
      //important when promise is reject 404 ll be returned so server error 500 for the rejected promise
      //we cathe the error from rejected promise
      next(err);
    });
});

router.post("/", (req, res) => {
  const personData = req.body;
  if (!personData || !personData.name || !personData.number) {
    return res.status(400).send({
      error: "content missing",
    });
  }

  Person.findOne({ name: personData.name }).then((result) => {
    if (result) {
      return res.status(400).send({
        error: "name must be unique",
      });
    }
    const newPerson = new Person({
      name: personData.name,
      number: personData.number,
    });
    newPerson.save().then((savedPerson) => res.json(savedPerson));
  });
});

router.put("/:id", (req, res, next) => {
  const body = req.body;
  if (!body || !body.name || !body.number) {
    return res.status(400).send({
      error: "content missing",
    });
  }
  const personData = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(req.params.id, personData, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).end();
      }
      res.json(result);
    })
    .catch((err) => next(err));
});

router.delete("/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).end();
      }
      res.status(204).end();
    })
    .catch((err) => next(err));
});
export default router;
