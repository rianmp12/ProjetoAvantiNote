const NotesController = require('../../src/controllers/NotesController')
const knex = require('../../src/database/knex');

// Mock the knex module
jest.mock('../src/database/knex', () => ({
  insert: jest.fn(),
  where: jest.fn().mockReturnThis(),
  first: jest.fn(),
  orderBy: jest.fn().mockReturnThis(),
  whereIn: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
}));

describe('NotesController', () => {
  let notesController;

  beforeEach(() => {
    notesController = new NotesController();
  });

  describe('create', () => {
    it('should create a new note with links and tags', async () => {
      const request = {
        body: {
          title: 'Test Note',
          description: 'Test Description',
          tags: ['Tag1', 'Tag2'],
          links: ['Link1', 'Link2'],
        },
        user: { id: 1 },
      };

      const response = {
        json: jest.fn(),
      };

      // Mock the insert function of knex to return a note_id
      knex.insert.mockReturnValue([1]); // Assuming note_id is 1

      await notesController.create(request, response);

      expect(knex).toHaveBeenCalledWith('notes');
      expect(knex.insert).toHaveBeenCalledWith({
        title: 'Test Note',
        description: 'Test Description',
        user_id: 1,
      });
      expect(knex).toHaveBeenCalledWith('tags');
      expect(knex.insert).toHaveBeenCalledWith([
        { note_id: 1, name: 'Tag1', user_id: 1 },
        { note_id: 1, name: 'Tag2', user_id: 1 },
      ]);
      expect(knex).toHaveBeenCalledWith('links');
      expect(knex.insert).toHaveBeenCalledWith([
        { note_id: 1, url: 'Link1' },
        { note_id: 1, url: 'Link2' },
      ]);
      expect(response.json).toHaveBeenCalledWith();
    });
  });

  describe('show', () => {
    it('should return a note with tags and links', async () => {
      const request = {
        params: { id: 1 },
      };

      const response = {
        json: jest.fn(),
      };

      const note = {
        id: 1,
        title: 'Test Note',
        user_id: 1,
      };

      const tags = [
        { note_id: 1, name: 'Tag1', user_id: 1 },
        { note_id: 1, name: 'Tag2', user_id: 1 },
      ];

      const links = [
        { note_id: 1, url: 'Link1' },
        { note_id: 1, url: 'Link2' },
      ];

      // Mock knex to return data for the note, tags, and links
      knex.where.mockResolvedValue(note);

      knex().orderBy.mockReturnThis();
      knex().whereIn.mockReturnThis();
      knex().select.mockReturnThis();
      knex.select.mockResolvedValue(tags);

      knex().where.mockReturnValue(knex());
      knex().orderBy.mockReturnValue(knex());
      knex().select.mockReturnValue(links);

      await notesController.show(request, response);

      expect(knex).toHaveBeenCalledWith('notes');
      expect(knex().where).toHaveBeenCalledWith({ id: 1 });
      expect(knex).toHaveBeenCalledWith('tags');
      expect(knex().where).toHaveBeenCalledWith({ note_id: 1 });
      expect(knex().orderBy).toHaveBeenCalledWith('name');
      expect(knex).toHaveBeenCalledWith('links');
      expect(knex().where).toHaveBeenCalledWith({ note_id: 1 });
      expect(knex().orderBy).toHaveBeenCalledWith('created_at');
      expect(response.json).toHaveBeenCalledWith({
        ...note,
        tags,
        links,
      });
    });
  });
});