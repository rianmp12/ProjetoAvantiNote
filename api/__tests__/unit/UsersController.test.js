const bcrypt = require('bcryptjs');
const UsersController = require("../../src/controllers/UsersController");
const AppError = require('../../src/utils/AppError');
const sqliteConnection = require('../../src/database/sqlite');

jest.mock('bcryptjs');
jest.mock('../../src/database/sqlite');

describe('UsersController', () => {
  let usersController;

  beforeEach(() => {
    usersController = new UsersController();
  });

  describe('create', () => {
    it('deve criar um novo usuário', async () => {
      const request = {
        body: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'testpassword',
        },
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const database = {
        get: jest.fn().mockResolvedValue(undefined),
        run: jest.fn(),
      };
      sqliteConnection.mockResolvedValue(database);
      bcrypt.hash.mockResolvedValue('hashedPassword');

      await usersController.create(request, response);

      expect(database.get).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE email = (?)',
        ['test@example.com']
      );
      expect(database.run).toHaveBeenCalledWith(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        ['Test User', 'test@example.com', 'hashedPassword']
      );
      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalled();
    });

    it('deve gerar um erro se o e-mail já existir', async () => {
      const request = {
        body: {
          name: 'Test User',
          email: 'existing@example.com',
          password: 'testpassword',
        },
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const database = {
        get: jest.fn().mockResolvedValue({ id: 1 }), // Simulating existing user
      };
      sqliteConnection.mockResolvedValue(database);

      try {
        await usersController.create(request, response);
      } catch (error) {
        expect(error instanceof AppError).toBe(true);
        expect(error.message).toBe('Este e-mail já está em uso.');
      }
    });
  });

  describe('update', () => {
    it('deve atualizar as informações do usuário', async () => {
      // Simule um usuário válido
      const user_id = 1;

      const request = {
        body: {
          name: 'Rian',
          email: 'rianmp12@gmail.com',
          password: 'rian11',
          old_password: 'rian1234',
        },
        user: { id: user_id }, // Configure o usuário válido
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const database = {
        get: jest.fn().mockResolvedValue({ id: user_id }), // Simule o usuário existente
        run: jest.fn(),
      };
      sqliteConnection.mockResolvedValue(database);
      bcrypt.compare.mockResolvedValue(true);

      await usersController.update(request, response);

      // Expect assertions aqui...
    });

    it('deve gerar um erro se o usuário não existir', async () => {
      // Simule um usuário que não existe
      const user_id = 1;

      const request = {
        body: {
          name: 'Updated User',
          email: 'updated@example.com',
        },
        user: { id: user_id }, // Configure o usuário válido
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const database = {
        get: jest.fn().mockResolvedValue(undefined), // Simule o usuário inexistente
        run: jest.fn(),
      };
      sqliteConnection.mockResolvedValue(database);

      try {
        await usersController.update(request, response);
      } catch (error) {
        expect(error instanceof AppError).toBe(true);
        expect(error.message).toBe('Usuário não encontrado');
      }
    });
  });
});