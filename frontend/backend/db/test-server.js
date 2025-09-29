const http = require("http");

const options = {
  hostname: "localhost",
  port: 3001,
  path: "/api/users",
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  }
};

const req = http.request(options, (res) => {
  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });
  res.on("end", () => {
    console.log(" Resposta do servidor:");
    console.log(data);
  });
});

req.on("error", (error) => {
  console.error(" Erro ao conectar com o servidor:");
  console.error(error.message);
});

const payload = {
  name: "Carlos Teste",
  email: "carlos@email.com",
  age: 23,
  birth_date: "2000-03-15",
  role: "Administrador",
  terms_accepted: true
};

req.write(JSON.stringify(payload));
req.end();
