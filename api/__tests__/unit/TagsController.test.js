const TagsController = require('../../src/controllers/TagsController');
const knex = require('../../src/database/knex');

jest.mock('../../src/database/knex');

describe('TagsController', () => {
  let tagsController;

  beforeEach(() => {
    tagsController = new TagsController();
  });

  describe('index', () => {
    it('should return a list of tags for a user', async () => {
      const user_id = 1;
      const request = {
        user: { id: user_id },
      };
      const response = {
        json: jest.fn(),
      };

      const tags = [
        { name: 'Tag1', user_id: user_id },
        { name: 'Tag2', user_id: user_id },
      ];

      knex.mockReturnValue({
        where: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockResolvedValue(tags),
      });

      await tagsController.index(request, response);

      expect(knex).toHaveBeenCalledWith('tags');
      expect(knex().where).toHaveBeenCalledWith({ user_id });
      expect(knex().groupBy).toHaveBeenCalledWith('name');
      expect(response.json).toHaveBeenCalledWith(tags);
    });
  });

  describe('index2', () => {
    it('should return a list of tags for a user', async () => {
      const user_id = 1;
      const request = {
        user: { id: user_id },
      };
      const response = {
        json: jest.fn(),
      };

      const tags = [
        { name: 'Tag1', user_id: user_id },
        { name: 'Tag2', user_id: user_id },
      ];

      knex.mockReturnValue({
        where: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockResolvedValue(tags),
      });

      await tagsController.index(request, response);

      expect(knex).toHaveBeenCalledWith('tags');
      expect(knex().where).toHaveBeenCalledWith({ user_id });
      expect(knex().groupBy).toHaveBeenCalledWith('name');
      expect(response.json).toHaveBeenCalledWith(tags);
    });
  });

  it('should return an empty list if the user has no tags', async () => {
    const user_id = 1;
    const request = {
      user: { id: user_id },
    };
    const response = {
      json: jest.fn(),
    };

    // Simular que o banco de dados não retornou tags
    knex.mockReturnValue({
      where: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockResolvedValue([]),
    });

    await tagsController.index(request, response);

    expect(knex).toHaveBeenCalledWith('tags');
    expect(knex().where).toHaveBeenCalledWith({ user_id });
    expect(knex().groupBy).toHaveBeenCalledWith('name');
    expect(response.json).toHaveBeenCalledWith([]);
  });
});
