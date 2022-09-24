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


// utils functions
const getBalance = (statement) => {
  const amount = statement.reduce((acc, currentValue) => {
    if (currentValue.type === 'credit') return acc + currentValue.amount;
    return acc - currentValue.amount;
  }, 0);

  return amount;
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


app.get("/statement/date", veryfiIfExistAccountCPF, (req, res) => {
  const { date } = req.query;
  const { customer } = req;

  const statement = customer.statement.filter((statement) => statement.createdAt.includes(date));

  if (!statement.length) return res.status(400).json({ error: 'statement not found' })

  return res.status(200).json(statement);
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

app.post("/withdraw", veryfiIfExistAccountCPF, (req, res) => {
  const { amount } = req.body;
  const { customer } = req;

  const balance = getBalance(customer.statement);

  if (balance < amount) return res.status(400).json({ error: "insufficient funds" })

  customer.statement.push({
    id: uuid(),
    amount,
    createdAt: new Date().toLocaleString(),
    type: 'withdraw'
  });

  return res.status(201).end();

})

app.put("/account", veryfiIfExistAccountCPF, (req, res) => {
  const { name } = req.body;
  const { customer } = req;

  customer.name = name;

  return res.status(200).end();
});

app.listen(3333, () => console.log(`Server up 🚀\nhttp://localhost:3333`));
