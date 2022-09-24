const express = require("express");
const { randomUUID: uuid } = require("crypto");

const app = express();
app.use(express.json());

const customers = [];

app.post("/account", (req, res) => {
  const { name, cpf } = req.body;

  const accountExists = customers.some((account) => account.cpf === cpf);

  if (accountExists) return res.status(400).json({ error: "account alredy exists" });

  customers.push({ id: uuid(), name, cpf, statement: [] });
  return res.status(201).end();
});

app.get("/statement", (req, res) => {
  const { cpf } = req.headers;

  const customerFinded = customers.find((customer) => customer.cpf === cpf);

  if (!customerFinded) return res.status(400).json({ error: "customer not found" });

  return res.status(200).json(customerFinded.statement);
});

app.listen(3333, () => console.log(`Server up 🚀\nhttp://localhost:3333`));
