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

  return response.status(201).json(accountCreated);
});

routes.get("/statement", verifyExistentCpf, (request, response) => {
  const { customer } = request;

  return response.status(200).json(customer.statement);
});

routes.post("/deposit", verifyExistentCpf, (request, response) => {
  const { customer } = request;
  const { description, amount } = request.body;

  const newOperation = {
    amount,
    description,
    createdAt: new Date().toLocaleString(),
    type: "credit",
  };

  customer.statement.push(newOperation);
  return response.status(201).json(customer.statement);
});

module.exports = routes;
