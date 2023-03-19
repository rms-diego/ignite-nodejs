import { test, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

import { app } from "../src/app";

beforeAll(async () => app.ready());

afterAll(async () => app.close());

test("[POST] should be able create a new transaction", async () => {
  const transactionBody = {
    title: "Um titulo qualquer",
    amount: 10000,
    type: "credit",
  };

  await request(app.server)
    .post("/transactions/create")
    .send(transactionBody)
    .expect(201);
});
