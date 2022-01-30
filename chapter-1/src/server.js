const express = require('express');
const { v4: uuid } = require('uuid');

const app = express();
const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const customers = [];

function verifyExistAccountCpf(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: 'cutomer not found' });
  }

  request.customer = customer;

  return next();
}

function getBalance(statemnet) {
  const amount = statemnet.reduce((acc, operation) => {
    if (operation.type === 'credit') return acc + operation.amount;

    return acc - operation.amount;
  }, 0);

  return amount;
}

app.post('/account', (request, response) => {
  const { name, cpf } = request.body;

  const custumerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (custumerAlreadyExists) {
    return response.status(400).json({ error: 'Custumer already exists' });
  }

  const customer = {
    id: uuid(),
    name,
    cpf,
    statement: [],
  };

  customers.push(customer);

  return response.status(201).send('client created');
});

app.get('/statement', verifyExistAccountCpf, (request, response) => {
  const { customer } = request;

  return response.status(200).send(customer.statement);
});

app.post('/deposit', verifyExistAccountCpf, (request, response) => {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    createdAt: new Date(),
    type: 'credit',
  };

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

app.post('/withdraw', verifyExistAccountCpf, (request, response) => {
  const { amount } = request.body;

  const { customer } = request;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return response.status(400).json({ error: 'insufficients founds !' });
  }

  const statementOperation = {
    amount,
    createdAt: new Date(),
    type: 'debit',
  };

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

app.listen(PORT);
