const express = require("express");
const cors = require("cors");
const recordsRouter = require("../backend/routes/records"); // ERRADO

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", recordsRouter);

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
