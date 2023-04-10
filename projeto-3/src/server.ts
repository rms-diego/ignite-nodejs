import { app } from "./app";
import { env } from "./env";

app.listen({ host: "0.0.0.0", port: env.PORT }, (error, address) => {
  if (error) throw new Error(error.message);

  console.log(`Server is running\nlink:${address}`);
});
