const express = require("express");

const app = express();
app.use(express.json());

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

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const newPeople = persons.filter((person) => person.id !== id);

  // Id was not found
  if (newPeople.length === persons.length) {
    res
      .status(404)
      .send(`Could not delete person with id ${id}...they don't exist!`);
    return;
  }

  persons = newPeople; // updating persons object

  res.status(204).send(`Successfully deleted person with id ${id}!`);
});

const generateId = () => {
  const id = Math.floor(Math.random() * Math.pow(10, 64)); // Calculate a 64 bit integer

  return id;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    res
      .status(400)
      .send(
        "Request body doesn't conform to schema. Should include name AND number"
      );
    return;
  }
  const name = body.name;
  const existingPerson = persons.find(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  );
  if (existingPerson) {
    res.status(409).json({ error: "name must be unique" });
    return;
  }

  // Add a new person when a proper JSON is provided
  const newPerson = {
    id: generateId(),
    name: name,
    number: body.number,
  };

  persons.push(newPerson);
  res.status(201).json(newPerson);
});
