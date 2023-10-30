const request = require('supertest');
const app = require('../../src/controllers/TagsController');
describe('TagsController', () => {
  it('should get user tags', async () => {
    const user_id = 1; // Defina o ID do usuário que deseja usar nos testes

    const response = await request(app)
      .get('/tags') // Substitua pelo endpoint correto
      .set('Authorization', `Bearer SEU_TOKEN_DE_AUTORIZACAO`); // Substitua pelo token de autorização real

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    // Adicione mais asserções conforme necessário
    it('should get user tags', async () => {
        const user_id = 1; // Defina o ID do usuário que deseja usar nos testes
      
        const response = await request(app)
          .get('/tags') // Substitua pelo endpoint correto
          .set('Authorization', `Bearer SEU_TOKEN_DE_AUTORIZACAO`); // Substitua pelo token de autorização real
      
        expect(response.status).toBe(200); // Verifique se a resposta tem status 200 (OK)
      
        expect(response.body).toBeInstanceOf(Array); // Verifique se a resposta é um array de tags
      
        // Verifique se a resposta contém as propriedades esperadas
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('user_id');
      
        // Adicione mais asserções conforme necessário
      });
      
  });
});
