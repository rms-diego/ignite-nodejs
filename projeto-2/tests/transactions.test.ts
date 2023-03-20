import { test, expect, beforeAll, afterAll, describe } from "vitest";
import request from "supertest";

import { app } from "../src/app";

describe("Tests transactions routes", () => {
  const server = app.server;

  beforeAll(async () => app.ready());

  afterAll(async () => app.close());

  test("[POST] It should be able user create a new transaction", async () => {
    const transactionBody = {
      title: "Um titulo qualquer",
      amount: 10000,
      type: "credit",
    };

    await request(server)
      .post("/transactions/create")
      .send(transactionBody)
      .expect(201);
  });

  test("[GET] It should be able get all transactions", async () => {
    const transactionBody = {
      title: "Um titulo qualquer",
      amount: 10000,
      type: "credit",
    };

    const response = await request(server)
      .post("/transactions/create")
      .send(transactionBody)
      .expect(201);

    const cookie = response.get("Set-Cookie");

    const {
      body: { transactions },
    } = await request(server)
      .get("/transactions/findMany")
      .set("Cookie", cookie)
      .expect(200);

    expect(transactions).toEqual([
      expect.objectContaining({ title: "Um titulo qualquer", amount: 10000 }),
    ]);
  });
});
