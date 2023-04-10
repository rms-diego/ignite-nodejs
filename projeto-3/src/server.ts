import { app } from "./app";

app.listen({ host: "0.0.0.0", port: 3000 }, (error, address) => {
  if (error) throw new Error(error.message);

  console.log(`Server is running\nlink:${address}`);
});
