const express = require("express");

const app = express();
app.use(express.json());

const persons = [
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

app.get("/", (req, res) => {
  res.status(200).send({ message: "Successful" });
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/info", (req, res) => {
  const numOfPeople = persons.length;
  const timeReceived = new Date();
  res.send(`<p>
                Phonebook has info for ${numOfPeople}
            </p>
            <br/>
            <p>
               ${timeReceived}
            </p> `);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);

  if (!person) {
    res.status(404).send(`Person with id ${id} was not found.`);
  }

  res.json(person);
});
