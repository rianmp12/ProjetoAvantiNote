const request = require("supertest");
const app = require("../../src/controllers/UsersController"); // Importe o arquivo do seu servidor

// Suponhamos que o endpoint para criar usuário seja "/create" e o endpoint para atualizar seja "/update"
// Certifique-se de ajustar esses caminhos de acordo com a sua configuração

describe("User API", () => {
  let authToken; // Armazena o token de autenticação

  // Antes dos testes, autentica o usuário e obtém o token
  beforeAll(async () => {
    const authResponse = await request(app)
      .post("/auth") // Endpoint de autenticação (ajuste para o seu servidor)
      .send({ email: "seu_email", password: "sua_senha" });
    authToken = authResponse.body.token;
  });

  it("should create a new user", async () => {
    const response = await request(app)
      .post("/create") // Endpoint para criar um usuário (ajuste para o seu servidor)
      .set("Authorization", `Bearer ${authToken}`) // Adicione o token de autorização
      .send({ name: "Novo Usuário", email: "novo_email", password: "nova_senha" });

    expect(response.status).toBe(201);
  });

  it("should update a user", async () => {
    const response = await request(app)
      .put("/update") // Endpoint para atualizar um usuário (ajuste para o seu servidor)
      .set("Authorization", `Bearer ${authToken}`) // Adicione o token de autorização
      .send({ name: "Novo Nome", email: "novo_email", password: "nova_senha", old_password: "senha_antiga" });

    expect(response.status).toBe(200);
  });
});
