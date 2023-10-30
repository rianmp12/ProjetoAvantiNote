const request = require('supertest');
const app = require('../../src/controllers/SessionsController'); 
describe('SessionsController', () => {
  it('should create a session', async () => {
    const user = {
      email: 'email@test.com',
      password: 'senha_correta',
    };

    const response = await request(app)
      .post('/sessions') // Substitua pelo endpoint correto
      .send(user);

    expect(response.status).toBe(201); // Verifique se a resposta tem status 201 (Created)

    expect(response.body).toHaveProperty('token'); // Verifique se a resposta contém um token de autenticação
    expect(response.body).toHaveProperty('user'); // Verifique se a resposta contém dados do usuário

    // Adicione mais asserções conforme necessário
  });

  it('should return an error for incorrect email/password', async () => {
    const user = {
      email: 'email@test.com',
      password: 'senha_incorreta',
    };

    const response = await request(app)
      .post('/sessions') // Substitua pelo endpoint correto
      .send(user);

    expect(response.status).toBe(401); // Verifique se a resposta tem status 401 (Unauthorized)

    expect(response.body).toHaveProperty('message'); // Verifique se a resposta contém uma mensagem de erro

    // Adicione mais asserções conforme necessário
  });
});
