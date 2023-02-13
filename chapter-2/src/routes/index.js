const { Router } = require("express");
const { randomUUID: uuid } = require("crypto");

const routes = Router();

const accounts = [];

routes.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const accountCreated = {
    id: uuid(),
    name,
    cpf,
    statement: [],
  };

  accounts.push(accountCreated);

  return response.status(201).json(accounts);
});

module.exports = routes;
