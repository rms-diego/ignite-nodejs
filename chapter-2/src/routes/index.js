const { Router } = require("express");
const { randomUUID: uuid } = require("crypto");

const routes = Router();

const accounts = [];

const verifyExistentCpf = (request, response, next) => {
  const { cpf } = request.headers;

  const userFound = accounts.find((account) => account.cpf === cpf);

  if (!userFound) {
    return response.status(404).json({ message: "customer does not exists" });
  }

  request.customer = userFound;

  next();
};

const getBalance = (statement) => {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return (acc += operation.amount);
    }

    return (acc -= operation.amount);
  }, 0);

  return balance;
};

routes.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = accounts.some((account) => account.cpf === cpf);

  if (customerAlreadyExists) {
    return response.status(400).json({ message: "customer already exists" });
  }

  const accountCreated = {
    id: uuid(),
    name,
    cpf,
    statement: [],
  };

  accounts.push(accountCreated);

  return response.status(201).json({ message: "User Created" });
});

routes.delete("/account", verifyExistentCpf, (request, response) => {
  const { customer } = request;

  accounts.splice(customer, 1);

  console.log(accounts);

  return response.status(201).json({ message: "User Deleted" });
});

routes.get("/account", verifyExistentCpf, (request, response) => {
  const { customer } = request;

  return response.status(200).json(customer);
});

routes.put("/account", verifyExistentCpf, (request, response) => {
  const { name } = request.body;
  const { customer } = request;

  customer.name = name;

  return response.status(201).json({ message: "User edited" });
});

routes.get("/statement", verifyExistentCpf, (request, response) => {
  const { customer } = request;

  return response.status(200).json(customer.statement);
});

routes.get("/statement/date", verifyExistentCpf, (request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter(
    (statement) =>
      statement.createdAt.toDateString() === dateFormat.toDateString()
  );

  return response.status(200).json(statement);
});

routes.post("/deposit", verifyExistentCpf, (request, response) => {
  const { customer } = request;
  const { description, amount } = request.body;

  const newOperation = {
    amount,
    description,
    createdAt: new Date(),
    type: "credit",
  };

  customer.statement.push(newOperation);
  const balance = getBalance(customer.statement);

  return response.status(201).json({ balance, operations: customer.statement });
});

routes.post("/withdraw", verifyExistentCpf, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return response.status(500).json({ error: "insufficient balance" });
  }

  const newOperation = {
    amount,
    createdAt: new Date(),
    type: "debit",
  };

  customer.statement.push(newOperation);

  const updatedBalance = balance - amount;

  return response
    .status(201)
    .json({ balance: updatedBalance, operations: customer.statement });
});

module.exports = routes;
