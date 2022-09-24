const express = require("express");
const { randomUUID: uuid } = require("crypto");

const app = express();
app.use(express.json());

const customers = [];

// middleware
const veryfiIfExistAccountCPF = (req, res, next) => {
  const { cpf } = req.headers;

  const customerFinded = customers.find((customer) => customer.cpf === cpf);
  if (!customerFinded) return res.status(400).json({ error: "customer not found" });

  req.customer = customerFinded;

  return next();
}

//routes
app.post("/account", (req, res) => {
  const { name, cpf } = req.body;

  const accountExists = customers.some((account) => account.cpf === cpf);

  if (accountExists) return res.status(400).json({ error: "account alredy exists" });

  customers.push({ id: uuid(), name, cpf, statement: [] });
  return res.status(201).end();
});

app.get("/statement", veryfiIfExistAccountCPF, (req, res) => {
  const { customer } = req;

  return res.status(200).json(customer.statement);
});


app.post("/deposit", veryfiIfExistAccountCPF, (req, res) => {
  const { amount, description } = req.body;
  const { customer } = req;

  customer.statement.push({
    id: uuid(),
    amount,
    description,
    createdAt: new Date().toLocaleString(),
    type: 'credit'
  });

  return res.status(201).end();

})

app.listen(3333, () => console.log(`Server up 🚀\nhttp://localhost:3333`));
