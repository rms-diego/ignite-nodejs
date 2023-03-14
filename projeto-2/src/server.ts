import { app } from "./app";
import { knex } from "./database";

app.get("/", async () => {
  const test = await knex("sqlite_schema").select("*");

  console.log(test);

  return { message: "hello world" };
});

app.listen({ port: 3333 }, () => console.log("Server running"));
