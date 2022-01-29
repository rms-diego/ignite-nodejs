const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();
const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const customers = [];

app.post("/account", (request, response) => {
  const { name, cpf } = request.body;

  const custumerAlreadyExists = customers.some(
    customer => customer.cpf === cpf
  );

  if (custumerAlreadyExists) {
    return response.status(400).json({ error: "Custumer already exists" });
  } 

  const customer = {
    id: uuid(),
    name,
    cpf,
    statement: [],
  };

  customers.push(customer);

  return response.status(201).send("client created");
});

app.get('/statement', (request, response) => {
  const { cpf } = request.headers;

  const customer = customers.find(customer => customer.cpf === cpf);
  
  if (!customer) {
    return response.status(400).json({ error: "cutomer not found" });
  }

  return response.status(200).send(customer.statement);
});

app.listen(PORT, () => console.log(`🚀 Server up !🚀\nhttp://localhost:${PORT}`));
