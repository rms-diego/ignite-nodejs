const express = require("express");
const { v4: uuid } = require ("uuid");

const app = express();
const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const customers = [];

app.post("/create", (request, response) => {
  const { name, cpf } = request.body;

  const custumerAlreadyExists = customers.some(customer => customer.cpf === cpf);

  if (custumerAlreadyExists) return (
    response.status(400).json({error: 'Custumer already exists'})
  );
  
  const customer = {
    id: uuid(),
    name,
    cpf,
    statement: [],

  };

  customers.push(customer);
  
  console.log(customers);
  return response.send('client created').status(201)
});

app.listen(PORT, () =>
  console.log(`🚀 Server up !🚀\nhttp://localhost:${PORT}`)
);
