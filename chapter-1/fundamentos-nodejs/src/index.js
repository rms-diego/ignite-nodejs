const app = require("express")();

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Olá mundo !" });
});

app.listen(3333, () =>
  console.log(`Server up !🚀\nLink: http://localhost:3333`)
);
