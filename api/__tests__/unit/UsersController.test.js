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
    it('should create a new user', async () => {
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

    it('should throw an error if email already exists', async () => {
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
    
  });
});
