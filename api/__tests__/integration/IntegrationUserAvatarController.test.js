const request = require("supertest");
const app = require("../../src/controllers/UserAvatarController"); 
// Suponhamos que o endpoint para atualizar o avatar seja "/update-avatar"
// Certifique-se de ajustar o caminho de acordo com a sua configuração

describe("User Avatar API", () => {
  let authToken; // Armazena o token de autenticação

  // Antes dos testes, autentica o usuário e obtém o token
  beforeAll(async () => {
    const authResponse = await request(app)
      .post("/auth") // Endpoint de autenticação (ajuste para o seu servidor)
      .send({ email: "seu_email", password: "sua_senha" });
    authToken = authResponse.body.token;
  });

  it("should update the user's avatar", async () => {
    const response = await request(app)
      .put("/update-avatar") // Endpoint para atualizar o avatar (ajuste para o seu servidor)
      .set("Authorization", `Bearer ${authToken}`) // Adicione o token de autorização
      .attach("avatar", "caminho_do_arquivo_de_avatar/arquivo_de_avatar.png"); // Anexe o arquivo de avatar

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("avatar");
  });
});
