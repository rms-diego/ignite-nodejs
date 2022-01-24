const express = require("express");
const { v4: uuid } = require ("uuid");

const app = express();
const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const customers = [];

app.post("/create", (request, response) => {
  const { name, cpf } = request.body;

  const account = {
    id: uuid(),
    name,
    cpf,
    statement: [],
  };

  customers.push(account);
  console.log(customers);

  return response.send('client created').status(201)
});

app.listen(PORT, () =>
  console.log(`🚀 Server up !🚀\nhttp://localhost:${PORT}`)
);
