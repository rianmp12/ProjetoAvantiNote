const request = require('supertest');
const app = require('../../src/controllers/NotesController'); 

describe('NotesController', () => {
  it('should create a new note', async () => {
    const user = {
      id: 1, // Suponha que o usuário com id 1 esteja autenticado
    };

    const newNote = {
      title: 'Nova Nota',
      description: 'Descrição da nova nota',
      tags: ['Tag1', 'Tag2'],
      links: ['Link1', 'Link2'],
    };

    const response = await request(app)
      .post('/notes/create') // Substitua pelo endpoint correto
      .set('Authorization', `Bearer ${token}`) // Adicione um token de autenticação se necessário
      .send(newNote);

    expect(response.status).toBe(201); // Verifique se a resposta tem status 201 (Created)

    // Verifique se a resposta contém os dados da nova nota
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newNote.title);
    expect(response.body.description).toBe(newNote.description);

    // Adicione mais asserções conforme necessário
  });

  it('should show a note by ID', async () => {
    const noteId = 1; // Suponha que o ID da nota exista

    const response = await request(app)
      .get(`/notes/${noteId}`) // Substitua pelo endpoint correto
      .set('Authorization', `Bearer ${token}`); // Adicione um token de autenticação se necessário

    expect(response.status).toBe(200); // Verifique se a resposta tem status 200 (OK)

    // Verifique se a resposta contém os dados da nota
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBeTruthy(); // Verifique se o título não está vazio

    // Adicione mais asserções conforme necessário
  });

  // Adicione mais testes para outros métodos do NotesController conforme necessário
  const request = require('supertest');
const app = require('../seu_arquivo_de_servidor'); // Substitua pelo caminho do seu servidor real

describe('NotesController', () => {
  it('should create a new note', async () => {
    // ... Teste de criação de nota (método create)
  });

  it('should show a note by ID', async () => {
    // ... Teste de exibição de nota por ID (método show)
  });

  it('should delete a note by ID', async () => {
    const noteIdToDelete = 1; // Suponha que o ID da nota a ser excluída exista

    const response = await request(app)
      .delete(`/notes/${noteIdToDelete}`) // Substitua pelo endpoint correto
      .set('Authorization', `Bearer ${token}`); // Adicione um token de autenticação se necessário

    expect(response.status).toBe(200); // Verifique se a resposta tem status 200 (OK)

    // Verifique se a nota foi excluída corretamente (pode depender de como você implementa a exclusão)
  });

  it('should list notes with optional filters', async () => {
    const filters = {
      title: 'Filtro de título',
      tags: 'Tag1,Tag2', // Suponha que essas tags existam
    };

    const response = await request(app)
      .get('/notes') // Substitua pelo endpoint correto
      .query(filters)
      .set('Authorization', `Bearer ${token}`); // Adicione um token de autenticação se necessário

    expect(response.status).toBe(200); // Verifique se a resposta tem status 200 (OK)

    // Verifique se a resposta contém uma lista de notas que correspondam aos filtros
  });

  // Adicione mais testes conforme necessário para outros métodos do NotesController
});

});
