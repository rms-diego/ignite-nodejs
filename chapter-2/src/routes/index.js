const { Router } = require("express");
const { randomUUID: uuid } = require("crypto");

const routes = Router();

const accounts = [];

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

routes.get("/statement/:id", (request, response) => {
  const { id } = request.params;

  const userFound = accounts.find((account) => account.id === id);

  return response.status(200).json(userFound.statement);
});

module.exports = routes;
