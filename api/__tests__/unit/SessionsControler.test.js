const SessionsController = require('../../src/controllers/SessionsController');
const knex = require('../../src/database/knex');
const AppError = require('../../src/utils/AppError');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const authConfig = require('../../src/configs/auth');

jest.mock('../../src/database/knex');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('SessionsController', () => {
  let sessionsController;

  beforeEach(() => {
    sessionsController = new SessionsController();
  });

  describe('create', () => {
    it('should create a new session and return a token', async () => {
      const request = {
        body: {
          email: 'test@example.com',
          password: 'testpassword',
        },
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const user = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      };

      const jwtToken = 'testToken';

      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          first: jest.fn().mockResolvedValue(user),
        }),
      });

      compare.mockResolvedValue(true);

      sign.mockReturnValue(jwtToken);

      await sessionsController.create(request, response);

      expect(knex).toHaveBeenCalledWith('users');
      expect(compare).toHaveBeenCalledWith('testpassword', 'hashedPassword');
      sign.mockImplementation((payload, secret, options) => {
        if (secret === 'testSecret' && options.expiresIn === '1h') {
          return 'testToken';
        } else {
          throw new Error('Invalid sign parameters');
        }
      });
      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith({ token: jwtToken, user });
    });

    it('should throw an error for incorrect email or password', async () => {
      const request = {
        body: {
          email: 'test@example.com',
          password: 'incorrectpassword',
        },
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      knex.mockReturnValue({
        where: jest.fn().mockReturnValue({
          first: jest.fn().mockResolvedValue(null),
        }),
      });

      compare.mockResolvedValue(false);

      try {
        await sessionsController.create(request, response);
      } catch (error) {
        expect(error instanceof AppError).toBe(true);
        expect(error.message).toBe('E-mail e/ou senha incorreta.');
        expect(error.statusCode).toBe(401);
        expect(response.status).not.toHaveBeenCalled();
        expect(response.json).not.toHaveBeenCalled();
      }
    });
  });
});
