import { env } from "./env";

import { app } from "./app";

// routes
import { transactionsRoutes } from "./routes/transactions";

app.register(transactionsRoutes, {
  prefix: "transactions",
});

app.listen({ port: env.PORT }, (error, address) => {
  if (error) console.error(error);
  console.log("Server running\nlink: %s", address);
});
