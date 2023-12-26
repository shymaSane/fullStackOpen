import express from "express";
import morgan from "morgan";

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

function generateId(min, max) {
  return Math.random() * (max - min) + min;
}

const app = express();

const port = 3001;

app.use(express.json());
//Question7
// app.use(morgan("tiny"));
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Question 1
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

//Question 2
app.get("/info", (req, res) => {
  const currentDate = new Date();
  const today = currentDate.toLocaleString("en-US", {
    dateStyle: "short",
    timeStyle: "full",
  });
  const info = `<p>Phone book has info for 2 pepole <br/> ${today}</p>`;
  res.send(info);
});

//Question 3
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const result = persons.filter((person) => person.id === id);
  if (result.length !== 0) {
    res.send(result);
  } else {
    res.status(404).send("user not found!");
  }
});

//Question 4
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

//Question 5 && 6
app.post("/api/persons", (req, res) => {
  const newPerson = req.body;
  if (!newPerson) {
    return res.status(400).send({
      error: "content missing",
    });
  }
  const { name, number } = newPerson;
  if (!name || name.length < 1 || !number || number.length < 1) {
    return res.status(400).send({
      error: "content missing",
    });
  }
  const result = persons.filter((person) => person.name === newPerson.name);
  if (result.length > 0) {
    return res.status(400).send({
      error: "name must be unique",
    });
  }
  //find the maximum number of id
  // const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  //assign the new contact to the data with id
  newPerson.id = generateId(1, 1000);
  persons = persons.concat(newPerson);
  res.json(newPerson);
});

app.listen(port, () => {
  console.log(`finally working on port ${port}`);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
